import Konva from "konva";
import {MathCalculation_Update2dPointsLink} from "../Shared.ts";
import {
    DefaultEdgeStrokeWidth,
    EdgeAutoAction,
    NodeAutoAction
} from "../../Constants.ts";

export type NodeVisualIdentity = {
    id:string
    label:string,
    x:number,
    y:number,
    color : string,
    size : number,
    text_size : number

}
export type EdgeVisualIdentity = {
    id :string,
    source : string,
    target : string,
    pointer : boolean ,
    color : string,
    weight? : number,
    text_size? : number,
}
type coords = {
    x: number ,
    y : number,
}

export class VisualGraph {
    public static id = 1 ;
    private layer : Konva.Layer
    constructor(layer : Konva.Layer) {
        this.layer = layer ;
    }

    addNode (node : NodeVisualIdentity){

      if (!node.x) node.x =  50+parseInt(String((Math.random() * 1000) % 300))
      if (!node.y) node.y =  50+parseInt(String((Math.random() * 1000) % 300))
      const group = this._NodeGroup(node.id,node.x,node.y);
      const circle = this._Node(node.id,node.color,node.size);
      group.add(circle)
      const text = this._nodeText(node.id , node.label,node.color,node.text_size , circle);
      group.add(text)

      this.layer.add(group)
      this.layer.draw()
      return {group , circle,text};
    }
    removeNode(nodeId:string){
        const node = this.getNode(nodeId);
        if (node == undefined) return
        node.parent?.remove()
        this.layer.draw()
    }

    getNode(nodeId:string){
        return this.layer.find("Circle").find((node:any)=>node.attrs.id === nodeId)
    }
    getNodeText(nodeId:string){
        return this.layer.find("Text").find((node:any)=>node.attrs.id === nodeId)
    }

    addEdge(edge : EdgeVisualIdentity) :  {Edge:any, weight:any}{
        const circles = this.layer.find("Circle");
        const node1_ = circles?.find((circle) => circle.attrs.id === edge.source) as Konva.Circle
        const node2_ = circles?.find((circle) => circle.attrs.id === edge.target) as Konva.Circle
        const node1_pos = node1_?.getAbsolutePosition();
        const node2_pos = node2_?.getAbsolutePosition();
        const radius = {
            node1 : node1_?.radius() ,
            node2 : node2_?.radius() ,
        }
        if (node1_pos == null || node2_pos == null ||!radius.node1 || !radius.node2) return  {Edge:undefined, weight:undefined}
        const {arrowStart,arrowMiddle,arrowEnd} = MathCalculation_Update2dPointsLink({node1_pos,node2_pos},radius,undefined)
        if(!edge.color ) edge.color = "#FFFFFF"

        const Edge = this._Arrow(edge,arrowStart,arrowMiddle,arrowEnd)

        Edge.setAttr("node1",edge.source)
        Edge.setAttr("node2",edge.target)
        this.layer.add(Edge)

        const weight = this._WeightText(edge,Edge)
        this.layer.add(weight)

        this.layer.draw()

        return {Edge:Edge, weight:weight};
    }
    HighlightNode (nodeId : string , {turn} : {turn : string} ) {
        const highlighter =  this.layer
            .find("Circle")
            .find((node:any)=>((node.attrs.for === nodeId) && (node.attrs.id === NodeAutoAction+"highlight")))
        if (turn == "off") {
            highlighter?.destroy()
            return
        }

        if (highlighter) return

        const circle = this.getNode(nodeId) as Konva.Circle
        if (circle == undefined ) return
        const Highlighter = new Konva.Circle({
            id : NodeAutoAction+"highlight",
            for : nodeId,
            x:  0,
            y:  0,
            radius: circle.radius() * 2, // Twice as big as the base circle
            fill: 'yellow', // Replace with your desired highlight color
            opacity : 0.5
        });
        circle.getParent().add(Highlighter)
        Highlighter.moveToBottom()
        this.layer.draw()
    }
    HighlightEdge (edgeId : string , t? : {turn : string} ) {
        const highlighter =  this.layer
            .find("Line")
            .find((node:any)=>((node.attrs.for === edgeId) && (node.attrs.id === EdgeAutoAction+"highlight")))

        if (t?.turn == "off") {
            highlighter?.destroy()
        }
        if ( t?.turn == "on") {
            const arrow = this.getEdgeById(edgeId) as Konva.Arrow
            if (arrow == undefined) return
            const highlighterLine = new Konva.Line();
            highlighterLine.points(arrow.points())
            highlighterLine.attrs.id = EdgeAutoAction + "highlight"
            highlighterLine.attrs.for = edgeId
            highlighterLine.attrs.pointer = false;
            highlighterLine.stroke("yellow")
            highlighterLine.strokeWidth(arrow.strokeWidth() * 3)
            highlighterLine.tension(0.5)

            this.layer.add(highlighterLine)
            highlighterLine.moveToTop()
            this.layer.draw()
        }
        return (
            {isOn: () => (highlighter !== undefined)}
        )
    }
    removeEdgeById(edgeId : string){
        const edge = this.getEdgeById(edgeId)
        const weight = this.getEdgeWeight(edgeId)
        if (edge) edge.destroy()
        if (weight) weight.destroy()
        this.layer.draw()
    }
    removeEdgesByNodeAdjecency(){}

    getEdgeById (edge: string) {
        return  this.layer.find("Arrow").find((arrow) => arrow.attrs.id == edge) as Konva.Arrow
    }

    getEdgeWeight(id: string) {
        return  this.layer.find("Text").find((arrow) => arrow.attrs.id == id) as Konva.Text
    }



    _NodeGroup(id:string , x:number,y:number){
        return  new Konva.Group({
            id: id,
            x: x,
            y: y,
            draggable:true,

        });
    }
    _Node (id:string,color:string|undefined,size:number){
        return new Konva.Circle({
            id:id,
            x:0,
            y:0,
            width:size,
            height:size,
            fill: color ,
        })
    }
    _nodeText(id:string,display_name:string,color:string | undefined,size:number=20 , circle:Konva.Circle){
        const _y = circle.width()+20
        const text:Konva.Text  = new Konva.Text({
            id:id,
            text:display_name,
            fill:color ,
            x: 0,
            y: _y ,
            offsetX: 0,
            offsetY:0,
            fontSize:size,
            draggable:true,


        })
        text.offsetX(text.width()/2)
        text.offsetY(text.height()/2)
        return text;
    }
    _Arrow(edge:EdgeVisualIdentity,arrowStart:coords,arrowMiddle:coords,arrowEnd:coords){
        arrowMiddle.x = arrowMiddle.x+1 //meaningless line

        const scale = this.layer?.getStage()?.scale() || {x:1,y:1}
        return  new Konva.Arrow({
            id: edge.id,
            node1 : edge.source,
            node2 : edge.target,
            tension: 0.5,
            points:[
                arrowStart.x / scale.x,
                arrowStart.y / scale.y ,
                arrowEnd.x / scale.x ,
                arrowEnd.y / scale.y ,
            ],
            stroke:edge.color,
            strokeWidth: DefaultEdgeStrokeWidth(),
            pointerWidth:edge.pointer ? 6 : 0,
        })

    }
    _WeightText(edge: EdgeVisualIdentity,arrow:Konva.Arrow){

        const points = arrow.points()
        const V2dp   = {
            node1_pos: {x:points[0],y:points[1]},
            node2_pos: {x:points[points.length -2],y:points[points.length -1]}
        }
        const middlePoints = (points.length === 4 ) ? {
            x: (V2dp.node1_pos.x + V2dp.node2_pos.x) / 2, // I want to change this
            y: (V2dp.node1_pos.y + V2dp.node2_pos.y) / 2,// I want to change this
        }   : {
            x: points[2],
            y: points[3],
        }
        const  dx = V2dp.node2_pos.x - V2dp.node1_pos.x;
        const  dy = V2dp.node2_pos.y - V2dp.node1_pos.y;
        const  angle = Math.atan2(dy, dx);
        const  px = middlePoints.x + 20 * Math.sin(angle);
        const  py = middlePoints.y - 20 * Math.cos(angle);

        const text:Konva.Text  = new Konva.Text({
            id:edge.id,
            text:""+(edge.weight||1).toString()+"",
            fill:'yellow' ,
            stroke:"yellow",
            strokeWidth: 0.5,
            x: px ,
            y: py,

            fontSize:edge.text_size,


        })

        return text;
    }






}



export function getRandomHexColor(): string {
    const minBrightness = 50// Adjust this value to control the minimum brightness

    const getRandomComponent = () => Math.floor(Math.random() * (256 - minBrightness) + minBrightness);

    const red = getRandomComponent().toString(16).padStart(2, '0');
    const green = getRandomComponent().toString(16).padStart(2, '0');
    const blue = getRandomComponent().toString(16).padStart(2, '0');

    return `#${red}${green}${blue}`;
}

