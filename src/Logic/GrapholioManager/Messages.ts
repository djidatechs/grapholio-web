import {toast} from "react-toastify";

export const  NodeIdExist  = ()=> ToastMessage("Node Reference Already Exist");
export const  EdgeIdExist  = ()=> ToastMessage("Edge Reference Already Exist");
export const  GraphIdExist = ()=> ToastMessage("Graph Reference Already Exist");
export const  CannotAddEdge = ()=> ToastMessage("[ Graph Usage Error ] Impossible to add the edge due to the constriction of the graph type");

export const ErrorMessage = (err:string) =>ToastMessage(err);
export const SuccessMessage = (suc:string) =>ToastMessageSuccess(suc);


function ToastMessage  (message : string) {
    toast(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        type:"error",
    })
}
function ToastMessageSuccess  (message : string) {
    toast(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        type:"success",
    })
}
export function ToastInfoWithAction(message:string , action? : ()=>any){
    toast(message, {
        onClick:  action,
        position: "bottom-right",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        type:"warning",

    })
}
