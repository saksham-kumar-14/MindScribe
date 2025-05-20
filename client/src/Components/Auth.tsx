import React, { useState } from 'react'
import Login from './AuthUtils/login'
import Register from './AuthUtils/register'
import { useAuth } from '../Context/authContext'
import { useMediaQuery } from '@mui/material';

const Auth: React.FC = () => {
    const isDesktop = useMediaQuery('(min-width:720px)');
    const { login, register } = useAuth();
    const [registerSelected, setRegisterSelected] = useState(false);

    return (
        <>
            {
                isDesktop ? 
                    <div className='pt-10 grid grid-cols-2'>
                        <Login login={login} />
                        <Register register={register} />
                    </div>
                :
                <div>
                    <nav className='grid grid-cols-2 pb-8'>
                        <button 
                            onClick={() => setRegisterSelected(true)}
                            className={
                                registerSelected ?
                                "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500"
                                :
                                "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }>
                                Register
                        </button>

                        <button 
                            onClick={() => setRegisterSelected(false)}
                            className={
                                !registerSelected ?
                                "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500"
                                :
                                "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }>
                                Login
                        </button>
                    </nav>

                    {
                        registerSelected ? 
                        <Register register={register} />
                        :
                        <Login login={login} />
                    }
                </div>
            }
        </>
    )
        
}

export default Auth