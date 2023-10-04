function dijkstra(graph, startNodeId, endNodeId) {
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
for (let i = 0 ; i<shortestPath.length-1 ; i++){
    let node = shortestPath[i]
    let nextNode = shortestPath[i+1]
    node.highlight.on()
    nextNode.highlight.on()
    get_edge(node,nextNode).highlight.on()
}

