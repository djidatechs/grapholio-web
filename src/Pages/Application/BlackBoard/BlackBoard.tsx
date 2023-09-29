import { BlackBoard_Id} from "../../../Constants.ts";
import {useEffect, useRef} from "react";
import {useGrapholio} from "../Context.tsx";
import TestContextual from "./test.Contextual.tsx";
import {EdgeFastControl,  NodeFastControl} from "./ContextualTypesEnums.ts";
import {BiSolidColorFill} from "react-icons/bi";

function FastControl({parent}:{parent:any}) {
    const {grapholioManager : manager} = useGrapholio() ;
    return (
        <div className="z-40 absolute text-black xl:font-semibold 2xl:font-bold select-none text-xs lg:text-sm 2xl:text-base   ">
            <div className={"flex"}>
            <span
                onClick={()=> {
                    manager.clear()
                }}
                className="py-[2px] 2xl:py-1 mr-2 px-2 2xl:px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">X</span>
            <span
                onContextMenu={(event)=>manager.handleFastControl(event, EdgeFastControl)}
                onClick={()=>manager.addRandomEdge()}
                className="py-[2px] 2xl:py-1 mr-2 px-2 2xl:px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">Edge</span>
            <span
                onContextMenu={(event)=>manager.handleFastControl(event,NodeFastControl)}
                onClick={()=> {
                    manager.addNode({})
                }}
                className="py-[2px] 2xl:py-1 mr-2 px-2 2xl:px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">Node</span>
            <span
                onClick={()=> {
                    manager.zoomMinus()
                }}
                className="py-[2px] 2xl:py-1 px-2 2xl:px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">-</span>
            <span
                onClick={()=> {
                    manager.zoomPlus()
                }}
                className="py-[2px] 2xl:py-1 px-2 2xl:px-3 bg-green-600 mr-2  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">+</span>

            <span
                onClick={()=> {
                    const newstate = manager.themeToggle()
                    if (newstate && parent.current?.style) parent.current.style.backgroundColor = "white"
                    if (!newstate && parent.current?.style) parent.current.style.backgroundColor = ""
                }}
                className="py-[2px] 2xl:py-1 px-2 2xl:px-3  bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">
                <BiSolidColorFill className={"inline h-5 w-5"}/>
            </span>
            </div>
        </div>
        );
}

function BlackBoard() {
    const ref = useRef<HTMLDivElement>(null)
    const {grapholioManager : manager,operations,blackBoardMenu} = useGrapholio() ;

    useEffect(() => {
        manager.init({
            container:document.getElementById(BlackBoard_Id) as HTMLDivElement,
            operations,
            blackBoardMenu
        });


    }, []);
    return (
        <div ref={ref} className="p-4 -z-1 text-white w-full h-full overflow-hidden" style={{position: "relative"}}>
            <div className="overflow-auto  scrollbar-thin  scrollbar-thumb-green-600 "
                 style={{height: 'calc(100vh - 100px)'}}>
                <div>
                    <FastControl parent={ref}/>
                    <div id={BlackBoard_Id}/>
                    <TestContextual {...blackBoardMenu.props}/>
                </div>
            </div>
        </div>
    );
}

export default BlackBoard;