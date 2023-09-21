import {Icontextual} from "./Pages/Application/BlackBoard/test.Contextual.tsx";

export const AutoAction = "__grapholio__auto__action__";
export const Separator = "/"
export const BlackBoard_Id = AutoAction+"stage_v2.1"+Separator;
export const NodeAutoAction = AutoAction+"node_v2.1"+Separator;
export const EdgeAutoAction = AutoAction+"edge_v2.1"+Separator;
export const GraphAutoAction = AutoAction+"graph_v2.1"+Separator;
export const naturalDashboardWidth = "33%";
export const CodeDashboardWidth = "50%";
export const MovingArrow_Id = EdgeAutoAction+"MovingArrow"
export const ContextualDivId = AutoAction+"contextual_v2.1"+Separator
export const NodeFastControlId = NodeAutoAction + "NodeFastControlId"
export const EdgeFastControlId = NodeAutoAction + "NodeFastControlId"
export const GraphFastControlId = NodeAutoAction + "NodeFastControlId"
export const enumsMakerSeperator = Separator+"enum"+Separator



export type Application = {
    appChange : number ,
    apply : ()=>void
}
export type GivosContext = {
    code : string ,
    write : (code : string)=>void
}
export type BlackBoardMenu = {
    props : Icontextual,
    setProps : (props: Icontextual)=>void
}
export type Operations = { // exported to use in the manager
    operationDash : OperationDash ,
    operateOn : (operation : OperationDash)=> void,
    RequestValue : number,
    SentUpdateRequest : ()=>void,
    visualItem : string | undefined,
    setVisualItem: (item:string)=>void,
    accordation :AccordationsOptions
    setAccordation :  React.Dispatch<React.SetStateAction<AccordationsOptions>>

}

export enum OperationDash {
     NODES = "Nodes",
     EDGES = "edges",
    CODE = "code",
    INFO = "info",
    NOOP = "please create a graph"

}

export enum Accoradations {
    INFO = "INFO",
    DETAILS = "DETAILS",
}
export type AccordationsOptions ={
    Accordation? : Accoradations,
    Item? : string ,
    Type? : "node" | "edge" | "graph"
}

export const resizeEventIdSaver = {
    Container : "container_id",
    Flex : "flex_id",
    Operation : "operation_id"
}


export const AllowselfLoops = {allowSelfLoops:true};
export const MultiGraph = {multi:true};

export const NoSelfLoops = {allowSelfLoops:false};
export const NoMultiGraph = {multi:false};
export const Directed = {type: "directed"}
export const UnDirected = {type: "undirected"}
export const Mixed = {type: "mixed"}


export enum DashboardNodes {
    InfoTable = "information table" ,
    Attributes = "Attributes",
}


export const DefaultLabelText=()=> parseInt(localStorage.getItem(AutoAction + Separator + "DefaultLabelText") ?? '25');

export const DefaultWeightText=()=>   parseInt(localStorage.getItem(AutoAction+Separator+"DefaultWeightText") ?? "20")
export const DefaultNodeSize=()=>   parseInt(localStorage.getItem(AutoAction+Separator+"DefaultNodeSize") ?? "30")
export const DefaultEdgeStrokeWidth=()=>   parseInt(localStorage.getItem(AutoAction+Separator+"DefaultEdgeStrokeWidth") ?? "03")