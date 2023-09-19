import {
    IforEachVisualEdge,
    IforEachVisualNode,
    VisualGraphsManager
} from "../GraphInCanvasImplementations/VisualGraphsManager.ts";
import {
    AutoAction,
    BlackBoardMenu, DefaultLabelText, DefaultNodeSize, DefaultWeightText,
    EdgeAutoAction,
    NodeAutoAction,
    OperationDash,
    Operations
} from "../../Constants.ts";
import Graph from "graphology"
import {Attributes, GraphOptions, SerializedGraph} from "graphology-types";
import {
    EdgeVisualIdentity,
    getRandomHexColor,
    NodeVisualIdentity
} from "../GraphInCanvasImplementations/VisualGraph.ts";
import {VisualEventsHandler} from "../GraphInCanvasImplementations/VisualEventsHandler.ts";
import {CannotAddEdge, EdgeIdExist, ErrorMessage, NodeIdExist} from "./Messages.ts";
import {ContextualEnumsTypes} from "../../Pages/Application/BlackBoard/ContextualTypesEnums.ts";
import {generateCircleCoordinates, numberToAlphabet} from "../Shared.ts";
import Konva from "konva";

type Iimport = {
    graphology : SerializedGraph,
    canvas : string,

}
type Iinit = {
    container : HTMLDivElement,
    operations : Operations,
    blackBoardMenu :BlackBoardMenu
}


export class GrapholioManager {

    private static graphCount = 1;
    private static nodeCount = 1 ;
    private static edgeCount = 1 ;
    //private static edgeCount = 1 ;
    public blackboard = new VisualGraphsManager()
    private watch = new VisualEventsHandler()
    private graphSet:Map<string,Graph> | undefined = new Map<string,Graph>()
    private selected_graph_id : string | undefined ;
    private operations : Operations|undefined;
    private blackBoardMenu : BlackBoardMenu|undefined;



    init(init : Iinit ){
        const stage = this.blackboard.init(init.container as HTMLDivElement);
        this.watch.hookManager(this);
        this.operations = init.operations;
        this.blackBoardMenu = init.blackBoardMenu;
        this.watch.handleStage(stage);
    }
    useOperations(){
        return this.operations
    }

    handleFastControl(event: React.MouseEvent<HTMLSpanElement>, Enumeration: ContextualEnumsTypes) {
        this.watch.handleFastControl(event,Enumeration)
    }
    useBlackBoardMenu () {
        return this.blackBoardMenu
    }
    inject (){}

    newGraph(name :string = "Graph"+GrapholioManager.graphCount.toString() , options:GraphOptions){
        const graphId = AutoAction+ (GrapholioManager.graphCount++).toString()
        const g = new Graph(options);
        g.setAttribute("name",name);
        this.graphSet?.set(graphId,g);
        this.blackboard.newGraph(graphId);
        return graphId
    }
    getAllGraphsNames(){
        const array: any[] = [];
        this.graphSet?.forEach((v,k) => array.push({id : k , name : v.getAttribute("name")}))
        return array
    }
    selectedGraphId() {
        return this.selected_graph_id
    }
    switchTo(id:string|undefined){
        if (id === undefined) return
        this.selected_graph_id = id;
        this.blackboard.switchTo(id);
    }
    clear(){
        const g = this.getCurrentGraph()
        g?.clear();
        this.blackboard.clear();
    }
    clickNode (nodeId :string){
        this.watch.forceNodeClick(nodeId);
    }
    dblClickEdge(edgeId:string) {
        console.log("track dbclick edge")
        this.watch.forceEdgeDbClick(edgeId)
    }
    addNode (attrs : Attributes) {
        const g = this.getCurrentGraph()
        if (!g) return
        const count = GrapholioManager.nodeCount++
        const id = NodeAutoAction+(count).toString();
        if (!attrs.displayName ) attrs.displayName = count;
        if (!attrs.color) attrs.color =  getRandomHexColor()
        if (!attrs.size) attrs.size =  DefaultNodeSize()
        if (!attrs.textSize) attrs.textSize = DefaultLabelText()
        if (g.hasNode(id)) NodeIdExist()
        else g.addNode(id,attrs);
        const newNode = this.blackboard.use()?.addNode(this._getNodeVisualIdentity(id,attrs));
        this.watch.handleNode(newNode?.circle);
        this.watch.handleNodeText(newNode?.circle,newNode?.text);
        this.useOperations()?.SentUpdateRequest();
        return id
    }
    removeNode (nodeId : string) {
        const g = this.getCurrentGraph()
        if (!g) return
        try {
            g.edges(nodeId).map(edge=> {
                this.removeEdgeById(edge)
            });
            const node = this.blackboard.use()?.getNode(nodeId)
            this.watch.unwatchNode(node)
            node?.getParent().destroy()
            g.dropNode(nodeId)


        } catch {ErrorMessage("Either Node Does Not Exist Or There Is An Unknown Problem ")}
        this.blackboard.use()?.getNode(nodeId)?.destroy()
        this.useOperations()?.SentUpdateRequest();
        this.watch._MenuDown(undefined);
        return this
    }
    updateEdgeAttr(id: string , attr : string ,value : any){
    const g = this.getCurrentGraph()
    //logic & visual
    const user =  this.blackboard.use()
    if (attr === "weight") {
        g?.setEdgeAttribute(id,attr,parseInt(value));
        user?.getEdgeWeight(id).setAttr("text", parseInt(value))
    }
    if (attr === "weightTextSize") {
        g?.setEdgeAttribute(id,attr,parseInt(value));
        user?.getEdgeWeight(id).setAttr("fontSize", parseInt(value))
    }
    if (attr === "color") {
        g?.setEdgeAttribute(id,attr,value)
        user?.getEdgeById(id).setAttr("stroke", value)
    }
    this.useOperations()?.SentUpdateRequest();
    }
    updateNodeAttr (node :string ,attr : string , value : any) {
        const g = this.getCurrentGraph()

        //logic & visual
        if (attr === "displayName") {
            value = value||''
            g?.setNodeAttribute(node,attr,value)
            this.blackboard.use()?.getNodeText(node)?.setAttr("text", value)
        }

        else if (attr === "color") {
            g?.setNodeAttribute(node,attr,value)
            this.blackboard.use()?.getNode(node)?.setAttr("fill", value)
            this.blackboard.use()?.getNodeText(node)?.setAttr("fill", value)
        }

        else if (attr === "size" ) {

            value = Math.min(Math.max(3, value ), 60)
            g?.setNodeAttribute(node,attr,value);
            const circle = this.blackboard.use()?.getNode(node)
            const text =this.blackboard.use()?.getNodeText(node)
            if (!circle || !text) return
            circle.setAttr("width", parseInt(value))
            circle.setAttr("height", parseInt(value))

            //fix text
            const _y = (circle.width()+20) * (circle.getStage()?.scale()?.x||1)
            // Calculate the distance from the center of the circle
            text.offsetX(text.width()/2)
            text.offsetY(text.height()/2)

            const pos = text.position()

            const circleCenterX = circle.getAbsolutePosition().x
            const circleCenterY = circle.getAbsolutePosition().y
            const dx = pos.x - circleCenterX;
            const dy = pos.y - circleCenterY;

            // Calculate the angle of the dragged position relative to the circle center
            const angle = Math.atan2(dy, dx);

            // Ensure the text element stays at a fixed distance from the center
            const newX = circleCenterX + _y * Math.cos(angle);
            const newY = circleCenterY + _y * Math.sin(angle);
            this.blackboard.use()?.getNodeText(node)?.setAbsolutePosition({x:newX, y:newY});

        }

        else if (attr === "textSize" ) {
            g?.setNodeAttribute(node,attr,parseInt(value));
            this.blackboard.use()?.getNodeText(node)?.setAttr("fontSize", parseInt(value))
        }

        this.useOperations()?.SentUpdateRequest();

    }
    updateNodeLabel(textId:string) {
        const text= this.blackboard.use()?.getNodeText(textId) as Konva.Text | undefined
        if (!text) return
        this.watch._nodeTextDoubleClick(text)
        this.watch._MenuDown(text)
        this.useOperations()?.SentUpdateRequest()
    }
    updateEdgeWeight(id:string){
        const text=this.blackboard.use()?.getEdgeWeight(id);
        if (!text) return
        this.watch._edgeWeightDoubleClick(text);
        this.watch._MenuDown(text)
        this.useOperations()?.SentUpdateRequest()

    }
    toggleEdgeIsDirected(edgeId: string) {
        const g = this.getCurrentGraph();
        if (!g) return;
        const attrs = g.getEdgeAttributes(edgeId)
        attrs.pointer = g.isUndirected(edgeId) ; //this is the toggle
        const source =g.source(edgeId)
        const target =g.target(edgeId)
        console.log({source,target,attrs})
        this.removeEdgeById(edgeId);
        this.addEdge(source , target ,attrs )

    }

    addEdge (node1:string,node2:string,attrs : Attributes,showError:boolean=true){
        const g = this.getCurrentGraph()
        if (!g) return
        const id = EdgeAutoAction+(GrapholioManager.edgeCount++).toString();
        if (g.hasEdge(id)) return EdgeIdExist();
        attrs.id = id
        if(! attrs.weight)  attrs.weight = 1 // todo : remove ? from EdgeVIsualIdentity and make the constant canvas variable weight text size
        if(!attrs.color) attrs.color = "#FFFFFF"
        if( ! attrs?.weightTextSize)  attrs.weightTextSize = DefaultWeightText()
        console.log({atttttttttt: attrs.color})
        try {
            this.DetailedEdgeAddingCases(g, attrs, id, node1, node2);
        }
        catch {
            return showError ? CannotAddEdge() : null
        }
        const {Edge, weight} = this.blackboard.use()?.addEdge(this._getEdgeVisualIdentity(id,node1,node2,attrs)) || {Edge:undefined, weight:undefined}
        this.watch.handleEdge(Edge);
        this.watch.handleEdgeWeightText(weight);
        this.useOperations()?.SentUpdateRequest();
        return id;
    }
    addRandomEdge() {
        function local_getRandomNode(nodes : string[]) {
        const randomIndex = Math.floor(Math.random() * nodes.length);
        return nodes[randomIndex];
        }
        const g = this.getCurrentGraph()
        if (!g) return
        const node1 = local_getRandomNode(g?.nodes())
        const node2 = local_getRandomNode(g?.nodes())
        this.addEdge(node1,node2,{ color: "#FFFFFF",  weight : 1},false);
    }
    private DetailedEdgeAddingCases(g:Graph, attrs: Attributes, id: string, node1: string, node2: string) {
        if (g?.type === "mixed") {
            if (attrs.pointer === false) g?.addUndirectedEdgeWithKey(id, node1, node2, attrs);
            else {
                attrs.pointer = true;
                g?.addDirectedEdgeWithKey(id, node1, node2, attrs);
            }
        } else {
            attrs.pointer = (g?.type === "directed");
            g?.addEdgeWithKey(id, node1, node2, attrs);
        }
    }
    removeEdgeById(edgeId:string){
        const g = this.getCurrentGraph()
        if (!g) return
        console.log(g.hasEdge(edgeId))
        g.dropEdge(edgeId);
        this.watch.unwatchEdge(this.blackboard.use()?.getEdgeById(edgeId));
        this.blackboard.use()?.removeEdgeById(edgeId);
        this.watch._MenuDown(undefined)

    }
    removeEdgesByNodeAdjecency(node1:string,node2:string){
        const g = this.getCurrentGraph()
        if (!g) return
        const edges = g.edges(node1,node2);
        g.dropEdge(node1,node2);
        edges.map(edgeId=>this.blackboard.use()?.removeEdgeById(edgeId))

    }
    forEachVisualNode(props:IforEachVisualNode){
        this.blackboard.forEachVisualNode(props)
    }
    forEachVisualEdge(props:IforEachVisualEdge){
        this.blackboard.forEachVisualEdge(props)
    }

    zoomPlus(){
        const newScale = Math.min (2 , this.blackboard.stageScale(undefined).x + 0.1)
        this.blackboard.stageScale(newScale);
    }
    zoomMinus(){
        const newScale = Math.max (0.2 , this.blackboard.stageScale(undefined).x -0.1)
        this.blackboard.stageScale(newScale);
    }
    HighlightNode(nodeId : string , {turn} : {turn : string} ) {
        this.blackboard.use()?.HighlightNode(nodeId, {turn} );

    }
    HighlightEdge(nodeId : string , {turn} : {turn : string} ) {
        this.blackboard.use()?.HighlightEdge(nodeId, {turn} );

    }



    getCurrentGraph (){
        return this.graphSet?.get(this.selected_graph_id||'$')
    }
    import (json:string) {
        const loadedData : Iimport = JSON.parse(json);
        let g = new Graph();
        const graphId = AutoAction+ (GrapholioManager.graphCount++).toString()
        g = g.import(loadedData.graphology)
        this.graphSet?.set(graphId,g)
        const layer = this.blackboard.import(graphId,loadedData.canvas)
        if (!layer) return
        this.watch.handleImportedGraph(layer)
        this.switchTo(graphId);
        this.useOperations()?.operateOn(OperationDash.INFO)
    }
    export () {
        const g = this.getCurrentGraph();
        if (!g) return
        const graphology = g.export();
        console.log({graphology})
        const canvas = this.blackboard.export();
        if (!canvas) return
        console.log({canvas})
        const exportation :Iimport = {
            graphology,
            canvas
        }
        console.log(JSON.stringify(exportation))
        return {
            fileName: g.getAttribute("name"),
            result :JSON.stringify(exportation)
        }


    }


    updateLabelsSize(newsize:number){
        //later add the logic part of it (graphology attrs)
        newsize = newsize ||0
        this.blackboard.updateLabelsSize(newsize)
    }
    updateNodeSize(newsize:number){
        newsize = newsize ||0
        //later add the logic part of it (graphology attrs)
        this.blackboard.updateNodeSize(newsize)
    }
    updateEdgewidth(newwidth:number){
        this.blackboard.updateEdgewidth(newwidth)
    }
    updateEdgeWeightSize(newSize:number){
        this.blackboard.updateEdgeWeightSize(newSize)
    }
    _getNodeVisualIdentity(id:string,attrs:Attributes){
        const vis = attrs as NodeVisualIdentity;
        vis.id = id;
        return vis;
    }
    _getEdgeVisualIdentity(id:string,node1:string,node2:string,attrs:Attributes){
        const vis = attrs as EdgeVisualIdentity;
        vis.id = id;
        vis.node1 = node1;
        vis.node2 = node2;
        return vis;
    }
    async addCompleteGraph(n: number) {

        this.clear()

        if (isNaN(n)) n = Math.floor(Math.random()*10)


        const circleCoordinateGenerator = generateCircleCoordinates(n);

        const nodeIds = [];
        for (let i = 1; i <= n; i++) {
            const {x,y} = circleCoordinateGenerator.next().value
            const nodeId = this.addNode({ x:x+100,y:y+50, displayName: numberToAlphabet(i) });
            if (nodeId) nodeIds.push(nodeId);
        }

        // Add edges between all pairs of nodes using their IDs
        for (let i = 0; i < nodeIds.length; i++) {
            for (let j = 0; j < nodeIds.length; j++) {
                await new Promise((resolve) => setTimeout(resolve, 0));
                this.addEdge(nodeIds[i], nodeIds[j], { color: "white" , weight:1 },false);
            }
        }


    }

    async addCompleteBipartiteGraph(n: number, m: number) {
        this.clear();

        const nodeIdsA = [];
        const nodeIdsB = [];

        // Calculate the starting x-coordinate for group A
        const startX_A = 200;

        // Calculate the starting x-coordinate for group B
        const startX_B = 600; // Adjust the distance between the two lines as needed
        if (isNaN(n)) n=2
        if (isNaN(m)) m=3


        // Add n nodes to the first part of the bipartite graph (group A)
        for (let i = 1; i <= n; i++) {
            const nodeId = this.addNode({
                x: startX_A,
                y: i * 100, // Adjust the vertical spacing as needed
                displayName: `A${i}`,
            });
            if (nodeId) nodeIdsA.push(nodeId);
        }

        // Add m nodes to the second part of the bipartite graph (group B)
        for (let i = 1; i <= m; i++) {
            const nodeId = this.addNode({
                x: startX_B,
                y: i * 100, // Adjust the vertical spacing as needed
                displayName: `B${i}`,
            });
            if (nodeId) nodeIdsB.push(nodeId);
        }

        // Connect each node in group A to each node in group B
        for (const nodeIdA of nodeIdsA) {
            for (const nodeIdB of nodeIdsB) {
                this.addEdge(nodeIdA, nodeIdB, { color: "white" , weight:1 }, false);
                await new Promise((resolve) => setTimeout(resolve, 0));
            }
        }
    }
    async addCycleGraph(n: number) {
        this.clear();

        if (n < 3) {
            ErrorMessage("A cycle graph must have at least 3 nodes.")
            return;
        }
        if (isNaN(n)) n=4

        const nodeIds = [];

        // Calculate the center of the cycle
        const centerX = 300;
        const centerY = 300;
        const radius = 200; // Adjust the radius as needed

        // Add nodes arranged in a cycle
        for (let i = 0; i < n; i++) {
            const angle = (i * 2 * Math.PI) / n;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            const nodeId = this.addNode({
                x,
                y,
                displayName: `Node${i + 1}`,
            });

            if (nodeId) nodeIds.push(nodeId);
            await new Promise((resolve) => setTimeout(resolve, 0));
        }

        // Connect nodes to form the cycle
        for (let i = 0; i < n; i++) {
            this.addEdge(nodeIds[i], nodeIds[(i + 1) % n], { color: "white" , weight:1 }, false);
            await new Promise((resolve) => setTimeout(resolve, 0));
        }
    }
    async addTreeGraph(n: number, maxChildren: number) {
        this.clear();

        if (n <= 0 || maxChildren <= 0) {
            ErrorMessage("Invalid parameters. Both n and maxChildren must be greater than 0.");
            return;
        }

        const nodeIds = [];

        // Create the root node at (100, 100)
        const rootNodeId = this.addNode({
            x: 100,
            y: 100,
            displayName: `Node1 (Root)`,
        });
        if (rootNodeId) nodeIds.push(rootNodeId);

        const nodesPerLevel = [1]; // Number of nodes at each level, starting with the root

        let currentLevel = 1;
        let currentNodeIndex = 0;

        // Add child nodes to the tree
        for (let i = 2; i <= n; i++) {
            const parentNodeId = nodeIds[currentNodeIndex];

            if (currentNodeIndex < nodesPerLevel[currentLevel - 1] - 1) {
                currentNodeIndex++;
            } else {
                currentNodeIndex = 0;
                currentLevel++;
                nodesPerLevel.push(0);
            }

            const x = 100 + (currentNodeIndex - nodesPerLevel[currentLevel - 1] / 2) * 100;
            const y = 100 + currentLevel * 100;

            const nodeId = this.addNode({
                x,
                y,
                displayName: `Node${i}`,
            });

            if (nodeId) {
                nodeIds.push(nodeId);
                nodesPerLevel[currentLevel - 1]++;

                // Connect the new node to its parent
                this.addEdge(parentNodeId, nodeId, { color: "white" , weight:1 }, false);
            }

            await new Promise((resolve) => setTimeout(resolve, 0));
        }
    }

    onNodeSizeChange (){

    }

}