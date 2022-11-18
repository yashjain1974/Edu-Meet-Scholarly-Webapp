import React,{useContext} from "react";
import StaffUserForm from "./StaffUserForm";
import { useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
const StaffDetailForm=()=>{
    const ctx=useContext(AuthContext);
    const param = useParams();
    const userId=param.qid;
    console.log(ctx.id);
    return(
        <React.Fragment>
            <StaffUserForm id={ctx.id}></StaffUserForm>
            
        </React.Fragment>

    )


}

export default StaffDetailForm;