import {useEffect, useRef, useState} from "react";

import {  Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import {useGrapholio} from "../../Context.tsx";
import {IoMdArrowRoundBack} from "react-icons/io";
import {BsPauseBtnFill, BsPlayFill} from "react-icons/bs";
import {BiSolidCopy} from "react-icons/bi";
import {OperationDash} from "../../../../Constants.ts";
//import {GrapholioCommandManager} from "../../../../Logic/GraphlolioScriptLanguage/GrapholioCommandManager.ts";
import {GrapholioCommandManager_refactor} from "../../../../Logic/GraphlolioScriptLanguage/GCMrefactor.ts"
import {TbCircleLetterL} from "react-icons/tb";
function CodeOperations() {
        const editor = useRef(null)
        const wrapper = useRef(null)
        const container = useRef(null)
        const logContainer = useRef(null)
        const pageContainer = useRef(null)

        const [currentCode , setCurrentCode ] = useState("");
        const {operations  ,grapholioManager} = useGrapholio()
        const [log , setLog] = useState([])
        const [runnig , setRunning ] = useState(false);


        const editorWillUnmount = () => {
                editor.current.display.wrapper.remove()
        }
        const RunGivosCode= ()=> {
            setRunning(true);
            fetch("https://grapholio-web-api.onrender.com/compiler", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: currentCode })
            })
                .then(response => response.json())
                .then( async(data) => {
                     let gcm = (new GrapholioCommandManager_refactor(grapholioManager, setLog))
                    if (data.data) await gcm.eval(data.data)
                    else setLog((current) => [...current||[],{content:"# "+data.error,type:"error"}])
                    setRunning(false);
                })
                .catch(error => {
                    setRunning(false);
                    console.error('XOERROR:', error)
                });
        }

        const handleChange = (editor, data, value) => {
            setCurrentCode(value)
            grapholioManager.write(value)
        }
        useEffect(() => {
            setCurrentCode (grapholioManager.graph_script())
        }, []);

        useEffect(()=>{
            container.current.style.height =  "44%"

            const  log_h = logContainer.current?.offsetTop ;
            const  page_h = pageContainer.current?.clientHeight ;
            logContainer.current.style.height = (page_h - log_h -30) +"px"



            fetch("https://grapholio-web-api.onrender.com/compiler", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text: "//nothing"})
            }).then(() => console.log("Givos ... "))

        },[])


        return (
            <div className={"p-2 h-full"}  ref={pageContainer}>
                <div className="flex flex-wrap align-bottom " >
                    <IoMdArrowRoundBack
                        onClick={()=>operations.operateOn(OperationDash.INFO)}
                        className={"flex-auto h-8 w-8  fill-primary hover:fill-secondary hover:scale-105 transition duration-200 cursor-pointer"}/>
                    {
                        !runnig ?
                        <BsPlayFill
                        onClick={RunGivosCode}
                        className={"flex-auto h-8 w-8  fill-primary hover:fill-secondary hover:scale-105 transition duration-200 cursor-pointer"}/>
                        :
                        <BsPauseBtnFill
                        onClick={RunGivosCode}
                        className={"flex-auto h-8 w-8  fill-primary hover:fill-secondary hover:scale-105 transition duration-200 cursor-pointer"}/>
                    }
                    <BiSolidCopy
                        onClick={()=>navigator.clipboard.writeText(currentCode)}
                        className={"flex-auto h-7 w-7  fill-primary hover:fill-secondary hover:scale-105 transition duration-200 cursor-pointer"}/>
                    <TbCircleLetterL
                        onClick={()=>{
                            const dis = logContainer.current.style.display
                            container.current.style.height = (dis === "block" ||dis === "") ? "82%" : "44%"
                            const  oh = container.current?.clientHeight ;
                            if (oh && wrapper.current?.ref?.style )  wrapper.current.ref.style.height = oh+"px" ;
                            if (oh && editor.current?.ref?.style )  editor.current.ref.style.height = oh+"px" ;
                            logContainer.current.style.display = (dis === "block" ||dis === "") ? "none" : "block"




                        }}
                        className={"flex-auto h-7 w-7  text-primary hover:text-secondary hover:scale-105 transition duration-200 cursor-pointer"}/>
                </div>
                <div className="divider ">Code</div>
                <div ref={container} className={" w-full h-[44%] bg-[#282a36]"}>

                    <CodeMirror
                        className={" text-[16px] overflow-hidden p-0"}
                        ref={wrapper}
                        options={{
                                mode: 'javascript',
                                theme:'dracula',
                                lineNumbers: true,
                                scrollbarStyle: 'null',
                        }}

                        value={currentCode}
                        onBeforeChange={handleChange}
                        editorDidMount={(e) => {
                            editor.current = e
                            const  oh = container.current?.clientHeight ;
                            if (oh && wrapper.current?.ref?.style )  wrapper.current.ref.style.height = oh+"px" ;
                        }}
                        editorWillUnmount={editorWillUnmount}
                    />
                </div>
                <div className="divider ">LOG</div>

                <div ref={logContainer} className={"overflow-auto scrollbar-thin scrollbar-track-emerald-950 scrollbar-thumb-primary   "}>
                    <div className={"  font-bold break-words  "}>
                    {
                        ! log.length ? <></>
                        : (
                                log.map((logItem,index) => {

                                    return (


                                            <pre key={"pxk"+index} data-prefix="3" >
                                               <code
                                                   className={
                                                       logItem.type === "normal" && (typeof logItem.content == "string" || typeof logItem.content == "boolean"|| typeof logItem.content == "number"|| !logItem.content )
                                                           ? "pl-1  text-emerald-500 break-words "
                                                           : logItem.type === "warning" ? "pl-1 bg-warning text-warning-content py-1  "
                                                           : "pl-1 bg-error text-error-content py-1  "

                                                   }>{
                                                   typeof logItem.content == "string" || typeof logItem.content == "boolean"|| typeof logItem.content == "number"|| !logItem.content
                                                       ?  index+ "> "+String(logItem.content)
                                                   :  index+ "> Print accepts: string, number, boolean, null, undefiend, or arrays from those types, or nested arrays from those types"
                                               }</code>
                                            </pre>



                                    )
                                })
                            )
                    }
                    </div>
                </div>
            </div>

        );
}

export default CodeOperations;