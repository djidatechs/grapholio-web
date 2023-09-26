import React, {useEffect, useRef} from "react";
import {naturalDashboardWidth, resizeEventIdSaver} from "../../../Constants.ts";

interface Created {
    children: React.ReactNode;
}

export function MenuStructureComponent({children}: Created) {
    const controllerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const styleInShow = "absolute z-50  -right-4 top-1/2 p-2 r rounded-xl bg-green-600 font-extrabold hover:bg-green-700 cursor-pointer"
    const styleInHide =  'absolute z-50  -right-7 top-1/2 p-2  rounded-none rounded-r-xl bg-green-600 font-extrabold hover:bg-green-700 cursor-pointer'


    interface referenceHolder  {
        value : boolean,
    }




    useEffect(() => {
        //ok
        const handleMouseMove = (fullwidth:number, isResizing:referenceHolder , resizableDiv:any , e:any) =>  {

            if (!isResizing.value) return;
            if (controllerRef.current?.innerHTML === "&gt;") return
            controlButton.style.visibility = "hidden"
            const newWidth = Math.min(Math.max(e.clientX * 100 / fullwidth, 10), 60)
            resizableDiv.style.width = newWidth + '%';
            resizableDiv.style.minWidth = newWidth + '%';
        }

        const handleClick = (isResizing:referenceHolder) => ()=>{
            if (isResizing.value || !contentRef?.current || !controllerRef.current) return
            contentRef.current.style.display = contentRef.current.style.display === "none" ? "block" : "none" ;
            if (contentRef.current.style.display=="none") {
                if (containerRef?.current?.style) containerRef.current.style.minWidth = "0%"
                if (containerRef?.current?.style) containerRef.current.style.width = "0%"
                controllerRef.current.innerHTML = "&gt;";
                controllerRef.current.className = styleInHide
            } else {
                if (containerRef?.current?.style) containerRef.current.style.width = naturalDashboardWidth
                if (containerRef?.current?.style) containerRef.current.style.minWidth = naturalDashboardWidth
                controllerRef.current.innerHTML = "&lt;";
                controllerRef.current.className = styleInShow
            }
        }
        const handleResize = (_v:referenceHolder,result:boolean ) => {
            _v.value = result
            const controlButton = controllerRef.current
            if (!controlButton) return
            controlButton.style.visibility = "visible"
            if (result) controlButton?.removeEventListener("click",_handleClick )

        }
        //init
        const isResizing : referenceHolder = {value:false};
        //safe
        if ( !contentRef?.current || !controllerRef.current || !containerRef.current) return
        //init menu
        contentRef.current.style.display = "block";
        controllerRef.current.innerHTML = "&lt;";
        controllerRef.current.className = styleInShow
        const fullwidth = window.innerWidth
        containerRef.current.style.width = naturalDashboardWidth
        containerRef.current.style.minWidth = naturalDashboardWidth
        if (!fullwidth) return;
        const resizableDiv = containerRef.current
        const controlButton = controllerRef.current
        if (resizableDiv === null || controlButton === null) return

        const _handleResizeTrue = ()=> handleResize(isResizing, true)
        const _handleResizeFalse = ()=>   handleResize(isResizing,false);
        const _handleClick = handleClick(isResizing);
        const _handleMouseMove = (e:any)=> handleMouseMove (fullwidth, isResizing , resizableDiv , e)
        controlButton.addEventListener('mousedown', _handleResizeTrue);
        document.addEventListener('mousemove', _handleMouseMove);
        document.addEventListener('mouseup', _handleResizeFalse );
        controlButton.addEventListener("click", ()=>_handleClick );

        document.addEventListener('mouseup', async ()=> {
        document.addEventListener("click", ()=>controlButton.addEventListener("click", _handleClick ) );

        controlButton.click()
        });

        return () => {
            controlButton.removeEventListener("click", _handleClick )
            document.removeEventListener('mousemove', _handleMouseMove);
            document.removeEventListener('mouseup', _handleResizeFalse );
            controlButton.removeEventListener('mousedown', _handleResizeTrue);

        };

    }, []);


    return (
        <div id={resizeEventIdSaver.Container} className={`relative z-40 text-white h-screen w-[33%] `} ref={containerRef}>
            <div ref={controllerRef}/>
            <div ref={contentRef} className={`w-full border-r-2  h-full border-green-600 text-white p-2 scrollbar-thin  scrollbar-thumb-green-600 overflow-y-auto `}>
                {children}
            </div>
        </div>
    )
}