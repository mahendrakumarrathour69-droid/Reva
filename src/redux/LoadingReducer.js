import { ISLOADING } from "../utils/reducerConstant";


const initialState = {
    loading:false
};
const loadingReducers =(state = initialState, action)=>{
   console.log("action>>>",action);
    switch (action.type) {
        case ISLOADING:
          return {
            ...state,loading:action.payload
          }
          default:
            return state;
        };
       

}
export default  loadingReducers;