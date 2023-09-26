import {useGrapholio} from "../../Context.tsx";
import {BsCircleFill} from "react-icons/bs";
import Accordion, {IAccorditionOptions} from "./Accordion.tsx";
import {Accoradations} from "../../../../Constants.ts";
import {useEffect, useState} from "react";
//import {useEffect} from "react";

export function NodeDetails ({title,defaultVisible,accordation}:IAccorditionOptions){
    const {grapholioManager:manager,operations} = useGrapholio()
    const [nodeVal,setNode] = useState<string|undefined>(undefined)

    if (!title) title="Option";
    if (!defaultVisible) defaultVisible=false;
    if (!accordation) accordation=undefined
    useEffect(() => {
        setNode(operations.accordation.Item)
    }, [operations.accordation.Item]);
    const getPropableNodeAttributes = (attr:string)=>{
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
                    <input type="text" value={nodeVal} className="input input-bordered w-72 ml-auto mr-0" />
                </label>
            </div>
            <div className="form-control my-2 w-full">
                <label className="input-group w-full">
                    <span>Label</span>
                    <input type="text"
                           onInput={(e)=>manager.updateNodeAttr(nodeVal,"label",e.currentTarget.value)}
                           value={getPropableNodeAttributes("label")} className="input input-bordered w-72 ml-auto mr-0" />
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
                           onInput={(e)=>manager.updateNodeAttr(nodeVal,"text_size",e.currentTarget.value)}
                           value={getPropableNodeAttributes("text_size")} className="input input-bordered w-72 ml-auto mr-0" />
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
                        const display = manager.getCurrentGraph()?.getNodeAttribute(node,"label");
                        const degree = manager.getCurrentGraph()?.degree(node);
                        const color = manager.getCurrentGraph()?.getNodeAttribute(node,"color");

                        return (
                            <tr key={node}>
                                <td className={"font-bold cursor-pointer hover:bg-green-600"}
                                    onMouseEnter={()=>manager.HighlightNode(node,{turn:"on"})}
                                    onMouseLeave={()=>manager.HighlightNode(node,{turn:"off"})}
                                >{node}</td>
                                {//<td></td>
                                     }
                                <td><input
                                    type={"text"}
                                    onInput={(e)=>manager.updateNodeAttr(node,"label",e.currentTarget.value)}
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