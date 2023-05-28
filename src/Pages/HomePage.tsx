import {useState} from "react";
import CompanyPage from "./Company Components/CompanyPage";
import AdminPage from "./AdminComponents/AdminPage";
import CustomerPage from "./Customer Components/CustomerPage";

export default function HomePage(){


    /**
     * This state stores the currently displayed use interface
     *  (1) => admin
     *  (2) => company
     *  (3) => customer
     */
    const [displaySelection,setdisplaySelection] =useState<number>(1);
    
//Comment for git
    return(
        <>
            {displaySelection===0 ? (null):(null)}
            {displaySelection===1 ? (<AdminPage/>):(null)}
            {displaySelection===2 ? (<CompanyPage/>):null}
            {displaySelection===3 ? (<CustomerPage/>):(null)}


        </>
    )
}