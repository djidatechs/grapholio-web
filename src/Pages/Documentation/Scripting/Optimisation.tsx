
export default function Optimisation () {
    return (
        <>
            <h3 className={"text-xl pt-2 font-bold"}>
                If your machine cannot handle some Algorithms you can
                you can apply this feature to let your browser take its time looping
                without blocking the main thread
            </h3>
            <p>add this leading comment to your loop (for for-of for-in while)</p>
            <div className="mockup-code">
                        <pre data-prefix=">">
                            <code className={"text-warning"}>//@optimise</code>
                        </pre>
                <pre data-prefix=">">
                            <code>for (let x of get_nodes()) {"{"}</code>
                        </pre>
                <pre data-prefix=">">
                            <code>....</code>
                        </pre>
                <pre data-prefix=">">
                            <code>{"}"}</code>
                        </pre>
            </div>




        </>
    )
}