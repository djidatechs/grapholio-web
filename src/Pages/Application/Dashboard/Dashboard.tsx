import {MenuStructureComponent} from "./MenuStructure.component.tsx";
import GraphsTabs from "./GraphTabs.tsx";
import OperationsChoices from "./OperationsChoices.tsx";
import Operations from "./Operations/Operations.tsx";
import {useGrapholio} from "../Context.tsx";

function Dashboard() {
    const  {grapholioManager}  = useGrapholio()
    const current = grapholioManager.getCurrentGraph()


    return (
        <MenuStructureComponent>
            <div>
                <GraphsTabs/>
                {
                    current !== undefined ? (
                        <>
                        <OperationsChoices/>
                        <Operations/>
                        </>
                    ) : <p className={"text-center mt-24"}>Click + to add a new graph</p>
                }
            </div>
        </MenuStructureComponent>
    );
}

export default Dashboard;


