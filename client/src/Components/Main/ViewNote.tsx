import React, { useRef, useState } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TipTapEditor from "./TextEditor";
import Button from '@mui/material/Button';
import { useUtils } from "../../Context/utilsContext";
import Input from '@mui/material/Input';
import { useAuth } from "../../Context/authContext";


interface NoteInterface{
    username: string | undefined,
    title: string,
    content: string,
    id?: number,
    tags: string[]
}

interface props{
    selectedNote: NoteInterface,
    setSelectedNote : Function,
    setShowNote: Function
}

const ViewNote: React.FC<props> = ({ selectedNote, setSelectedNote, setShowNote }) => {

    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(selectedNote.content);
    const [title, setTitle] = useState(selectedNote.title);
    const [tags, setTags] = useState<string[]>(selectedNote.tags)
    const [tag, setTag] = useState<string>("")

    const { darkMode } = useUtils();
    const { deleteNote, editNote } = useAuth();

    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
    try {
        const printWindow = window.open('', '_blank');
        
        const printDocument = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${title}</title>
                <style>
                @media print {
                    body { margin: 0; }
                    @page { margin: 0.5in; }
                }
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    line-height: 1.6;
                }
                </style>
            </head>
            <body>
                ${content}
                <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => window.close(), 100);
                }
                </script>
            </body>
            </html>`;
        
        printWindow?.document.write(printDocument);
        printWindow?.document.close();
        } catch (error) {
            console.error('Error opening print dialog:', error);
            alert('Error opening print dialog. Please try again.');
        } 
    };
    
    return(
        <div className="flex items-center flex-col justify-center fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 z-[9999] text-white overflow-y-scroll">

            <div className="grid grid-cols-2 w-[100%]">
                <div className="flex items-start justify-start px-16">
                    <Button
                    variant="contained"
                    sx={{
                        backgroundColor: darkMode ? '#17a2b8' : '#007bff',
                        color: darkMode ? '#000' : '#ffffff',
                        '&:hover': {
                        backgroundColor: darkMode ? '#117a8b' : '#0056b3',
                        },
                    }}
                    onClick={handleDownload}
                    >
                        Download as PDF
                </Button>
                </div>

                <div className="flex justify-end items-end px-16">
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setSelectedNote(null);
                            setShowNote(false);
                        }}
                        sx={{
                            color: "white",
                            fontSize: '3rem',
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </div>
            <div className='h-[80vh] w-[100vw] overflow-x-scroll overflow-y-scroll scrollbar-hide'>

                
                {
                    editing ?
                    <div className="flex flex-col items-center justify-center">

                        <Input
                            id='title'
                            placeholder='Title'
                            onChange={e => setTitle(e.target.value)}
                            type='text'
                            value={title}
                            
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
                                margin: '10px',
                                width: '350px'
                            }}
                        />

                    <div className="items-center justify-center flex w-[80vw] overflow-x-scroll">
                        {tags.map((e: string, idx: number) => {
                            return(
                                <div className="flex items-center justify-center mx-4 pl-2 py-2 rounded-lg text-white bg-red-600 hover:bg-red-500">
                                    <div className="">{e}</div>
                                    <IconButton
                                        aria-label="close"
                                        onClick={() => {
                                            const newTags = [...tags];
                                            newTags.splice(idx, 1);
                                            setTags(newTags);
                                        }}
                                        sx={{
                                            color: 'white'
                                        }}
                                    >
                                        <CloseIcon sx={{ fontSize: 20 }} />
                                    </IconButton>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex p-4">
                        <Input
                            placeholder='Add Tag'
                            onChange={e => setTag(e.target.value)}
                            type='text'
                            value={tag}
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
                                width: 250,
                                marginX: '12px'
                            }}
                        />

                        <Button
                            onClick={()=> {
                                if(tag.length > 1){
                                    const newTags = [...tags, tag];
                                    setTags(newTags);
                                    setTag("");
                                }else{
                                    alert("Tags can't be that short")
                                }
                            }}
                            variant="contained"
                            sx={{
                                backgroundColor: darkMode ? '#27ae60' : '#2ecc71',
                                color: darkMode ? '#ffff' : '#fff',
                                '&:hover': {
                                backgroundColor: darkMode ? '#1f844a' : '#25a35a',
                                },
                                marginX: '12px'
                            }}
                            
                            >
                                Add Tag
                        </Button>
                    </div> 
                    
                        <TipTapEditor content={ content } setContent={ setContent } />
                        
                        <div className="p-2">
                            <Button
                                variant="contained"
                                
                                sx={{
                                    backgroundColor: darkMode ? '#27ae60' : '#2ecc71',
                                    color: darkMode ? '#ffff' : '#fff',
                                    '&:hover': {
                                    backgroundColor: darkMode ? '#1f844a' : '#25a35a',
                                    },
                                    marginX: '40px'
                                }}
                                onClick={() => {console.log(tags); editNote({
                                    id: selectedNote.id,
                                    username: selectedNote.username,
                                    title: title,
                                    content: content,
                                    tags: tags
                                })}}
                                >
                                    Save
                            </Button>

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#E5E7EB',
                                    color: '#374151',
                                    '&:hover': {
                                    backgroundColor: '#E5E7EB',
                                    color: '#111827'
                                    },
                                    marginX: '40px'
                                }}
                                onClick={() => setEditing(false)}
                                >
                                    Cancel
                            </Button>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <h1 className="flex justify-center items-center"> {selectedNote?.title} </h1>
                            <IconButton
                                onClick={() => setEditing(true)}
                                color="primary"
                                size="large"
                                sx={{ paddingX: '100px',
                                    '&:focus': {
                                outline: 'none',
                                },
                                '&:focus-visible': {
                                outline: 'none',
                                }
                            }}
                            >
                                <EditIcon fontSize="inherit" />
                            </IconButton>

                            <IconButton
                                color="error"
                                size="large"
                                sx={{ paddingX: '100px',
                                    '&:focus': {
                                outline: 'none',
                                },
                                '&:focus-visible': {
                                outline: 'none',
                                }
                                }}
                                onClick={() => deleteNote(selectedNote)}
                            >
                            <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </div>

                        <div className="items-center justify-center flex w-[80vw] overflow-x-scroll">
                            {tags.map((e: string) => {
                                return(
                                    <div className="mx-4 px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-500">{e}</div>
                                )
                            })}
                        </div>

                        <div
                            ref={contentRef}
                            className="print-content p-[50px] w-[100%]"
                            dangerouslySetInnerHTML={{ __html: content }}
                            style={{
                                fontSize: '16px',
                            }}
                        ></div>


                    </div>
                }
            </div>

        </div>
    )
}

export default ViewNote;