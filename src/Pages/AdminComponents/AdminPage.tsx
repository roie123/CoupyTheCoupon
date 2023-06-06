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
import {Alert, Button, containerClasses, Snackbar, switchClasses} from "@mui/material";
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
import AdminLogin from "../AuthPages/AdminLogin";
import {ErrorMessage, isErrorMessage, isErrorMessageFromCustomer} from "../../Models/ErrorMessage";


export default function AdminPage() {


    const [displayedActionSelection, setdisplayedActionSelection] = useState<number>(-1);
    const [popUpSelection, setpopUpSelection] = useState<number>(0);
    const [userMessage, setuserMessage] = useState<string>("s");
    const [currentGetAllCompaniesPAge, setcurrentGetAllCompaniesPAge] = useState<number>(1);





    const {register, handleSubmit, watch, formState: {errors}} = useForm<CompanyDTO>();

    const adminService: AdminService = AdminService.getInstance();

    const onSubmitFormCompany = async (data: CompanyDTO) => {

        switch (displayedActionSelection) {
            case 1: {
                const response = await adminService.addCompany(data).then().catch()
                if (response.message!==undefined && response.message.length>1 ){
                    setuserMessage(response.message);
                    setpopUpSelection(1);
                }else {
                    setuserMessage("Company Added Successfully");
                    setpopUpSelection(2);
                }

                break
            }
            case 2: {
                const response = await adminService.updateCompany(data,data.id).then().catch()
                if (response.message!==undefined && response.message.length>1 ){
                    setuserMessage(response.message);
                    setpopUpSelection(1);
                }else {
                    setuserMessage("Company Updated Successfully");
                    setpopUpSelection(2);
                }
                // await adminService.updateCompany(data, data.id);
                break;
            }
            case 3: {
                const response = await adminService.deleteCompany(data.id).then().catch()
                if (response.message!==undefined && response.message.length>1 ){
                    setuserMessage(response.message);
                    setpopUpSelection(1);
                }else {
                    setuserMessage("Company Deleted Successfully");
                    setpopUpSelection(2);
                }

                break;
                // await adminService.deleteCompany(data.id);
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
                await getAllCustomers();
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
        const companiesUnFiltered = (await adminService.getAllCompanies(currentGetAllCompaniesPAge, 6));

        setcompanyList(companiesUnFiltered);
    }


////////////////////// COMPANY LIST LOGIC //////////////////////////////////


////////////////////GET SINGLE COMPANY LOGIC///////////////////////////////
    const [selectedCompanyById, setselectedCompanyById] = useState<CompanyDTO>();

    async function submitSearchForCompanyById(data: CompanyDTO) {
        let companyOrError: CompanyDTO|ErrorMessage = await adminService.getSingleCompany(data.id);
        if (isErrorMessage(companyOrError)) {
            console.log("Error:", companyOrError.message);
            setuserMessage(companyOrError.message);
            setpopUpSelection(1);

        } else {
            setselectedCompanyById(companyOrError);
        }



    }


////////////////////GET SINGLE COMPANY LOGIC///////////////////////////////


////////////////////////////////////////GET ALL CUSTOMERS LOGIC /////////////////////////////////////////////
    const [customers, setcustomers] = useState<Customer[]>();

    async function getAllCustomers() {

        setcustomers(await adminService.getAllCustomers())
    }

    ////////////////////////////////////////GET ALL CUSTOMERS LOGIC /////////////////////////////////////////////


    ////////////////////////////GET SINGLE CUSTOMER BY ID////////////////////////////////////////////////

    const [selectedCustomerById, setselectedCustomerById] = useState<Customer>();

    async function submitSearchForCustomerById(data: Customer) {

        let customerFromDB: Customer|ErrorMessage = await adminService.getSingleCustomer(data.id);

        if (isErrorMessageFromCustomer(customerFromDB)) {
            setuserMessage(customerFromDB.message);
            setpopUpSelection(1);

        } else {
            setselectedCustomerById(customerFromDB);
        }
    }

    async function changeAllCompaniesViewPage(page: number) {
        setcurrentGetAllCompaniesPAge(page);

        const companiesUnFiltered = (await adminService.getAllCompanies(page, 6));
        setcompanyList(companiesUnFiltered)

    }

    ////////////////////////////GET SINGLE CUSTOMER BY ID////////////////////////////////////////////////

    useEffect(() => {
        setTimeout(() => {
            setpopUpSelection(prevState => 0);
        }, 2000)
    }, [userMessage, popUpSelection])


    return (
        <>
            <div className="admin-cont">
                {displayedActionSelection === -1 ? <AdminLogin displayedActionSelection={displayedActionSelection}
                                                               handleActionSelection={handleActionSelection}/> :
                    <div className="admin-top-cont">
                        <h4 className={'admin-title'}>Hi Admin, What would You Like To Do</h4>
                    </div>}

                {displayedActionSelection === 0 ?
                    <ActionsSelection handleActionSelection={handleActionSelection}/> : null}


                <AddUpdateCompany displayedActionSelection={displayedActionSelection}
                                  handleActionSelection={handleActionSelection}
                                  onSubmitFormCompany={onSubmitFormCompany} handleSubmit={handleSubmit}/>
                <ShowAllCompanies changeAllCompaniesViewPage={changeAllCompaniesViewPage}
                                  currnetPage={currentGetAllCompaniesPAge} companyList={companyList}
                                  displayedActionSelection={displayedActionSelection}
                                  handleActionSelection={handleActionSelection}/>


                <ShowSingleCompany displayedActionSelection={displayedActionSelection}
                                   handleActionSelection={handleActionSelection}
                                   selectedCompanyById={selectedCompanyById}
                                   submitSearchForCompanyById={submitSearchForCompanyById}/>

                <AddUpdateCustomer adminService={adminService} handleActionSelection={handleActionSelection}
                                   displayedActionSelection={displayedActionSelection}/>
                <ShowAllCustomers customers={customers!} handleActionSelection={handleActionSelection}
                                  displayedActionSelection={displayedActionSelection}/>
                <ShowSingleCustomer displayedActionSelection={displayedActionSelection}
                                    submitSearchForCustomerById={submitSearchForCustomerById}
                                    handleActionSelection={handleActionSelection}
                                    selectedCustomerById={selectedCustomerById!}/>
                <Snackbar sx={{position: 'absolute', bottom: '2vh'}} open={popUpSelection ===2}
                          message={userMessage!}>
                    <Alert  severity="success" sx={{ width: '100%' }}>
                        {userMessage}
                    </Alert>

                </Snackbar>
                <Snackbar open={popUpSelection===1} autoHideDuration={1000} >
                    <Alert  severity="error" sx={{ width: '100%' }}>
                        {userMessage}
                    </Alert>
                </Snackbar>

            </div>
        </>
    )
}