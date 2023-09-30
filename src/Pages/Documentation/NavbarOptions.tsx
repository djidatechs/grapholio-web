import importmp4 from "../../assets/Import.mp4";
import saveasimage from "../../assets/save as image.mp4";

export default function NavbarOptions () {
    return (
        <div className={"mb-24"}>
            <div className={"space-y-2 text-xl "}>
                <h1 className={"text-3xl text-primary font-bold mb-5"}>Navigation Bar Options</h1>

                <div className={" my-3 space-y-3 text-xl "} id={"1"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Importing Graphs</h2>
                    <p>You can Import previously exported graphs</p>
                    <video controls muted>
                        <source src={importmp4} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className={" my-3 space-y-3 text-xl "} id={"2"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Exporting Graphs</h2>
                    <p>You can export the graph with its scripts</p>


                </div>
                <div className={" my-3 space-y-3 text-xl "} id={"3"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Downloading As An Image</h2>
                    <p>You can download the graph as PNG images</p>
                    <video controls muted>
                        <source src={saveasimage} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className={" my-3 space-y-3 text-xl "} id={"4"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Accessing Documentation</h2>
                    <p>you know what this does :-)</p>
                </div>
                <div className={" my-3 space-y-3 text-xl "} id={"5"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Sharing Your Graphs</h2>
                    <p>this functionality is under development</p>
                </div>

                <div className={" my-3 space-y-3 text-xl "} id={"6"}>
                    <h2 className={"mt-10 text-2xl text-accent mb-2 font-bold"}>Support</h2>
                    <p>Support me ! </p>
                </div>

            </div>

        </div>
    )
}
