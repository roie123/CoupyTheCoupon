import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import RedeemIcon from '@mui/icons-material/Redeem';
import MenuIcon from '@mui/icons-material/Menu';
import SavingsIcon from '@mui/icons-material/Savings';
export default function NavBar(){

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);



    const [currentCartValue,setcurrentCartValue] = useState<string>('');



    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };









    const handleCloseNavMenu = (page:string) => {
        switch (page){
            case 'קצת עלינו' :  {
                setpopUpSelection(1);
                break;
            }
            case 'צור קשר' :  {
                setpopUpSelection(2);
                break;
            }
            case 'מוצרים אחרים' :  {
                setpopUpSelection(3);
                break;
            }
        }
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (page:string) => {
        switch (page){
            case 'קצת עלינו' :  {
                setpopUpSelection(1);
                break;
            }
            case 'צור קשר' :  {
                setpopUpSelection(2);
                break;
            }
            case 'מוצרים אחרים' :  {
                setpopUpSelection(3);
                break;
            }
        }


        setAnchorElUser(null);
    };

    /**
     * This state is for the pop up selection from the Menu
     * 1 => the aboutUs popUp
     * 2 => the  contactUs popUp
     * 3 => the moreProducts popUp
     */
    const [popUpSelection,setpopUpSelection] =useState<number>(0);



    /**
     * This is for the future ROUTING
     * @param setting the target page
     */
    function handleClickOnSetting(setting: string) {


    }
    const nav = useNavigate();


    function handleClickOnMenuItem(page:string){
        switch (page){
            case 'קצת עלינו' :  {
                setpopUpSelection(1);
                break;
            }
            case 'צור קשר' :  {
                setpopUpSelection(2);
                break;
            }
            case 'מוצרים אחרים' :  {
                setpopUpSelection(3);
                break;
            }
        }


    }

const pages :string[] = ['sss' , 'ssss'];




    const [openAlert, setOpenAlert] = useState(false);


    const handleClickAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };





    ///ADMIN LOGIN ACTIVATION

    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);


    useEffect(() => {
        return () => {
            stopRepeating(); // Clean up the interval when the component unmounts
        };
    }, []);

    const startRepeating = () => {
        if (intervalId) return; // Return if already repeating

        const id = setInterval(() => {
            // Function to be executed repeatedly
            console.log('Button pressed repeatedly!');
        }, 200);

        setIntervalId(id);

        setTimeout(() => {
            stopRepeating(); // Stop repeating after 3 seconds
            nav('/admin'); // Redirect to '/admin'
        }, 3000);
    };

    const stopRepeating = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };




    return(
        <AppBar sx={{backgroundColor:'black'}} position="sticky">

            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/*This Box is for the Desktop Users */}
                    {/*<Box sx={{display: 'flex', flexDirection: 'row', gap: '7vh'}}>*/}
                    {/* <RedeemIcon/>*/}



                    {/*</Box>*/}
                    {/*End of the Desktop Section*/}


                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{color:'white'}}/>
                        </IconButton>
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>

                        </IconButton>

                         {/*for the HAMBURGER ^^*/}

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >

                                <MenuItem sx={{height: '5vh', alignItems: 'start', minWidth: 'minWidth'}}
                                          onClick={()=>handleCloseUserMenu('')}>
                                    <Typography fontSize={'1.5rem'} textAlign="justify"
                                                onClick={() => handleClickOnSetting('/auth')}>Login</Typography>


                                </MenuItem>
                                <MenuItem>
                                    <Typography fontSize={'1.5rem'} textAlign="justify"
                                                onClick={() => handleClickOnSetting('/company-auth')}>Enterprise Access</Typography>

                                </MenuItem>

                        </Menu>

                    </Box>

                    <Button onMouseDown={startRepeating} onMouseUp={stopRepeating}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                                marginLeft:'5vw'
                            }}

                        >
                            Coupy

                        </Typography>
                    </Button>


                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={()=> handleCloseNavMenu(page)}
                                sx={{my: 2, display: 'block'}}

                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>

                        <Tooltip title={currentCartValue}>


                            <IconButton sx={{p: 0 ,color:'black'}} >
                                <SavingsIcon sx={{color:'black'}} />
                            </IconButton>


                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                        </Menu>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}