import {GCMType} from "./GCMType.ts";
import {GrapholioManager} from "../GrapholioManager/GrapholioManager.ts";
const natural_props = ["manager","highlight","neighbors"]
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
        if (natural_functions.includes(property) || natural_props.includes(property) || property === "id" ) throw new Error(property+ " is not defined or is not reasignable")
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
    highlight(){
        const id = this.properties["id"] as string
        return {

            on: ()=>this.manager.HighlightNode(id,{turn:"on"} ),
            off: ()=>this.manager.HighlightNode(id,{turn:"off"} ),
        }
    }
}