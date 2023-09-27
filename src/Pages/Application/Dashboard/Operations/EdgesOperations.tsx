import {Accoradations} from "../../../../Constants.ts";
import {useGrapholio} from "../../Context.tsx";
import Accordion, {IAccorditionOptions} from "./Accordion.tsx";
import {memo, useEffect, useState} from "react";



function EdgeDetails ({title,defaultVisible,accordation}:IAccorditionOptions){
    const {grapholioManager:manager,operations} = useGrapholio()
    const [edgeVal,setEdge] = useState<string|undefined>(undefined)

    if (!title) title="Option";
    if (!defaultVisible) defaultVisible=false;
    if (!accordation) accordation=undefined
    useEffect(() => {
        setEdge(operations.accordation.Item)
    }, [operations.accordation.Item]);
    const getPropableEdgeAttributes = (attr:string)=>{
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



    return <div key={title}>
        <div className={"space-y-5"}>
            <h1>Edge Properties</h1>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>ID</span>
                    <input type="text" value={edgeVal} readOnly className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Color</span>
                    <input type="color"
                           onChange={(e)=>manager.updateEdgeAttr(edgeVal,"color",e.currentTarget.value)}
                           value={getPropableEdgeAttributes("color")} className="input input-ghost   p-0  w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Weight</span>
                    <input type="number"
                           onChange={(e)=>manager.updateEdgeAttr(edgeVal,"weight",e.currentTarget.value)}
                           value={getPropableEdgeAttributes("weight")} className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Text Size</span>
                    <input type="number"
                           onChange={(e)=>manager.updateEdgeAttr(edgeVal,"text_size",e.currentTarget.value)}
                           value={getPropableEdgeAttributes("text_size")} className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <h2>To see other attributes that are not linked visually, you should use the script language </h2>



        </div>
    </div>
}
const MemoEdgeLine = memo(EdgeLine)

function InformationTable ({title,defaultVisible}:IAccorditionOptions) {
    const {grapholioManager:manager} = useGrapholio()
    if (!title) title="Option";
    if (!defaultVisible) defaultVisible=false;

    return (
            <div key={title} className="max-h-[300px] overflow-x-auto ">
                <table className="table bg-neutral-800  table-pin-rows">
                    <thead>
                    <tr key={"edgeidentif"}>
                        <td key={"Edge Id"}>Edge Id</td>
                        <td key={"node1"}>node1</td>
                        <td key={"node2"}>node2</td>
                        <td key={"weight"}>weight</td>
                        <td key={"Directed"}>Directed</td>

                    </tr>
                    </thead>
                    <tbody key={"tbody edge"}>

                    {

                        manager.getCurrentGraph()?.edges().map((edge)=>{
                            const [node1,node2] = manager.getCurrentGraph()?.extremities(edge) || [];
                            if (!node1 || !node2) return

                            const node1Display = manager.getCurrentGraph()?.getNodeAttribute(node1,"label")
                            const node2Display = manager.getCurrentGraph()?.getNodeAttribute(node2,"label")

                            const weight = manager.getCurrentGraph()?.getEdgeAttribute(edge,"weight");
                            const directed = manager.getCurrentGraph()?.isDirected(edge)

                            return <MemoEdgeLine key={edge} edge={edge} node1={node1} node2={node2}
                                             node1Display={node1Display} node2Display={node2Display}
                                             weight={weight} directed={Boolean(directed)}/>
                        })
                    }
                    </tbody>
                </table>
            </div>
    );
}


function EdgeLine ({edge,node1,node2,node1Display,node2Display,weight,directed}:{edge:string,node1:string,node2:string,node1Display:string,node2Display:string,weight:string,directed:boolean}){
    const {grapholioManager : manager} = useGrapholio()
    return (
        <tr key={edge}>
            <td className={"font-bold cursor-pointer hover:bg-green-600"}
                onMouseEnter={()=>manager.HighlightEdge(edge,{turn:"on"})}
                onMouseLeave={()=>manager.HighlightEdge(edge,{turn:"off"})}
            >{edge}</td>
            <td className={"font-bold cursor-pointer hover:bg-green-600"}
                onMouseEnter={()=>manager.HighlightNode(node1,{turn:"on"})}
                onMouseLeave={()=>manager.HighlightNode(node1,{turn:"off"})}
            >{node1Display} {(node1 != node1Display) && (" id("+node1+")")}</td>
            <td className={"font-bold cursor-pointer hover:bg-green-600"}
                onMouseEnter={()=>manager.HighlightNode(node2,{turn:"on"})}
                onMouseLeave={()=>manager.HighlightNode(node2,{turn:"off"})}
            >{node2Display} {(node2 != node2Display) && (" id("+node2+")")}</td>
            <td>{weight === undefined ? "-": weight}</td>
            <td>{directed ? "yes" : "no"}</td>
        </tr>
    )
}
function EdgesOperations() {

    return (
        <div className={"p-2 overflow-auto"}>
           <Accordion>
               <InformationTable title={"Information Table"} accordation={Accoradations.INFO}  />
               <EdgeDetails title={"Selected Edge Details"}   accordation={Accoradations.DETAILS} />
           </Accordion>
        </div>
    );
}

export default EdgesOperations;