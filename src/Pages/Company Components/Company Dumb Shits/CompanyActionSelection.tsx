import ActionCard from "../../../General Components/ActionCard";
import {CompanyActionTypes} from "../../../Models/Enums/CompanyActionTypes";
import AddIcon from "@mui/icons-material/Add";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InfoIcon from "@mui/icons-material/Info";

interface CompanyActionSelectionProps{
    handleCompanyActionSelection(action:CompanyActionTypes):void;
    displayedActionSelection:number;
}

export default function CompanyActionSelection(props:CompanyActionSelectionProps){




    return(
        <>
            <>
                {props.displayedActionSelection===0 ?<div className="main-cont">
                    <div className="actions-cont">
                        <ActionCard name={'Add Coupon'} onClick={()=>props.handleCompanyActionSelection(CompanyActionTypes.AddCoupon)} SvgIcon={AddIcon}/>
                        <ActionCard name={'Update Coupon'} onClick={()=>props.handleCompanyActionSelection(CompanyActionTypes.UpdateCoupon)} SvgIcon={UpgradeIcon}/>
                        <ActionCard name={'Delete Coupon'} onClick={()=>props.handleCompanyActionSelection(CompanyActionTypes.DeleteCoupon)} SvgIcon={DeleteIcon}/>
                        <ActionCard name={'Get Coupons'} onClick={()=>props.handleCompanyActionSelection(CompanyActionTypes.GetCoupons)} SvgIcon={FormatListBulletedIcon}/>
                        <ActionCard name={'Get Coupons (By Category)'} onClick={()=>props.handleCompanyActionSelection(CompanyActionTypes.GetCouponsByCategory)} SvgIcon={FormatListBulletedIcon}/>
                        <ActionCard name={'Get Coupons (By Price)'} onClick={()=>props.handleCompanyActionSelection(CompanyActionTypes.GetCouponsByPrice)} SvgIcon={FormatListBulletedIcon}/>
                        <ActionCard name={'Get Company Details'} onClick={()=>props.handleCompanyActionSelection(CompanyActionTypes.GetCompanyDetails)} SvgIcon={InfoIcon}/>









                    </div>{/*END OF CARDS CONTAINER */}
                </div> :(null) }


            </>
        </>
    )
}