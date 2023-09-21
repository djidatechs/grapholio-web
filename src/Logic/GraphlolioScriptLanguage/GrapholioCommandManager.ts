/*import {GrapholioManager} from "../GrapholioManager/GrapholioManager";
import {Attributes} from "graphology-types";
import {Node}from "./Node.ts"
import {Edge} from "./Edge.ts";
import { Stack} from "./DataTypes.ts";
import Graph from "graphology";


export class GrapholioCommandManager {
    managerRef :  GrapholioManager ;
    hookManager (managerReference : GrapholioManager ){
        this.managerRef = managerReference ;
    }
    constructor(managerReference : GrapholioManager ){
        this.managerRef = managerReference ;
    }
    clear(){
        const manager = this.managerRef as GrapholioManager
        manager.clear()
        return true ;
    }
    add_node(attrs:Attributes|undefined){
        const manager = this.managerRef as GrapholioManager
        const node = this.managerRef?.addNode(attrs || {}) as string
        return new Node(node,manager).getProxy()
    }
    get_node(attrs:Attributes|undefined) {
        if (attrs === undefined) return
        const manager = this.managerRef as GrapholioManager
        let ret : string|undefined ;
        this.managerRef?.getCurrentGraph()?.mapNodes((node,attributes)=>{
            Object.keys(attributes).map(element_attribute=>{
                if (Object.keys(attrs).includes(element_attribute) && attrs[element_attribute] === attributes[element_attribute]  ) {
                    ret = node
                    return
                }
            })

        })
        if (!ret) return undefined
        return new Node(ret,manager).getProxy()
    }
    get_nodes(attrs:Attributes|undefined) {
        const manager = this.managerRef as GrapholioManager

        const nodes = manager.getCurrentGraph()?.nodes()
        if ( !nodes || ! nodes.length ) return undefined

        const nodeObjects: Node[]  = [] ;

        if (attrs === undefined ) nodes.map(nd => nodeObjects.push(new Node(nd,manager).getProxy()))
        else if (!Object.keys(attrs).length) return undefined
        else this.managerRef?.getCurrentGraph()?.mapNodes((node,attributes)=>{
            Object.keys(attributes).map(element_attribute=>{
                if (Object.keys(attrs).includes(element_attribute) && attrs[element_attribute] === attributes[element_attribute]  ) {
                    nodeObjects.push(new Node(node,manager).getProxy())
                    return
                }
            })

        })

        return (nodeObjects);
    }
    get_edges(attr: Attributes): Edge[] {
        const manager = this.managerRef as GrapholioManager;
        const edges: Edge[] = [];

        // Assuming get_edges_with_attrs returns an array of edges
        const edgesWithAttrs = this.get_edges_with_attrs(attr);

        for (const edge of edgesWithAttrs) {
            edges.push(new Edge(edge, manager).getProxy());
        }

        return edges;
    }

    get_edges_between(n1: Node, n2: Node, attr?: Attributes): Edge[] {
        const manager = this.managerRef as GrapholioManager;
        const edges: Edge[] = [];

        // Assuming get_edges_between_with_attrs returns an array of edges
        const edgesBetween = this.get_edges_between_with_attrs(n1, n2, attr);

        for (const edge of edgesBetween) {
            edges.push(new Edge(edge, manager).getProxy());
        }

        return edges;
    }

    get_edges(arg1: Attributes | Node |string, arg2?: Node|string, arg3?: Attributes): Edge[] {
        const manager = this.managerRef as GrapholioManager;
        const edges: Edge[] = [];

        if (arg1 && arg2 && (arg1 instanceof Node || typeof arg1 === "string" ) ) {
            // Assuming get_edges_id_using_node_ids returns an array of edges
            const edgesByIds = this.get_edges_id_using_node_ids(arg1,arg2);

            for (const edge of edgesByIds) {
                if (!arg3) {
                    edges.push(new Edge(edge, manager).getProxy());
                } else {
                    const edgeWithAttrs =  this.get_edge_with_attrs(arg3);
                    if (edge === edgeWithAttrs) {
                        edges.push(new Edge(edge, manager).getProxy());
                    }
                }
            }
        } else {
            if (arg1 instanceof Node ||  typeof arg1 === "string") {
                throw Error("Wrong Type of parameter");
            }

            // Assuming get_edges_with_attrs returns an array of edges
            const edgesWithAttrs = this.get_edges_with_attrs(arg1);

            for (const edge of edgesWithAttrs) {
                edges.push(new Edge(edge, manager).getProxy());
            }
        }

        return edges;
    }

    /*get_edges(attrs:Attributes|undefined) {
        const manager = this.managerRef as GrapholioManager

        const edges = manager.getCurrentGraph()?.edges()
        if ( !edges || ! edges.length ) return undefined
        if (attrs === undefined) {
            const ES : Edge[] = []
            edges.map(edge=>  ES.push(new Edge(edge,manager).getProxy() ) )
            return ES
        }

        const nodeObjects: Node[]  = [] ;

        if (attrs === undefined ) edges.map(nd => nodeObjects.push(new Node(nd,manager).getProxy()))
        else if (!Object.keys(attrs).length) return undefined
        else this.managerRef?.getCurrentGraph()?.mapEdges((id,attributes)=>{
                Object.keys(attributes).map(element_attribute=>{
                    if (Object.keys(attrs).includes(element_attribute) && attrs[element_attribute] === attributes[element_attribute]  ) {
                        nodeObjects.push(new Edge(id,manager).getProxy())
                        return
                    }
                })

            })

        return (nodeObjects);
    }*/
/*
    add_edge(node1:Node|string,node2:Node|string,attrs:Attributes|undefined=undefined){
        const manager = this.managerRef as GrapholioManager
        const useNode1 =(typeof node1 === "string") ? node1 :  node1.id ;
        const useNode2 =(typeof node2 === "string") ? node2 :  node2.id ;

        const edge = this.managerRef?.addEdge(useNode1,useNode2,attrs||{}) as string
        return new Edge(edge,manager).getProxy()
    }
    private get_edge_id_using_node_ids(node1 : Node|string , node2 : Node|string) {
        const useN1 = (typeof node1 === "string") ?  node1 : node1.id as string
        const useN2 = (typeof node2 === "string") ?  node2 : node2.id as string
        const manager = this.managerRef as GrapholioManager
        const graph = manager.getCurrentGraph() as Graph
        for (const edge of graph.edges()) {
            const source = graph.source(edge);
            const target = graph.target(edge);

            if ((source === useN1 && target === useN2) || (source === useN2 && target === node1)) {
                return edge;
            }
        }

        return null; // Return null if no edge is found
    }
    private get_edge_with_attrs(attrs:Attributes|undefined )  {
        if (attrs === undefined) return
        let ret : string|undefined ;
        this.managerRef?.getCurrentGraph()?.mapEdges((edge,attributes)=>{
            Object.keys(attributes).map(element_attribute=>{
                if (Object.keys(attrs).includes(element_attribute) && attrs[element_attribute] === attributes[element_attribute]  ) {
                    ret = edge
                    return
                }
            })

        })
        if (!ret) return undefined
        return ret
    }
    private get_edges_id_using_node_ids(node1: Node|string , node2: Node|string) {
        const useN1 = (typeof node1 === "string") ? node1 : node1.id as string;
        const useN2 = (typeof node2 === "string") ? node2 : node2.id as string;
        const manager = this.managerRef as GrapholioManager;
        const graph = manager.getCurrentGraph() as Graph;
        const edges: string[] = [];

        for (const edge of graph.edges()) {
            const source = graph.source(edge);
            const target = graph.target(edge);

            if ((source === useN1 && target === useN2) || (source === useN2 && target === useN1)) {
                edges.push(edge);
            }
        }

        return edges.length > 0 ? edges : null; // Return null if no edge is found
    }

    private get_edges_with_attrs(attrs: Attributes|undefined) {
        if (attrs === undefined) return [];
        const edges: string[] = [];

        this.managerRef?.getCurrentGraph()?.mapEdges((edge, attributes) => {
            let match = true;

            Object.keys(attrs).forEach(element_attribute => {
                if (attrs[element_attribute] !== attributes[element_attribute]) {
                    match = false;
                }
            });

            if (match) {
                edges.push(edge);
            }
        });

        return edges;
    }

    get_edge(attr: Attributes): Edge|undefined;
    get_edge(n1: Node, n2: Node, attr?: Attributes): Edge|undefined;
    get_edge(arg1: Attributes | Node |string, arg2?: Node|string, arg3?: Attributes): Edge|undefined {
        const manager = this.managerRef as GrapholioManager
        if (arg1 && arg2 && (arg1 instanceof Node || typeof arg1 === "string" ) ) {
            const edge = this.get_edge_id_using_node_ids(arg1,arg2)
            if (!edge) return
            if (arg3)  {
                const edge_w_atr =  this.get_edge_with_attrs(arg3)
                if (edge !== edge_w_atr ) return

            }
            return new Edge(edge,manager).getProxy();
        }
       else {
            if ( (arg1 instanceof Node ||  typeof arg1 === "string")) throw Error("Wrong Type of parameter");
            const edge = this.get_edge_with_attrs(arg1);
            return edge ?  new  Edge ( edge , manager ).getProxy() : undefined
        }
    }


    remove_node(){}
    stack(){
        return new Stack<any>();
    }




    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    eval(jscode:string){
        const window = undefined
        const document = undefined
        const add_node = this.add_node.bind(this)
        const get_node = this.get_node.bind(this)
        const get_nodes = this.get_nodes.bind(this)
        const get_edge = this.get_edge.bind(this)
        const get_edges = this.get_edges.bind(this)
        const stack = this.stack.bind(this)

        const add_edge = this.add_edge.bind(this)
        const clear = this.clear.bind(this)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        eval(jscode);
    }
}

*/