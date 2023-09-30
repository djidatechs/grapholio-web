type IHeight = {
    height? : string
}
function Loading(H? : IHeight) {
    return (
        <div className={"flex justify-center items-center h-screen " + H?.height}>
            <div className={"w-36 h-36 flex justify-center items-center space-x-12 animate-spin"}>
                <span className="w-12 h-12 bg-primary  rounded-full  flex justify-center items-center"/>
                <span className="w-12 h-12 bg-info  rounded-full  flex justify-center items-center"/>
            </div>
        </div>
    );
}
export default Loading;