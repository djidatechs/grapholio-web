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


    callBack(){}
    hookManager (managerReference : GrapholioManager ){
        this.managerRef = managerReference ;
    }
    handleStage(stage : Konva.Stage){
        stage.on("contextmenu",(event)=>{
            event.evt.preventDefault()
        } )
        stage.on("dblclick",()=>{
            this.isCurving = false;
            stage.off('mousemove');
        })
    }
    handleImportedGraph(layer : Konva.Layer) {
        console.clear()
        console.log({layer});
        layer.find("Group").map((group)=>{
            console.log({group});
            if (! group.attrs.id.includes(NodeAutoAction) || ! group.hasChildren() ) return
            const circle = (group as Konva.Group).find("Circle").find(circle=>circle.attrs.id.includes(NodeAutoAction))
            const text = (group as Konva.Group).find("Text").find(text=>text.attrs.id.includes(NodeAutoAction))
            console.log({circle,text});
            if (circle) {
                this.handleNode((circle as Konva.Circle))
                if (text) this.handleNodeText((circle as Konva.Circle),(text as Konva.Text))
            }
        })
        layer.find("Arrow").map(arrow=>{
            console.log({arrow})
            if (! arrow.attrs.id.includes(EdgeAutoAction)  ) return
            this.handleEdge((arrow as Konva.Arrow))
        })
    }

    handleFastControl(event: React.MouseEvent<HTMLSpanElement>, Enumeration: ContextualEnumsTypes) {
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
        text.on("dblclick",()=> {
            this._nodeTextDoubleClick(text)
            this.managerRef?.useOperations()?.SentUpdateRequest()

        })
    }
    handleEdgeWeightText (text :Konva.Text ) {
        if (!text) return
        text.on("dblclick",()=> {
            this._edgeWeightDoubleClick(text)
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
        console.log("please see here")
        this._edgeMovement(arrow);
        arrow.on("mouseenter",()=> this._edgeMouseEnter(arrow))
        arrow.on("mouseleave",()=> this._edgeMouseLeave(arrow))
        arrow.on("click", ()=>this._edgeClick(arrow))
        arrow.on("dblclick", (event)=> {
            event.cancelBubble = true;
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
        console.log("track dbclick edge arrow halt")
        if (arrow === undefined) return
        console.log("track dbclick edge arrow success")
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
                fill: 'yellow',
                stroke: 'yellow',
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
    _NodeContextual(circle : Konva.Group  ){
        this._moveToTop(circle)
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
        this._moveToTop(arrow)
        arrow.attrs.orinigalColor = arrow.stroke();
        arrow.stroke("yellow");
    }
    _edgeMouseLeave(arrow:Konva.Arrow){
        this._moveToTop(arrow)
        arrow.stroke(arrow.attrs.orinigalColor ||"white")

    }
    _edgeDoubleClick(arrow : Konva.Arrow ){
        this._moveToTop(arrow)
        console.log("DBCLICK")

        this._curveArrow(arrow);

    }
    _curveArrow(arrow: Konva.Arrow){
        if (this.isCurving) {
            this.isCurving = false;
            arrow.getStage()?.off('mousemove');
        } else {
            const pointerPosition = arrow.getStage()?.getPointerPosition();
            if (!pointerPosition) return;


            const points = arrow.points();


            this.isCurving = true;

            arrow.getStage()?.on('mousemove', () => {
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
            });
        }
    }

    _edgeRightClick(arrow : Konva.Arrow ){
        this._moveToTop(arrow)
        const cursorPosition = arrow.getStage()?.getPointerPosition() || {x:0,y:0};
        this._MenuUp(arrow , cursorPosition , VisualEdge);

    }

    _edgeContextual(arrow : Konva.Arrow ){
        this._moveToTop(arrow)
    }

    _stageClick(stage : Konva.Stage){
        console.log(stage)


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
    unwatchNode(node:Konva.Node|undefined){
        if (!node) return
        const label = node.getLayer()?.find("Text").find(text=>text.attrs.id === node.attrs.id) as Konva.Text
        node.getParent()?.off()
        node.off()
        label.off()


    }
    _updatePoints(node1:Konva.Circle,node2:Konva.Circle,edge:Konva.Arrow){
        try {
            const node1_pos = node1.getAbsolutePosition()
            const node2_pos = node2.getAbsolutePosition();
            const radius = {
                node1 : node1?.radius(),
                node2 : node2?.radius(),
            }
            console.log(radius)
            const weight = edge.getLayer()?.find("Text").find(text => text.attrs.id === edge.attrs.id) as Konva.Text

            if (node1_pos == null || node2_pos == null ||!radius.node1 || !radius.node2) return;

            const scale = node1?.getStage()?.scale() || {x: 1, y: 1}

            const points = edge.points();
            const originalDistance = Math.sqrt(Math.pow(points[points.length - 2] - points[0], 2) + Math.pow(points[points.length - 1] - points[1], 2));

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

                const newDistance = Math.sqrt(Math.pow(arrowEnd.x - arrowStart.x, 2) + Math.pow(arrowEnd.y - arrowStart.y, 2));
                const ratio = newDistance / originalDistance;
                const middlePoints = {
                    x: S_arrowMiddle.x + ((arrowEnd.x) - points[points.length - 2]) * ratio,
                    y: S_arrowMiddle.y + ((arrowEnd.y) - points[points.length - 1]) * ratio,
                }

                edge.setAttr("points", [
                    arrowStart.x,
                    arrowStart.y,
                    middlePoints.x,
                    middlePoints.y,
                    arrowEnd.x,
                    arrowEnd.y,
                ])

                weight.setAttr("x", middlePoints.x)
                weight.setAttr("y", middlePoints.y - 20)

            } else {
                const {arrowStart, arrowMiddle, arrowEnd} = MathCalculation_Update2dPointsLink({node1_pos, node2_pos}, radius, undefined)
                edge.setAttr("points", [
                    arrowStart.x / scale.x,
                    arrowStart.y / scale.y,
                    arrowEnd.x / scale.x,
                    arrowEnd.y / scale.y,
                ])
                weight.setAttr("x", arrowMiddle.x / scale.x)
                weight.setAttr("y", (arrowMiddle.y / scale.x) - 20)
            }
            weight.moveToTop()


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
                    manager?.updateNodeAttr(textNode.attrs.id, "displayName", textarea.value)
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