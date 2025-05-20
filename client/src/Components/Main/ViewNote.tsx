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
import { useMediaQuery } from '@mui/material';

interface NoteInterface {
    username: string | undefined,
    title: string,
    content: string,
    id?: number,
    tags: string[]
}

interface props {
    selectedNote: NoteInterface,
    setSelectedNote: Function,
    setShowNote: Function
}

const ViewNote: React.FC<props> = ({ selectedNote, setSelectedNote, setShowNote }) => {

    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(selectedNote.content);
    const [title, setTitle] = useState(selectedNote.title);
    const [tags, setTags] = useState<string[]>(selectedNote.tags);
    const [tag, setTag] = useState<string>("");

    const { darkMode } = useUtils();
    const { deleteNote, editNote } = useAuth();

    const contentRef = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery('(min-width:720px)');

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

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 z-[9999] text-white overflow-y-auto">

        <div className="w-full flex flex-row justify-between items-center px-4 md:px-16 py-4 gap-2">
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
            {isDesktop ? "Download as PDF" : "Get PDF"}
            </Button>

            <IconButton
            aria-label="close"
            onClick={() => {
                setSelectedNote(null);
                setShowNote(false);
            }}
            sx={{
                color: "white",
                fontSize: isDesktop ? '3rem' : '2rem'
            }}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
        </div>

        <div className="px-4 md:px-16 pb-10">
            {
            editing ? (
                <div className="flex flex-col items-center gap-4">
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
                        borderBottom: '1px solid white',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        borderBottom: '2px solid white',
                    },
                    width: '100%',
                    maxWidth: 500
                    }}
                />

                <div className="flex flex-wrap gap-2 w-full justify-center">
                    {tags.map((e: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500">
                        <span>{e}</span>
                        <IconButton
                        aria-label="close"
                        onClick={() => {
                            const newTags = [...tags];
                            newTags.splice(idx, 1);
                            setTags(newTags);
                        }}
                        sx={{ color: 'white', padding: 0 }}
                        >
                        <CloseIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
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
                        borderBottom: '1px solid white',
                        },
                        '&:hover:not(.Mui-disabled):before': {
                        borderBottom: '2px solid white',
                        },
                        fontSize: 16,
                        width: 250
                    }}
                    />
                    <Button
                    onClick={() => {
                        if (tag.length > 1) {
                        setTags([...tags, tag]);
                        setTag("");
                        } else {
                        alert("Tags can't be that short");
                        }
                    }}
                    variant="contained"
                    sx={{
                        backgroundColor: darkMode ? '#27ae60' : '#2ecc71',
                        '&:hover': {
                        backgroundColor: darkMode ? '#1f844a' : '#25a35a',
                        }
                    }}
                    >
                    Add Tag
                    </Button>
                </div>

                <TipTapEditor content={content} setContent={setContent} />

                <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                    variant="contained"
                    onClick={() => {
                        editNote({
                        id: selectedNote.id,
                        username: selectedNote.username,
                        title,
                        content,
                        tags
                        });
                        setEditing(false);
                    }}
                    sx={{
                        backgroundColor: darkMode ? '#27ae60' : '#2ecc71',
                        '&:hover': {
                        backgroundColor: darkMode ? '#1f844a' : '#25a35a',
                        }
                    }}
                    >
                    Save
                    </Button>

                    <Button
                    variant="contained"
                    onClick={() => setEditing(false)}
                    sx={{
                        backgroundColor: '#E5E7EB',
                        color: '#374151',
                        '&:hover': {
                        backgroundColor: '#E5E7EB',
                        color: '#111827'
                        }
                    }}
                    >
                    Cancel
                    </Button>
                </div>
                </div>
            ) : (
                <div className="flex flex-col gap-6 items-center">
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    <h1 className="text-2xl font-bold text-center">{selectedNote?.title}</h1>
                    <IconButton onClick={() => setEditing(true)} color="primary">
                        <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => deleteNote(selectedNote)}>
                        <DeleteIcon />
                    </IconButton>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {tags.map((e: string, idx: number) => (
                    <div key={idx} className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg">
                        {e}
                    </div>
                    ))}
                </div>

                <div
                    ref={contentRef}
                    className="print-content w-full max-w-4xl text-left px-4"
                    dangerouslySetInnerHTML={{ __html: content }}
                    style={{ fontSize: '16px' }}
                />
                </div>
            )
            }
        </div>
        </div>
    );
};

export default ViewNote;
