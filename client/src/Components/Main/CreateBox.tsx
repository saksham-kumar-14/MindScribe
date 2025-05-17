import React, { useEffect, useState } from "react";
import { useUtils } from "../../Context/utilsContext";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../Context/authContext";
import TextEditor from "./TextEditor";

interface props{
    setCreateBox: Function
}

const CreateBox: React.FC<props> = ({ setCreateBox }) => {

    const {darkMode} = useUtils();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { user, addNote } = useAuth();

    return(
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-[9999]">
            <nav className="flex justify-end">
                <IconButton
                    aria-label="close"
                    onClick={() => setCreateBox(false)}
                    sx={{
                        color: 'white',
                    }}
                >
                    <CloseIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </nav>
            <div className="flex flex-col items-center">
                <div className="p-4">
                    <Input
                        id='title'
                        placeholder='Title'
                        onChange={e => setTitle(e.target.value)}
                        type='text'
                        
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
                            fontSize: 25,
                            width: 500,
                        }}
                    />
                </div>

                <TextEditor content={content} setContent={setContent} />

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
                        addNote({
                            title: title,
                            content: content,
                            username: user?.username
                        });
                    }}
                    >
                        Add
                </Button>

            </div>
        </div>
    )
}

export default CreateBox;