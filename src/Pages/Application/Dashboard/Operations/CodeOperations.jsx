import {useState, useRef, useEffect} from "react";

import {  Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
function CodeOperations() {
        const editor = useRef()
        const wrapper = useRef()
        const editorWillUnmount = () => {
                editor.current.display.wrapper.remove()
                //wrapper.current.hydrated = false
        }
        const [code, setCode] = useState(undefined)


        const handleChange = (editor, data, value) => {
            // Handle code changes
            console.log({editor,data,value})
                setCode(value); // Update the code state with the new value


            };
        useEffect(() => {
        console.log(wrapper.current)
        }, []);

        return (
            <div className={"p-2"}>
                    <CodeMirror
                        className={"text-lg"}
                        ref={wrapper}
                        options={{
                                mode: 'javascript',
                                theme:'dracula',
                                lineNumbers: true,
                                /*extraKeys: {
                                    'Ctrl-Space': (ee) => {
                                        ee.showHint();
                                    }
                                },*/
                        }}

                        value={code}
                        onBeforeChange={handleChange}
                        editorDidMount={(e) => {
                            editor.current = e
                            setCode(`let A = add_node({label:"issam"})\r\nA.label = "djida"`)
                        }}
                        editorWillUnmount={editorWillUnmount}
                    />
            </div>

        );
}

export default CodeOperations;