import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {AuthClientTypes, clientLogin, LoginRequestDTO} from "../../Services/AuthService";
import {Box, Button, Snackbar, TextField} from "@mui/material";
import './AuthenticationPageStyle.css'
import {useNavigate} from "react-router-dom";
import {CustomerActionTypes} from "../../Models/Enums/CustomerActionTypes";
import SuccesfulLogin from "./SuccesfulLogin";

interface CustomerLoginPageProps {
    displayedAction:number,
    handleChangeInDisplayedAction(action :CustomerActionTypes):void
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
        clientLogin(data,AuthClientTypes.Customer).then(value => {
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

                // nav('/customer');
                props.handleChangeInDisplayedAction(CustomerActionTypes.Login);

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
            {props.displayedAction===-1 ? <>
                <SuccesfulLogin userName={userName}/>
                <div className="auth-cont" id={'auth-cont'}>
                    <div className="login-cont">
                        <form  onSubmit={handleSubmit(handleLogin)}>
                            <Box sx={{display:'flex' , flexDirection:'column' , gap:'5vh', }}>
                                <TextField hidden={true} sx={{zIndex:'0'}} label="Email"  type="text" {...register('userName')} />
                                <TextField  type="password" label="Password" {...register('password')} />
                                <Button type={'submit'}>Submit</Button>


                            </Box>

                            <Snackbar open={loginResponse.length > 1} message={loginResponse} autoHideDuration={1000}/>
                        </form>
                    </div>

                </div>

            </> : null }

        </>
    )
}