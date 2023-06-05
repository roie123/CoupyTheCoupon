import './CustomerDetailsStyle.css'
import {useEffect, useState} from "react";
import {Customer} from "../../../Models/Customer";

export interface CustomerDetailsProps{
    displayedAction:number,
     handleCallForCustomerDetails(): Promise<Customer>
}
    /**
     * Author - Roie Ivri 
     * Created Date&Time - 05/06/2023 | 11:45
     */
export default function CustomerDetails(props:CustomerDetailsProps){
const [userDetails,setuserDetails] =useState<Customer>();

useEffect(()=>{
props.handleCallForCustomerDetails().then(value => {

        setuserDetails(value);

})
},[props])


return(
<>
<div className="customer-details-cont">

    <div className="detail">
        <span className="att">First Name</span>
        <span className="value">{userDetails?.firstName}</span>
    </div>
    <div className="detail">
        <span className="att">Last Name</span>
        <span className="value">{userDetails?.lastName}</span>
    </div>
    <div className="detail">
        <span className="att">Email</span>
        <span className="value">{userDetails?.email}</span>
    </div>



</div>
</>
)
}