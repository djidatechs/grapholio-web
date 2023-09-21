
import {
    BsArrowUpRightCircleFill, BsFillInfoCircleFill,
    BsFilterCircleFill,
    BsPlusCircleFill
} from "react-icons/bs"
import {SVGAttributes, useEffect} from "react";
import {OperationDash, resizeEventIdSaver} from "../../../Constants.ts";
import { useGrapholio} from "../Context.tsx";
type IconType = (props: SVGAttributes<SVGElement>) => JSX.Element;
interface IGraphFunction {
    Icon :IconType,
    text: string,
    info?: string,
    action? : ()=>any

}
export default function OperationsChoices () {
    const {operateOn,operationDash, setAccordation} = useGrapholio().operations
    const ResizeAdjustements = ()=>{
        const parentContainer = document.getElementById(resizeEventIdSaver.Container)
        const items = document.querySelectorAll("#"+resizeEventIdSaver.Operation+" > h1")
        console.log({items})

        const resizeObserver = new ResizeObserver((evt) => {
                const {width} = evt[0].contentRect ;
                console.log(width)
                if (width > 125)
                    items.forEach(item => {
                        console.log({class : item.className })
                        item.className = item.className.replace("hidden", "block")
                    });
                else
                    items.forEach(item => {
                        item.className = item.className.replace("block", "hidden")
                    });
        });

        if (parentContainer) resizeObserver.observe(parentContainer);
    }
    useEffect(() => {
        ResizeAdjustements();
    }, []);
    if (operationDash ===  OperationDash.CODE) return <></>

    return (
        <div className="w-full p-2 ">
            <div id={resizeEventIdSaver.Flex} className="flex flex-wrap">
                <GraphFunction
                    Icon={BsPlusCircleFill}
                    text={OperationDash.NODES}
                    info="placeholder"
                action={
                    ()=>{
                        operateOn(OperationDash.NODES)
                        setAccordation(current=>{
                            current.Accordation = undefined
                            current.Type = undefined
                            return current
                        })
                    }
                }/>
                <GraphFunction
                    Icon={BsArrowUpRightCircleFill}
                    text={OperationDash.EDGES}
                    info="placeholder"
                action={
                    ()=>{
                        operateOn(OperationDash.EDGES)
                        setAccordation(current=>{
                            current.Accordation = undefined
                            current.Type = undefined
                            return current
                        })
                    }
                }/>
                <GraphFunction
                    Icon={BsFilterCircleFill}
                    text={OperationDash.CODE}
                    info="placeholder"
                action={
                    ()=>{
                        operateOn(OperationDash.CODE)
                        setAccordation(current=>{
                            current.Accordation = undefined
                            current.Type = undefined
                            return current
                        })
                    }
                }/>
                <GraphFunction
                    Icon={BsFillInfoCircleFill}
                    text={OperationDash.INFO}
                    info={"placeholder"}
                action={
                    ()=>{
                        operateOn(OperationDash.INFO)
                        setAccordation(current=>{
                            current.Accordation = undefined
                            current.Type = undefined
                            return current
                        })
                    }
                }/>

            </div>
        </div>
    )
}


function GraphFunction({Icon, text,info,action}:IGraphFunction){
    return (
        <div
            id={resizeEventIdSaver.Operation}
            data-tip={info}
            onClick={action}
            className=" flex-auto w-28 group px-2 py-3
            tooltip tooltip-right
            cursor-pointer
            text-primary hover:text-white
            text-center
            rounded-xl hover:bg-primary
            transition duration-200">
                <Icon className={"w-8 xl:w-10 h-8 xl:h-10 mx-auto"}/>
            <h1 className="block group-hover:text-white transition duration-200
            font-bold  text-slate-200 text-sm xl:text-base ">{text}</h1>
        </div>
    )

}