import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from 'react';

const NoteContext = createContext<NoteContextType | null>(null);

interface NoteInterface{
    username: string,
    title: string,
    content: string,
    id: number
}

interface NoteContextType{
    notes: NoteInterface[]
    addNote: (note: NoteInterface) => void,
    deleteNote: (username: string, id:number) => void
}

interface NoteProviderProps{
    children: ReactNode
}

export const UtilsProvider: React.FC<NoteProviderProps> = (props) => {

    const [notes, setNotes] = useState<NoteInterface[]>([]);

    function addNote(note: NoteInterface){
        const unparsedAllNotes = localStorage.getItem('allNotes');
        const allNotes = unparsedAllNotes ? JSON.parse(unparsedAllNotes) : [];
        if(allNotes.length === 0){
            note.id = 0
        }else{
            note.id = allNotes[allNotes.length - 1].id + 1;
        }
        const newAllNotes = [...allNotes, note];
        localStorage.setItem('allNotes', JSON.stringify(newAllNotes));
        setNotes(newAllNotes)
    }

    function deleteAllNotes(username: string){

    }

    function deleteNote(username: string, id:number){
        const unparsedAllNotes = localStorage.getItem('allNotes');
        const allNotes = unparsedAllNotes ? JSON.parse(unparsedAllNotes) : [];
        let index = -1;
        allNotes.map((e: NoteInterface, idx: number) => {
            if(e.id === id && username === e.username){
                index = idx;
            }
        });

        if(index != -1){
            const newAllNotes = allNotes.splice(index, 1);
            localStorage.setItem('allNotes', JSON.stringify(newAllNotes));
            window.location.reload();
        }
    }

    return(
        <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export function useNote() {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error("useNote must be used within a NotesContext");
    }
    return context;
}