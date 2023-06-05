import {CompanyDTO} from "../../../Models/Company";
import '../../Customer Components/CustomerLittleThings/CustomerDetailsStyle.css'
interface CompanyDetailsProps{
    displaySelection:number,
    currentCompany:CompanyDTO
}
    /**
     * Author - Roie Ivri 
     * Created Date&Time - 05/05/2023 | 18:45
     */
export default function CompanyDetails(props:CompanyDetailsProps){



return(
<>


            <div className="customer-details-cont">

                <div className="detail">
                    <span className="att">First Name</span>
                    <span className="value">{props.currentCompany?.name}</span>
                </div>
                <div className="detail">
                    <span className="att">Last Name</span>
                    <span className="value">{props.currentCompany?.email}</span>
                </div>




            </div>









</>
)
}