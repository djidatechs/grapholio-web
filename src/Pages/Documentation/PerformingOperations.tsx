import {Link} from "react-router-dom";
import operations from "../../assets/Operations.mp4"

export default function PerformingOperations () {
    return (
        <div className={"mb-24"}>
            <div className={"space-y-2 text-xl "}>
                <h1 className={"text-3xl text-primary font-bold mb-5"}>Performing Operations</h1>

                <div className={" my-3 space-y-3 text-xl "} id={"1"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Operation Selection</h2>
                    <p>
                        In the dashboard you have for operation menus, Nodes, Edges, Script, Graph
                        these menus are used to get information about a certain aspect of the active graph
                    </p>
                </div>
                <div className={" my-3 space-y-3 text-xl "} id={"2"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Nodes Operations</h2>
                   <h4 className={"text-xl text-primary"}>Information Table</h4>
                    <p>
                        Retrieve information about the nodes of the graph
                    </p>
                    <h4 className={"text-xl text-primary"}>Selected Node Details</h4>
                    <p>
                        Update attributes of a selected node
                    </p>

                </div>
                <div className={" my-3 space-y-3 text-xl "} id={"3"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Edges Operations</h2>
                    <h4 className={"text-xl text-primary"}>Information Table</h4>
                    <p>
                        Retrieve information about the edges of the graph
                    </p>
                    <h4 className={"text-xl text-primary"}>Selected Edge Details</h4>
                    <p>
                        Update attributes of a selected edge
                    </p>
                </div>
                <div className={" my-3 space-y-3 text-xl "} id={"4"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Graph Operations</h2>
                    <h4 className={"text-xl text-primary"}>Information Table</h4>
                    <p>
                        Retrieve information about the edges of the graph
                    </p>
                    <h4 className={"text-xl text-primary"}>Creat Common Networks</h4>
                    <p>
                        Directly create a known graph
                    </p>
                    <h4 className={"text-xl text-primary"}>Styling Canvas</h4>
                    <p>
                        Regulating the parameters of the canvas
                    </p>
                </div>
                <p className={"pt-12"}>Here is an example of manipulating different operations</p>
                <video controls muted>
                    <source src={operations} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className={" my-3 space-y-3 text-xl "} id={"5"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Script Operations</h2>
                    <p>
                        Accessing the script operation takes you to another board, you can learn more about it <Link className={"font-bold underline"} to={"/documentation/scripting"}>Here</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}
