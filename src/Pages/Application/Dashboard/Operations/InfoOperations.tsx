import {useGrapholio} from "../../Context.tsx";
import Accordion, {IAccorditionOptions} from "./Accordion.tsx";
import {BiPlay} from "react-icons/bi";
import {SuccessMessage} from "../../../../Logic/GrapholioManager/Messages.ts";
import {
    Accoradations,
    AutoAction,
    DefaultEdgeStrokeWidth,
    DefaultLabelText,
    DefaultNodeSize,
    DefaultWeightText,
    Separator
} from "../../../../Constants.ts";
import {ChangeEvent} from "react";


function InfoTable({title,defaultVisible}:IAccorditionOptions) {
    const {grapholioManager : manager,application} = useGrapholio()
    if (!title) title="Option";
    if (!defaultVisible) defaultVisible=false;
    return <table title={title} className="table bg-neutral-800  table-pin-cols">
        <thead>
        <tr>
            <td>Specification</td>
            <td>Value</td>

        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Name</td>
            <td className={"py-0 m-0"}>
                <input
                    onInput={(e)=> {
                        manager.getCurrentGraph()?.setAttribute("name", e.currentTarget.value)
                        application.apply();
                    }}
                    className={"w-full border-none p-0 m-0"} value={manager.getCurrentGraph()?.getAttribute("name")}/>
            </td>
        </tr>
        <tr>
            <td>Type</td>
            <td>{manager.getCurrentGraph()?.type}</td>
        </tr>
        <tr>
            <td>Multi</td>
            <td>{manager.getCurrentGraph()?.multi ? "yes" : "no"}</td>
        </tr>
        <tr>
            <td>Self loops</td>
            <td>{manager.getCurrentGraph()?.allowSelfLoops ? "yes" : "no"}</td>
        </tr>
        <tr>
            <td>Size</td>
            <td>{manager.getCurrentGraph()?.size}</td>
        </tr>
        <tr>
            <td>Order</td>
            <td>{manager.getCurrentGraph()?.order}</td>
        </tr>
        </tbody>
    </table>;
}

function Checkbox({ label , onChange }:any) {
    return (
        <div className="form-control mb-4">
            <label className="label cursor-pointer">
                <span className="label-text">{label}</span>
                <input onChange={onChange} type="checkbox" defaultChecked className="checkbox" />
            </label>
        </div>
    );
}

function InputField({ label, defaultValue , id } : any) {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input  id={id} defaultValue={defaultValue} type="number" min="0" placeholder={label} className="input input-bordered w-full"  />
        </div>
    );
}

function Styling({ title, defaultVisible }: IAccorditionOptions) {
    const {grapholioManager:manager}= useGrapholio()
    if (!title) title = "Option";
    if (defaultVisible === undefined) defaultVisible = false;

    const handleReset = ()=>{
        localStorage.clear()
        manager.updateLabelsSize( DefaultLabelText() )
        manager.updateNodeSize( DefaultNodeSize())
        manager.updateEdgewidth( DefaultEdgeStrokeWidth() )
        manager.updateEdgeWeightSize(DefaultWeightText())
    }

    const handleSave = (message: string, remmember : boolean) => {
        const labeltext = document.getElementById("inputLabelText")
        const weighttext = document.getElementById("inputWeightText")
        const nodesize = document.getElementById("inputNodeSize")
        const edgewidth = document.getElementById("inputEgeWidth")

        const num_labeltext = parseInt((labeltext as HTMLInputElement).value)
        const num_weighttext = parseInt((weighttext as HTMLInputElement).value)
        const num_nodesize = parseInt((nodesize as HTMLInputElement).value)
        const num_edgewidth = parseInt((edgewidth as HTMLInputElement).value)

        manager.updateLabelsSize( num_labeltext )
        manager.updateNodeSize( num_nodesize)
        manager.updateEdgewidth( num_edgewidth )
        manager.updateEdgeWeightSize(num_weighttext)

        if (remmember) {
            localStorage.setItem(AutoAction + Separator + "DefaultLabelText" , num_labeltext.toString() )
            localStorage.setItem(AutoAction+Separator+"DefaultWeightText",num_weighttext.toString())
            localStorage.setItem(AutoAction+Separator+"DefaultNodeSize" , num_nodesize.toString())
            // localStorage.setItem(AutoAction+Separator+"DefaultEdgeStrokeWidth")
        }



        // Handle save logic here
        SuccessMessage(message);
    };

    return (
        <div className="w-full overflow-x-auto p-2">
            <Checkbox label="Show Labels" onChange={(event : ChangeEvent<HTMLInputElement>)=>
                    manager.forEachVisualNode({toggleTextVisibility:event.target.checked})
            } />
            <Checkbox label="Show Edges Weights" onChange={(event : ChangeEvent<HTMLInputElement>)=>
                manager.forEachVisualEdge({toggleWeightTextVisibility:event.target.checked})
            } />
            <InputField label="Nodes Sizes" defaultValue={DefaultNodeSize()} id={"inputNodeSize"}/>
            <InputField label="Nodes Labels Size " defaultValue={DefaultLabelText()}  id={"inputLabelText"} />
            <InputField label="Edges Widths" defaultValue={DefaultEdgeStrokeWidth()} id={"inputEgeWidth"} />
            <InputField label="Edges Weights  Size" defaultValue={DefaultWeightText()} id={"inputWeightText"}/>


            <div className="join w-full my-3">
                <button
                    onClick={() => handleSave("Settings Saved In Your Machine",true)}
                    className="btn btn-primary w-1/2 join-item text-white"
                >
                    Save
                </button>
                <button
                    onClick={() => handleReset()}
                    className="btn btn-primary w-1/2 join-item text-white"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

function KnownGraphs ({title,defaultVisible}:IAccorditionOptions) {
    const {grapholioManager:manager} = useGrapholio()
    if (!title) title="Option";
    if (!defaultVisible) defaultVisible=false;
    return(
        <div className={"w-full font-semibold space-y-4"}>
            <div className="w-full join  bg-slate-900  ">
                <span className="w-7/12 join-item py-3 pl-3  ">Complete Graph (Kn)</span>
                <span className="w-3/12 join-item join flex items-center justify-end pr-3 py-3">
                    <span className={"join-item"}>n=</span>
                    <input name={"Complete Graph (Kn)"} type={"number"}  className={"join-item text-center border border-white rounded-xl w-10"}/>
                </span>
                <span
                    onClick={()=> manager.addCompleteGraph(parseInt((document.getElementsByName("Complete Graph (Kn)")[0] as unknown as HTMLInputElement)?.value))}
                    className="w-2/12 join-item bg-slate-800 flex items-center justify-center group hover:bg-primary transition duration-300 cursor-pointer">
                    <BiPlay className="w-8 h-8 group-hover:text-slate-900 " />
                </span>
            </div>
            <div className="w-full join  bg-slate-900  ">
                <span className="w-7/12 join-item py-3 pl-3  ">Complete Bipartite Graph (Kn,m)</span>
                <span className="w-3/12 join-item join py-3 flex items-center justify-end pr-3 py-3">
                    <span className={"join-item"}>n,m=</span>
                    <input name={"Complete Bipartite Graph (Kn,m)n"}  type={"number"}  className={"join-item text-center border border-white rounded-xl w-6"}/>
                    <span className={"px-1"}>,</span>
                    <input name={"Complete Bipartite Graph (Kn,m)m"}  type={"number"}  className={"join-item text-center border border-white rounded-xl w-6"}/>
                </span>
                <span
                    onClick={()=>manager.addCompleteBipartiteGraph(
                        parseInt((document.getElementsByName("Complete Bipartite Graph (Kn,m)n")[0] as unknown as HTMLInputElement)?.value),
                        parseInt((document.getElementsByName("Complete Bipartite Graph (Kn,m)m")[0] as unknown as HTMLInputElement)?.value)
                        )}
                    className="w-2/12 join-item bg-slate-800 flex items-center justify-center group hover:bg-primary transition duration-300 cursor-pointer">
                    <BiPlay className="w-8 h-8 group-hover:text-slate-900 " />
                </span>
            </div>
            <div className="w-full join  bg-slate-900  ">
                <span className="w-7/12 join-item py-3 pl-3  ">Cycle Graph (Cn)</span>
                <span className="w-3/12 join-item join flex items-center justify-end pr-3 py-3">
                    <span className={"join-item"}>n=</span>
                    <input name={'Cycle Graph (Cn)'}  type={"number"}  className={"join-item text-center border border-white rounded-xl w-10"}/>
                </span>
                <span
                    onClick={()=> manager.addCycleGraph(parseInt((document.getElementsByName("Cycle Graph (Cn)")[0] as unknown as HTMLInputElement)?.value))}
                    className="w-2/12 join-item bg-slate-800 flex items-center justify-center group hover:bg-primary transition duration-300 cursor-pointer">
                    <BiPlay className="w-8 h-8 group-hover:text-slate-900 " />
                </span>
            </div>
        </div>
    )
}


function InfoOperations() {
    return (
        <div className="p-2 overflow-auto">
            <Accordion>
                <InfoTable accordation={Accoradations.INFO} title={"Information  Table"} />
                <KnownGraphs accordation={Accoradations.DETAILS} title={"Creat Common Networks"}/>
                <Styling title={"Styling Canvas"}/>
            </Accordion>
        </div>
    );
}

export default InfoOperations;
