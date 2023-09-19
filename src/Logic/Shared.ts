type Update2dPointsLink  = {
    node1_pos : coords,
    node2_pos :coords,
    curve? : number,

}
type coords = {
    x: number ,
    y: number
}
export const MathCalculation_Update2dPointsLink = (V2dp : Update2dPointsLink ,radius:number| {node1:number,node2:number} | undefined , S_arrowMiddle :coords|undefined )=>{
    console.log("math result : " ,radius)
    const dx = V2dp.node1_pos.x - V2dp.node2_pos.x;
    const dy = V2dp.node1_pos.y - V2dp.node2_pos.y;
    const angle = Math.atan2(-dy, dx);
    let angle1  :number|undefined
    let angle2  :number|undefined
    if (S_arrowMiddle) {
        const dx1 = V2dp.node1_pos.x - S_arrowMiddle.x;
        const dy1 = V2dp.node1_pos.y - S_arrowMiddle.y;
        angle1 = Math.atan2(-dy1, dx1);
        const dx2 = S_arrowMiddle.x - V2dp.node2_pos.x;
        const dy2 = S_arrowMiddle.y - V2dp.node2_pos.y;
        angle2 = Math.atan2(-dy2, dx2);
    }
    console.log((typeof radius === "object"));
    const useRadius1 : number = (typeof radius === "object") ? radius.node1 : (radius || 15)
    const arrowStart = {
        x: V2dp.node1_pos.x + -(useRadius1*1.3) * Math.cos(angle1 || angle),
        y: V2dp.node1_pos.y + (useRadius1*1.3) * Math.sin(angle1 || angle),
    };
    const useRadius2 : number = (typeof radius === "object") ? radius.node2 : (radius || 15)
    const arrowEnd = {
        x: V2dp.node2_pos.x + -(useRadius2*1.3) * Math.cos((angle2 || angle) + Math.PI),
        y: V2dp.node2_pos.y + (useRadius2*1.3) * Math.sin((angle2 || angle) + Math.PI),
    };

    const arrowMiddle = {
        x: (arrowStart.x + arrowEnd.x) / 2, // I want to change this
        y: (arrowStart.y + arrowEnd.y) / 2,// I want to change this
    };
    return {
        arrowStart,
        arrowMiddle,
        arrowEnd
    }
}


export function parseHtml(htmlString:string){
    const parser = new DOMParser();
    return parser.parseFromString(htmlString, 'text/html').body.firstChild;
}

interface Point {
    x: number;
    y: number;
}

export function* generateCircleCoordinates(N_of_elements: number): Generator<Point> {
    const centerX = 300; // Center X-coordinate of the circle
    const centerY = 300; // Center Y-coordinate of the circle
    const radius = 250; // Radius of the circle

    for (let i = 0; i < N_of_elements; i++) {
        const angle = (i / N_of_elements) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        yield { x, y };
    }
}


export function numberToAlphabet(n: number): string {
    let result = '';

    while (n > 0) {
        const remainder = (n - 1) % 26; // Adjust for 1-based indexing
        result = String.fromCharCode(65 + remainder) + result; // 'A' is 65 in ASCII
        n = Math.floor((n - 1) / 26); // Adjust for 1-based indexing
    }

    return result;
}

