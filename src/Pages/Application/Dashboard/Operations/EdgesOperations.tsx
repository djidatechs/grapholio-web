import {Accoradations, Separator} from "../../../../Constants.ts";
import {useGrapholio} from "../../Context.tsx";
import Accordion, {IAccorditionOptions} from "./Accordion.tsx";
import {useEffect, useState} from "react";



function EdgeDetails ({title,defaultVisible,accordation}:IAccorditionOptions){
    const {grapholioManager:manager,operations} = useGrapholio()
    const [edgeVal,setEdge] = useState<string|undefined>(undefined)

    if (!title) title="Option";
    if (!defaultVisible) defaultVisible=false;
    if (!accordation) accordation=undefined
    useEffect(() => {
        console.log(edgeVal)
        setEdge(operations.accordation.Item)
    }, [operations.accordation.Item]);
    const getPropableEdgeAttributes = (attr:string)=>{
        console.log({attr})
        let T:any = ""
        try {
            T = manager.getCurrentGraph()?.getEdgeAttribute(edgeVal,attr)
        }catch {
            setEdge(undefined)
            return ""
        }
        return T
    }

    if (edgeVal === undefined) return



    return <div>
        <div className={"space-y-5"}>
            <h1>Edge Properties</h1>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>ID</span>
                    <input type="text" value={edgeVal?.split(Separator)[1]} className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Color</span>
                    <input type="color"
                           onInput={(e)=>manager.updateEdgeAttr(edgeVal,"color",e.currentTarget.value)}
                           value={getPropableEdgeAttributes("color")} className="input input-ghost   p-0  w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Weight</span>
                    <input type="number"
                           onInput={(e)=>manager.updateEdgeAttr(edgeVal,"weight",e.currentTarget.value)}
                           value={getPropableEdgeAttributes("weight")} className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Text Size</span>
                    <input type="number"
                           onInput={(e)=>manager.updateEdgeAttr(edgeVal,"weightTextSize",e.currentTarget.value)}
                           value={getPropableEdgeAttributes("weightTextSize")} className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <h2>To see other attributes that are not linked visually, you should use the script language , click here </h2>



        </div>
    </div>
}
function InformationTable ({title,defaultVisible}:IAccorditionOptions) {
    const {grapholioManager:manager} = useGrapholio()
    if (!title) title="Option";
    if (!defaultVisible) defaultVisible=false;
    useEffect(() => {
    }, []);
    return (
            <div className="max-h-[300px] overflow-x-auto ">
                <table className="table bg-neutral-800  table-pin-rows">
                    <thead>
                    <tr>
                        <td>Edge Id</td>
                        <td>node1</td>
                        <td>node2</td>
                        <td>weight</td>
                        <td>Directed</td>

                    </tr>
                    </thead>
                    <tbody>

                    {

                        manager.getCurrentGraph()?.edges().map(edge=>{
                            const id = edge.split(Separator)[1];
                            const [_node1,_node2] = manager.getCurrentGraph()?.extremities(edge) || [];
                            if (!_node1 || !_node2) return

                            const node1Display = manager.getCurrentGraph()?.getNodeAttribute(_node1,"displayName")
                            const node2Display = manager.getCurrentGraph()?.getNodeAttribute(_node2,"displayName")
                            const node1 = _node1?.split(Separator)[1];
                            const node2 = _node2?.split(Separator)[1];
                            const weight = manager.getCurrentGraph()?.getEdgeAttribute(edge,"weight");
                            const directed = manager.getCurrentGraph()?.isDirected(edge)

                            return (
                                <tr key={edge}>
                                    <td className={"font-bold cursor-pointer hover:bg-green-600"}
                                        onMouseEnter={()=>manager.HighlightEdge(edge,{turn:"on"})}
                                        onMouseLeave={()=>manager.HighlightEdge(edge,{turn:"off"})}
                                    >{id}</td>
                                    <td className={"font-bold cursor-pointer hover:bg-green-600"}
                                        onMouseEnter={()=>manager.HighlightNode(_node1,{turn:"on"})}
                                        onMouseLeave={()=>manager.HighlightNode(_node1,{turn:"off"})}
                                    >{node1Display} {(node1 != node1Display) && (" id("+node1+")")}</td>
                                    <td className={"font-bold cursor-pointer hover:bg-green-600"}
                                        onMouseEnter={()=>manager.HighlightNode(_node2,{turn:"on"})}
                                        onMouseLeave={()=>manager.HighlightNode(_node2,{turn:"off"})}
                                    >{node2Display} {(node2 != node2Display) && (" id("+node2+")")}</td>
                                    <td>{weight === undefined ? "-": weight}</td>
                                    <td>{directed ? "yes" : "no"}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
    );
}
function EdgesOperations() {

    return (
        <div className={"p-2"}>
           <Accordion>
               <InformationTable title={"Information Table"} />
               <EdgeDetails title={"Selected Edge Details"}   accordation={Accoradations.DETAILS} />
           </Accordion>
        </div>
    );
}

export default EdgesOperations;