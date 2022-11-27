import React from "react";
import classes from './DashBoard.module.css';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Card from "../UI/card";



console.log("Hello");
const DashBoardDes = () => {
    const param = useParams();
    const userId = param.qid;
    return (

        <React.Fragment>
            <Card
                title={userId}
                images="https://cdn2.iconfinder.com/data/icons/web-solid/32/user-512.png"

                alt="Admin"
                name="Admin" />
            <hr></hr>

        </React.Fragment>
    )


}
export default DashBoardDes;