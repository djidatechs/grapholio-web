import Dashboard from "./Dashboard/Dashboard.tsx";
import BlackBoard from "./BlackBoard/BlackBoard.tsx";

export default function Boards () {

    return (
        <div className="flex">
            <Dashboard/>
            <BlackBoard/>
        </div>
    )
}