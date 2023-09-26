import {GCMType} from "./GCMType.ts";
import {GrapholioManager} from "../GrapholioManager/GrapholioManager.ts";
const natural_props = ["manager","highlight"]
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
        const id = this.properties["id"] as string
        this.manager.updateNodeAttr(id, property,value);
        return true;
    }
    highlight(){
        const id = this.properties["id"] as string
        return {

            on: ()=>this.manager.HighlightNode(id,{turn:"on"} ),
            off: ()=>this.manager.HighlightNode(id,{turn:"off"} ),
        }
    }
}