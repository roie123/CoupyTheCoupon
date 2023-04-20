import './CompanyPage.css'
import ActionCard from "../../General Components/ActionCard";
import AddIcon from "@mui/icons-material/Add";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StoreIcon from "@mui/icons-material/Store";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import InfoIcon from '@mui/icons-material/Info';
export default function CompanyPage(){

function forFun(){

}

    return(
        <>
            <div className="main-cont">
                <div className="actions-cont">
                    <ActionCard name={'Add Coupon'} onClick={forFun} SvgIcon={AddIcon}/>
                    <ActionCard name={'Update Coupon'} onClick={forFun} SvgIcon={UpgradeIcon}/>
                    <ActionCard name={'Delete Coupon'} onClick={forFun} SvgIcon={DeleteIcon}/>
                    <ActionCard name={'Get Coupons'} onClick={forFun} SvgIcon={FormatListBulletedIcon}/>
                    <ActionCard name={'Get Coupons (By Category)'} onClick={forFun} SvgIcon={FormatListBulletedIcon}/>
                    <ActionCard name={'Get Coupons (By Price)'} onClick={forFun} SvgIcon={FormatListBulletedIcon}/>
                    <ActionCard name={'Get Company Details'} onClick={forFun} SvgIcon={InfoIcon}/>









                </div>{/*END OF CARDS CONTAINER */}
            </div>

        </>
    )
}