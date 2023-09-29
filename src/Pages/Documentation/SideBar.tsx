import {useNavigate} from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();
    const ScrollTo = (id:string)=>{
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <div className={" z-50 tillLg:drawer-side lg:drawer-open   lg:w-3/12  lg:max-h-[90vh] overflow-y-auto lg:pr-1 lg:scrollbar-thin lg:scrollbar-thumb-accent  lg:sticky lg:top-5 "}>
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu bg-base-100 scrollbar-thin scrollbar-thumb-accent  pt-0  w-1/2 text-white space-y-2 ">
                    <li className="">
                        <h2 onClick={()=>navigate("/documentation")} className="text-accent  md:text-2xl font-bold mb-2">Introduction</h2>
                    </li>

                    <li className="">
                        <h2  onClick={()=>navigate("/documentation/gettingstarted")}  className="text-accent  md:text-2xl font-bold mb-2">Getting Started</h2>
                        <ul className="menu p-4 overflow-y-auto  text-white  overflow-auto">
                            <li><h3 onClick={()=> {
                                navigate("/documentation/gettingstarted")
                                ScrollTo("1")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Creating Your First Graph</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/gettingstarted")
                                ScrollTo("2")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Navigation the application</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/gettingstarted")
                                ScrollTo("3")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Fast Controls</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/gettingstarted")
                                ScrollTo("4")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Manipulating Visual Elements</h3></li>
                        </ul>
                    </li>

                    <li className="">
                        <h2  onClick={()=>navigate("/documentation/managinggraphs")}  className="text-accent  md:text-2xl font-bold mb-2">Managing Graphs</h2>
                        <ul className="menu p-4 overflow-y-auto  text-white  overflow-auto">
                            <li><h3 onClick={()=> {
                                navigate("/documentation/managinggraphs")
                                ScrollTo("1")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Tabs Section</h3></li>
                        </ul>
                    </li>

                    <li className="">
                        <h2  onClick={()=>navigate("/documentation/performingoperations")}  className="text-accent  md:text-2xl font-bold mb-2">Performing Operations</h2>
                        <ul className="menu p-4 overflow-y-auto  text-white  overflow-auto">
                            <li><h3 onClick={()=> {
                                navigate("/documentation/performingoperations")
                                ScrollTo("1")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Operation Selection</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/performingoperations")
                                ScrollTo("2")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Node Operations</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/performingoperations")
                                ScrollTo("3")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Edge Operations</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/performingoperations")
                                ScrollTo("4")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Graph And Canvas Operations</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/performingoperations")
                                ScrollTo("5")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Scripting</h3></li>
                        </ul>
                    </li>

                    <li className="">
                        <h2  onClick={()=>navigate("/documentation/scripting")}  className="text-accent  md:text-2xl font-bold mb-2">Scripting</h2>
                        <ul className="menu p-4 overflow-y-auto  text-white  overflow-auto">
                            <li><h3 onClick={()=> {
                                navigate("/documentation/scripting")
                                ScrollTo("1")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Built-in Functions</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/scripting")
                                ScrollTo("2")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Optimization</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/scripting")
                                ScrollTo("3")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Examples</h3></li>
                        </ul>
                    </li>

                    <li className="">
                        <h2  onClick={()=>navigate("/documentation/navbaroptions")}  className="text-accent  md:text-2xl font-bold mb-2">Navbar Options</h2>
                        <ul className="menu p-4 overflow-y-auto  text-white  overflow-auto">
                            <li><h3 onClick={()=> {
                                navigate("/documentation/navbaroptions")
                                ScrollTo("1")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Importing Graphs</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/navbaroptions")
                                ScrollTo("2")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Exporting Graphs</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/navbaroptions")
                                ScrollTo("3")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Downloading as Image</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/navbaroptions")
                                ScrollTo("4")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Accessing Documentation</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/navbaroptions")
                                ScrollTo("5")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Sharing Your Graphs</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/navbaroptions")
                                ScrollTo("6")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Support</h3></li>
                        </ul>
                    </li>

                    <li className="">
                        <h2  onClick={()=>navigate("/documentation/limitationsandfutureupdates")}  className="text-accent  md:text-2xl font-bold mb-2">Limitations and Future Updates</h2>
                        <ul className="menu p-4 overflow-y-auto  text-white  overflow-auto">
                            <li><h3 onClick={()=> {
                                navigate("/documentation/limitationsandfutureupdates")
                                ScrollTo("1")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>As Fast As Your Computer Can Offer</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/limitationsandfutureupdates")
                                ScrollTo("2")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Mathematical Scripting Language</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/limitationsandfutureupdates")
                                ScrollTo("3")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Grapholio Desktop Application</h3></li>
                            <li><h3 onClick={()=> {
                                navigate("/documentation/limitationsandfutureupdates")
                                ScrollTo("4")
                            } }
                                    className={"font-semibold text-sm lg:text-lg"}>Themes</h3></li>
                        </ul>
                    </li>

                </ul>
        </div>
    );
}
export default Sidebar;