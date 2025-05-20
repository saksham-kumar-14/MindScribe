import React, { useState } from "react";
import { useAuth } from "../../Context/authContext";
import { useUtils } from "../../Context/utilsContext";
import ViewNote from "./ViewNote";
import truncate from 'html-truncate';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';

interface NoteInterface {
    username: string | undefined,
    title: string,
    content: string,
    id?: number,
    tags: string[]
}

interface props {
  openMenu: Boolean
}

const Search: React.FC<props> = ({ openMenu }) => {
    const { notes }: { notes: NoteInterface[] } = useAuth();
    const { darkMode }: { darkMode: boolean } = useUtils();

    const [selectedNote, setSelectedNote] = useState<NoteInterface | null>(null);
    const [showNote, setShowNote] = useState(false);

    const [currentNotes, setCurrentNotes] = useState<NoteInterface[]>(notes);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const isDesktop = useMediaQuery('(min-width:720px)');

    function handleSearching(query: string): void {
        if (query === "") {
        setCurrentNotes(notes);
        return;
        }

        let ans: NoteInterface[] = [];
        notes.forEach((e) => {
        let cnt = 0;
        for (let i = 0; i <= e.title.toLowerCase().length - query.length; i++) {
            if (query.toLowerCase() === e.title.toLowerCase().substring(i, i + query.length)) cnt++;
        }
        if (cnt > 0) {
            ans = [...ans, e];
        }
        });
        setCurrentNotes(ans);
    }

    return (
        <div className={`w-full h-[100%] transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
        {showNote && selectedNote && (
            <ViewNote selectedNote={selectedNote} setSelectedNote={setSelectedNote} setShowNote={setShowNote} />
        )}

        <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
            <div className={`flex items-center p-3 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <SearchIcon className={`mr-2 ${darkMode ? "text-gray-300" : "text-gray-500"}`} />
                <Input
                placeholder="Search for a note"
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearching(e.target.value);
                }}
                type="text"
                value={searchQuery}
                className="flex-grow"
                disableUnderline
                fullWidth
                sx={{
                    color: darkMode ? "white" : "black",
                    "::placeholder": {
                    color: darkMode ? "rgb(156, 163, 175)" : "rgb(107, 114, 128)",
                    },
                    fontSize: 16,
                }}
                />
                {searchQuery && (
                <IconButton
                    aria-label="clear search"
                    onClick={() => {
                    setSearchQuery("");
                    setCurrentNotes(notes);
                    }}
                    size="small"
                    className="focus:outline-none"
                    sx={{
                    color: darkMode ? "rgb(156, 163, 175)" : "rgb(107, 114, 128)",
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
                )}
            </div>
            </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-[100%] overflow-y-scroll">
                {currentNotes.length > 0 ? (
                currentNotes.map((note) => (
                    <div
                    key={note.id}
                    onClick={() => {
                        setSelectedNote(note);
                        setShowNote(true);
                    }}
                    className={`
                        relative overflow-hidden group rounded-xl shadow-md transition-all duration-300
                        ${darkMode 
                        ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" 
                        : "bg-white hover:bg-gray-50 border border-gray-200"
                        }
                        transform hover:-translate-y-1 hover:shadow-lg cursor-pointer
                    `}
                    >
                    <div className="p-5">
                        <h2 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {note.title}
                        </h2>
                        
                        {isDesktop && (
                        <div 
                            className={`
                            prose-sm mb-4 h-24 overflow-hidden
                            ${darkMode ? "prose-invert text-gray-300" : "text-gray-600"}
                            `}
                            dangerouslySetInnerHTML={{ __html: truncate(note.content, 160) }} 
                        />
                        )}
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                        {note.tags.map((tag, idx) => (
                            <span
                            key={idx}
                            className={`
                                px-2 py-1 text-xs font-medium rounded-full
                                ${darkMode 
                                ? "bg-blue-900 text-blue-200" 
                                : "bg-blue-100 text-blue-800"
                                }
                            `}
                            >
                            {tag}
                            </span>
                        ))}
                        </div>
                    </div>
                    </div>
                ))
                ) : (
                <div className={`col-span-full text-center py-20 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <p className="text-xl">No notes found</p>
                    <p className="mt-2">Try particular keywords</p>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
};

export default Search;