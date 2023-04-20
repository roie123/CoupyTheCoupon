import './CustomerPage.css'
import ActionCard from "../../General Components/ActionCard";
import AddIcon from "@mui/icons-material/Add";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InfoIcon from "@mui/icons-material/Info";
import ShopIcon from '@mui/icons-material/Shop';
export default function CustomerPage(){

function forFun(){

}

    return(

        <>
            <div className="main-cont">
                <div className="actions-cont">
                    <ActionCard name={'Purchase Coupon'} onClick={forFun} SvgIcon={ShopIcon}/>
                    <ActionCard name={'Get My Coupons'} onClick={forFun} SvgIcon={FormatListBulletedIcon}/>
                    <ActionCard name={'Get Coupons (By Category)'} onClick={forFun} SvgIcon={FormatListBulletedIcon}/>
                    <ActionCard name={'Get Coupons (By Price)'} onClick={forFun} SvgIcon={FormatListBulletedIcon}/>
                    <ActionCard name={'Get My Details'} onClick={forFun} SvgIcon={InfoIcon}/>









                </div>{/*END OF CARDS CONTAINER */}
            </div>
        </>
    )
}