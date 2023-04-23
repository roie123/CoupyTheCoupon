import {Button} from "@mui/material";
import {AdminActionTypes} from "../AdminActionTypes";
import {useForm} from "react-hook-form";
import {CompanyDTO} from "../../../Models/Company";
import {Customer} from "../../../Models/Customer";


interface ShowSingleCustomerProps{
    displayedActionSelection:number,
    submitSearchForCustomerById(data: Customer):void,
    handleActionSelection(action:AdminActionTypes):void,
    selectedCustomerById:Customer
}

export default function ShowSingleCustomer(props:ShowSingleCustomerProps){


    const {register, handleSubmit, watch, formState: {errors}} = useForm<Customer>();



    return(
        <>
            {props.displayedActionSelection === 10 ? <div className="show-company-cont">


                <div className="show-single-company">
                    <form onSubmit={handleSubmit(props.submitSearchForCustomerById)}>
                        <input placeholder={'Customer id'} {...register("id")} required={true}/>
                        <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Search </Button>
                        <Button sx={{backgroundColor: 'black', color: 'white'}}
                                onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>
                    </form>


                </div>

                {props.selectedCustomerById !== undefined ?
                    <>
                        <div className="selected-company-cont">

                            <div key={props.selectedCustomerById.id} className="item-cont">
                                <p className="item-main-p">{props.selectedCustomerById.id}</p>
                                <div className="bottom-item-cont">
                                    <p className="item-sec-p">{props.selectedCustomerById.firstName} {props.selectedCustomerById.lastName}</p>
                                    <p className="item-third-p">{props.selectedCustomerById.email}</p>

                                </div>
                            </div>
                        </div>
                        <div className="coupon-list-cont">
                            {props.selectedCustomerById?.coupons.map(coupon => (
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
                    </>

                    : null}
                {/* END OF SHOWING SELECTED COMPANY*/}

            </div> : null}


        </>
    )

}