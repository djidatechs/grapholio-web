export default function EdgesScripts (){
    return (
        <>
                <h3 className={"text-xl mt-4 font-bold"}>add_edge( n1 : Node | string , n2 : Node | string ,  attributes : object ) : Edge</h3>
                <p>Your can use this function without attributes</p>
                <div className="mockup-code">
                        <pre data-prefix=">">
                            <code>let A = add_edge(K,M)</code> <code>// A is a the edge K-&gt;M and has default attributes</code>
                        </pre>
                </div>
                <p>You can set as many arguments as you want</p>
                <div className="mockup-code">
                        <pre data-prefix=">">
                             <code>{"let A = add_edge( K, M, { walk:false, traversal : 0}"})</code>
                        </pre>
                    <pre data-prefix=">">
                            <code >// A is a edge and has default attributes and additional attributes</code>
                        </pre>
                    <pre data-prefix=">">
                            <code>A.walk = true </code>
                        </pre>
                    <pre data-prefix=">">
                            <code>let id = A.id   //each edge has a read-only unique id  </code>
                    </pre>
                    <pre data-prefix=">">
                            <code>let id = A.id   //each edge has a read-only unique id  </code>
                    </pre>
                </div>

                <p className={"border-warning border-2 text-white p-2 font-bold"}>Visual attributes</p>
                <p>These attributes change the edge visually</p>
                <div className="mockup-code space-y-1">
                        <pre data-prefix=">">
                             <code>{"let A = add_edge({"}</code>
                        </pre>
                    <pre data-prefix=" ">
                            <code >weight : 100,               // setting weight to 100</code>
                        </pre>

                    <pre data-prefix=" ">
                            <code >color : "red",             // setting the color to red</code>
                        </pre>
                    <pre data-prefix=" ">
                            <code >text_size : 25             // setting the size of the weight text</code>
                     </pre>
                    <pre data-prefix=" ">
                            <code>{"})"}</code>
                        </pre>
                </div>
                <p>You can use them as attribute when you control a edge</p>
                <div className="mockup-code space-y-1">
                        <pre data-prefix=">">
                             <code>{"let A = add_edge({...})"}</code>
                        </pre>
                    <pre data-prefix=" ">
                            <code >A.weight = 200,               // setting weight to 200</code>
                        </pre>
                    <pre data-prefix=" ">
                            <code >A.color = "blue"              // setting the color to blue</code>
                        </pre>
                    <pre data-prefix=" ">
                            <code >A.text_size = 40              // setting the size of the weight text</code>
                        </pre>
                </div>
            <h3 className={"text-xl pt-20 font-bold"}>get_edge( attributes : object ) : Edge | undefined </h3>
            <h3 className={"text-xl font-bold"}>get_edge( n1 : Edge | string | true ,  n2 : Edge | string | true  ) : Edge | undefined </h3>
            <p>Your can use this function without arguments, it will give you the first match</p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                        <code>let A = get_edge()</code> <code>// A is a edge</code>
                    </pre>
            </div>
            <p>You can use attributes to filter and get the edge you are looking for </p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                         <code>{'let A = get_edge( { source:node1.id, color : "green"}'})</code>
                    </pre>
                <pre data-prefix=">">
                        <code >// A is a edge that has the color green and is connected to node1</code>
                </pre>
            </div>
            <p>You can get the edge between two nodes like this :  </p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                         <code>{'let A = get_edge(N1,N2)        //Correct'}</code>
                    </pre>
                <pre data-prefix=">">
                         <code>{'let A = get_edge(N1.id,N2.id)  //Correct'}</code>
                </pre>
                <pre data-prefix=">">
                         <code>{'let A = get_edge(N1,N2.id)     //Correct'}</code>
                </pre>
            </div>

            <p>use true instead of a node to represent "any node"  </p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                         <code>{'let A = get_edge(N1,true)        //Correct'}</code>
                    </pre>
                <pre data-prefix=">">
                         <code>{'let A = get_edge(true,N2.id)  //Correct'}</code>
                </pre>
                <pre data-prefix=">">
                         <code>{'let A = get_edge(true , true)     //Correct'}</code>
                </pre>
            </div>

            <h3 className={"text-xl pt-20 font-bold"}>get_edges( attributes : object ) : Edge[] </h3>
            <h3 className={"text-xl font-bold"}>get_edges( n1 : Edge | string | true ,  n2 : Edge | string | true  ) : Edge | undefined </h3>
            <p>Your can use this function without arguments, it will give you all the edges of the graph</p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                        <code>let A = get_edges()</code> <code>// A is an array of edges</code>
                    </pre>
            </div>
            <p>You can use attributes to filter and get the edges you are looking for just like get_edge </p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                         <code>{'let A = get_edges( { color:"red", : walk : false }'})</code>
                    </pre>
                <pre data-prefix=">">
                        <code >// A is an array of edges in which every edge has the color red and wank is false </code>
                </pre>
            </div>

            <p>You can consider this array as any other javascript array and apply methodes and implementations on it </p>
            <div className="mockup-code">
                    <pre data-prefix=">">
                         <code>{'get_edges({weight : 0}).map(edge => edge.walk = false)   //set walk attribute of all edges with 0 weight to false '})</code>
                    </pre>
                <pre data-prefix=">">
                        <code>{'let N = get_edges()[0]   //get first edge in the array '})</code>
                </pre>
                <pre data-prefix=">">
                        <code>{'let C = get_edges(N1,true).map(e=>e.id)   //assign C to an array that hold all IDs of edges with source N1 '})</code>
                </pre>
            </div>



            <h3 className={"text-xl pt-20 font-bold"}>remove_edge( edge : Edge | string ) : Edge[] </h3>
            <p>remove edge by putting it as the argument (you can put the id , or the reference of the edge)</p>
            <div className="mockup-code">
                     <pre data-prefix=">">
                        <code>A = add_edge(N1,N2)</code> <code>// A is an array of edges</code>
                    </pre>
                <pre data-prefix=">">
                        <code>remove_edge(A)</code> <code>// Correct</code>
                    </pre>
                <pre data-prefix=">">
                        <code>remove_edge(A.id)</code> <code>// Correct</code>
                    </pre>
            </div>
            </>
    )
}