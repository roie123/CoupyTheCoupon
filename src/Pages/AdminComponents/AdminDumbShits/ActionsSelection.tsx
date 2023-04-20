import ActionCard from "../../../General Components/ActionCard";
import AddIcon from "@mui/icons-material/Add";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StoreIcon from "@mui/icons-material/Store";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {AdminActionTypes} from "../AdminActionTypes";
import {Button} from "@mui/material";

interface ActionSelectionProps{
    handleActionSelection(action:AdminActionTypes):void
}
export default function (props:ActionSelectionProps){




    function forFun(){

    }



    return(
        <>
            <div className="main-cont">
                <div className="actions-cont">
                    <ActionCard name={'Add Company'} onClick={()=>props.handleActionSelection(AdminActionTypes.AddCompany)} SvgIcon={AddIcon}/>
                    <ActionCard name={'Update Company'} onClick={()=>props.handleActionSelection(AdminActionTypes.UpdateCompany)} SvgIcon={UpgradeIcon}/>
                    <ActionCard name={'Delete Company'} onClick={()=>props.handleActionSelection(AdminActionTypes.DeleteCompany)} SvgIcon={DeleteIcon}/>
                    <ActionCard name={'Get All Companies'}onClick={()=>props.handleActionSelection(AdminActionTypes.GetAllCompanies)} SvgIcon={FormatListBulletedIcon}/>
                    <ActionCard name={'Get Single Company'} onClick={()=>props.handleActionSelection(AdminActionTypes.GetSingleCompany)} SvgIcon={StoreIcon}/>
                    <ActionCard name={'Add Customer'}onClick={()=>props.handleActionSelection(AdminActionTypes.AddCustomer)} SvgIcon={PersonAddAltIcon}/>
                    <ActionCard name={'Update Customer'} onClick={()=>props.handleActionSelection(AdminActionTypes.UpdateCustomer)} SvgIcon={ManageAccountsIcon}/>
                    <ActionCard name={'Delete Customer'} onClick={()=>props.handleActionSelection(AdminActionTypes.DeleteCustomer)} SvgIcon={PersonRemoveIcon}/>
                    <ActionCard name={'Get All Customers'}onClick={()=>props.handleActionSelection(AdminActionTypes.GetAllCustomers)} SvgIcon={FormatListBulletedIcon}/>
                    <ActionCard name={'Get Single Customer'} onClick={()=>props.handleActionSelection(AdminActionTypes.GetSingleCustomer)} SvgIcon={PersonSearchIcon}/>




                </div>{/*END OF CARDS CONTAINER */}

            </div>
        </>
    )
}