import {Button} from "@mui/material";
import {useForm} from "react-hook-form";
import {CompanyDTO} from "../../../Models/Company";
import {AdminActionTypes} from "../AdminActionTypes";

interface ShowSingleCompanyProps{
    displayedActionSelection:number,
    handleActionSelection(action: AdminActionTypes):void,
    selectedCompanyById:CompanyDTO|undefined
    submitSearchForCompanyById(data: CompanyDTO):void

}
export default function (props:ShowSingleCompanyProps){

    const {register, handleSubmit, watch, formState: {errors}} = useForm<CompanyDTO>();




    return(
        <>
            {props.displayedActionSelection === 5 ? <div className="show-company-cont">


                <div className="show-single-company">
                    <form onSubmit={handleSubmit(props.submitSearchForCompanyById)}>
                        <input placeholder={'Company id'} {...register("id")} required={true}/>
                        <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Search </Button>
                        <Button sx={{backgroundColor: 'black', color: 'white'}}
                                onClick={() => props.handleActionSelection(AdminActionTypes.GoToActionsSelection)}>Back</Button>
                    </form>


                </div>

                {props.selectedCompanyById !== undefined ?
                    <>
                        <div className="selected-company-cont">

                            <div key={props.selectedCompanyById.id} className="item-cont">
                                <p className="item-main-p">{props.selectedCompanyById.id}</p>
                                <div className="bottom-item-cont">
                                    <p className="item-sec-p">{props.selectedCompanyById.name}</p>
                                    <p className="item-third-p">{props.selectedCompanyById.email}</p>

                                </div>
                            </div>
                        </div>
                        {props.selectedCompanyById.couponList !== undefined ?     <div className="coupon-list-cont">
                            {props.selectedCompanyById?.couponList.map(coupon => (
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
                        </div> :null }

                    </>

                    : null}
                {/* END OF SHOWING SELECTED COMPANY*/}

            </div> : null}

        </>
    )
}