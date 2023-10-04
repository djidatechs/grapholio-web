export const code_list = {
    kruskal :( `//Kruskal Algorithm (for simple undirected graph )
                
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
minimumSpanningTree.map(edge=>edge.color="#1fce59");`),

    dijkstra : (
        `function dijkstra(graph, startNodeId, endNodeId) {
    let distance = {};
    let visited = {};
    let parent = {};

    graph.nodes.forEach(node => {
        distance[node.id] = Infinity;
        visited[node.id] = false;
        parent[node.id] = null;
    });
    distance[startNodeId] = 0;

    for (let i = 0; i < graph.nodes.length - 1; i++) {
        let u = minDistanceNode(distance, visited);
        visited[u] = true;

        let uNode = get_node({ id: u });


        graph.edges.forEach(edge => {
            if (edge.source === uNode.id) {
                let v = edge.target;
                let vNode = get_node({ id: v });
                let weight = edge.weight;

                if (distance[u] + weight < distance[v]) {
                    distance[v] = distance[u] + weight;
                    parent[v] = uNode;
                }
            }
        });
    }

    let path = [];
    let endNode = get_node({ id: endNodeId });
    let current = endNode;

    while (current ) {
        path.unshift(current);
        current = parent[current.id];
    }

    return path;
}

function minDistanceNode(distance, visited) {
    let min = Infinity;
    let minNode = null;

    for (let nodeId in distance) {
        if (!visited[nodeId] && distance[nodeId] < min) {
            min = distance[nodeId];
            minNode = nodeId;
        }
    }

    return minNode;
}

let nodes = get_nodes();
let edges = get_edges(); // You can pass any filter you need

let graph = {
    nodes,
    edges
};
// Usage example
let startNodeId = graph.nodes[0].id; // Replace with actual ID of the start node
let endNodeId =  graph.nodes[graph.nodes.length -1 ].id;     // Replace with actual ID of the end node

let shortestPath = dijkstra(graph, startNodeId, endNodeId);
shortestPath = Object.values(shortestPath)
graph.nodes.map(n=>n.highlight.off())
graph.edges.map(n=>n.highlight.off())
for (let i = 0 ; i<shortestPath.length-1 ; i++){
    let node = shortestPath[i]
    let nextNode = shortestPath[i+1]
    node.highlight.on()
    nextNode.highlight.on()
    get_edge(node,nextNode).highlight.on()
}

`)

}