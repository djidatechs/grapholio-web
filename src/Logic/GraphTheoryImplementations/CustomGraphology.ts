// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Graph as _Graph } from "graphology";
import AbstractGraph , {GraphOptions} from "graphology-types"
type GraphInit = {
    name : string|null,
    options : GraphOptions
}
export class Graph  {
    static  id :number = 0;
    private name : string = `graph_${Graph.id}` ;
    private graph : AbstractGraph ;
    private myid : number = Graph.id

    constructor(init : GraphInit) {
        if (init.name!=null) this.name = init.name;
        this.graph = new _Graph(init.options)
        Graph.id++
    }

    //General getters and setters
    use(){return this.graph}
    getName(){return this.name}
    setName(newName : string){this.name = newName ; return this }
    who() {return this.myid}

    //Implementations
   



}