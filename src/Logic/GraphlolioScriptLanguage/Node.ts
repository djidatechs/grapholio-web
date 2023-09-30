import {GCMType} from "./GCMType.ts";
import {GrapholioManager} from "../GrapholioManager/GrapholioManager.ts";
const natural_props = ["manager","highlight","x","y","in_neighbors","out_neighbors","degree","neighbors"]
const natural_functions:string[] = ["properties"]
export class Node extends GCMType {

    constructor(id:string,manager:GrapholioManager) {
        super(id,manager)
    }

    getProperty(_target: any, property: string): unknown {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (natural_functions.includes(property))  return this[property]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (natural_props.includes(property)) return this[property]()
        return this.manager.getCurrentGraph()?.getNodeAttribute(this.properties["id"], property)
    }
    setProperty(_target: any, property: string, value: any): boolean {
        if ( !(property === "x" ||property === "y") && ( natural_functions.includes(property) || natural_props.includes(property) || property === "id" )) throw new Error(property+ " is read only")
        const id = this.properties["id"] as string
        this.manager.updateNodeAttr(id, property,value);
        return true;
    }
    neighbors() : Node[]{
        const useNode1 = this.properties["id"] as string
        const nghs =  this.manager.getCurrentGraph()?.neighbors(useNode1);
        if (!nghs) return []
        return nghs.map(id =>  new Node(id, this.manager).getProxy());
    }
    in_neighbors() : Node[]{
        const useNode1 = this.properties["id"] as string
        const nghs =  this.manager.getCurrentGraph()?.inNeighbors(useNode1);
        if (!nghs) return []
        return nghs.map(id =>  new Node(id, this.manager).getProxy());
    }
    out_neighbors() : Node[]{
        const useNode1 = this.properties["id"] as string
        const nghs =  this.manager.getCurrentGraph()?.outNeighbors(useNode1);
        if (!nghs) return []
        return nghs.map(id =>  new Node(id, this.manager).getProxy());
    }
    highlight(){
        const id = this.properties["id"] as string
        return {

            on: ()=>this.manager.HighlightNode(id,{turn:"on"} ),
            off: ()=>this.manager.HighlightNode(id,{turn:"off"} ),
        }
    }
    x(){
        const id = this.properties["id"] as string
        return this.manager?.blackboard.use()?.getNode(id)?.position().x
    }
    y(){
        const id = this.properties["id"] as string
        return this.manager?.blackboard.use()?.getNode(id)?.position().y
    }
    degree(){
        const id = this.properties["id"] as string
        return ({
            in : this.manager?.getCurrentGraph()?.inDegree(id) ,
            out : this.manager?.getCurrentGraph()?.outDegree(id),
            all : this.manager?.getCurrentGraph()?.degree(id) ,
        })
    }
}