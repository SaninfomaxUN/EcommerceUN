import React from 'react';
import './Styles/2FA.css';
import TwoFA from "./TwoFA";
import {useLocation} from "react-router";

function TwoFAPage() {
    const {state} = useLocation();
    const {emailToVerify} = state?? {};
    console.log("---- " + emailToVerify)
    return (
        <TwoFA email={emailToVerify}/>
    );
}

export default TwoFAPage;
