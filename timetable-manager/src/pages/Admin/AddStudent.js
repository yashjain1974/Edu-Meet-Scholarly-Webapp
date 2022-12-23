import React from "react";
import UserData from "../../components/AdminComp/UserData";
import { FcGraduationCap } from 'react-icons/fc';
import { UserdetailUrl } from "../../store/APIs";
import { StudentAuthSignUp } from "../../store/APIs";
const AddStudent=()=>{
    return (
        <React.Fragment>
            <UserData userCategory={<FcGraduationCap size="80px"></FcGraduationCap> } userName="Add Student" fireUrl={`${UserdetailUrl}/student.json`} logUrl={StudentAuthSignUp}> </UserData>
            
        </React.Fragment>

    )

}
export default AddStudent;