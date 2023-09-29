import selec from "../../assets/select tabs.jpg"
export default function ManagingGraphs () {
    return (
        <div className={"mb-24"}>
            <div className={"space-y-2 text-xl "}>
                <h1 className={"text-3xl text-primary font-bold mb-5"}>Managing Graphs</h1>

                <div className={" my-3 space-y-3 text-xl "} id={"1"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Tabs Selection</h2>
                    <p>
                       You can easily create new Graphs using the plus (-) button <br/>
                        To delete a Graph select in the tabs the graph you want to delete and then click on minus (-) button
                    </p>
                    <figure className={"w-full"}>
                        <img className={"rounded-xl w-full"}  src={selec} alt={""} />
                    </figure>
                </div>
            </div>

        </div>
    )
}
