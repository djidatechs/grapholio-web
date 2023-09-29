import NodesScripts from "./Scripting/Nodes.tsx";
import EdgesScripts from "./Scripting/Edges.tsx";
import Control from "./Scripting/clear.tsx";
import Optimisation from "./Scripting/Optimisation.tsx";

import {lazy, Suspense} from "react";
import Loading from "../Loading.tsx";
const CodeMirrorComponent = lazy(() => import("./Scripting/KruskalExample.tsx"));


export default function Scripting () {
    return (
        <div className={"mb-24"}>
            <div className={"space-y-2 text-xl "}>
                <h1 className={"text-3xl text-primary font-bold mb-5"}>Scripting</h1>

                <p  className={"text-justify p-2 border-warning border-2 capitalize"}>
                    This tool uses your browser to run code in a local scope for the most part,
                    if you try to use Browser-specific javascript function
                    it won't cause any problems <br/>
                    The use of functions like console,
                    document, window ,.. is deliberately discouraged just to keep the idea behind this editor, if you are not
                    a developer it is recommended to learn learn the least minimum about javascript APIs <br/>
                    You can think of this editor as any other editor, only the built-in functions that you will learn about in this section are going to trigger specific bihaviour

                </p>
                <div className={" my-3 space-y-3 text-xl "} id={"1"}>
                    <h2 className={"mt-10 text-2xl text-accent  font-bold"}>Built-in Functions</h2>
                    <h2 className={"mt-10 text-2xl pb-4 text-accent/50  font-bold"}>These functions control the graph logically and visually at the same time</h2>
                    <NodesScripts/>
                    <EdgesScripts/>
                    <Control/>
                </div>
                <div className={" my-6 pt-6 space-y-3 text-xl "} id={"2"}>
                    <h2 className={"mt-10 text-2xl text-accent  font-bold"}>Optimisation</h2>
                    <Optimisation/>
                </div>

                <div className={" my-6 pt-6 space-y-3 text-xl "} id={"3"}>
                    <h2 className={"mt-10 text-2xl text-accent  font-bold"}>Examples</h2>
                    <Suspense fallback={<Loading/>}>
                    <CodeMirrorComponent/>
                    </Suspense>
                </div>

            </div>

        </div>
    )
}
