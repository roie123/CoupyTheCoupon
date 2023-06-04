import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import CustomerPage from "../Pages/Customer Components/CustomerPage";
import CompanyPage from "../Pages/Company Components/CompanyPage";
import AdminPage from "../Pages/AdminComponents/AdminPage";
import CustomerLoginPage from "../Pages/AuthPages/CustomerLoginPage";
import CompanyLogin from "../Pages/AuthPages/CompanyLogin";

interface RoutingConfigProps{

}
    /**
     * Author - Roie Ivri 
     * Created Date&Time - 01/06/2023 | 16:02
     */
export default function RoutingConfig(props:RoutingConfigProps){

return(
<>

        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/customer" element={<CustomerPage />}/>
            {/*<Route path="/customer-auth" element={<CustomerLoginPage />}/>*/}
            <Route path="/company" element={<CompanyPage />}/>
            {/*<Route path="/company-auth" element={<CompanyLogin />}/>*/}
            <Route path="/admin" element={<AdminPage />}/>
            {/*<Route path="/auth" element={<CustomerLoginPage />}/>*/}


        </Routes>

</>
)
}