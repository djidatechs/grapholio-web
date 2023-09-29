export default function NodesScripts (){
    return (
        <>
            <h3 className={"text-xl  mt-4 font-bold"}>add_node( attributes : object ) : Node</h3>
            <p>Your can use this function without arguments</p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                            <code>let A = add_node()</code> <code>// A is a node and has default attributes</code>
                        </pre>
            </div>
            <p>You can set as many arguments as you want</p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                             <code>{"let A = add_node( { walk:false, traversal : 0}"})</code>
                        </pre>
                <pre data-prefix=">">
                            <code >// A is a node and has default attributes and additional attributes</code>
                        </pre>
                <pre data-prefix=">">
                            <code>A.walk = true </code>
                        </pre>
                <pre data-prefix=">">
                            <code>let id = A.id   //each node has a read-only unique id  </code>
                        </pre>
            </div>

            <p className={"border-warning border-2 text-white p-2 font-bold"}>Visual attributes</p>
            <p>These attributes change the node visually</p>
            <div className="mockup-code space-y-1">
                        <pre data-prefix=">">
                             <code>{"let A = add_node({"}</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >x : 100,               // setting postiion x of (x,y)</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >y : 100,               // setting postiion y of (x,y))</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >label : "ESI ALGER",   // setting the label in the canvas</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >color : "red",         // setting the color to red</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >size : 35,             // setting the size of the node</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >text_size : 25         // setting the size of the label</code>
                        </pre>
                <pre data-prefix=" ">
                            <code>{"})"}</code>
                        </pre>
            </div>
            <p>You can use them as attribute when you control a node</p>
            <div className="mockup-code space-y-1">
                        <pre data-prefix=">">
                             <code>{"let A = add_node({...})"}</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >A.x = 200                // setting postiion x of (x,y)</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >A.y = 250                // setting postiion y of (x,y))</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >A.label = "node " +A.id  // setting the label in the canvas</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >A.color = "blue"         // setting the color to red</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >A.size = 60              // setting the size of the node</code>
                        </pre>
                <pre data-prefix=" ">
                            <code >A.text_size = 40         // setting the size of the label</code>
                        </pre>
            </div>
            <h3 className={"text-xl  pt-20 font-bold"}>get_node( attributes : object ) : Node | undefined </h3>
            <p>Your can use this function without arguments, it will give you the first match</p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                        <code>let A = get_node()</code> <code>// A is a node</code>
                    </pre>
            </div>
            <p>You can use attributes to filter and get the node you are looking for </p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                         <code>{'let A = get_node( { color:"red", : label : "A"}'})</code>
                    </pre>
                <pre data-prefix=">">
                        <code >// A is a node that has the color red and the label A</code>
                    </pre>
                <pre data-prefix=">">
                        <code>print (A.color === true && a.label === "A")   // true </code>
                    </pre>

            </div>

            <h3 className={"text-xl  pt-20 font-bold"}>get_nodes( attributes : object ) : Node[] </h3>
            <p>Your can use this function without arguments, it will give you all the nodes of the graph</p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                        <code>let A = get_nodes()</code> <code>// A is an array of nodes</code>
                    </pre>
            </div>
            <p>You can use attributes to filter and get the nodes you are looking for </p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                         <code>{'let A = get_nodes( { color:"red", : label : "A"}'})</code>
                    </pre>
                <pre data-prefix=">">
                        <code >// A is an array of nodes in which every node has the color red and the label A</code>
                    </pre>
            </div>

            <p>You can consider this array as any other javascript array and apply methodes and implementations on it </p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                         <code>{'get_nodes().map(node => node.walk = false)   //set walk attribute of all nodes to false '})</code>
                    </pre>
                <pre data-prefix=">">
                        <code>{'for (let node of get_nodes()) node.label = node.label+ "OK"   //change the name or each node to previous name + ok '})</code>
                    </pre>
                <pre data-prefix=">">
                        <code>{'let N = get_nodes()[0]   //get first node in the array '})</code>
                    </pre>
            </div>



            <h3 className={"text-xl  pt-20 font-bold"}>remove_node( node : Node | string ) : Node[] </h3>
            <p>remove node by putting it as the argument (you can put the id , or the reference of the node)</p>
            <div className="mockup-code">
                     <pre data-prefix=">">
                        <code>A = add_node()</code> <code>// A is an array of nodes</code>
                    </pre>
                <pre data-prefix=">">
                        <code>remove_node(A)</code> <code>// Correct</code>
                    </pre>
                <pre data-prefix=">">
                        <code>remove_node(A.id)</code> <code>// Correct</code>
                    </pre>
            </div>
            </>
            )
            }