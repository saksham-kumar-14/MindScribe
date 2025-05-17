import React from 'react'
import Login from './AuthUtils/login'
import Register from './AuthUtils/register'
import { useAuth } from '../Context/authContext'


const Auth: React.FC = () => {

    const { login, register } = useAuth();
    return (
        <div className='grid grid-cols-2'>
            <Login login={login} />
            <Register register={register} />
        </div>
    )
}

export default Auth