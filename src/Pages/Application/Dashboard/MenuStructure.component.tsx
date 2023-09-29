import React, {useEffect, useRef} from "react";
import {naturalDashboardWidth, resizeEventIdSaver} from "../../../Constants.ts";

interface Created {
    children: React.ReactNode;
}

export function MenuStructureComponent({children}: Created) {
    const controllerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const styleInShow = "absolute text-sm lg:text-sm 2xl:text-base z-50  -right-4 top-1/2  p-2 2xl:p-2 r rounded-xl bg-green-600 font-extrabold hover:bg-green-700 cursor-pointer"
    const styleInHide =  'absolute text-sm lg:text-sm 2xl:text-base z-50  -right-7 top-1/2  p-2 2xl:p-2  rounded-none rounded-r-xl bg-green-600 font-extrabold hover:bg-green-700 cursor-pointer'

    const handleMouseMove = ( e:any) =>  {
        if (controllerRef.current?.innerHTML === "&gt;") return
        if (controllerRef.current) controllerRef.current.style.visibility = "hidden"
        const newWidth = Math.min(Math.max(e.clientX * 100 / window.innerWidth, 25), 60)
        if (containerRef.current) containerRef.current.style.width = newWidth + '%';
        if (containerRef.current) containerRef.current.style.minWidth = newWidth + '%';
        const _op= document.getElementById("_OPERATIONS_ID")
        const _ly= document.getElementById("LAYOUT_ID")
        if (_op && contentRef.current?.style ) _op.style.height = (window.innerHeight - _op.offsetTop - 70)+"px"


        if (_ly) _ly.style.height = (window.innerHeight - 68 )+"px"
    }

    const handleClick = () =>{
        if ( !contentRef?.current || !controllerRef.current) return
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
    const _handleMouseMove = (e:any)=> handleMouseMove ( e)
    const handleResize = (result:boolean ) => {
        const controlButton = controllerRef.current
        if (!controlButton) return
        if (result) {
            document.addEventListener('mousemove', _handleMouseMove);
        }
        if (!result) {
            controlButton.style.visibility = "visible"
            document.removeEventListener('mousemove', _handleMouseMove);
        }
        //if (result) controlButton.addEventListener("click", handleClick );

    }
    const _handleResizeTrue = ()=> handleResize( true)
    const _handleResizeFalse = ()=>   handleResize(false);




    useEffect(() => {

        if ( !contentRef?.current || !controllerRef.current || !containerRef.current) return
        contentRef.current.style.display = "block";
        controllerRef.current.innerHTML = "&lt;";
        controllerRef.current.className = styleInShow
        containerRef.current.style.width = naturalDashboardWidth
        containerRef.current.style.minWidth = naturalDashboardWidth
        const controlButton = controllerRef.current
        if ( controlButton === null) return
        controlButton.addEventListener('mousedown', _handleResizeTrue);
        document.addEventListener('mouseup', _handleResizeFalse );
        controlButton.addEventListener("click", handleClick );

        return () => {
            controlButton.removeEventListener('mousedown', _handleResizeTrue);
            document.removeEventListener('mouseup', _handleResizeFalse );
            controlButton.removeEventListener("click",handleClick  )

        };

    }, []);


    return (
        <div id={resizeEventIdSaver.Container} className={`relative z-40 text-white  w-[33%] `} ref={containerRef}>
            <div ref={controllerRef} />
            <div ref={contentRef} className={`w-full border-r-2  h-full border-green-600 text-white p-2 scrollbar-thin  scrollbar-thumb-green-600 overflow-auto text-xs lg:text-sm xl:text-base `}>
                {children}
            </div>
        </div>
    )
}