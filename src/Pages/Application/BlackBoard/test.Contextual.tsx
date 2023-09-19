import {ContextualDivId, enumsMakerSeperator} from "../../../Constants.ts";
import {RiDragMove2Line} from "react-icons/ri"
import {ContextualEnums, ContextualEnumsTypes, MenuClickEvent} from "./ContextualTypesEnums.ts";
import {useEffect} from "react";
import {useGrapholio} from "../Context.tsx";

export type Icontextual = {
    elementId? : string,
    enumerations? :  ContextualEnumsTypes,
    x?: number,
    y?:number,
    visible? : boolean ,

}

function MenuElements({elementId,actions} : {elementId:string|undefined ,actions: ContextualEnums[]}) {
    const {grapholioManager : manager} = useGrapholio()
    const m_actions = actions.entries()
    console.log({m_actions})
    useEffect(() => {
        let isDragging = false
        const container = document.getElementById("container") as HTMLDivElement;
        const {x,y} = container.getBoundingClientRect()
        const trigger = document.getElementById("container") as HTMLDivElement;
        trigger.addEventListener("mousedown" , ()=>isDragging=true)
        document.addEventListener("mouseup" , ()=>isDragging=false)
        document.addEventListener("mousemove" , (event)=>{
            if (!isDragging) return
            container.style.left = event.x -x +"px"
            container.style.top = event.y  -y + "px"
        })

    }, []);

    return (
        <div id={"container"} className={"p-1  relative text-left bg-slate-200 rounded-xl text-black font-bold z-50 "}>
            <div id={"trigger"} className={"absolute cursor-pointer -left-3 -top-3 p-2 bg-slate-300 rounded-full border-1 border-green-600"}><RiDragMove2Line className={"w-5 h-5 text-black "}/></div>
        {
            actions.map(
                (act,key) => {
                    const valarr = act.split(enumsMakerSeperator)
                    const val = valarr.length === 2 ? valarr[1] : undefined
                    if (val === undefined) return
                    return (
                        <div key={key} className={"hover:bg-green-500 transition duration-300 w-36 rounded-xl  "}>
                            <button
                                onClick={()=>MenuClickEvent(manager,act, elementId)}
                                key={key} className={"w-full h-full p-2"}>{val}</button>
                        </div>)
                }
            )
        }
    </div>);
}

function TestContextual(props : Icontextual) {
    useEffect(() => {
        console.log({enums : props.enumerations})
    }, [props.visible]);
    if (!props.x || !props.y || !props.enumerations ) return <></>
    if (!props.visible) return <></>
    return (

        <div onClick={event=>event.stopPropagation()} className="absolute" id={ContextualDivId} style={{
            left: props.x + 'px',
            top: props.y + -50 + 'px'
        }}>
            <MenuElements elementId={props.elementId}  actions={Object.values(props.enumerations)} />
        </div>
    );
}

export default TestContextual;
