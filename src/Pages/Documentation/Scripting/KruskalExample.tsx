import  { useEffect, useRef } from 'react';
//import {  Controlled as CodeMirror } from 'react-codemirror2';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';

function CodeMirrorComponent() {
    const codeRef = useRef(null);

    useEffect(() => {
        if (!codeRef ||!codeRef.current) return
        const editor = new CodeMirror(codeRef.current, {
            value:
                `//Kruskal Algorithm
                
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
minimumSpanningTree.map(edge=>edge.color="#1fce59");`
            ,
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true,
            readOnly: true
        });

        return () => {
            editor.display.wrapper.remove()
        };
    }, []);

    return (
        <div className="mockup-code" ref={codeRef}>
        </div>
    );
}

export default CodeMirrorComponent;
