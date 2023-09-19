import {useGrapholio} from "../../Context.tsx";
import {BsCircleFill} from "react-icons/bs";
import Accordion, {IAccorditionOptions} from "./Accordion.tsx";
import {Accoradations, Separator} from "../../../../Constants.ts";
import {useEffect, useState} from "react";
//import {useEffect} from "react";

export function NodeDetails ({title,defaultVisible,accordation}:IAccorditionOptions){
    const {grapholioManager:manager,operations} = useGrapholio()
    const [nodeVal,setNode] = useState<string|undefined>(undefined)

    if (!title) title="Option";
    if (!defaultVisible) defaultVisible=false;
    if (!accordation) accordation=undefined
    useEffect(() => {
        console.log("NODE DATAILS RERENDERED")
        setNode(operations.accordation.Item)
    }, [operations.accordation.Item]);
    const getPropableNodeAttributes = (attr:string)=>{
        console.log({attr})
        let T:any = ""
        try {
         T = manager.getCurrentGraph()?.getNodeAttribute(nodeVal,attr)
        }catch {
            setNode(undefined)
            return ""
        }
        return T
    }

    /*
    useEffect(() => {
        if (node) manager.HighlightNode(node,{turn:"on"})

        return ()=> {
            if (node) manager.HighlightNode(node, {turn: "off"})
        }
    }, [operations.accordation.Item]);
    */

    if (nodeVal === undefined) return



    return <div>
        <div className={"space-y-5"}>
            <h1>Node Properties</h1>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>ID</span>
                    <input type="text" value={nodeVal?.split(Separator)[1]} className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Label</span>
                    <input type="text"
                           onInput={(e)=>manager.updateNodeAttr(nodeVal,"displayName",e.currentTarget.value)}
                           value={getPropableNodeAttributes("displayName")} className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Color</span>
                    <input type="color"
                           onInput={(e)=>manager.updateNodeAttr(nodeVal,"color",e.currentTarget.value)}
                           value={getPropableNodeAttributes("color")} className="input input-ghost   p-0  w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Size</span>
                    <input type="number"
                           onInput={(e)=>manager.updateNodeAttr(nodeVal,"size",e.currentTarget.value)}
                           value={getPropableNodeAttributes("size")} className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Text Size</span>
                    <input type="number"
                           onInput={(e)=>manager.updateNodeAttr(nodeVal,"textSize",e.currentTarget.value)}
                           value={getPropableNodeAttributes("textSize")} className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <h2>To see other attributes that are not linked visually, you should use the script language , click here </h2>



        </div>
    </div>
}
function InformationTable ({title,defaultVisible,accordation}:IAccorditionOptions){

    if (!title) title="Option";
    if (!defaultVisible) defaultVisible=false;
    if (!accordation) accordation=undefined
    const {grapholioManager:manager,operations} = useGrapholio()
    useEffect(() => {
        console.info("node InformationTable RERENDERED")
    }, []);
    return operations.RequestValue &&(
        <div className="max-h-[300px] overflow-x-auto ">
            <table className="table bg-neutral-800  table-pin-rows">
                <thead>
                <tr>
                    <td>Node Id</td>
                    <td>Display Name</td>
                    <td>Degree</td>
                    <td>color</td>

                </tr>
                </thead>
                <tbody>

                {

                    manager.getCurrentGraph()?.nodes().map(node=>{
                        const nodeId = node.split(Separator)[1]
                        const display = manager.getCurrentGraph()?.getNodeAttribute(node,"displayName");
                        const degree = manager.getCurrentGraph()?.degree(node);
                        const color = manager.getCurrentGraph()?.getNodeAttribute(node,"color");

                        return (
                            <tr key={node}>
                                <td className={"font-bold cursor-pointer hover:bg-green-600"}
                                    onMouseEnter={()=>manager.HighlightNode(node,{turn:"on"})}
                                    onMouseLeave={()=>manager.HighlightNode(node,{turn:"off"})}
                                >{nodeId}</td>
                                {//<td></td>
                                     }
                                <td><input
                                    type={"text"}
                                    onInput={(e)=>manager.updateNodeAttr(node,"displayName",e.currentTarget.value)}
                                    className={"w-full border-none p-0 m-0"} value={display.toString()}/>
                                </td>

                                <td>{degree || 0}</td>
                                <td><BsCircleFill style={{color:color}} className={"w-5 h-5"} /></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
function NodesOperations() {
    useEffect(() => {
        console.info("NODE OPERATIONS RERENDERED")
    }, []);
    return (
        <div className="p-2 overflow-x-auto">
          <Accordion>
              <InformationTable title={"Information Table"} accordation={Accoradations.INFO}  />
              <NodeDetails title={"Selected Node Details"}   accordation={Accoradations.DETAILS} />
          </Accordion>
        </div>
    );
}

export default NodesOperations;