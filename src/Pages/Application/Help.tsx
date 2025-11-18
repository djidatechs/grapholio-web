import {useEffect} from "react";
import {useGrapholio} from "./Context.tsx";
import {HelperValue} from "../../Constants.ts";

export function HelpModal () {
    const helper = useGrapholio().helper
    useEffect(() => {
        if (helper.get === undefined || helper.get.message === undefined) return ;
        (document.getElementById('my_modal_5')as HTMLDialogElement ).showModal()


    }, [helper.get , helper.get?.message]);
    if (helper.get === undefined || helper.get.message === undefined) return <></>
    return  (
        <dialog id="my_modal_5" className="modal modal-middle">
            <div className="modal-box ">
                <h3 className="font-bold text-lg">{helper.get.message}</h3>
                <pre className="py-4 whitespace-pre-wrap">{helper.get.description}</pre>
            </div>
            <form method="dialog" className="modal-backdrop">

                <button
                    onClick={()=>  helper.set(current =>{
                        current = undefined
                        return current
                    })}
                >close</button>
            </form>
        </dialog>
    )
}


export function HelpDropDown() {
    const helper = useGrapholio().helper
    const edgeControlHelper = (current:HelperValue|undefined)=>{
        const c :any = current || {} // move by reference
        c.message = "How to Control an Edge",
            c.description = `to create an edge between two nodes double click on the source node, move the mouse to the target node and double click on it.
            \r\nYou can also create an edge between random nodes with the Random Edge button on the fast control menu.
            \r\nTo change the weight of an edge double click on the weight and change it then click Enter or click on the canvas.
            \r\nTo curve the edge double click on it, move the mouse to where you want to save the curve, and double click again to save.
            \r\nyou can do these and other actions (remove , view details, toggle un/directed in mixed graphs ) by performing a right click on the Edge.
            \r\nTo access the edge in the script you can call it by its source and target nodes  or/and one or many of its attributes 
            \r\nExample\r\nlet N = get_edge(N1 , get_node({label:'A'}) ,  { id : '...' , label : '...' , ... }).`,
            c.media= <></>
        return c
    }
    const nodeControlHelper = (current:HelperValue|undefined)=>{
        const c :any = current || {} // move by reference
        c.message = "How to Control a Node",
            c.description = `Click New Node to add a node, to connect two nodes double click on the source node, move the mouse to the target node and double click on it.
            \r\nTo rename the node double click on the label and change it then click Enter or click on the canvas.
            \r\nyou can do these and other actions (remove , view details ) by performing a right click on the node.
            \r\nTo access the node in the script you can call it by one or many of its attributes 
            \r\nExample\r\nlet N = get_node({ id : '...' , label : '...' , ... }).`,
            c.media= <></>
        return c
    }

    const controlNode = ()=> helper.set(current => nodeControlHelper(current) )
    const controlEdge = ()=> helper.set(current => edgeControlHelper(current) )

    return (
    <span  className="dropdown dropdown-end cr text-white inline-block ml-4 font-bold ">
        <label tabIndex={0} className={"cursor-pointer"} >Help</label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 border-info border-2   rounded-box w-52">
            <li><button onClick={controlNode}>control node</button></li>
            <li><button onClick={controlEdge}>control edge</button></li>
        </ul>
    </span>
    )
}

/*
onClick={()=>  helper.set(current =>{
    let c :any = current || {}
    c.message = "message",
        c.description = "description",
        c.media= <></>
    return c
})}
*/