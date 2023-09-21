import  {createContext,  ReactNode, useContext, useEffect, useState} from "react";
import {GrapholioManager} from "../../Logic/GrapholioManager/GrapholioManager";
import {
    AccordationsOptions,
    Application,
    BlackBoardMenu,
    GivosContext,
    OperationDash,
    Operations
} from "../../Constants.ts";
import {Icontextual} from "./BlackBoard/test.Contextual.tsx";



interface GrapholioContextValue {
    grapholioManager: GrapholioManager;
    application : Application,
    operations : Operations ,
    blackBoardMenu : BlackBoardMenu,
    givos : GivosContext

}


const GrapholioContext = createContext<GrapholioContextValue | undefined>(undefined);

export default function GrapholioProvider ({ children }:{children:ReactNode})   {
    const [grapholioManager, setGrapholioManager] = useState<GrapholioManager | undefined>(undefined);
    const [appChange,_apply] = useState<number>(1);
    const [operationDash,setOperation] = useState<OperationDash>(OperationDash.NOOP);
    const [props,setProps] = useState<Icontextual>({});
    const [RequestValue,_RequestOperationUpdate] = useState<number>(1);
    const [visualItem,_setVisualItem] = useState<string|undefined>(undefined);
    const [accordation,setAccordation] = useState<AccordationsOptions>({});
    const [code,setCode] = useState<string>("//code here ...");
    const value : GrapholioContextValue  = {
        grapholioManager : grapholioManager as GrapholioManager,
        application : {
            appChange,
            apply : ()=>_apply(c=>c+1)
        },
        givos : {
            code : code,
            write : (code:string)=>setCode(code)
        },
        operations : {
            operationDash,
            operateOn : (operation : OperationDash)=> {
                setOperation(operation);
                _RequestOperationUpdate(c=>c+1)
            },
            RequestValue,
            SentUpdateRequest : ()=>_RequestOperationUpdate(c=>c+1),
            visualItem,
            setVisualItem : (item:string)=>_setVisualItem(item),
            accordation,
            setAccordation,
        },
        blackBoardMenu : {
            props,
            setProps,
        }
    }

    useEffect(() => {
        const manager = new GrapholioManager();
        setGrapholioManager(manager);
    }, []);

    if (!grapholioManager) {
        return null; // Render nothing until the manager is initialized
    }

    return (
        <GrapholioContext.Provider value={value}>
            {children}
        </GrapholioContext.Provider>
    );
}

export function useGrapholio () {
    const context = useContext(GrapholioContext);
    if (!context) {
        throw new Error("useGrapholio must be used within a GrapholioProvider");
    }
    return context;
}

