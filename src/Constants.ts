import {Icontextual} from "./Pages/Application/BlackBoard/test.Contextual.tsx";

export const AutoAction = "A";
export const Separator = "_"
export const BlackBoard_Id = AutoAction+"stage_v2.1"+Separator;
export const NodeAutoAction = AutoAction+"n"+Separator;
export const EdgeAutoAction = AutoAction+"e"+Separator;
export const GraphAutoAction = AutoAction+"g"+Separator;
export const naturalDashboardWidth = "33%";
export const CodeDashboardWidth = "50%";
export const MovingArrow_Id = EdgeAutoAction+"MovingArrow"
export const ContextualDivId = AutoAction+"contextual"+Separator
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

export const DefaultWeightText=()=>   parseInt(localStorage.getItem(AutoAction+Separator+"DefaultWeightText") ?? "23")
export const DefaultNodeSize=()=>   parseInt(localStorage.getItem(AutoAction+Separator+"DefaultNodeSize") ?? "30")
export const DefaultEdgeStrokeWidth=()=>   parseInt(localStorage.getItem(AutoAction+Separator+"DefaultEdgeStrokeWidth") ?? "03")




export const allowed_nodes = ["Program",
    "FunctionDeclaration",
    "FunctionExpression",
    "VariableDeclaration",
    "ExpressionStatement",
    "BlockStatement",
    "IfStatement",
    "SwitchStatement",
    "WhileStatement",
    "DoWhileStatement",
    "ForStatement",
    "ForInStatement",
    "ForOfStatement",
    "CommentLine",
    "CommentBlock",
    "ReturnStatement",
    "BreakStatement",
    "ContinueStatement",
    "EmptyStatement",
    "VariableDeclarator",
    "AssignmentExpression",
    "BinaryExpression",
    "UnaryExpression",
    "UpdateExpression",
    "LogicalExpression",
    "ConditionalExpression",
    "CallExpression",
    "NewExpression",
    "MemberExpression",
    "Identifier",
    "Literal",
    "ArrayExpression",
    "ObjectExpression",
    "Property",
    "FunctionDeclaration",
    "ArrowFunctionExpression"]



export function colorToHex(colorName:string) {
    const colors  = {
        black: '#000000',
        white: '#FFFFFF',
        red: '#FF0000',
        green: '#00FF00',
        blue: '#0000FF',
        yellow: '#FFFF00',
        cyan: '#00FFFF',
        magenta: '#FF00FF',
        silver: '#C0C0C0',
        gray: '#808080',
        maroon: '#800000',
        olive: '#808000',
        purple: '#800080',
        teal: '#008080',
        navy: '#000080',
        lime: '#00FF00'
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return colors[colorName.toLowerCase()] || colorName;
}


export type circlePos = {
    center? : {x?:number,y?:number},
    radius : number,
}
export  type rectanglePos = {
    topLeft?: {x?:number,y?:number} // Top left corner coordinates of the rectangle
    width?: number; // Width of the rectangle
    height?: number; // Height of the rectangle
}

