import React from 'react'
import Nav from './Nav'
import { useAuth } from '../Context/authContext'
import Auth from './Auth';
import { IconButton } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { useUtils } from "../Context/utilsContext";
import { useNavigate } from 'react-router-dom';
import MainArea from './Main/MainArea';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const {
        isLoggedIn
    } = useAuth();

    const {
        darkMode,
        changeDarkMode
    } = useUtils();

    return (
        <>
            <div className='grid grid-cols-2 pb-10'>
                <div className='flex justify-start'>
                    <h1 onClick={() => navigate('/')} className='font-bold cursor-pointer'>MindScribe</h1>
                </div>
                <div className='flex justify-end'>
                    <IconButton
                    sx={{
                        '&:focus': {
                        outline: 'none',
                        },
                        '&:focus-visible': {
                        outline: 'none',
                        },
                        '&:hover': {
                            backgroundColor: darkMode ? '#242424' : 'white',
                            color: darkMode ? 'white' : '#242424'
                        },
                    }}
                    className='cursor-pointer' onClick={() => changeDarkMode(!darkMode)} color="inherit">
                        {darkMode ? <DarkModeOutlined fontSize="large" /> : <LightModeOutlined fontSize="large"/>}
                    </IconButton>
                </div>
            </div>
            
            {
                isLoggedIn?
                <div className='grid grid-cols-[15%_85%]'>
                    <Nav/>
                    <MainArea />
                </div>
                :
                <Auth />
            }
        </>
    )
}

export default Home