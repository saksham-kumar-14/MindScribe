import React, { useState } from "react";
import { useAuth } from "../../Context/authContext";
import { useUtils } from "../../Context/utilsContext";
import ViewNote from "./ViewNote";
import truncate from 'html-truncate';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface NoteInterface{
    username: string,
    title: string,
    content: string,
    id: number,
    tags: string[]
}

const Search: React.FC = () => {

    const { notes } = useAuth();
    const { darkMode } = useUtils();
    const [ selectedNote, setSelectedNote ] = useState<NoteInterface | null>(null);
    const [ showNote, setShowNote ] = useState(false);

    const [currentNotes, setCurrentNotes] = useState<NoteInterface[]>(notes);
    const [searchQuery, setSearchQuery] = useState("");

    function handleSearching(query: string){

        const queryWords = query.toLowerCase().split(' ');
        if(queryWords.length === 0 || query.replace(/\s+/g, '') === "" ){
            setCurrentNotes(notes);
            return;
        }

        let ans: NoteInterface[] = []
        notes.map((e) => {
            const words = e.title.toLowerCase().split(" ");
            let cnt = 0;
            words.map((e: string) => {
                if(queryWords.includes(e)) ++cnt;
            })
            if(cnt > 0){
                ans = [...ans, e]
            }
        })

        setCurrentNotes(ans);
    }

    return(
        <div className="w-[100%]">

            {showNote && 
                <ViewNote selectedNote={selectedNote} setSelectedNote={setSelectedNote} setShowNote={setShowNote} />
            }

            <div className="p-4 flex items-center justify-center">
                    <Input
                    placeholder='Search for a note'
                    onChange={e => {
                        setSearchQuery(e.target.value);
                        handleSearching(e.target.value);
                    }}
                    type='text'
                    value = {searchQuery}
                    
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
                        width: 500,
                    }}
                />

                <IconButton
                    aria-label="close"
                    onClick={() => {
                        setSearchQuery("");
                        setCurrentNotes(notes);
                    }}
                    sx={{
                        color: 'white',
                    }}
                >
                    <CloseIcon sx={{ 
                        outline: 'none',
                        fontSize: '35px'
                    }} />
                </IconButton>
            </div>

            <div className="grid grid-cols-3">
                {currentNotes.map((e) => {
                    return(
                        <div 
                        onClick={() => {
                            setSelectedNote(e)
                            setShowNote(true)
                        }}
                        className={`mx-6 my-8 p-4 cursor-pointer border-solid border-2 rounded-lg ${darkMode ? 'border-white' : 'border-black'} rounded-lg`}>
                            <h2 className="text-3xl mb-3 underline hover:underline">{e.title}</h2>
                            <div className="h-[20vh] overflow-y-scroll py-3" dangerouslySetInnerHTML={{ __html: truncate(e.content, 200) }} />

                            <div className="h-[17vh] overflow-y-scroll grid grid-cols-3 py-3">
                                {e.tags.map((e) => {
                                    return(
                                        <div className="w-[80px] h-[40px] overflow-y-scroll  overflow-x-scroll mx-2 my-1 p-2 rounded-lg bg-blue-500 hover:to-blue-400 flex items-start justify-start">
                                            {e}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default Search;