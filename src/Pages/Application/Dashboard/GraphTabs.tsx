import {MouseEventHandler, MutableRefObject, useRef} from "react";
import {useGrapholio} from "../Context.tsx";
import {
    AllowselfLoops,
    Directed,
    Mixed,
    MultiGraph,
    NoMultiGraph,
    NoSelfLoops,
    OperationDash,
    UnDirected
} from "../../../Constants.ts";


type IDropdownElement = {
    label : string ,
    action? : MouseEventHandler,

}
function DropdownElement({label , action} : IDropdownElement) {
    return <li onClick={action}><a className={"hover:bg-black w-56"}>{label}</a></li>;
}

export default function GraphTabs () {
    const {grapholioManager : manager , application,operations} = useGrapholio()
    const selfloopRef = useRef<HTMLInputElement>()
    const currentNames = manager.getAllGraphsNames()
    const newGraph = (options : any[])=>{
        const combineOpt = {} ;
        options.map(op=> Object.assign(combineOpt, op));
        if (selfloopRef.current?.checked)  Object.assign(combineOpt, AllowselfLoops)
        else  Object.assign(combineOpt, NoSelfLoops)
        const id =  manager.newGraph(undefined,combineOpt);

        manager.switchTo(id);
        operations.operateOn(OperationDash.INFO)

        application.apply();
    }
    if (operations.operationDash ===  OperationDash.CODE) return <></>

    return application.appChange && (
        <div className="border-primary z-50 ">
            <div className="navbar ">
                <div className="flex-1">
                    <a className=" normal-case text-lg xl:text-xl">Graphs</a>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end ">
                        {

                           currentNames.length ?  <label onClick={()=>manager.removeGraph()} className="btn bg-black border-none text-3xl ">-</label> : <></>
                        }
                        <label tabIndex={0} className="btn bg-black border-none text-3xl ">+</label>

                        <ul tabIndex={0}
                            className="dropdown-content overflow-visible  z-50 menu p-2 shadow bg-primary xl:text-lg font-bold rounded-md  ">
                            <li className={"w-full lex flex-col text-sm mb-2 "}>
                                <label className="cursor-pointer label">
                                    <span className="label-text text-white">allow self loops</span>
                                    <input ref={selfloopRef as MutableRefObject<HTMLInputElement>} type="checkbox" className="toggle toggle-primary" defaultChecked={false} />
                                </label>
                            </li>
                            <>
                            <DropdownElement label="Directed Graph" action={()=>newGraph([Directed,NoMultiGraph])}/>
                            <DropdownElement label="Undirected Graph" action={()=>newGraph([UnDirected,NoMultiGraph])}/>
                            <DropdownElement label="Mixed Graph" action={()=>newGraph([Mixed,NoMultiGraph])}/>
                            <DropdownElement label="Multi Directed Graph" action={()=>newGraph([Directed,MultiGraph])}/>
                            <DropdownElement label="Multi Undirected Graph" action={()=>newGraph([UnDirected,MultiGraph])}/>
                            <DropdownElement label="Multi Mixed Graph" action={()=>newGraph([Mixed,MultiGraph])}/>
                            </>
                        </ul>
                    </div>
                </div>
            </div>
            <div
                className="overflow-x-scroll max-w-full scrollbar-thin scrollbar-thumb-primary scrollbar-track-stone-800">
                <div className="tabs tabs-boxed flex whitespace-nowrap pb-3">
                    <ul className="tabs-list">
                        {
                           currentNames.map(({id,name})=>{
                                const active =  id === manager.selectedGraphId()
                                return (
                                    <li
                                        onClick={()=>{
                                            manager.switchTo(id)
                                            application.apply();

                                        }}
                                        id={id}
                                        key={id}
                                        className={` font-bold tab ${active ? 'tab-active':''}`}>
                                        {name}
                                    </li>
                                )})
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}