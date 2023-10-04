import {FaCircle} from "react-icons/fa";
import {useEffect} from "react";
import {Link} from "react-router-dom";

function Landing() {
    useEffect(() => {
        document.getElementsByClassName("animated")[0].addEventListener('animationend', (e) => {
            // This function will be called when the animation ends
            const elem = (e.currentTarget as HTMLElement);
            const ow = "80px"
            const oh = "80px"

            elem.style.left = "50%" ;
            elem.style.width = window.innerWidth +"px";
            elem.style.height = "12px";

            setTimeout(()=>{
                elem.style.width = ow
                elem.style.height = oh
                const hiddenanimated = document.getElementsByClassName("hidden")
                Array.from(hiddenanimated).map(elem=> {
                    const ele = (elem as HTMLElement)
                    ele.style.display = "block"
                })

            },500)
            setTimeout(()=>{
                const hiddenanimated = document.getElementsByClassName("invisible")
                Array.from(hiddenanimated).map(elem=> {
                    const ele = (elem as HTMLElement)
                    ele.style.visibility = "visible"

                })
            },700)

            setTimeout(()=>{
                const hiddenanimated = document.getElementsByClassName("opacity-0")
                Array.from(hiddenanimated).map(elem=> {
                    const ele = (elem as HTMLElement)
                    ele.style.opacity = "1"

                })
            },800)




        });
    }, []);

    return (
        <div className="h-screen overflow-hidden ">
            <div className="h-3/6 lg:h-4/6 overflow-hidden relative">
                <span className="animated z-40 w-[62px] h-[62px] bg-slate-300 rounded-full absolute top-2/3 left-[calc(50%-30px)] transform -translate-x-1/2 -translate-y-1/2  animate-slideIn">
                    <span className="hidden z-0  animated_prim text-primary absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                    <FaCircle className="w-[80px] h-[80px]    text-primary" />
                    </span>
                    <span className="hidden z-0  absolute animated_info top-1/2 left-full transform -translate-x-1/2 -translate-y-1/2">
                    <FaCircle className="w-[80px] h-[80px]    text-info" />
                    </span>
                    <span className="invisible z-0  absolute animated_info  top-1/2 -translate-y-1/2">
                    <FaCircle className="w-[80px] h-[80px]    text-slate-300" />
                    </span>
                </span>
                 <span className="  select-none opacity-0 transition duration-1000 text-2xl z-50 absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base-100 font-bold">Grapholio</span>
            </div>
            <div className={"h-2/6 lg:h-1/6  text-center tillLg:space-y-4 lg:space-x-8 lg:flex flex-wrap justify-center items-center "}>
                <Link  to={"/application"} className={"opacity-0 transition duration-1000 btn lg:btn-lg btn-outline btn-primary w-[calc(50%+36px)] lg:w-1/4 "}>Playground</Link>
                <Link  to={"/documentation"} className={"opacity-0 transition duration-1000 btn lg:btn-lg btn-outline btn-secondary w-[calc(50%+36px)] lg:w-1/4 "}>Documentation</Link>
            </div>
            <div className={"h-1/6 w-full text-center  flex-wrap justify-center items-center"}>
                <a href = "mailto:ji_djida@esi.dz" className={"opacity-0 transition duration-1000 btn lg:btn-lg btn-outline btn-primary w-[calc(50%+36px)]"}>ji_djida@esi.dz</a>
                <footer className={"mt-5 opacity-0"}><a href = "mailto:admin@djidax.com"  className={"w-full text-center"}>Djidax 2023</a></footer>

            </div>

        </div>

    );
}
export default Landing;