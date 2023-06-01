import {Button, Snackbar} from "@mui/material";
import {useForm} from "react-hook-form";
import {AuthClientTypes, customerLogin, LoginRequestDTO} from "../../Services/AuthService";
import {useEffect, useState} from "react";
import SuccesfulLogin from "./SuccesfulLogin";
import store from "../../Redux/store";
import './AuthenticationPageStyle.css'
import {useNavigate} from "react-router-dom";

interface CompanyLoginProps {

}

/**
 * Author - Roie Ivri
 * Created Date&Time - 01/06/2023 | 17:05
 */
export default function CompanyLogin(props: CompanyLoginProps) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<LoginRequestDTO>();
    const [loginResponse, setloginResponse] = useState<string>('');
    const [userName, setuserName] = useState<string>('');
    const nav = useNavigate();
    const handleLogin = (data: LoginRequestDTO) => {
        data.clientType = AuthClientTypes.Customer;
        customerLogin(data).then(value => {
            if (!value) {
                setloginResponse("Login Values Invalid")
            } else {
                // console.log((localStorage.getItem('token') as string));

                setuserName(localStorage.getItem('userName')!)
                const authDiv = document.getElementById('auth-cont')!;
                const welcomeDiv = document.getElementById('logged-in-welcome')!;
                welcomeDiv.style.visibility = 'visible'
                welcomeDiv.style.animationName = 'welcome-message';
                welcomeDiv.style.animationDuration = '1s'
                welcomeDiv.style.animationFillMode = 'forwards'
                welcomeDiv.style.animationIterationCount = '1'
                authDiv.hidden = true;
            }
        });
        ;

    };

    useEffect(() => {
        if (userName.length > 2 ) {
            setTimeout(() => {
                const welcomeDiv = document.getElementById('logged-in-welcome')!;
                welcomeDiv.style.animationName = 'welcome-message-closing';
                welcomeDiv.style.animationDuration = '1s'
                welcomeDiv.style.animationFillMode = 'forwards'
                welcomeDiv.style.animationIterationCount = '1'
                // welcomeDiv.style.visibility='hidden'

                nav('/company');

            }, 3000)
        }
    }, [userName])
    return (
        <>
            <SuccesfulLogin userName={userName}/>
            <div className="auth-cont" id={'auth-cont'}>
                <div className="login-cont">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <input type="text" {...register('userName')} />
                        <input type="password" {...register('password')} />
                        <Button type={'submit'}>Submit</Button>
                        <Snackbar open={loginResponse.length > 1} message={loginResponse} autoHideDuration={1000}/>
                    </form>
                </div>

            </div>
        </>
    )
}