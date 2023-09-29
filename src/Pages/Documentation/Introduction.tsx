
import image from "../../assets/pdz.png"
import avatar from "../../assets/mashroom.jpg"
export default function Introduction (){
    return (
        <div className={"space-y-2"}>
            <h1 className={"text-3xl text-primary font-bold"}>Introduction</h1>
            <p className={"text-lg font-semibold space-y-2 text-justify"}>
                <p>Grapholio is a web tool designed for teaching and learning about graph theory. It's made with the goal of helping students understand graphs better. Using easy-to-follow visuals and controls, it simplifies the learning process. Plus, you can use JavaScript to apply graph theory concepts. Unlike other complicated tools, Grapholio is all about making learning easy.</p>
                <p>That's why I developed it - to give students a solid start in understanding graph theory with simplicity and confidence.</p>
            </p>
            <figure className={"text-center "}>
                <img className={"rounded-xl"} src={image} loading={"lazy"} alt=""/>
            </figure>
            <div className={"py-[50px]"}>
            <div className={"flex w-full justify-center  "}>
            <div className="  card w-full bg-base-200 shadow-xl relative ring ring-primary ring-offset-base-100 ring-offset-2  ">
                <div className="avatar absolute -top-10 -left-10">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={avatar} alt={""} />
                    </div>
                </div>
                <figure className={"min-h-[50px]"}></figure>
                <div className="card-body">
                    <h2 className="card-title">Made With 😐 By Djida Issam</h2>
                    <a href = "mailto:ji_djida@esi.dz">ji_djida@esi.dz</a>
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-primary text-white font-semibold">Github</button>
                        <button className="btn btn-outline btn-primary text-white font-semibold">Facebook</button>
                    </div>
                </div>
            </div>
            </div>
            </div>

        </div>
    )
}