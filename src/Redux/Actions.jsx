
import { APPROVED_LIST,MISSING_LIST } from "./Types";


export const approvedData =(payload)=>{

    console.log("Payload",payload);
    return {
        type:APPROVED_LIST,
        payload
    }
}

export const missingData =(payload)=>{
    return {
        type:MISSING_LIST,
        payload
    }
}

