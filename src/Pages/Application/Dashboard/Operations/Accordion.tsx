import {
    Children,
    isValidElement,
    ReactNode, useEffect, useRef,
} from "react";
import {Accoradations} from "../../../../Constants.ts";
import {useGrapholio} from "../../Context.tsx";
export interface IAccorditionOptions{
    title:string
    defaultVisible? : boolean
    accordation? : Accoradations
}

const ClickCollapse = (event:any) => {
    const others = document.querySelectorAll("#collapseId");

    const cname = event.currentTarget.parentElement?.className
    if (cname.includes("collapse-open")) {
        event
            .currentTarget.parentElement.className = cname
            .replace("collapse-open", "collapse-close")
            .replace("border-none","border")

            .replace("overflow-x-auto","overflow-x-hidden")

        others
            .forEach((other) => {
                other.className = other.className.replace(" hidden ", ' special ')
            })
    } else if (cname.includes("collapse-close")) {
        event
            .currentTarget.parentElement.className = cname
            .replace("collapse-close", "collapse-open")
            .replace("border","border-none")
            .replace("overflow-x-hidden","overflow-x-auto")

        others
            .forEach((other) => {
                if (other !== event.currentTarget.parentElement)
                    other.className = other.className.replace(" special ", ' hidden ')
            })
    }
}
function CollapseElement({child}:{child:any}) {

    const {operations} = useGrapholio();
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (child.props.defaultVisible ||  (operations.accordation.Accordation && (operations.accordation.Accordation === child.props.accordation)   )){
            const collapseElem = ref.current
            if (collapseElem?.className?.includes("collapse-close")){
                (collapseElem?.firstElementChild as HTMLDivElement).click()
            }
        }
            document.getElementById("collapseId")?.click()
    },[
        operations.accordation.Accordation,
        operations.accordation.Item,
        operations.accordation.Type
    ])

    if ( ! isValidElement(child)) return <></>

    return <div
        key={child.key}
        id={"collapseId"}
        ref={ref}
         tabIndex={0}
        className={`collapse   collapse-close overflow-x-hidden  special  border border-primary w-full   scrollbar-thin scrollbar-thumb-primary`}>
        <div onClick={ClickCollapse} className="collapse-title font-semibold cursor-pointer ">
            {(child.props as any).title || "Option"}
        </div>
        <div className="collapse-content">
            {child}
        </div>
    </div>;
}

export default function Accordion({children}:{children :ReactNode}) {



    return <div className={"space-y-3 "}>
        {
            Children.map(children,(child, index) => <CollapseElement key={index}  child={child}/>)
        }

    </div>;
}