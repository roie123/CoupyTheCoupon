import {CompanyDTO} from "../../../Models/Company";

interface CompanyDetailsProps{
    displaySelection:number,
    currentCompany?:CompanyDTO
}
    /**
     * Author - Roie Ivri 
     * Created Date&Time - 05/05/2023 | 18:45
     */
export default function CompanyDetails(props:CompanyDetailsProps){



return(
<>
    {props.displaySelection===7 ?
        <div className="company-details-cont">

            <div className="company-details">
                <h5>My Company's Name :<span> {props.currentCompany?.name}</span></h5>
                <h5>My Company's Email : <span>{props.currentCompany?.email}</span> </h5>
            </div>

            <div className="coupon-list-cont">
                <h4>My Coupons</h4>

                {props.currentCompany?.couponList.map(coupon => (
                    <div key={coupon.id} className="coupon-cont">
                        <div className="upper-coupon-cont">
                            <p className={'c-title'}>{coupon.title}</p>
                            <p className={'c-desc'}>{coupon.description}</p>
                        </div>
                        <div className="bottom-coupon-cont">
                            <p className={'c-amount'}>Amount Left : <span>{coupon.amount}</span></p>
                            <p className={'c-price'}>Price
                                : <span>{coupon.price}<span>&#8362;</span></span></p>
                            <p className={'c-exp'}>EXP
                                : {coupon.startDate.toString()} until {coupon.endDate.toString()}</p>

                        </div>
                    </div>
                ))
                }
            </div>

        </div>





    : null}

</>
)
}