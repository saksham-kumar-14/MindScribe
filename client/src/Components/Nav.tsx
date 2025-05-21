import React, { useState, useEffect } from "react";
import DeleteDialogBox from "./AuthUtils/deleteDialogBox";
import Button from '@mui/material/Button';
import { useUtils } from "../Context/utilsContext";
import { useAuth } from "../Context/authContext";
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from '@mui/material/Input';

interface props {
    openMenu: Boolean,
    setOpenMenu: Function
}

interface folderInterface{
    title: string,
    username: string | undefined,
    notes: number[]
}

interface NoteInterface{
    username: string | undefined,
    title: string,
    content: string,
    id?: number,
    tags: string[]
}

const Nav: React.FC<props> = ({ openMenu, setOpenMenu }) => {
    const [showDelete, setShowDelete] = useState(false);
    const [folderSelected, setfolderSelected] = useState<number>(-1);
    const { darkMode } = useUtils();
    const { folders, setFolders, logout, user, notes, setCurrentNotes, updateFolder } = useAuth();
    const isDesktop = useMediaQuery('(min-width:720px)');

    const [ newFolder, setNewFolder ] = useState<folderInterface>({
        title: "",
        username: user?.username,
        notes: []
    });

    useEffect(() => {
        if (openMenu && !isDesktop) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            
            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [openMenu, isDesktop]);

    function createFolder(){
        const newFolders = [...folders, newFolder]
        setFolders(newFolders)
        setNewFolder({
            username: user?.username,
            notes: [],
            title: ""
        });
        updateFolder(newFolders)
    }

    function deleteFolder(idx: number){
        let newFolders = folders
        newFolders.splice(idx, 1);
        setFolders(newFolders);
        updateFolder(newFolders);
        window.location.reload()
    }

    return (
        <>
        {openMenu && !isDesktop && (
            <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" 
            onClick={() => setOpenMenu(false)}
            />
        )}

        <nav className={`
            ${openMenu 
            ? `sticky h-[100vh] inset-y-0 left-0 w-[80vw] sm:w-[50vw] z-[10000] 
                ${darkMode ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-800"}
                shadow-2xl transition-all duration-300 ease-in-out overflow-hidden`
            : ""}
            ${!openMenu ? `h-[100%] ${isDesktop ? "border-r-2 border-r-gray-500" : ""} overflow-hidden` : ""}
            ${openMenu ? "rounded-r-2xl" : ""}
        `}>
            {openMenu && (
            <div className="flex justify-end items-center p-4">
                <IconButton
                aria-label="close"
                onClick={() => setOpenMenu(false)}
                className="focus:outline-none"
                sx={{
                    color: darkMode ? "white" : "black",
                }}
                >
                <CloseIcon
                    sx={{
                    outline: "none",
                    fontSize: "35px",
                    }}
                />
                </IconButton>
            </div>
            )}

            <div className="p-4 pt-6 h-full flex flex-col overflow-hidden">
                
                <div className="mb-6">
                    <a 
                        href="/" 
                        className={`
                            flex items-center justify-center md:justify-start gap-2 p-3 w-full rounded-lg transition-colors duration-200 mb-2
                            ${darkMode 
                            ? "text-white bg-slate-700 hover:bg-slate-600" 
                            : "text-gray-800 bg-gray-200 hover:bg-gray-300"}
                        `}
                    >
                        <HomeIcon fontSize="small" />
                        <span className="font-medium">Home</span>
                    </a>
                </div>

                <div className="py-3 flex flex-col">
                    <Input
                        placeholder='New Folder'
                        onChange={e => setNewFolder({
                            title: e.target.value,
                            notes: [],
                            username: user?.username
                        })}
                        type='text'
                        value={newFolder.title}
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
                            width: '100%',
                            marginX: '2px'
                        }}
                    />

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: darkMode ? "#27ae60" : "#2ecc71",
                            color: "#fff",
                            fontSize: isDesktop ? "14px" : "12px",
                            paddingX: isDesktop ? "24px" : "16px",
                            paddingY: isDesktop ? "10px" : "6px",
                            '&:hover': {
                            backgroundColor: darkMode ? "#1f844a" : "#25a35a"
                            },
                            marginTop: "6px",
                            marginBottom: "30px"
                        }}
                        onClick={() => {
                            if(newFolder.title.length > 1){
                                createFolder();
                            }else{
                                alert("Folder name can't be that small")
                            }
                        }}
                        >
                            New Folder
                    </Button>

                    <div className="h-[30vh] overflow-y-scroll">
                        {
                            !isDesktop && 
                            <button 
                            className="rounded-md px-3 py-1 bg-violet-500"
                            onClick={() => {
                                setCurrentNotes(notes)
                                setOpenMenu(false)
                            }}>All Notes</button>
                        }
                        {
                            folders.map((folder, idx) => {
                                return(
                                    <div 
                                    className={`flex items-center rounded-lg my-2 p-1 hover:bg-gray-700 justify-center ${folderSelected === idx ? "bg-gray-700" : ""}`}
                                    >
                                        <div
                                        onClick={() => {

                                            if(folderSelected !== idx){
                                                setfolderSelected(idx)
                                                let newCurrNotes: NoteInterface[] = [];
                                                notes.map((note) => {
                                                    if(note.id != undefined && folder.notes.includes(note.id)){
                                                        newCurrNotes = [...newCurrNotes, note]
                                                    }
                                                })
                                                setCurrentNotes(newCurrNotes)
                                            }else{
                                                setfolderSelected(-1);
                                                setCurrentNotes(notes)
                                            }
                                            if(openMenu) setOpenMenu(false)
                                        }}
                                        className="mx-2 flex cursor-pointer"
                                        >
                                            {folder.title}
                                        </div>
                                        <IconButton
                                            aria-label="close"
                                            onClick={() => deleteFolder(idx)}
                                            className="focus:outline-none"
                                            sx={{
                                                color: darkMode ? "white" : "black",
                                            }}
                                            >
                                            <CloseIcon
                                                sx={{
                                                outline: "none",
                                                fontSize: "20px",
                                                }}
                                            />
                                        </IconButton>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                
                <div className="space-y-4 flex-shrink-0">
                    <div className="w-full">
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<LogoutIcon />}
                            sx={{
                                backgroundColor: darkMode ? '#17a2b8' : '#007bff',
                                color: darkMode ? '#000' : '#ffffff',
                                padding: '10px 16px',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: darkMode ? '#117a8b' : '#0056b3',
                                },
                            }}
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                    
                    <div className="w-full">
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<DeleteIcon />}
                            sx={{
                                backgroundColor: darkMode ? '#c82333' : '#fd7e14',
                                color: darkMode ? '#ffff' : '#fff',
                                padding: '10px 16px',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: darkMode ? '#a71d2a' : '#e06c0a',
                                },
                            }}
                            onClick={() => setShowDelete(true)}
                        >
                            Delete
                        </Button>

                        {showDelete && <DeleteDialogBox setShowDelete={setShowDelete} />}
                    </div>
                </div>
                
                {isDesktop && (
                    <div className={`mt-auto pt-4 text-center text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <p>©2025 MindScribe</p>
                        <p>All your notes, all in one place</p>
                    </div>
                )}
            </div> 
        </nav>
        </>
    );
}

export default Nav;