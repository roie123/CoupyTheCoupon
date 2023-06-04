import {useState} from "react";
import CompanyPage from "./Company Components/CompanyPage";
import AdminPage from "./AdminComponents/AdminPage";
import CustomerPage from "./Customer Components/CustomerPage";
import CustomerLoginPage from "./AuthPages/CustomerLoginPage";
import WelcomPage from "./WelcomePage";

export default function HomePage(){


    /**
     * This state stores the currently displayed use interface
     *  (1) => admin
     *  (2) => company
     *  (3) => customer
     */
    const [displaySelection,setdisplaySelection] =useState<number>(0);
    
//Comment for git
    return(
        <>
            {displaySelection===0 ? (<WelcomPage/>):(null)}
            {displaySelection===1 ? (<AdminPage/>):(null)}
            {displaySelection===2 ? (<CompanyPage/>):null}
            {displaySelection===3 ? (<CustomerPage/>):(null)}


        </>
    )
}