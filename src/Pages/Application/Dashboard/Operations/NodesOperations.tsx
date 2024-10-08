import {useGrapholio} from "../../Context.tsx";
import {BsCircleFill} from "react-icons/bs";
import Accordion, {IAccorditionOptions} from "./Accordion.tsx";
import {Accoradations} from "../../../../Constants.ts";
import {memo, useEffect, useState} from "react";
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
            <div className="  my-2 w-full">
                <label className="input-group tillLg:input-group-sm  w-full">
                    <span className={"lg:w-24"}>ID</span>
                    <input type="text" value={nodeVal} readOnly className="input tillLg:input-sm  input-bordered min-w-[30px] w-full ml-auto mr-0" />
                </label>
            </div>
            <div className=" my-2 w-full">
                <label className="input-group tillLg:input-group-sm  w-full">
                    <span className={"lg:w-24"}>Label</span>
                    <input type="text"
                           onChange={(e)=>manager.updateNodeAttr(nodeVal,"label",e.currentTarget.value)}
                           value={getPropableNodeAttributes("label")} className="input tillLg:input-sm  input-bordered min-w-[30px] w-full ml-auto mr-0" />
                </label>
            </div>
            <div className=" my-2 w-full">
                <label className="input-group tillLg:input-group-sm  w-full">
                    <span className={"lg:w-24"}>Color</span>
                    <input type="color"
                           onChange={(e)=>manager.updateNodeAttr(nodeVal,"color",e.currentTarget.value)}
                           value={getPropableNodeAttributes("color")} className="input tillLg:input-sm  input-ghost   p-0  min-w-[30px] w-full ml-auto mr-0" />
                </label>
            </div>
            <div className=" my-2 w-full">
                <label className="input-group tillLg:input-group-sm  w-full">
                    <span className={"lg:w-24"}>Size</span>
                    <input type="number"
                           onChange={(e)=>manager.updateNodeAttr(nodeVal,"size",e.currentTarget.value)}
                           value={getPropableNodeAttributes("size")} className="input tillLg:input-sm  input-bordered min-w-[30px] w-full ml-auto mr-0" />
                </label>
            </div>
            <div className=" my-2 w-full">
                <label className="input-group tillLg:input-group-sm  w-full">
                    <span className={"lg:w-24"}>Text Size</span>
                    <input type="number"
                           onChange={(e)=>manager.updateNodeAttr(nodeVal,"text_size",e.currentTarget.value)}
                           value={getPropableNodeAttributes("text_size")} className="input tillLg:input-sm  input-bordered min-w-[30px] w-full ml-auto mr-0" />
                </label>
            </div>
            <h2>To see other attributes that are not linked visually, you should use the script language </h2>



        </div>
    </div>
}

const MemoNodeLine = memo(NodeLine)
function InformationTable ({title,defaultVisible,accordation}:IAccorditionOptions){

    if (!title) title="Option";
    if (!defaultVisible) defaultVisible=false;
    if (!accordation) accordation=undefined
    const {grapholioManager:manager,operations} = useGrapholio()


    return operations.RequestValue &&(
        <div className="max-h-[300px] overflow-x-auto ">
            <table className="table bg-neutral-800  table-pin-rows table-xs lg:table-sm">
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
                        const degree = manager.getCurrentGraph()?.degree(node) || 0;
                        const color = manager.getCurrentGraph()?.getNodeAttribute(node,"color");
                        return  <MemoNodeLine key={node} node={node} color={color} degree={degree} display={display}/>
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

function NodeLine ({node,degree,color,display}:{node:string,degree:number,color:string,display:string}){
    const {grapholioManager:manager} = useGrapholio()

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
                onChange={(e)=>manager.updateNodeAttr(node,"label",e.currentTarget.value)}
                className={"w-full border-none p-0 m-0"} value={display.toString()}/>
            </td>

            <td>{degree || 0}</td>
            <td><BsCircleFill style={{color:color}} className={"w-5 h-5"} /></td>
        </tr>
    )
}
function NodesOperations() {

    return (
        <div className="p-2 overflow-auto">
          <Accordion>
              <InformationTable title={"Information Table"} accordation={Accoradations.INFO}  />
              <NodeDetails title={"Selected Node Details"}   accordation={Accoradations.DETAILS} />
          </Accordion>
        </div>
    );
}

export default NodesOperations;