import {
    Accoradations,
    EdgeAutoAction,
    enumsMakerSeperator,
    //GraphFastControlId,
    NodeAutoAction,
    NodeFastControlId,
    OperationDash
} from "../../../Constants.ts";
import {GrapholioManager} from "../../../Logic/GrapholioManager/GrapholioManager.ts";

export type ContextualEnums = VisualNode | VisualEdge | NodeFastControl | EdgeFastControl | GraphFastControl
export type ContextualEnumsTypes = typeof VisualNode | typeof VisualEdge | typeof NodeFastControl | typeof EdgeFastControl | typeof GraphFastControl
export enum VisualNode {
    CONNECT = NodeAutoAction + enumsMakerSeperator + "connect" ,
    REMOVE = NodeAutoAction + enumsMakerSeperator + "remove" ,
    RENAME = NodeAutoAction + enumsMakerSeperator + "rename" ,
    DETAILS = NodeAutoAction + enumsMakerSeperator + "details" ,
}
export enum VisualEdge {
    WEIGHT = EdgeAutoAction + enumsMakerSeperator + "weight",
    CURVE = EdgeAutoAction + enumsMakerSeperator + "curve",
    REMOVE  = EdgeAutoAction + enumsMakerSeperator + "remove",
    DIRECTED = EdgeAutoAction + enumsMakerSeperator + "directed",
    DETAILS = EdgeAutoAction + enumsMakerSeperator + "details",
}
export enum NodeFastControl {
    //CREATE_ONE= NodeFastControlId + enumsMakerSeperator + 'create one',
    //CREATE_TEN = NodeFastControlId + enumsMakerSeperator + 'crate ten',
    //DETAILS = NodeFastControlId + enumsMakerSeperator + "details",
    COMINGSOON = NodeFastControlId + enumsMakerSeperator + "Coming in the next versions",

}
export enum EdgeFastControl {
    //CREATE_ALL= NodeFastControlId + enumsMakerSeperator + 'create all',
    //REMOVE_ALL = NodeFastControlId + enumsMakerSeperator +  'remove all' ,
    COMINGSOON = NodeFastControlId + enumsMakerSeperator + "Coming in the next versions",
}
export enum GraphFastControl {
    //MAKE_CONNEXE = GraphFastControlId + enumsMakerSeperator +  "make connexe ",
    //RANDOM_GRAPH = GraphFastControlId + enumsMakerSeperator +   "create random graph",
    //CUSTOM_GRAPH  = GraphFastControlId + enumsMakerSeperator +   "create custom graph"
    COMINGSOON = NodeFastControlId + enumsMakerSeperator + "Coming in the next versions",
}
export type ContextualElement = {
    title : ContextualEnums  ,
    action : ()=>any,
}


export const MenuClickEvent = (manager : GrapholioManager , act : ContextualEnums, elementId:string|undefined)=> {
    switch (act) {
        case VisualNode.CONNECT : if (elementId) { manager.clickNode(elementId)}  break
        case VisualNode.REMOVE  : if (elementId) {
            manager.useOperations()?.setAccordation(current=>{
                current.Accordation = undefined
                current.Item = undefined
                return current
            })
            manager.removeNode(elementId)

        } break
        case VisualNode.RENAME : if (elementId){manager.updateNodeLabel(elementId)} break
        case VisualNode.DETAILS : if (elementId) {
            manager.useOperations()?.setAccordation(current=>{
                current.Accordation = Accoradations.DETAILS
                current.Item = elementId
                return current
            })
            manager.useOperations()?.operateOn(OperationDash.NODES)
        } break
        case VisualEdge.CURVE : if (elementId){manager.dblClickEdge(elementId)} break
        case VisualEdge.REMOVE : if (elementId) {manager.removeEdgeById(elementId)} break
        case VisualEdge.WEIGHT : if (elementId) {manager.updateEdgeWeight(elementId)} break
        case VisualEdge.DIRECTED : if (elementId) {manager.toggleEdgeIsDirected(elementId)} break
        case VisualEdge.DETAILS : if (elementId) {
            manager.useOperations()?.setAccordation(current=>{
                current.Accordation = Accoradations.DETAILS
                current.Item = elementId
                return current
            })
            manager.useOperations()?.operateOn(OperationDash.EDGES)
        } break
    }

}