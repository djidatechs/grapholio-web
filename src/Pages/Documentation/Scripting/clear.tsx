
export default function Control () {
    return (
        <>
            <h3 className={"text-xl pt-20 font-bold"}>clear ( ) : undefined</h3>
            <p>Remove all nodes and edges |  graph &lt;- {" {∅} "} </p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                            <code>clear()</code>
                        </pre>
            </div>

            <h3 className={"text-xl pt-20 font-bold"}>print ( ) : undefined</h3>
            <p>Print accepts: string, number, boolean, null, undefined, or arrays from those types, or nested arrays from those types </p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                            <code>print([true,false,null,0,"1", [["1",undefined]] ])</code>
                        </pre>
            </div>
            <p>useful example : </p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                            <code>{'const PrintNodesIds = ()=> print ( get_nodes().map(n=>n.id) )'}</code>
                        </pre>
                        <pre data-prefix=">">
                            <code>{'PrintNodesIds()'}</code>
                        </pre>
                <pre data-prefix=">">
                            <code>{'0 > [@n/1 , @n/2]'}</code>
                        </pre>
            </div>
            <p>Clearing the LOG </p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                            <code>print().clear()</code>
                        </pre>
            </div>


            <h3 className={"text-xl pt-20 font-bold"}>stack </h3>
            <p>Use stack data structure </p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                            <code>let S = stack()</code>
                        </pre>
                        <pre data-prefix=">">
                            <code>---</code>
                        </pre>
                        <pre data-prefix=">">
                            <code>S.push(N1)</code>
                        </pre>
                <pre data-prefix=">">
                            <code>S.pop()</code>
                        </pre>
                <pre data-prefix=">">
                            <code>S.peek()</code>
                        </pre>
                <pre data-prefix=">">
                            <code>S.isEmpty()</code>
                        </pre>
            </div>

            <h3 className={"text-xl pt-20 font-bold"}>queue </h3>
            <p>Use queue data structure </p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                            <code>let S = queue()</code>
                        </pre>
                <pre data-prefix=">">
                            <code>---</code>
                        </pre>
                <pre data-prefix=">">
                            <code>S.enqueue(N1)</code>
                        </pre>
                <pre data-prefix=">">
                            <code>S.dequeue()</code>
                        </pre>
                <pre data-prefix=">">
                            <code>S.peek()</code>
                        </pre>
                <pre data-prefix=">">
                            <code>S.isEmpty()</code>
                        </pre>
            </div>

            <h3 className={"text-xl pt-20 font-bold"}>circle ( potision) : undefined</h3>
            <h3 className={"text-xl font-bold"}>  {`
            position = {   center  : {x :   number,   y :  number},    radius : number} `} </h3>

            <p>restructure your graph as a circle  </p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                            <code>circle()</code>
                        </pre>
                <pre data-prefix=">">
                            <code>circle({"{radius : 200}"})</code>
                        </pre>
                <pre data-prefix=">">
                            <code>circle({"{radius : 200 ,  center:{x:500, y:500}"})</code>
                        </pre>
            </div>


            <h3 className={"text-xl pt-20 font-bold"}>rectangle ( potision) : undefined</h3>
            <h3 className={"text-xl font-bold"}>  {`
            { topLeft : {x: number  ,y:   number}, width: number, height: number} `} </h3>

            <p>restructure your graph as a rectangle  </p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                            <code>circle()</code>
                        </pre>
                <pre data-prefix=">">
                            <code>circle({"{radius : 200}"})</code>
                        </pre>
                <pre data-prefix=">">
                            <code>circle({"{width : 200, height:300 , topLeft:{x:500, y:500}"})</code>
                        </pre>
            </div>



        </>
    )
}