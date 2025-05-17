import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../Context/authContext";

interface props{
    setShowDelete: Function
}

const DeleteDialogBox: React.FC<props> = ({ setShowDelete }) => {

    const [pwd, setPwd] = useState("");
    const {deleteUser} = useAuth();

    return(
        <div>
            <div>
                <div>Password</div>
                <div>
                    <input 
                        onChange={(e) => setPwd(e.target.value)}
                        type="password"
                    />
                    <IconButton
                        aria-label="close"
                        onClick={() => setShowDelete(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
            <button onClick={() => {
                deleteUser(pwd);
            }}>
                Delete
            </button>
        </div>
    )
}

export default DeleteDialogBox;