import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Input } from "@mui/material";
import { useUtils } from "../../Context/utilsContext";
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';

interface props{
    login: Function
}

const Login: React.FC<props> = ({ login }) => {

    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdType, setPwdType] = useState('password');

    const { darkMode } = useUtils();
    const isDesktop = useMediaQuery('(min-width:720px)');

    return(
        <div className='justify-center flex'>
            <div>
                {
                    isDesktop ? <h1 className="flex items-center justify-center">Login</h1> : <h2 className="text-3xl flex items-center justify-center">Login</h2>
                }
                <div className="p-4">
                    <InputLabel 
                        sx={{ color: darkMode ? 'whitesmoke' : '#242424'  }} 
                        htmlFor="username">Username or Email</InputLabel>
                    <Input
                        id='username'
                        placeholder='Username or Email'
                        onChange={e => setUsername(e.target.value)}
                        type='text'
                        
                        sx={{
                            color: darkMode ? 'whitesmoke' : '#242424', // applies to text
                            '::placeholder': {
                                color: 'gray',
                            },
                            '&:before': {
                                borderBottom: darkMode ? '1px solid white' : '1px solid black',
                            },
                            '&:hover:not(.Mui-disabled):before': {
                                borderBottom: darkMode ? '2px solid white' : '2px solid black',
                            },
                            width : isDesktop ? '40vw' : '80vw'
                        }}
                    />
                </div>
                <div className="p-4">
                    <InputLabel 
                        sx={{ color: darkMode ? 'whitesmoke' : '#242424'  }} 
                        htmlFor="pwd">Password</InputLabel>
                    <Input
                        id = 'pwd'
                        onChange={e => setPwd(e.target.value)}
                        type={pwdType}
                        placeholder="Password"
                        sx={{
                            color: darkMode ? 'whitesmoke' : '#242424', // applies to text
                            '::placeholder': {
                                color: 'gray',
                            },
                            '&:before': {
                                borderBottom: darkMode ? '1px solid white' : '1px solid black',
                            },
                            '&:hover:not(.Mui-disabled):before': {
                                borderBottom: darkMode ? '2px solid white' : '2px solid black',
                            },
                            width : isDesktop ? '40vw' : '80vw'
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton edge="end" 
                                onClick={() => {
                                    if(pwdType == 'text') setPwdType('password');
                                    else setPwdType('text');
                                }}
                                sx={{
                                    '&:focus': {
                                    outline: 'none',
                                    },
                                    '&:focus-visible': {
                                    outline: 'none',
                                    },
                                    color: darkMode ? 'white' : 'black'
                                }}
                            >
                                {pwdType =='text'? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: darkMode ? '#2980b9' : '#339af0',
                        color: darkMode ? '#ffff' : '#fff',
                        '&:hover': {
                        backgroundColor: darkMode ? '#1f5c88' : '#2878c7',
                        },
                    }}
                    onClick={() => {
                    login({username: username, password:pwd});}}
                    >
                        Login
                </Button>
            </div>
        </div>
    )
}

export default Login;