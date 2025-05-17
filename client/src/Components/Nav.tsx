import React, { useState } from "react";
import DeleteDialogBox from "./AuthUtils/deleteDialogBox";
import Button from '@mui/material/Button';
import { useUtils } from "../Context/utilsContext";
import { useAuth } from "../Context/authContext";

const Nav: React.FC = () => {

    const [showDelete, setShowDelete] = useState(false);
    const {darkMode} = useUtils();
    const { logout } = useAuth();

    return (
        <nav className="h-[100vh] border-r-2 border-r-gray-500">
            <ul>
                <li className="w-[100%] flex items-center justify-center p-2"><a href="/">Home</a></li>
            </ul>

            <div className="w-[100%] flex items-center justify-center p-2">
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: darkMode ? '#17a2b8' : '#007bff',
                        color: darkMode ? '#000' : '#ffffff',
                        '&:hover': {
                        backgroundColor: darkMode ? '#117a8b' : '#0056b3',
                        },
                    }}
                    onClick={logout}
                    >
                        Logout
                </Button>
            </div>

            <div className="w-[100%] flex items-center justify-center p-2">
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: darkMode ? '#c82333' : '#fd7e14',
                        color: darkMode ? '#ffff' : '#fff',
                        '&:hover': {
                        backgroundColor: darkMode ? '#a71d2a' : '#e06c0a',
                        },
                    }}
                    onClick={() => setShowDelete(true)}
                    >
                        Delete
                </Button>
            </div>

            {
                showDelete && <DeleteDialogBox setShowDelete={setShowDelete} />
            }

        </nav>
    );
}

export default Nav;