import Konva from "konva";
import {GrapholioManager} from "../GrapholioManager/GrapholioManager.ts";
import {
    EdgeAutoAction,
    MovingArrow_Id, NodeAutoAction,
} from "../../Constants.ts";
import {Vector2d} from "konva/lib/types";
import {MathCalculation_Update2dPointsLink} from "../Shared.ts";
import {
    ContextualEnumsTypes,
    VisualEdge,
    VisualNode
} from "../../Pages/Application/BlackBoard/ContextualTypesEnums.ts";

export class VisualEventsHandler {
    private isConnecting : string|undefined ;
    private managerRef :  GrapholioManager|undefined ;
    private isCurving : boolean = false;
    private stage_mousemove_ref : ()=>any = ()=>{}


    hookManager (managerReference : GrapholioManager ){
        this.managerRef = managerReference ;
    }
    handleStage(stage : Konva.Stage){
        stage.on("contextmenu",(event)=>{
            event.evt.preventDefault()
        } )
        stage.on("dblclick",()=>{
            stage.off('mousemove',this.stage_mousemove_ref);
            this.isCurving = false;
        })
        this.selectInstall(stage);
    }
    selectInstall(stage:Konva.Stage){
        const  tr = new Konva.Transformer();
        tr.resizeEnabled(false);
        tr.draggable(true);
        tr.rotateEnabled(false)
        const layer = stage.find("Layer").find(layer=>layer.getAttr("selectTool")===true) as Konva.Layer
        layer.add(tr);
        tr.nodes([]);

        const selectionRectangle = new Konva.Rect({
            fill: 'rgba(0,0,255,0.5)',
            visible: false,
        });
        layer.add(selectionRectangle);

        let x1:any, y1:any, x2:any, y2 : any;

        stage.on('mousedown touchstart', (e) => {
            e.evt.preventDefault();
            const scale=  stage?.scale()?.x || 1
            x1 = (stage?.getPointerPosition()?.x||0)/ scale
            y1 = (stage?.getPointerPosition()?.y||0)/ scale
            x2 = (stage?.getPointerPosition()?.x||0)/ scale
            y2 = (stage?.getPointerPosition()?.y||0)/ scale

            selectionRectangle.visible(true);
            selectionRectangle.moveToTop()
            selectionRectangle.width(0);
            selectionRectangle.height(0);
        });

        stage.on('mousemove touchmove', (e) => {
            // do nothing if we didn't start selection
            if (!selectionRectangle.visible()) {
                return;
            }
            e.evt.preventDefault();
            const scale=  stage?.scale()?.x || 1
            x2 = (stage?.getPointerPosition()?.x||0)/scale;
            y2 = (stage?.getPointerPosition()?.y||0)/scale;

            selectionRectangle.setAttrs({
                x: Math.min(x1, x2),
                y: Math.min(y1, y2),
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1),
            });
        });

        stage.on('mouseup touchend', (e) => {
            // do nothing if we didn't start selection
            if (!selectionRectangle.visible()) {
                return;
            }
            e.evt.preventDefault();
            // update visibility in timeout, so we can check it in click event
            setTimeout(() => {
                selectionRectangle.visible(false);
            });

            const active_layer = stage.find("Layer").find(layer => (layer.isVisible())&&(layer.getAttr("selectTool")!==true))
            if (!active_layer) return

            const shapes = (active_layer as Konva.Layer).find('Group');

            const box = selectionRectangle.getClientRect();
            const selected = shapes.filter((shape) =>
                Konva.Util.haveIntersection(box, shape.getClientRect())
            );
            tr.nodes(selected);

        });
    }

    handleImportedGraph(layer : Konva.Layer) {
        layer.find("Group").map((group)=>{
            if (! group.attrs.id.includes(NodeAutoAction) || ! group.hasChildren() ) return
            const circle = (group as Konva.Group).find("Circle").find(circle=>circle.attrs.id.includes(NodeAutoAction))
            const text = (group as Konva.Group).find("Text").find(text=>text.attrs.id.includes(NodeAutoAction))
            if (circle) {
                this.handleNode((circle as Konva.Circle))
                if (text) this.handleNodeText((circle as Konva.Circle),(text as Konva.Text))
            }
        })
        layer.find("Arrow").map(arrow=>{
            if (! arrow.attrs.id.includes(EdgeAutoAction)  ) return
            this.handleEdge((arrow as Konva.Arrow))
        })
    }

    handleFastControl(event: any, Enumeration: ContextualEnumsTypes) {
        const x = (event.target as HTMLSpanElement).getBoundingClientRect().width
        const y = (event.target as HTMLSpanElement).getBoundingClientRect().top
        event.preventDefault()
        this._MenuUp(undefined, {x,y}, Enumeration)
    }



    handleNode(circle : Konva.Circle | undefined  ){
        if (circle === undefined) return
        const fullNode = circle.getParent() as unknown as Konva.Group;
        if (fullNode===undefined) return
        this._nodeDragBound(fullNode)
        fullNode.on("mousedown", (event)=>{
            event.cancelBubble = true
        })
        fullNode.on("click", (event)=>{
            event.cancelBubble = true;
            this._nodeClick(fullNode)
            this.managerRef?.useOperations()?.SentUpdateRequest()
        })
        circle.on("dblclick", (event)=>{
            event.cancelBubble = true;
            this._nodeDoubleClick(circle)
            this.managerRef?.useOperations()?.SentUpdateRequest()
        })
        fullNode.on("dragstart", (event)=>{
            event.cancelBubble = true;
            this._nodeDragStart(fullNode)
            this.managerRef?.useOperations()?.SentUpdateRequest()
        })
        fullNode.on("contextmenu", (event)=>{
            event.evt.preventDefault();
            event.cancelBubble = true;
            this._nodeRightClick(fullNode)
            this.managerRef?.useOperations()?.SentUpdateRequest()
        })
        //other handlers will come to play when the edge
    }
    handleNodeText(circle : Konva.Circle | undefined ,text:Konva.Text | undefined){
        if (circle===undefined || text===undefined) return
        this._nodeTextDragBound(circle,text)
        text.on("mousedown",(e)=> {
            e.cancelBubble = true
        })
        text.on("dblclick",(e)=> {
                e.cancelBubble = true
                this._nodeTextDoubleClick(text)
            this.managerRef?.useOperations()?.SentUpdateRequest()

        })
    }
    handleEdgeWeightText (text :Konva.Text ) {
        if (!text) return

        text.on("mousedown", (e)=> e.cancelBubble = true )

        text.on("dblclick",()=> {
            if (!this.isCurving ) {
                this._edgeWeightDoubleClick(text)
            }
            else {
                text.getStage()?.off('mousemove',this.stage_mousemove_ref);
                this.isCurving = false //

            }
            this.managerRef?.useOperations()?.SentUpdateRequest()
        })

    }

    _nodeDragBound(group : Konva.Group){
        group.dragBoundFunc((pos)=> {
            const stage = group.getStage()
            if (!stage) return pos
            // define custom dragBoundFunc logic here
            const newX = Math.max(0, Math.min(stage.width() - group.width(), pos.x));
            const newY = Math.max(0, Math.min(stage.height() - group.height(), pos.y));
            return {
                x: newX,
                y: newY
            };
        })
    }
    _nodeTextDragBound(circle:Konva.Circle,text:Konva.Text){
        text.dragBoundFunc((pos) =>{
            const _y = (circle.width()+20) * (circle.getStage()?.scale()?.x||1)
            // Calculate the distance from the center of the circle
            text.offsetX(text.width()/2)
            text.offsetY(text.height()/2)

            const circleCenterX = circle.getAbsolutePosition().x
            const circleCenterY = circle.getAbsolutePosition().y
            const dx = pos.x - circleCenterX;
            const dy = pos.y - circleCenterY;

            // Calculate the angle of the dragged position relative to the circle center
            const angle = Math.atan2(dy, dx);

            // Ensure the text element stays at a fixed distance from the center
            const newX = circleCenterX + _y * Math.cos(angle);
            const newY = circleCenterY + _y * Math.sin(angle);


            return {
                x: newX ,
                y: newY ,
            };
        })
    }
    handleEdge(arrow : Konva.Arrow | undefined  ){
        if (arrow === undefined) return
        this._edgeMovement(arrow);
        arrow.on("mousedown",(e)=>e.cancelBubble = true )
        arrow.on("mouseenter",()=> this._edgeMouseEnter(arrow))
        arrow.on("mouseleave",()=> this._edgeMouseLeave(arrow))
        arrow.on("click", ()=>this._edgeClick(arrow))
        arrow.on("dblclick", (event)=> {
            event.cancelBubble = ! (this.isCurving || this.isConnecting)
            this._edgeDoubleClick(arrow)
        })
        arrow.on("contextmenu", (event)=> {
            event.evt.preventDefault();
            event.cancelBubble = true;
            this._edgeRightClick(arrow)
            this.managerRef?.useOperations()?.SentUpdateRequest()

        })
    }


    //helpers
    _nodeClick(circle : Konva.Group  ){
        this._moveToTop(circle)
        this.managerRef?.useOperations()?.setAccordation(current=>{
            current.Item = circle.attrs.id
            return current
        })


    }
    _nodeDoubleClick(circle : Konva.Circle  ){
        const group = circle.getParent() as unknown as Konva.Group
        this._moveToTop(group)
        this.AddingEdgeByMovingArrow(circle);
    }

    forceNodeClick(nodeId:string ){
        const circle =  this.managerRef?.blackboard.use()?.getNode(nodeId) as Konva.Circle | undefined
        if (circle === undefined) return
        this.AddingEdgeByMovingArrow( circle )
        const group = circle.getParent()
        this._MenuDown(group)
    }
    forceEdgeDbClick(edgeId:string ){
        const arrow =  this.managerRef?.blackboard.use()?.getEdgeById(edgeId) as Konva.Arrow | undefined
        if (arrow === undefined) return
        this._edgeDoubleClick(arrow)
        this._MenuDown(arrow)
    }

    AddingEdgeByMovingArrow(node_circle: Konva.Circle) {

        if (this.isConnecting) {
            const node1 = this.isConnecting;
            const node2 = node_circle.getAttr("id");
            this.managerRef?.addEdge(node1, node2, {})
            const arrow = node_circle.getStage()?.findOne((arr: Konva.Node) => arr.getAttr("id") == MovingArrow_Id) as Konva.Arrow
            this._MovingArrowDown(node_circle, arrow)
        } else {
            const arrow = new Konva.Arrow({
                id: MovingArrow_Id,
                points: [0, 0, 0, 0],
                pointerLength: 10,
                pointerWidth: 10,
                fill: '#ff8000',
                stroke: '#ff8000',
                strokeWidth: 2,
                visible: false,
            });
            node_circle.getLayer()?.add(arrow);
            arrow.show()
            arrow.moveToBottom()
            node_circle.getLayer()?.draw()
            this._MovingArrowUp(node_circle, arrow)
        }
    }

    _nodeRightClick(circle : Konva.Group  ){
        this._moveToTop(circle)
        const NodePosition = circle.getAbsolutePosition()

        this._MenuUp(circle , NodePosition , VisualNode);

    }
    _MenuUp(element : Konva.Node|undefined , areaPosition:{x:number,y:number} , enumeration : ContextualEnumsTypes){

        this.managerRef?.useBlackBoardMenu()?.setProps({
            elementId : element?.attrs.id ,
            enumerations : enumeration ,
            visible : true ,
            x : areaPosition.x,
            y : areaPosition.y
        })
        if (element) element.getStage()?.on("click", ()=>this._MenuDown(element) )
        else window.document.addEventListener( "click", ()=>{
            this._MenuDown(undefined)
        })

    }
    _MenuDown(element:Konva.Node|undefined) {
        this.managerRef?.useBlackBoardMenu()?.setProps({})
        if (element) element.getStage()?.off("click", ()=>this._MenuDown(element) )
        else window.document.removeEventListener("click",()=>this._MenuDown(undefined))
    }

    _nodeDragStart(circle : Konva.Group  ){
        this._moveToTop(circle)
    }



    _moveToTop(k : Konva.Arrow|Konva.Group){
        k.moveToTop();
        k.getLayer()?.draw();
    }

    _nodeTextDoubleClick(text:Konva.Text){
        this._ChangeTextVisually(text, {For:"label"});
    }
    _edgeWeightDoubleClick(text:Konva.Text){
        this._ChangeTextVisually(text,{For:"weight"});
    }

    _edgeClick(arrow : Konva.Arrow ){
        this.managerRef?.useOperations()?.setAccordation(current=>{
            current.Item = arrow.attrs.id
            return current
        })
    }
    _edgeMouseEnter(arrow:Konva.Arrow){
        arrow.moveToBottom()
        arrow.attrs.orinigalColor = arrow.stroke();
        arrow.stroke("yellow");
    }
    _edgeMouseLeave(arrow:Konva.Arrow){
        arrow.moveToBottom()
        arrow.stroke(arrow.attrs.orinigalColor ||"white")

    }
    _edgeDoubleClick(arrow : Konva.Arrow ){

        this._curveArrow(arrow);
        arrow.moveToBottom()

    }
    _curveArrow(arrow: Konva.Arrow){


        if (this.isCurving) {
            arrow.getStage()?.off('mousemove',this.stage_mousemove_ref);
            this.isCurving = false;
        } else {
            this.isCurving = true;
            this.stage_mousemove_ref = () => {
                const pointerPosition = arrow.getStage()?.getPointerPosition();
                if (!pointerPosition) return;


                const points = arrow.points();
                const newPosition = arrow.getStage()?.getPointerPosition();
                if (!newPosition) return;
                newPosition.x /= (arrow.getStage()?.scale()?.x||1)
                newPosition.y /= (arrow.getStage()?.scale()?.y||1)
                if (points.length === 4) points.splice(2, 0, newPosition.x, newPosition.y);
                if (points.length === 6) {
                    points[2] = newPosition.x
                    points[3] = newPosition.y

                }

                arrow.points(points);
                const node1_id = arrow.getAttr("node1");
                const node2_id = arrow.getAttr("node2");
                const node1 : Konva.Circle = (arrow.getLayer()?.find("Circle").find((node:any)=>node.attrs.id === node1_id)) as Konva.Circle
                const node2 : Konva.Circle = (arrow.getLayer()?.find("Circle").find((node:any)=>node.attrs.id === node2_id)) as Konva.Circle
                this._updatePoints(node1,node2,arrow)
            }
            arrow.getStage()?.on('mousemove',this.stage_mousemove_ref );
        }
    }

    _edgeRightClick(arrow : Konva.Arrow ){
        arrow.moveToBottom()
        const cursorPosition = arrow.getStage()?.getPointerPosition() || {x:0,y:0};
        this._MenuUp(arrow , cursorPosition , VisualEdge);

    }


    _edgeMovement(Arrow : Konva.Arrow) {

        const layer = Arrow?.getLayer()
        if (layer == null) return
        const node1_id = Arrow.getAttr("node1");
        const node2_id = Arrow.getAttr("node2");
        const node1 : Konva.Circle = (layer.find("Circle").find((node:any)=>node.attrs.id === node1_id)) as Konva.Circle
        const node2 : Konva.Circle = (layer.find("Circle").find((node:any)=>node.attrs.id === node2_id)) as Konva.Circle
        node1.getParent().on("dragmove", ()=>this._updatePoints(node1,node2,Arrow))
        node2.getParent().on("dragmove", ()=>this._updatePoints(node1,node2,Arrow))
    }
    unwatchEdge(arrow:Konva.Arrow|undefined){
        if (!arrow) return
        const weight = arrow.getLayer()?.find("Text").find(text=>text.attrs.id === arrow.attrs.id) as Konva.Text
        arrow.off();
        weight.off();

    }
    unwatchGraph(layer:Konva.Layer| null){
        if (!layer) return
        layer.find("Arrow").map(arrow  =>this.unwatchEdge(arrow  as Konva.Arrow ))
        layer.find("Circle").map(circle=>this.unwatchNode(circle as Konva.Circle))
    }
    unwatchNode(node:Konva.Circle|undefined){
        if (!node) return
        const label = node.getLayer()?.find("Text").find(text=>text.attrs.id === node.attrs.id) as Konva.Text
        node.getParent()?.off()
        node.off()
        label.off()


    }
    _updatePoints(node1:Konva.Circle,node2:Konva.Circle,edge:Konva.Arrow){
        try {
            const HLisOn = this.managerRef?.blackboard.use()?.HighlightEdge(edge.getAttr("id") as string )?.isOn()
            if (HLisOn) this.managerRef?.blackboard.use()?.HighlightEdge(edge.getAttr("id") as string , {turn:"off"})
            const node1_pos = node1.getAbsolutePosition()
            const node2_pos = node2.getAbsolutePosition();
            const scale = node1?.getStage()?.scale() || {x: 1, y: 1}
            const radius = {
                node1 : node1?.radius() * scale.x,
                node2 : node2?.radius() * scale.x
            }
            const weight = edge.getLayer()?.find("Text").find(text => text.attrs.id === edge.attrs.id) as Konva.Text

            if (node1_pos == null || node2_pos == null ||!radius.node1 || !radius.node2) return;



            const points = edge.points();
            //const originalDistance = Math.sqrt(Math.pow(points[points.length - 2] - points[0], 2) + Math.pow(points[points.length - 1] - points[1], 2));


            if (points.length === 6) {
                const S_arrowMiddle = {
                    x: points[2],
                    y: points[3]
                }

                const {arrowStart, arrowEnd} = MathCalculation_Update2dPointsLink({node1_pos, node2_pos}, radius, S_arrowMiddle)
                arrowStart.x /= scale.x
                arrowStart.y /= scale.y
                arrowEnd.x /= scale.x
                arrowEnd.y /= scale.y

                /*const newDistance = Math.sqrt(Math.pow(arrowEnd.x - arrowStart.x, 2) + Math.pow(arrowEnd.y - arrowStart.y, 2));
                const ratio = newDistance / originalDistance;
                const middlePoints = {
                    x: S_arrowMiddle.x + ((arrowEnd.x) - points[points.length - 2]) * ratio,
                    y: S_arrowMiddle.y + ((arrowEnd.y) - points[points.length - 1]) * ratio,

                }*/

                edge.setAttr("points", [
                    arrowStart.x,
                    arrowStart.y,
                    //middlePoints.x,
                    //middlePoints.y,
                    S_arrowMiddle.x,
                    S_arrowMiddle.y,
                    arrowEnd.x,
                    arrowEnd.y,
                ])
                const dx = arrowEnd.x - arrowStart.x;
                const dy = arrowEnd.y - arrowStart.y;
                const angle = Math.atan2(dy, dx);
                const px = S_arrowMiddle.x + 20 * Math.sin(angle);
                const py = S_arrowMiddle.y - 20 * Math.cos(angle);


                weight.setAttr("x", px)
                weight.setAttr("y", py)

            } else {
                const {arrowStart, arrowMiddle, arrowEnd} = MathCalculation_Update2dPointsLink({node1_pos, node2_pos}, radius, undefined)
                edge.setAttr("points", [
                    arrowStart.x / scale.x,
                    arrowStart.y / scale.y,
                    arrowEnd.x / scale.x,
                    arrowEnd.y / scale.y,
                ])
                const dx = arrowEnd.x - arrowStart.x;
                const dy = arrowEnd.y - arrowStart.y;
                const angle = Math.atan2(dy, dx);
                const px = arrowMiddle.x + (20 *scale.x) * Math.sin(angle);
                const py = arrowMiddle.y - (20 *scale.x) * Math.cos(angle);
                weight.setAttr("x", px / scale.x)
                weight.setAttr("y", py / scale.x)
            }
            weight.moveToTop()

            if (HLisOn)this.managerRef?.blackboard.use()?.HighlightEdge(edge.getAttr("id") as string , {turn:"on"})


            return null
        }catch {return null}
    }
    _MovingArrowUp (circle : Konva.Circle , arrow : Konva.Arrow ){
        this.isConnecting = circle.getAttr("id");
        arrow.show()
        circle.getLayer()?.add(arrow);
        circle.getLayer()?.draw();
        circle.getStage()?.on("mousemove", this.movingArrowUpdate(circle,arrow))
        circle.getStage()?.on("click", ()=>this._MovingArrowDown(circle, arrow) )
    }
    _MovingArrowDown (circle : Konva.Circle , arrow : Konva.Arrow ){
        this.isConnecting = undefined;
        arrow.destroy()
        arrow.getLayer()?.draw();
        arrow.getStage()?.off("mousemove", this.movingArrowUpdate(circle,arrow))

        circle.getStage()?.off("click", ()=>this._MovingArrowDown(circle, arrow) )
    }

    private movingArrowUpdate(circle: Konva.Circle, arrow: Konva.Arrow) {
        return ()=> {
            const pos = circle.getStage()?.getPointerPosition() as Vector2d;
            const NodePosition = circle.getAbsolutePosition();
            const scale = circle.getStage()?.scale() || {x: 1, y: 1};

            arrow.points([NodePosition.x / scale.x, NodePosition.y / scale.y, pos.x / scale.x, pos.y / scale.y]);
            circle.getLayer()?.draw();
        }
    }
    _ChangeTextVisually (textNode:Konva.Text,{For}:{For:"label"|"weight"}) {
        if (this.isCurving ||this.isConnecting) return
        const manager = this.managerRef



        const textPosition = textNode.getAbsolutePosition()
        const stage = textNode.getStage()

        if (stage == undefined) return
        const stageBox = stage.container().getBoundingClientRect();

        const areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
        }
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = textNode.getAttr("text");
        textarea.style.position = 'absolute';
        textarea.style.backgroundColor = 'black';
        textarea.style.color = 'white';
        textarea.style.border = '2px solid white'; // Added 'solid' and fixed the border color declaration
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x - 20 + 'px';
        textarea.style.overflow = 'hidden';
        textarea.style.width = textNode.width().toString();
        textarea.style.resize = 'none'; // Disabled textarea resizing

        textarea.maxLength = 20; // Added maximum character limit

        textarea.focus();
        if (For === "label") {
            textarea.addEventListener('keydown', function (e) {
                if (e.code === "Enter") {
                    manager?.updateNodeAttr(textNode.attrs.id, "label", textarea.value)
                    textNode.offsetX(textNode.width() / 2)
                    textNode.offsetY(textNode.height() / 2)

                    document.body.removeChild(textarea);
                    textNode.draw()
                    manager?.useOperations()?.SentUpdateRequest()
                }
            });
        }else {
            textarea.addEventListener('keydown', function (e) {
                if (e.key >= '0' && e.key <= '9' || e.key === '-' || e.code === 'ArrowLeft' ||e.code === 'ArrowRight' ||e.code === "Enter"|| e.code === "Backspace" || e.code === "Delete" ) {
                    if (e.code === "Enter") {
                        const num = parseInt(textarea.value);
                        manager?.updateEdgeAttr(textNode.attrs.id, "weight", isNaN(num) ? 1:num)
                        document.body.removeChild(textarea);
                        textNode.draw()
                        manager?.useOperations()?.SentUpdateRequest()
                    }
                }else e.preventDefault()
            })
        }




    }

}