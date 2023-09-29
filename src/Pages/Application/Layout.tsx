import {Link} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard.tsx";
import BlackBoard from "./BlackBoard/BlackBoard.tsx";
import GrapholioProvider, {useGrapholio} from "./Context.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ChangeEvent, useRef} from "react";

export default function AppWrapper () {

    return (
        <GrapholioProvider>
            <div className={"sm:hidden overflow-hidden absolute w-screen h-screen bg-black opacity-70 z-[999] text-lg xl:text-xl font-bold"}><div className={"absolute w-full text-center top-1/2"}>Sorry :( this application is for wider screens</div></div>
            <div className={"bg-black overflow-hidden select-none h-screen min-h-screen max-h-screen "}>
                <Navbar/>
                <div id={"LAYOUT_ID"} className=" mt-[65px] max-h-[calc(100vh-68px)] ">
                   <Boards/>
                </div>
            </div>
            <ToastContainer/>

        </GrapholioProvider>
    )
}

function Boards () {

    return (
        <div className="flex">
            <Dashboard/>
            <BlackBoard/>
        </div>
    )
}




function Navbar () {
    const inputRef = useRef<HTMLInputElement>(null)
    const {grapholioManager:manager,application} = useGrapholio()

    function downloadURI(uri:string, name:string) {
        var link : HTMLAnchorElement|undefined = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        link = undefined
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files === null ) return;
        if (e.target.files.length === 0) return;

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            const file = e.target?.result
            if (typeof file === "string" ){
                manager.import(file);
                application.apply();
            }
            if ( inputRef.current) inputRef.current.value=""
        };
    };
    return (
        <><input type="file" ref={inputRef} onChange={handleChange} className={"appearance-none hidden  "} />
        <div className="fixed text-sm md:text-lg w-full drop-shadow-md  top-0 left-0 right-0 h-16 bg-green-600 z-50 transition-all ease duration-150 flex">
            <div className="flex items-center space-x-5 h-full w-full px-10 sm:px-20">
                <Link className="flex items-center" to="/application">
                    <span className="text-white inline-block ml-3 font-bold truncate">Grapholio</span>
                </Link>
                <div className=" flex justify-end items-center flex-1">

                    <span
                        className='text-white inline-block ml-4 font-bold cursor-pointer truncate'
                        onClick={()=>inputRef.current?.click()}>Import
                    </span>

                    <span className="text-white inline-block ml-4 font-bold cursor-pointer truncate"
                        onClick={ ()=>{
                            let exportation = manager.export()
                            let dataStr = exportation?.result
                            if (!dataStr) return
                            dataStr = "data:text/json;charset=utf-8,"+encodeURIComponent(dataStr)

                            const dlAnchorElem = document.createElement("a");
                            dlAnchorElem.setAttribute("href",     dataStr     );
                            dlAnchorElem.setAttribute("download", `${exportation?.fileName}.json`);
                            dlAnchorElem.click();
                        } }
                    >Export</span>
                    <span
                        onClick={()=> {
                            const saveuri=  manager.saveImage()
                            const name = manager.getCurrentGraph()?.getAttribute("name")
                            if (saveuri && typeof name === "string")
                                downloadURI(saveuri, name )
                        }}
                        className="text-white inline-block ml-4 font-bold cursor-pointer truncate">Download as Image</span>
                    <span
                        onClick={()=>window.open("/documentation", '_blank')}
                        className="text-white inline-block ml-4 font-bold cursor-pointer truncate">Documentation</span>
                    <span className="text-white inline-block ml-4 font-bold cursor-pointer truncate">Support</span>
                </div>
            </div>
        </div>
        </>
    )
}