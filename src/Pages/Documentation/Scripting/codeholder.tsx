import  { useEffect, useRef } from 'react';
//import {  Controlled as CodeMirror } from 'react-codemirror2';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';

function CodeMirrorComponent( {code}:{code: string}) {
    const codeRef = useRef(null);

    useEffect(() => {
        if (!codeRef ||!codeRef.current) return
        const editor = new CodeMirror(codeRef.current, {
            value: code,
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true,
            readOnly: true
        });

        return () => {
            editor.display.wrapper.remove()
        };
    }, []);

    return (
        <div className="mockup-code" ref={codeRef}>
        </div>
    );
}

export default CodeMirrorComponent;
