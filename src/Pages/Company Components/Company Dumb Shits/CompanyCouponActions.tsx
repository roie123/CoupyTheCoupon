import {Button, containerClasses} from "@mui/material";
import {AdminActionTypes} from "../../AdminComponents/AdminActionTypes";
import {useForm} from "react-hook-form";
import {Customer} from "../../../Models/Customer";
import {Coupon} from "../../../Models/Coupon";
import {CompanyActionTypes} from "../../../Models/Enums/CompanyActionTypes";


interface CompanyCouponActionsProps{
    onSubmitFormCompany(data:Coupon):void;
    displayedActionSelection:number;
    handleActionSelection(action:CompanyActionTypes):void;
}

export default function CompanyCouponActions(props : CompanyCouponActionsProps){

    const {register, handleSubmit, watch, formState: {errors}} = useForm<Coupon>();

    return(
        props.displayedActionSelection===1 || props.displayedActionSelection===2?
     (   <div className="company-coupon-cont">
            <form onSubmit={handleSubmit((e) => props.onSubmitFormCompany(e))} className={'add-new-company-form'}>
                <input placeholder={'Coupon Title'} {...register("title")} required={true}/>
                {props.displayedActionSelection===2 ? <input type={'number'} placeholder={'Coupon Id'} {...register("id")} required={true}/> :null }
                <input placeholder={'Coupon description'} {...register("description")} required={true}/>
                <input type={'datetime-local'} placeholder={'Coupon Start Date'} {...register("startDate")} required={true}/>
                <input type={'datetime-local'} placeholder={'Coupon End Date'} {...register("endDate")} required={true}/>
                <input type={'number'} placeholder={'Coupon Amount'} {...register("amount")} required={true}/>
                <input type={'number'} placeholder={'Coupon Price'} {...register("price")} required={true}/>
                <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Save</Button>
                <Button sx={{backgroundColor: 'black', color: 'white'}}
                        onClick={() => props.handleActionSelection(CompanyActionTypes.GoBackToSelection)}>Back</Button>


            </form>




        </div>):
    props.displayedActionSelection===3 ?     <form onSubmit={handleSubmit((e) => props.onSubmitFormCompany(e))} className={'add-new-company-form'}>
        <input type={'number'} placeholder={'Coupon Id'} {...register("id")} required={true}/>
        <Button type={'submit'} sx={{backgroundColor: 'black', color: 'white'}}>Delete</Button>
        <Button sx={{backgroundColor: 'black', color: 'white'}}
                onClick={() => props.handleActionSelection(CompanyActionTypes.GoBackToSelection)}>Back</Button>


    </form> : null
    )
}