import Sidebar from "./Documentation/SideBar.tsx";
import {Outlet} from "react-router-dom";
import Loading from "./Loading.tsx";
import {Suspense, useEffect} from "react";

function Documentation() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const elemValue = urlParams.get("elem");
        if (elemValue) document.getElementById(elemValue)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);


    return (
        <div className={"p-relative"}>
            <div className={"flex justify-center"}>
            <div className={"w-full lg:w-[86%] px-3 mx-3 mt-5 lg:mx-0 sm:px-0 max-w-[1500px] "}>

                <div className={"block lg:flex drawer"}>
                    <input id="my-drawer" type="checkbox" className="hidden drawer-toggle"/>
                    <Sidebar />
                    <div className={"lg:pl-10  w-full  lg:w-9/12 "}>
                        <Suspense fallback={<Loading/>}>
                            <label htmlFor="my-drawer" className=" lg:hidden sticky top-2 my-2 border-2 border-base-100 z-40 btn btn-primary drawer-button rounded-md w-full">open menu</label>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
export default Documentation;