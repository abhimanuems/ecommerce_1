import { category } from "../interfaces/common"

export default {
    categorys: (data :any)=>{
        const obj : category ={
            name : data.name
        }
        return obj;
    }
}