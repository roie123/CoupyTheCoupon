import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {AuthClientTypes, customerLogin, LoginRequestDTO} from "../../Services/AuthService";
import {Button, Snackbar} from "@mui/material";
import './AuthenticationPageStyle.css'
import SuccesfulLogin from "./SuccesfulLogin";
import {useNavigate} from "react-router-dom";

interface CustomerLoginPageProps {

}

interface ErrorMessage {
    error: number,
    message: string

}

/**
 * Author - Roie Ivri
 * Created Date&Time - 31/05/2023 | 15:07
 */
export default function CustomerLoginPage(props: CustomerLoginPageProps) {

    /**
     * This state will be responsible for showing the correct login/registration components
     */
    const [authSelection, setauthSelection] = useState<number>(0);
    const {register, handleSubmit, watch, formState: {errors}} = useForm<LoginRequestDTO>();
    const [loginResponse, setloginResponse] = useState<string>('');
    const [userName, setuserName] = useState<string>('');
    const nav = useNavigate();


    const handleLogin = (data: LoginRequestDTO) => {
        data.clientType = AuthClientTypes.Customer;
        customerLogin(data).then(value => {
            console.log(value);
            if (value === '403') {
                setloginResponse("Login Values Invalid")
            }
            if (value === 'nice') {


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
        if (userName.length > 2) {
            setTimeout(() => {
                const welcomeDiv = document.getElementById('logged-in-welcome')!;
                welcomeDiv.style.animationName = 'welcome-message-closing';
                welcomeDiv.style.animationDuration = '1s'
                welcomeDiv.style.animationFillMode = 'forwards'
                welcomeDiv.style.animationIterationCount = '1'
                // welcomeDiv.style.visibility='hidden'

                nav('/customer');

            }, 3000)
        }
    }, [userName])

    useEffect(() => {
        if (loginResponse.length > 1) {
            setTimeout(() => {
                setloginResponse('')

            }, 2000)
        }


    }, [loginResponse])


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