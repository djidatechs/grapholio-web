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

                <div className={"flex "}>
                        <Sidebar />
                    <div className={"pl-10  w-9/12 revmd:w-full"}>
                        <Suspense fallback={<Loading/>}>
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