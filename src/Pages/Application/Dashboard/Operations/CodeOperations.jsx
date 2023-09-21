import {useEffect, useRef, useState} from "react";

import {  Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import {useGrapholio} from "../../Context.tsx";
import {IoMdArrowRoundBack} from "react-icons/io";
import {BsPlayFill} from "react-icons/bs";
import {BiSolidCopy} from "react-icons/bi";
import {OperationDash} from "../../../../Constants.ts";
import {GrapholioCommandManager} from "../../../../Logic/GraphlolioScriptLanguage/GrapholioCommandManager.ts";
import {TbCircleLetterL} from "react-icons/tb";
import {GrapholioCommandManager_refactor} from "../../../../Logic/GraphlolioScriptLanguage/GCMrefactor.ts";
function CodeOperations() {
        const editor = useRef()
        const wrapper = useRef()
    const container = useRef()
    const logContainer = useRef()

        const {operations , givos ,grapholioManager} = useGrapholio()
        const {code,write} = givos
        const [log , setLog] = useState("")

        const editorWillUnmount = () => {
                write (editor.current.value);
                editor.current.display.wrapper.remove()
        }
        const RunCode = (data)=>{
            console.log(data)
        setLog("[GIVOS] Error : new_node is not defined");
            write(data.data)

    }
        const RunGivosCode= async ()=>{
            const gcm = new GrapholioCommandManager_refactor(grapholioManager)
            //gcm.hookManager(grapholioManager);
            gcm.eval(code)

           /* const requestBody = {text:code}
            fetch("http://localhost:3000/compiler",
                {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: requestBody })
        }).then(res=>res.json()).then(data=>RunCode(data)).catch((m)=>console.log(m))*/

    }


        const handleChange = (editor, data, value) => write(value)






        return (
            <div className={"p-2 h-[90%] overflow-hidden"}>
                <div className="flex flex-wrap align-bottom" >
                    <IoMdArrowRoundBack
                        onClick={()=>operations.operateOn(OperationDash.INFO)}
                        className={"flex-auto h-8 w-8  fill-primary hover:fill-secondary hover:scale-125 transition duration-200 cursor-pointer"}/>
                    <BsPlayFill
                        onClick={RunGivosCode}
                        className={"flex-auto h-8 w-8  fill-primary hover:fill-secondary hover:scale-125 transition duration-200 cursor-pointer"}/>
                    <BiSolidCopy className={"flex-auto h-7 w-7  fill-primary hover:fill-secondary hover:scale-125 transition duration-200 cursor-pointer"}/>
                    <TbCircleLetterL
                        onClick={e=>{
                            const dis = logContainer.current.style.display
                            container.current.style.height = (dis === "block" ||dis === "") ? "100%" : "50%"
                            const  oh = container.current?.clientHeight ;
                            if (oh && wrapper.current?.ref?.style )  wrapper.current.ref.style.height = oh+"px" ;
                            logContainer.current.style.display = (dis === "block" ||dis === "") ? "none" : "block"




                        }}
                        className={"flex-auto h-7 w-7  text-primary hover:text-secondary hover:scale-125 transition duration-200 cursor-pointer"}/>
                </div>
                <div className="divider">JAVASCRIPT</div>
                <div ref={container} className={"h-[50%] w-full overflow-scroll scrollbar-thin scrollbar-thumnb-primary bg-[#282a36]"}>

                    <CodeMirror
                        className={" text-[16px] overflow-hidden p-0"}
                        ref={wrapper}
                        options={{
                                mode: 'javascript',
                                theme:'dracula',
                                lineNumbers: true,
                                scrollbarStyle: 'null',
                        }}

                        value={code}
                        onBeforeChange={handleChange}
                        editorDidMount={(e) => {
                            editor.current = e
                            const  oh = container.current?.clientHeight ;
                            if (oh && wrapper.current?.ref?.style )  wrapper.current.ref.style.height = oh+"px" ;

                        }}
                        editorWillUnmount={editorWillUnmount}
                    />
                </div>
                <div ref={logContainer} className={" h-50%]"}>
                   <div className="divider ">LOG</div>
                    <div className={"p-1"}>{log}</div>
                </div>
            </div>

        );
}

export default CodeOperations;