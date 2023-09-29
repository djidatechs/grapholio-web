import {BiSolidColorFill} from "react-icons/bi";
import firstlook from "../../assets/add first graph.mp4"
import fastControl from "../../assets/fast control.mp4"
import vnimpel from "../../assets/visual node impel.mp4"
import vpimpel from "../../assets/visual edge impel.mp4"
export default function GettingStarted () {

    return (
        <div className={"mb-24"}>
            <div className={"space-y-2 text-xl "}>
                <h1 className={"text-3xl text-primary font-bold mb-5"}>Getting Started</h1>

                <div className={" my-3 space-y-3 text-xl "} id={"1"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Creating Your First Graph</h2>
                    <p>
                        From the landing page you can click on Application <br/>
                        you will be redirected to the web app where you can start creating graphs !
                    </p>
                    <video controls muted>
                        <source src={firstlook} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <p>
                        As it appears on the left side of the App , you can click + and choose the type of graph you want to create <br/>
                        Now that you have your first graph you can start using the visual elements to create and control the graph

                    </p>
                </div>
                <div className={"max-w-full my-3 space-y-3 text-xl "} id={"2"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Navigation The Application</h2>
                    <p>
                        Grapholio Web Application is devided into three main sections
                    </p>
                    <div className="flex flex-wrap justify-center mx-auto gap-4 my-4 max-w-screen-lg">
                        <div className="flex-1  text-center font-medium p-2 card bg-accent/30 text-white rounded-box">
                            <h2 className="text-xl font-bold">Navbar</h2>
                            <p className="text-sm">To apply data formatting and navigations</p>
                        </div>
                        <div className="flex-1  text-center font-medium p-2 card bg-accent/30 text-white rounded-box">
                            <h2 className="text-xl font-bold">Dashboard</h2>
                            <p className="text-sm">To apply multiple operations on the graphs and canvas</p>
                        </div>
                        <div className="flex-1  text-center font-medium p-2 card bg-accent/30 text-white rounded-box">
                            <h2 className="text-xl font-bold">Draw Board</h2>
                            <p className="text-sm">To view and control the visual items in the canvas</p>
                        </div>
                    </div>
                </div>
                <div id={"3"} className={"max-w-full my-3 space-y-3 text-xl"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Fast Controls</h2>
                    <p>
                        Fast controls muted are a list on top of the canvas that are used to simplify redundant actions that are used a lot in a session
                    </p>
                    <figure><img className={"rounded-xl w-72"} src={fastControl} alt={""}/></figure>
                    <div><h2 className={"text-primary inline font-bold"}>X</h2> <p className={"text-xl  inline "}> to clear the canvas </p></div>
                    <div><h2 className={"text-primary inline font-bold"}>Edge</h2> <p className={"text-xl  inline "}> to add edge between random nodes </p></div>
                    <div><h2 className={"text-primary inline font-bold"}>Node</h2> <p className={"text-xl  inline "}> to add a node to the canvas </p></div>
                    <div><h2 className={"text-primary inline font-bold"}>Minus</h2> <p className={"text-xl  inline "}> to zoom out </p></div>
                    <div><h2 className={"text-primary inline font-bold"}>Plus</h2> <p className={"text-xl  inline "}> to zoom in </p></div>
                    <div><BiSolidColorFill className={"inline fill-primary font-bold text-primary h-8  w-8"}/> <p className={"text-xl inline  "}>Toggle dark / light background</p></div>
                    <p>
                        here is an example :
                    </p>
                    <video controls muted>
                        <source src={fastControl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div id={"4"} className={"max-w-full my-3 space-y-3 text-xl"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Manipulating Visual Elements</h2>
                    <div><h2 className={"text-primary  inline font-bold"}>Moving Nodes</h2> <p className={" text-xl  inline "}> you can drag and move the nocdes on the canvas </p></div>
                    <div><h2 className={"text-primary  inline font-bold"}>Moving Nodes' Label</h2> <p className={" text-xl  inline "}> you can drag and move the label in circular motion on the canvas </p></div>
                    <div><h2 className={"text-primary  inline font-bold"}>Connecting Nodes</h2> <p className={" text-xl  inline "}> Double Click on the source node, or right click and choose Connect, and then double Click on the target node  </p></div>
                    <div><h2 className={"text-primary  inline font-bold"}>Rename Node (label)</h2> <p className={" text-xl  inline "}> Double Click on the node's label,or right click and choose Rename, rename label, and click Enter to save </p></div>
                    <div><h2 className={"text-primary  inline font-bold"}>remove Node</h2> <p className={" text-xl  inline "}>Right click and choose remove </p></div>
                    <div><h2 className={"text-primary  inline font-bold"}>Show Nodes Details</h2> <p className={" text-xl  inline "}>Right click and choose Details , this will show you controllable attributes on the dashboard  </p></div>
                    <div><h2 className={"text-primary  inline font-bold"}>Selection Tool</h2> <p className={" text-xl  inline "}> Put the Mousedown and hover over the elemnts you want to select, a box will be created that you can drag over the canvas   </p></div>

                    <p>Here is an Example : </p>
                    <video controls muted>
                        <source src={vnimpel} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div><h2 className={"text-primary  inline font-bold"}>Curving Edge</h2> <p className={" text-xl  inline "}> Double Click on the edge, or right click and choose Curve, move the cursor to any place, and then double Click and the position will be saved </p></div>
                    <div><h2 className={"text-primary  inline font-bold"}>Changing Weight</h2> <p className={" text-xl  inline "}> Double Click on the weight, or right click on the edge and choose Weight, change the weight ,  and click Enter to save </p></div>
                    <div><h2 className={"text-primary  inline font-bold"}>remove Edge</h2> <p className={" text-xl  inline "}>Right click and choose remove </p></div>
                    <div><h2 className={"text-primary  inline font-bold"}>Un/Directed Edge</h2> <p className={" text-xl  inline "}>Right click and choose Directed ( works in mixed graphs ) </p></div>
                    <div><h2 className={"text-primary  inline font-bold"}>Show Edges Details</h2> <p className={" text-xl  inline "}>Right click and choose Details , this will show you controllable attributes on the dashboard  </p></div>
                    <p>Here is an Example : </p>
                    <video controls muted>
                        <source src={vpimpel} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                </div>


            </div>
        </div>
    )
}
