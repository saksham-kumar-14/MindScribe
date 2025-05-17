import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from 'react';

const UtilsContext = createContext<UtilsContextType | null>(null);

interface UtilsContextType{
    darkMode: boolean;
    changeDarkMode: (mode: boolean) => void;
}

interface UtilsProviderProps{
    children: ReactNode
}

export const UtilsProvider: React.FC<UtilsProviderProps> = (props) => {
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        const mode = localStorage.getItem('darkMode');
        if(mode == 'false'){
            setDarkMode(false);
            document.body.className = 'light'
        }
        else{
            setDarkMode(true);
            document.body.className = 'dark'
        }
    }, []);

    function changeDarkMode(mode: boolean){
        setDarkMode(mode)
        localStorage.setItem('darkMode', String(mode));
        const buttons = document.getElementsByTagName('button');
        const inputs = document.getElementsByTagName('input')
        if(mode){
            document.body.className = 'dark'
            for (let button of buttons) {
                button.classList.add('dark');
            }
            for (let input of inputs) {
                input.classList.add('dark');
            }
        }else{
            document.body.className = 'light'
            for (let button of buttons) {
                button.classList.add('light');
            }
            for (let input of inputs) {
                input.classList.add('light');
            }
        }
    }

    return(
        <UtilsContext.Provider value={{ darkMode, changeDarkMode }}>
            {props.children}
        </UtilsContext.Provider>
    )
}

export function useUtils() {
    const context = useContext(UtilsContext);
    if (!context) {
        throw new Error("useUtils must be used within a UtilsContext");
    }
    return context;
}