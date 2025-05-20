import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useUtils } from "../../Context/utilsContext";
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';

interface props{
    register: Function
}

const Register: React.FC<props> = ({ register }) => {

    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdType, setPwdType] = useState('password');
    const [pwd2, setPwd2] = useState("");
    const [pwd2Type, setPwd2Type] = useState('password');
    const [email, setEmail] = useState("");

    const { darkMode } = useUtils();
    const isDesktop = useMediaQuery('(min-width:720px)');
    return(
        <div className='justify-center flex'>
        <div>
            <h1>Register</h1>
            <div className="p-4">
                    <InputLabel 
                        sx={{ color: darkMode ? 'whitesmoke' : '#242424'  }} 
                        htmlFor="username">Username</InputLabel>
                    <Input
                        id='username'
                        placeholder='Username'
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
                        htmlFor="Email">Email</InputLabel>
                    <Input
                        id='email'
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
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
                                {pwdType =='text'? <Visibility/> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
            <div className="p-4">
                    <InputLabel 
                        sx={{ color: darkMode ? 'whitesmoke' : '#242424'  }} 
                        htmlFor="pwd2">Confirm Password</InputLabel>
                    <Input
                        id = 'pwd2'
                        onChange={e => setPwd2(e.target.value)}
                        type={pwd2Type}
                        placeholder="Confirm Password"
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
                                    if(pwd2Type == 'text') setPwd2Type('password');
                                    else setPwd2Type('text');
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
                                {pwd2Type =='text'? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>

            <Button
                    variant="contained"
                    sx={{
                        backgroundColor: darkMode ? '#27ae60' : '#2ecc71',
                        color: darkMode ? '#ffff' : '#fff',
                        '&:hover': {
                        backgroundColor: darkMode ? '#1f844a' : '#25a35a',
                        },
                    }}
                    onClick={() => {
                        if(pwd !== pwd2) alert("Passwords don't match");
                        else if(!email.includes('@') || email.length < 5) alert('Invalid Email');
                        else if(username.length < 1) alert('Invalid Username');
                        else register({
                            username: username,
                            email: email,
                            password: pwd
                        });
                    }}
                    >
                        Register
            </Button>
        </div>
        </div>
    )
}

export default Register;