import React from "react";
import { useAuth } from "../../Context/authContext";
import truncate from 'html-truncate';
import { useUtils } from "../../Context/utilsContext";

interface NoteInterface{
    username: string,
    title: string,
    content: string,
    id: number
}

const Search: React.FC = () => {

    const { notes } = useAuth();
    const { darkMode } = useUtils();
    return(
        <div className="grid grid-cols-3">
            {notes.map((e: NoteInterface) => {
                return(
                    <div className={`mx-6 my-4 p-4 cursor-pointer border-solid border-2 rounded-lg ${darkMode ? 'border-white' : 'border-black'} rounded-lg`}>
                        <h2 className="text-3xl mb-3 underline">{e.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: truncate(e.content, 200) }} />
                    </div>
                )
            })}
        </div>
    )
}

export default Search;