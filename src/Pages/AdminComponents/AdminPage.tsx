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
import {useEffect, useState} from "react";
import ActionsSelection from "./AdminDumbShits/ActionsSelection";
import {Button, containerClasses, switchClasses} from "@mui/material";
import {useForm} from "react-hook-form";
import {CompanyDTO} from "../../Models/Company";
import {AdminActionTypes} from "./AdminActionTypes";
import {AdminService} from "../../Services/AdminService";
import AddUpdateCompany from "./AdminDumbShits/Add&UpdateCompany";
import ShowAllCompanies from "./AdminDumbShits/ShowAllCompanies";
import ShowSingleCompany from "./AdminDumbShits/ShowSingleCompany";
import {Customer} from "../../Models/Customer";
import AddUpdateCustomer from "./AdminDumbShits/AddUpdateCustomer";
import ShowAllCustomers from "./AdminDumbShits/ShowAllCustomers";
import ShowSingleCustomer from "./AdminDumbShits/ShowSingleCustomer";


export default function AdminPage() {


    const [displayedActionSelection, setdisplayedActionSelection] = useState<number>(0);

    const {register, handleSubmit, watch, formState: {errors}} = useForm<CompanyDTO>();

    const adminService: AdminService = AdminService.getInstance();

    const onSubmitFormCompany = async (data: CompanyDTO) => {

        switch (displayedActionSelection) {
            case 1: {
                await adminService.addCompany(data);
                break;
            }
            case 2: {
                await adminService.updateCompany(data, data.id);
                break;
            }
            case 3: {
                await adminService.deleteCompany(data.id);
            }

        }

    };

    function forFun() {

    }

   async function handleActionSelection(action: AdminActionTypes) {

        switch (action) {
            case AdminActionTypes.AddCompany:
                setdisplayedActionSelection(1);
                break;
            case AdminActionTypes.UpdateCompany:
                setdisplayedActionSelection(2);

                break;
            case AdminActionTypes.DeleteCompany:
                setdisplayedActionSelection(3);

                break;
            case AdminActionTypes.GetAllCompanies:
               await getCompanyList();
                setdisplayedActionSelection(4);

                break;
            case AdminActionTypes.GetSingleCompany:
                setdisplayedActionSelection(5);

                break;
            case AdminActionTypes.AddCustomer:
                setdisplayedActionSelection(6);

                break;
            case AdminActionTypes.UpdateCustomer:
                setdisplayedActionSelection(7);

                break;
            case AdminActionTypes.DeleteCustomer:
                setdisplayedActionSelection(8);

                break;
            case AdminActionTypes.GetAllCustomers:
              await  getAllCustomers();
                setdisplayedActionSelection(9);
                break;
            case AdminActionTypes.GetSingleCustomer:
                setdisplayedActionSelection(10);

                break;
            case AdminActionTypes.GoToActionsSelection:
                setdisplayedActionSelection(0);
                break;

        }
    }

////////////////////// COMPANY LIST LOGIC //////////////////////////////////
    const [companyList, setcompanyList] = useState<CompanyDTO[]>([]);

    async function getCompanyList() {
        setcompanyList(await adminService.getAllCompanies());
    }


////////////////////// COMPANY LIST LOGIC //////////////////////////////////


////////////////////GET SINGLE COMPANY LOGIC///////////////////////////////
    const [selectedCompanyById, setselectedCompanyById] = useState<CompanyDTO>();

    async function submitSearchForCompanyById(data: CompanyDTO) {

        let company: CompanyDTO = await adminService.getSingleCompany(data.id);
        setselectedCompanyById(company);
        console.log(company.couponList);

    }


////////////////////GET SINGLE COMPANY LOGIC///////////////////////////////


////////////////////////////////////////GET ALL CUSTOMERS LOGIC /////////////////////////////////////////////
    const [customers,setcustomers] =useState<Customer[]>();

    async function getAllCustomers(){

setcustomers(await  adminService.getAllCustomers())
    }
    ////////////////////////////////////////GET ALL CUSTOMERS LOGIC /////////////////////////////////////////////



    ////////////////////////////GET SINGLE CUSTOMER BY ID////////////////////////////////////////////////

    const [selectedCustomerById,setselectedCustomerById] =useState<Customer>();

    async function submitSearchForCustomerById(data: Customer) {

        let customerFromDB: Customer = await adminService.getSingleCustomer(data.id);
        setselectedCustomerById(customerFromDB);

    }


    ////////////////////////////GET SINGLE CUSTOMER BY ID////////////////////////////////////////////////


    return (
        <>
            <div className="admin-cont">
                <div className="admin-top-cont">
                    <h4 className={'admin-title'}>Hi Admin, What would You Like To Do</h4>
                </div>
                {displayedActionSelection === 0 ?
                    <ActionsSelection handleActionSelection={handleActionSelection}/> : null}


                <AddUpdateCompany displayedActionSelection={displayedActionSelection}
                                  handleActionSelection={handleActionSelection}
                                  onSubmitFormCompany={onSubmitFormCompany} handleSubmit={handleSubmit}/>
                <ShowAllCompanies companyList={companyList} displayedActionSelection={displayedActionSelection}
                                  handleActionSelection={handleActionSelection}/>


                <ShowSingleCompany displayedActionSelection={displayedActionSelection}
                                   handleActionSelection={handleActionSelection}
                                   selectedCompanyById={selectedCompanyById}
                                   submitSearchForCompanyById={submitSearchForCompanyById}/>

                <AddUpdateCustomer adminService={adminService} handleActionSelection={handleActionSelection} displayedActionSelection={displayedActionSelection}/>
                <ShowAllCustomers customers={customers!} handleActionSelection={handleActionSelection} displayedActionSelection={displayedActionSelection}/>
                <ShowSingleCustomer displayedActionSelection={displayedActionSelection} submitSearchForCustomerById={submitSearchForCustomerById} handleActionSelection={handleActionSelection} selectedCustomerById={selectedCustomerById!}/>
            </div>
        </>
    )
}