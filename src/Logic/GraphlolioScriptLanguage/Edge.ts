import {GCMType} from "./GCMType.ts";
import {GrapholioManager} from "../GrapholioManager/GrapholioManager.ts";
const natural_props = ["extremities","manager","target","source","highlight","is_directed"]
const natural_functions:string[] = ["properties"]
export class Edge extends GCMType {
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
        return this.manager.getCurrentGraph()?.getEdgeAttribute(this.properties["id"], property)
    }
    setProperty(_target: any, property: string, value: any): boolean {
        if (natural_functions.includes(property) || natural_props.includes(property) || property === "id" ) throw new Error(property+ " is read only")
        const id = this.properties["id"] as string

        this.manager.updateEdgeAttr(id, property,value);
        return true;
    }

    extremities(){
        return this.manager.getCurrentGraph()?.extremities(this.properties["id"]);
    }
    source(){
        return this.manager.getCurrentGraph()?.source(this.properties["id"]);
    }
    target(){
        return this.manager.getCurrentGraph()?.target(this.properties["id"]);
    }
    is_directed(){
        return this.manager.getCurrentGraph()?.isDirected(this.properties["id"]);
    }
    highlight(){
        const id = this.properties["id"] as string
        return {
            on: ()=>this.manager.HighlightEdge(id ,{turn:"on"} ),
            off: ()=>this.manager.HighlightEdge(id ,{turn:"off"} ),
        }
    }



}