import { GrapholioManager } from "../GrapholioManager/GrapholioManager";
import { Attributes } from "graphology-types";
import { Node } from "./Node.ts";
import { Edge } from "./Edge.ts";
import { Stack } from "./DataTypes.ts";
import Graph from "graphology";

export class GrapholioCommandManager_refactor {
    managerRef: GrapholioManager;

    constructor(managerReference: GrapholioManager) {
        this.managerRef = managerReference;
    }

    hookManager(managerReference: GrapholioManager) {
        this.managerRef = managerReference;
    }

    private getNode(id: string): Node {
        const manager = this.managerRef as GrapholioManager;
        return new Node(id, manager).getProxy();
    }

    private getEdge(id: string): Edge {
        const manager = this.managerRef as GrapholioManager;
        return new Edge(id, manager).getProxy();
    }

    private getEntitiesWithAttrs(attrs: Attributes|undefined, isNode: boolean): string[] {
        const manager = this.managerRef as GrapholioManager;
        const entities: string[] = [];

        if (attrs === undefined)
            return isNode ?  manager.getCurrentGraph()?.nodes() || [] : manager.getCurrentGraph()?.edges() || []

        if (isNode)  manager.getCurrentGraph()?.mapNodes(this.mapper(attrs, entities))
        else         manager.getCurrentGraph()?.mapEdges(this.mapper(attrs, entities))

        return entities;
    }


    private mapper(attrs: Attributes, entities: string[]) {
        console.log(attrs , entities)
        return (node_or_edge: string, attributes: Attributes) => {
            let match = true;

            Object.keys(attrs).forEach(element_attribute => {
                console.log(element_attribute, attributes[element_attribute])
                if (attributes[element_attribute] === undefined) match = false
                else if (attrs[element_attribute] !== attributes[element_attribute]) {
                    match = false;
                }
            });

            if (match) {
                entities.push(node_or_edge);
            }
        };
    }

    add_node(attrs: Attributes | undefined) {
        const manager = this.managerRef as GrapholioManager;
        const node = manager.addNode(attrs || {}) as string;
        return this.getNode(node);
    }

    get_node(attrs: Attributes | undefined) {
        const nodes = this.getEntitiesWithAttrs(attrs, true);
        return nodes.length ? this.getNode(nodes[0]) : undefined;
    }

    get_nodes(attrs: Attributes | undefined) {
        const nodes = this.getEntitiesWithAttrs(attrs || {}, true);
        return nodes.map(id => this.getNode(id));
    }

    get_edges(attr: Attributes|undefined): Edge[] {
        const edgesWithAttrs = this.getEntitiesWithAttrs(attr, false);
        return edgesWithAttrs.map(id => this.getEdge(id));
    }

    get_edges_between(n1: Node, n2: Node, attr?: Attributes): Edge[] {
        const edgesBetween = this.getEdgesBetweenWithAttrs(n1, n2, attr);
        return edgesBetween.map(id => this.getEdge(id));
    }
    get_edge(attr:Attributes):Edge {
        const edgesWithAttrs = this.getEntitiesWithAttrs(attr, false);
        return  this.getEdge(edgesWithAttrs[0])
    }


    private getEdgesBetweenWithAttrs(n1: Node, n2: Node, attrs?: Attributes): string[] {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const useN1 = typeof n1 === "string" ? n1 : n1.id;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const useN2 = typeof n2 === "string" ? n2 : n2.id;

        const manager = this.managerRef as GrapholioManager;
        const graph = manager.getCurrentGraph() as Graph;
        const edges: string[] = [];

        for (const edge of graph.edges()) {
            const source = graph.source(edge);
            const target = graph.target(edge);

            if ((source === useN1 && target === useN2) || (source === useN2 && target === useN1)) {
                if (!attrs || Object.entries(attrs).every(([key, value]) => graph.getEdgeAttribute(edge, key) === value)) {
                    edges.push(edge);
                }
            }
        }

        return edges;
    }

    add_edge(node1: Node | string, node2: Node | string, attrs: Attributes | undefined = undefined) {
        const manager = this.managerRef as GrapholioManager;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const useNode1 = typeof node1 === "string" ? node1 : node1.id;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const useNode2 = typeof node2 === "string" ? node2 : node2.id;

        const edge = manager.addEdge(useNode1, useNode2, attrs || {}) as string;
        return this.getEdge(edge);
    }

    remove_node() {
        // Implement remove_node logic
    }

    stack() {
        return new Stack<any>();
    }
    union(parent:any, rank:any, node1:any, node2:any) {
        const root1 = this.find(parent, node1);
        const root2 = this.find(parent, node2);

        if (rank[root1.id] < rank[root2.id]) {
            parent[root1.id] = root2;
        } else if (rank[root1.id] > rank[root2.id]) {
            parent[root2.id] = root1;
        } else {
            parent[root2.id] = root1;
            rank[root1.id]++;
        }
    }
    find(parent:any, node:any):any {
        if (parent[node.id] === node) return node;
        return this.find(parent, parent[node.id]);
    }
    clear(){
        const manager = this.managerRef as GrapholioManager
        manager.clear()
        return true ;
    }


    eval(jscode: string) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const window = undefined;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const document = undefined
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const global = undefined
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const add_node = this.add_node.bind(this);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore

        const get_node = this.get_node.bind(this);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const get_nodes = this.get_nodes.bind(this);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const get_edge = this.get_edge.bind(this);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const get_edges = this.get_edges.bind(this);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const stack = this.stack.bind(this);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const add_edge = this.add_edge.bind(this);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const clear = this.clear.bind(this);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const union = this.union.bind(this);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const find = this.find.bind(this);
        console.log(!!{window, global, document, add_edge, add_node, get_nodes, get_node, get_edge, get_edges, clear, union, find, stack})
        eval(jscode)
    }
}
