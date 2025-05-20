import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../Context/authContext";
import Input from '@mui/material/Input';

interface props{
    setShowDelete: Function
}

const DeleteDialogBox: React.FC<props> = ({ setShowDelete }) => {

    const [pwd, setPwd] = useState("");
    const {deleteUser} = useAuth();

    return(
        <div>
            <div>
                <div className="flex justify-center items-center mt-4 pt-2">
                    <p >Password</p>
                    <IconButton
                        aria-label="close"
                        onClick={() => setShowDelete(false)}
                        sx={{
                            color: 'white'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div>
                    <Input
                        placeholder='Password'
                        onChange={e => setPwd(e.target.value)}
                        type='text'
                        value={pwd}
                        sx={{
                            color: 'white',
                            '::placeholder': {
                                color: 'gray',
                            },
                            '&:before': {
                                borderBottom: '1px solid white' ,
                            },
                            '&:hover:not(.Mui-disabled):before': {
                                borderBottom: '2px solid white',
                            },
                            fontSize: 16,
                            width: 120,
                            marginX: '2px'
                        }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center">
                <button
                className="mt-3 border-red-500 border-2"
                onClick={() => {
                    deleteUser(pwd);
                }}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteDialogBox;