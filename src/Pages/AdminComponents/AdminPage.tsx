import './AdminPage.css'
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StoreIcon from '@mui/icons-material/Store';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ActionCard from "../../General Components/ActionCard";
import {useState} from "react";
import ActionsSelection from "./AdminDumbShits/ActionsSelection";
import {Button, switchClasses} from "@mui/material";
import {useForm} from "react-hook-form";
import {CompanyDTO} from "../../Models/Company";
import {AdminActionTypes} from "./AdminActionTypes";
import {AdminService} from "../../Services/AdminService";


export default function AdminPage(){


    const [displayedActionSelection,setdisplayedActionSelection] =useState<number>(0);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<CompanyDTO>();

    const adminService : AdminService= AdminService.getInstance();
    const onSubmitForm = async (data: CompanyDTO) => {
    console.log(await adminService.addCompany(data));

    };

function forFun(){

}
function handleActionSelection(action:AdminActionTypes){

switch (action) {
    case AdminActionTypes.AddCompany:
        setdisplayedActionSelection(1);
        break;
    case AdminActionTypes.UpdateCompany:
        break;
    case AdminActionTypes.DeleteCompany:
        break;
    case AdminActionTypes.GetAllCompanies:
        break;
    case AdminActionTypes.GetSingleCompany:
        break;
    case AdminActionTypes.AddCustomer:
        break;
    case AdminActionTypes.UpdateCustomer:
        break;
    case AdminActionTypes.DeleteCustomer:
        break;
    case AdminActionTypes.GetAllCustomers:
        break;
    case AdminActionTypes.GetSingleCustomer:
        break;

}
}

    return(
        <>
<div className="admin-cont">
    <div className="admin-top-cont">
        <h4 className={'admin-title'}>Hi Admin, What would You Like To Do</h4>
    </div >
    {displayedActionSelection ===0 ?     <ActionsSelection handleActionSelection={handleActionSelection}/> :null}
    {displayedActionSelection ===1 ?     <>
        <form onSubmit={handleSubmit(onSubmitForm)} className={'add-new-company-form'}>
            <input placeholder={'Company Name'} {...register("name")} />
            <input placeholder={'Company email'} {...register("email")} />

            <Button type={'submit'} sx={{backgroundColor:'black' , color:'white'}}>Add New </Button>
            <Button  sx={{backgroundColor:'black' , color:'white'}} onClick={()=> setdisplayedActionSelection(0)}>Back</Button>


        </form>


    </> :null}




</div>
        </>
    )
}