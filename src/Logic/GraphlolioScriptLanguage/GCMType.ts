import {GrapholioManager} from "../GrapholioManager/GrapholioManager.ts";

export abstract class GCMType {
    protected properties: { [key: string]: unknown } = {};
    protected manager: GrapholioManager; // Replace GrapholioManager with the actual type of your manager reference

    constructor(id:string,manager:GrapholioManager) {
        // Compute some properties and assign them dynamically
        this.properties['id'] = id;
        this.manager = manager
    }

    abstract getProperty(target: any, property: string) : unknown
    abstract setProperty(target: any, property: string, value: any) :boolean

    // Create a proxy to handle dynamic property access
    getProxy() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new Proxy(this, {
            get: (target: any, property: any) => {
                return this.getProperty(target, String(property))
            },
            set: (target, property, value) => this.setProperty(target, String(property), value)


        });
    }
}
/*
get_edges().map(edge=>edge.color = "#FFFFFF")
function find(parent, node) {
    if (parent[node.id] === node) return node;
    return find(parent, parent[node.id]);
}

function union(parent, rank, node1, node2) {
    let root1 = find(parent, node1);
    let root2 = find(parent, node2);

    if (rank[root1.id] < rank[root2.id]) {
        parent[root1.id] = root2;
    } else if (rank[root1.id] > rank[root2.id]) {
        parent[root2.id] = root1;
    } else {
        parent[root2.id] = root1;
        rank[root1.id]++;
    }
}

function kruskal(graph) {
    let parent = {};
    let rank = {};

    let sortedEdges = graph.edges.sort((a, b) => a.weight - b.weight);
    let result = [];

    graph.nodes.forEach(node => {
        parent[node.id] = node;
        rank[node.id] = 0;
    });

    sortedEdges.forEach(edge => {
        let source = get_node({id:edge.source});
        let target = get_node({id:edge.target});

        if (find(parent, source) !== find(parent, target)) {
            result.push(edge);
            union(parent, rank, source, target);
        }
    });

    return result;
}

// Usage example
let nodes = get_nodes();
let edges = get_edges(); // You can pass any filter you need

let graph = {
    nodes: nodes,
    edges: edges
};

let minimumSpanningTree = kruskal(graph);
console.log(minimumSpanningTree);
minimumSpanningTree.map(edge=>edge.color="#1fce59");
*/