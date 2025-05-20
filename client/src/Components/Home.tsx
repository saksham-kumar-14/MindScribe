import React, { useState } from 'react'
import Nav from './Nav'
import { useAuth } from '../Context/authContext'
import Auth from './Auth';
import { IconButton } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { useUtils } from "../Context/utilsContext";
import { useNavigate } from 'react-router-dom';
import MainArea from './Main/MainArea';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Toolbar, Typography } from '@mui/material';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { darkMode, changeDarkMode } = useUtils();
    const isDesktop = useMediaQuery('(min-width:720px)');
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
            <header className={`
                sticky top-0 z-50 w-full
                ${darkMode ? 'bg-gray-800 shadow-md shadow-gray-900/30' : 'bg-white shadow-md shadow-gray-200/50'}
                transition-colors duration-300
            `}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {isDesktop ? (
                            <div className="flex items-center">
                                <h1
                                    onClick={() => navigate('/')}
                                    className={`
                                        font-bold cursor-pointer text-2xl lg:text-3xl
                                        ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}
                                        transition duration-300
                                    `}
                                >
                                    MindScribe
                                </h1>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <Toolbar className="!p-0">
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={() => setOpenMenu(true)}
                                        sx={{ mr: 1 }}
                                        className={`
                                            ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}
                                            rounded-md transition-colors duration-200
                                        `}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography
                                        variant="h6"
                                        className={`
                                            font-semibold text-lg
                                            ${darkMode ? 'text-blue-400' : 'text-blue-600'}
                                        `}
                                        sx={{ flexGrow: 1 }}
                                    >
                                        MindScribe
                                    </Typography>
                                </Toolbar>
                            </div>
                        )}

                        <div className="flex items-center space-x-4">
                            <IconButton
                                sx={{
                                    transition: 'all 0.3s ease',
                                    '&:focus': { outline: 'none' },
                                    '&:focus-visible': { outline: 'none' },
                                    '&:hover': {
                                        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                    },
                                }}
                                className={`
                                    rounded-full p-2
                                    ${darkMode ? 'text-yellow-300 hover:text-yellow-200' : 'text-yellow-600 hover:text-yellow-500'}
                                `}
                                onClick={() => changeDarkMode(!darkMode)}
                                color="inherit"
                                aria-label="toggle dark mode"
                            >
                                {darkMode ? (
                                    <DarkModeOutlined fontSize={isDesktop ? "medium" : "small"} />
                                ) : (
                                    <LightModeOutlined fontSize={isDesktop ? "medium" : "small"} />
                                )}
                            </IconButton>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {isLoggedIn ? (
                    <div className={isDesktop ? 'flex h-[calc(100vh-64px)]' : 'w-full h-[calc(100vh-64px)]'}>
                        {(isDesktop || openMenu) && (
                            <div className={`${isDesktop ? 'w-64 flex-shrink-0' : ''}`}>
                                <Nav openMenu={openMenu} setOpenMenu={setOpenMenu} />
                            </div>
                        )}
                        <div className={`${isDesktop ? 'flex-grow' : 'w-full'}`}>
                            <MainArea openMenu={openMenu} />
                        </div>
                    </div>
                ) : (
                    <Auth />
                )}
            </main>
        </div>
    );
};

export default Home;