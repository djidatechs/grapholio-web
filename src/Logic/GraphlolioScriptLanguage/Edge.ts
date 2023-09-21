import {GCMType} from "./GCMType.ts";
import {GrapholioManager} from "../GrapholioManager/GrapholioManager.ts";

export class Edge extends GCMType {
    constructor(id:string,manager:GrapholioManager) {
        super(id,manager)
    }
    getProperty(_target: any, property: string): unknown {
        return this.manager.getCurrentGraph()?.getEdgeAttribute(this.properties["id"], property)
    }
    setProperty(_target: any, property: string, value: any): boolean {
        const id = this.properties["id"] as string
        this.manager.updateEdgeAttr(id, property,value);
        return true;
    }
}