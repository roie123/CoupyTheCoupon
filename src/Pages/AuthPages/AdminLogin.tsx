import {Box, Button, Input, Snackbar, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {AuthClientTypes, clientLogin, LoginRequestDTO} from "../../Services/AuthService";
import {useEffect, useState} from "react";
import SuccesfulLogin from "./SuccesfulLogin";
import './AuthenticationPageStyle.css'
import {useNavigate} from "react-router-dom";
import {CompanyActionTypes} from "../../Models/Enums/CompanyActionTypes";
import {AdminActionTypes} from "../AdminComponents/AdminActionTypes";

interface AdminLoginProps {
    displayedActionSelection: number,

    handleActionSelection(action: AdminActionTypes): void
}

/**
 * Author - Roie Ivri
 * Created Date&Time - 01/06/2023 | 17:05
 */
export default function AdminLogin(props: AdminLoginProps) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<LoginRequestDTO>();
    const [loginResponse, setloginResponse] = useState<string>('');
    const [userName, setuserName] = useState<string>('');
    const [loggedIOd,setloggedIOd] =useState<boolean>(false);
    
    const nav = useNavigate();
    const handleLogin = (data: LoginRequestDTO) => {
        data.clientType = AuthClientTypes.Admin;
        clientLogin(data,AuthClientTypes.Admin).then(value => {
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
                setloggedIOd(true)
            }
        });
        ;

    };

    useEffect(() => {
        if (loggedIOd) {
            setTimeout(() => {
                const welcomeDiv = document.getElementById('logged-in-welcome')!;
                welcomeDiv.style.animationName = 'welcome-message-closing';
                welcomeDiv.style.animationDuration = '1s'
                welcomeDiv.style.animationFillMode = 'forwards'
                welcomeDiv.style.animationIterationCount = '1'
                // welcomeDiv.style.visibility='hidden'

                // nav('/company');
                props.handleActionSelection(AdminActionTypes.GoToActionsSelection);
            }, 3000)
        }
    }, [loggedIOd])
    return (
        <>
            {props.displayedActionSelection === -1 ? <>             <SuccesfulLogin userName={userName}/>
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
            </> : null}

        </>
    )
}