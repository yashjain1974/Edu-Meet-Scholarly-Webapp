import React from "react";
import UserData from "../../components/AdminComp/UserData";
import { FcManager } from 'react-icons/fc';
import { UserdetailUrl } from "../../store/APIs";
import { StaffAuthSignUp } from "../../store/APIs";
const AddStaff = () => {
    return (
        <React.Fragment>
            <UserData userCategory={<FcManager size="80px"></FcManager>} userName="Add Staff" fireUrl={`${UserdetailUrl}/staff.json`} logUrl={StaffAuthSignUp}> </UserData>

        </React.Fragment>

    )

}
export default AddStaff;