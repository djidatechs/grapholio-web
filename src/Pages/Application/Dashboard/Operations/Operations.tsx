import {lazy, Suspense, useEffect, useRef} from "react";
import {useGrapholio} from "../../Context.tsx";
import {OperationDash} from "../../../../Constants.ts";
import Loading from "../../../Loading.tsx";

const NodesOperations = lazy ( () =>import ("./NodesOperations.tsx"));
const InfoOperations = lazy ( () =>import ("./InfoOperations.tsx"));
const EdgesOperations = lazy ( () =>import ("./EdgesOperations.tsx"));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CodeOperations = lazy(() => import("./CodeOperations.jsx"));


function _Operations() {
    const {operationDash,RequestValue} = useGrapholio().operations

    if (RequestValue)
    switch (operationDash){
        case  OperationDash.INFO : return <InfoOperations/>
        case  OperationDash.NODES : return <NodesOperations/>
        case  OperationDash.EDGES : return <EdgesOperations/>
        case  OperationDash.CODE : return (<Suspense fallback={<Loading/>}><CodeOperations/></Suspense>
        )
        default : return <></>
    }
    return <></>
}


function Operations () {
    const opRef = useRef<HTMLDivElement>(null)
    const {operationDash} = useGrapholio().operations
    const fixposition = ()=>{
        if (opRef.current) {
            const elementTop = opRef.current.getBoundingClientRect().top;
            const distanceToBottom = window.innerHeight - elementTop;
            if (operationDash === OperationDash.CODE) opRef.current.style.height = String(window.innerHeight - 50) + "px"
            else opRef.current.style.height = String(distanceToBottom) + "px";
        }
    }
    useEffect(() => {
       fixposition()
        window.addEventListener('resize',fixposition)


    }, [operationDash]);
    return (
        <div id={"_OPERATIONS_ID"} ref={opRef} className={"w-full  h-full overflow-visible tall:overflow-auto scrollbar-thin scrollbar-thumb-green-600"}>
        <_Operations/>
        </div>)
}
export default Operations;