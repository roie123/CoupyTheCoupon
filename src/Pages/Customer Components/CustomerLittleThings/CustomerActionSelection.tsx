import ActionCard from "../../../General Components/ActionCard";
import {CustomerActionTypes} from "../../../Models/Enums/CustomerActionTypes";
import ShopIcon from "@mui/icons-material/Shop";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InfoIcon from "@mui/icons-material/Info";

interface ActionSelectionProps {
displayedAction:number,
    handleChangeInDisplayedAction(action:CustomerActionTypes):void
}

/**
 * Author - Roie Ivri
 * Created Date&Time - 06/05/2023 | 11:21
 */
export default function CustomerActionSelection(props: ActionSelectionProps) {



    return (
        <>
            {props.displayedAction===0  ?



                <div className="main-cont">
                    <div className="actions-cont">
                        <ActionCard name={'Purchase Coupon'} onClick={()=>props.handleChangeInDisplayedAction(CustomerActionTypes.PurchaseCoupon)} SvgIcon={ShopIcon}/>
                        <ActionCard name={'Get My Coupons'} onClick={()=>props.handleChangeInDisplayedAction(CustomerActionTypes.GetMyCoupons)} SvgIcon={FormatListBulletedIcon}/>
                        {/*<ActionCard name={'Get Coupons (By Category)'} onClick={()=>props.handleChangeInDisplayedAction(CustomerActionTypes.GetCouponsByCategory)} SvgIcon={FormatListBulletedIcon}/>*/}
                        {/*<ActionCard name={'Get Coupons (By Price)'} onClick={()=>props.handleChangeInDisplayedAction(CustomerActionTypes.GetCouponsByPrice)} SvgIcon={FormatListBulletedIcon}/>*/}
                        <ActionCard name={'Get My Details'} onClick={()=>props.handleChangeInDisplayedAction(CustomerActionTypes.GetMyDetails)} SvgIcon={InfoIcon}/>










                    </div>{/*END OF CARDS CONTAINER */}
                </div>




                :null }
        </>
    )
}