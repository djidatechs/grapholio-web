import Konva from "konva";
import {VisualGraph} from "./VisualGraph.ts"
import {AutoAction, EdgeAutoAction, NodeAutoAction} from "../../Constants.ts";



export type IforEachVisualNode = {
    toggleTextVisibility : boolean | undefined,
}
export type IforEachVisualEdge = {
    toggleWeightTextVisibility : boolean | undefined
}
export class VisualGraphsManager {
    public static id = 1 ;
    private stage : Konva.Stage | null = null;
    private current : Konva.Layer |null = null;
    private visual_graphs : Map<string,VisualGraph> = new Map<string,VisualGraph>;
    init(container : HTMLDivElement){
        return this.stage = new Konva.Stage({
            container,
            width:  2*window.innerWidth,
            height: 1.5*window.innerHeight
        });
    }
    newGraph(visualGraphId:string = AutoAction+(VisualGraphsManager.id++).toString() , {returnId}:{returnId?:boolean}= {returnId:false}  ){
        if (this.stage == null) return false ;
        const layer = new Konva.Layer()
        layer.setAttr("id",visualGraphId)
        this.stage.add(layer)
        this.visual_graphs.set(visualGraphId, new VisualGraph(layer));
        if (returnId) return visualGraphId
        return this
    }
    exposeLayer (){return this.current}
    deleteGraph() {
        if (this.stage == null) return false ;
        this.current?.destroy();
    }
    switchTo(visualGraphId : string , options : {createIfDoesNotExist : boolean} = {createIfDoesNotExist:false}) : VisualGraph|undefined{
        if (this.stage == null) return undefined ;
        if (this.current !== null)  this.current.hide()
        this.current = this.stage.find("Layer")?.find((layer) => layer.attrs.id === visualGraphId) as Konva.Layer
        if (!this.current) {
            if (options.createIfDoesNotExist) return undefined
            this.newGraph(visualGraphId)
            return this.switchTo(visualGraphId);
        }
        this.current.show()
        this.current.moveToTop()
        this.stage.batchDraw();
        return this.visual_graphs.get(visualGraphId);
    }
    use(visualGraphId:string = "$"){
        return (visualGraphId !== "$")
            ? this.switchTo(visualGraphId)
            : this.current
            ? this.visual_graphs.get(this.current?.getAttr("id"))
            : undefined
    }

    clear(){
        if (this.current == null)  return
        this.current.destroyChildren()
    }
    stageScale (newScale : number|undefined){
        if (!this.stage) return {x:1,y:1};
        if (typeof newScale == "undefined") return this.stage.scale() || {x:1,y:1};
        this.stage.scaleX(newScale);
        this.stage.scaleY(newScale);
        return {x:newScale , y:newScale};
    }
    forEachVisualNode ({toggleTextVisibility=undefined}:IforEachVisualNode){
        if (toggleTextVisibility !== undefined)
            this.current?.find("Text")
                .map(textNode =>  (textNode.attrs.id.startsWith(NodeAutoAction))
                    ? textNode.visible(toggleTextVisibility)
                    : undefined
                )
        this.current?.draw()
    }
    forEachVisualEdge ({toggleWeightTextVisibility=undefined}:IforEachVisualEdge){
        if (toggleWeightTextVisibility !== undefined)
            this.current?.find("Text")
                .map(textNode =>  (textNode.attrs.id.startsWith(EdgeAutoAction))
                    ? textNode.visible(toggleWeightTextVisibility)
                    : undefined
                )
        this.current?.draw()
    }
    updateLabelsSize (newsize : number) {
        if (!this.stage) return
        this.current?.find("Text").map(textNode => {
            const text= textNode as Konva.Text
            if (text.attrs.id.startsWith(NodeAutoAction) ) text.fontSize(newsize)
        })
        this.current?.draw()
    }
    updateNodeSize (newsize : number) {
        if (!this.stage) return
        this.current?.find("Circle").map(circleNode => {
            const circle= circleNode as Konva.Circle
            if (circle.attrs.id.startsWith(NodeAutoAction) ) {
                circle.width(newsize)
                circle.height(newsize)
                const text = this.current?.find("Text").find(text=>text.attrs.id == circle.attrs.id) as Konva.Text
                text.y(newsize+20)
                circle.getParent().draw();
            }
        })

    }
    updateEdgewidth (newwidth : number) {
        if (!this.stage) return
        this.current?.find("Arrow").map(textNode => {
            const arrow= textNode as Konva.Arrow
            newwidth = Math.min(Math.max(2,newwidth),7)
            if ( arrow.attrs.id.startsWith(EdgeAutoAction) ) {
                arrow.strokeWidth(newwidth)
            }
        })
        this.current?.draw()
    }
    updateEdgeWeightSize(newSize:number) {
        if (!this.stage) return
        this.current?.find("Text").map(weightText => {
            weightText = weightText as Konva.Text
            if ( weightText.attrs.id.startsWith(EdgeAutoAction) ) {
                weightText.setAttr("fontSize",newSize)
            }
        })
    }
    /*import(json:string){

        const id = this.newGraph(undefined,{returnId:true}) as string
        let targetLayer = this.stage?.find("Layer").find(node => node.attrs.id === id);




    }
    createLayerChildren(nodeData: any): Konva.Node {

        const createGroup = (nodeData: any): Konva.Group => {
            const group = Konva.Group.create(nodeData);
            if (nodeData.children) {
                nodeData.children.forEach((childNodeData:any) => {
                    const childNode = this.createLayerChildren(childNodeData);
                    group.add(childNode);
                });
            }
            return group;
        }

        function createText(nodeData:any): Konva.Text {
            return Konva.Text.create(nodeData);
        }

        function createCircle(nodeData:any): Konva.Circle {
            return Konva.Circle.create(nodeData);
        }

        function createArrow(nodeData:any): Konva.Arrow {
            return Konva.Arrow.create(nodeData);
        }

        switch (nodeData.className) {
            case 'Group':
                return createGroup(nodeData);
            case 'Text':
                return createText(nodeData);
            case 'Circle':
                return createCircle(nodeData);
            case 'Arrow':
                return createArrow(nodeData);
            // Add more cases for other types if needed
            default:
                throw new Error(`Unknown node type: ${nodeData.className}`);
        }
    }*/
    import(graphId:string , layerData:string){
        const id =  graphId || AutoAction+'/visual/'+(VisualGraphsManager.id++).toString()
        if (this.stage == null) return  ;
        const layer = Konva.Node.create(JSON.parse(layerData), 'Layer');
        layer.setAttr("id",id)
        this.stage.add(layer)
        this.visual_graphs.set(id, new VisualGraph(layer));
        return (layer as Konva.Layer)
    }
    export () {
        return this.current?.toJSON()
    }






}