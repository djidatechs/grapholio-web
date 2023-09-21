import {GCMType} from "./GCMType.ts";
import {GrapholioManager} from "../GrapholioManager/GrapholioManager.ts";

export class Node extends GCMType {

    constructor(id:string,manager:GrapholioManager) {
        super(id,manager)
    }

    getProperty(target: any, property: string): unknown {
        console.log(target)
        return this.manager.getCurrentGraph()?.getNodeAttribute(this.properties["id"], property)
    }
    setProperty(target: any, property: string, value: any): boolean {
        console.log(target)
        const id = this.properties["id"] as string
        this.manager.updateNodeAttr(id, property,value);
        return true;
    }
}