import { BlackBoard_Id, OperationDash} from "../../../Constants.ts";
import {useEffect} from "react";
import {useGrapholio} from "../Context.tsx";
import TestContextual from "./test.Contextual.tsx";
import {EdgeFastControl, GraphFastControl, NodeFastControl} from "./ContextualTypesEnums.ts";

function FastControl() {
    const {grapholioManager : manager} = useGrapholio() ;
    return (
        <div className="z-40 absolute text-black font-bold select-none">
            <span
                onClick={()=> {
                    manager.clear()
                }}
                className="py-1 mr-2 px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">X</span>
            <span
                onContextMenu={(event)=>manager.handleFastControl(event, EdgeFastControl)}
                onClick={()=>manager.addRandomEdge()}
                className="py-1 mr-2 px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">Edge</span>
            <span
                onContextMenu={(event)=>manager.handleFastControl(event,NodeFastControl)}
                onClick={()=> {
                    manager.addNode({})
                }}
                className="py-1 mr-2 px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">Node</span>
            <span
                onContextMenu={(event)=>manager.handleFastControl(event, GraphFastControl)}
                onClick={()=> {
                    manager.useOperations()?.operateOn(OperationDash.INFO);
                }}
                className="py-1 mr-2 px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">Graph</span>
            <span
                onClick={()=> {
                    manager.zoomMinus()
                }}
                className="py-1 px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">-</span>
            <span
                onClick={()=> {
                    manager.zoomPlus()
                }}
                className="py-1 px-3 bg-green-600  cursor-pointer hover:bg-green-900 transition duration-300 ease-out">+</span>
        </div>
        );
}

function BlackBoard() {
    const {grapholioManager : manager,operations,blackBoardMenu} = useGrapholio() ;

    useEffect(() => {
        manager.init({
            container:document.getElementById(BlackBoard_Id) as HTMLDivElement,
            operations,
            blackBoardMenu
        });


    }, []);
    return (
        <div className="p-4 -z-1 text-white w-full h-full overflow-hidden" style={{position: "relative"}}>
            <div className="overflow-auto  scrollbar-thin  scrollbar-thumb-green-600 "
                 style={{height: 'calc(100vh - 100px)'}}>
                <div>
                    <FastControl/>
                    <div id={BlackBoard_Id}/>
                    <TestContextual {...blackBoardMenu.props}/>
                </div>
            </div>
        </div>
    );
}

export default BlackBoard;