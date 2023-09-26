import {GCMType} from "./GCMType.ts";
import {GrapholioManager} from "../GrapholioManager/GrapholioManager.ts";
const natural_props = ["extremities","manager","highlight"]
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
        const id = this.properties["id"] as string
        this.manager.updateEdgeAttr(id, property,value);
        return true;
    }

    extremities(){
        return this.manager.getCurrentGraph()?.extremities(this.properties["id"]);
    }
    highlight(){
        return {
            on: ()=>this.manager.HighlightEdge(this.id(),{turn:"on"} ),
            off: ()=>this.manager.HighlightEdge(this.id(),{turn:"off"} ),
        }
    }
    id(){return this.properties["id"] as string}


}