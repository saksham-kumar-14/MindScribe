import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from 'react';
// import jwt from ' /jsonwebtoken'; // will later deploy jwt in backedn only ..
import { SignJWT, jwtVerify } from 'jose';
import type {JWTPayload} from 'jose'

const AuthContext = createContext<AuthContextType | null>(null);
interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (user: JWTPayload | null) => void;
    logout: () => void;
    register: (user: StoredUser) => void;
    deleteUser: (password: string) => void;

    notes: NoteInterface[]
    addNote: (note: NoteInterface) => void,
    deleteNote: (username: string, id:number) => void
}
interface User {
    username: string;
    email: string;
}
interface AuthProviderProps {
    children: ReactNode
}
interface StoredUser{
    username: string,
    password: string,
    email: string
}

interface NoteInterface{
    username: string,
    title: string,
    content: string,
    id: number
}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [notes, setNotes] = useState<NoteInterface[]>([]);

    useEffect(()=>{
        try{
            const userToken = localStorage.getItem('userToken');
            getToken(userToken);
        } catch {
            console.log('Invalid user token stored');
        }

    }, []);

    function getUserNotes(username: string){
        const unparsedAllNotes = localStorage.getItem('allNotes');
        const allNotes = unparsedAllNotes ? JSON.parse(unparsedAllNotes) : [];
        let userNotes: NoteInterface[] = [];
        allNotes.map((e: NoteInterface) => {
            if(e.username == username){
                userNotes = [...userNotes, e]
            }
        })
        setNotes(userNotes);
    }

    const getToken = async (userToken: string | null) => {
        const decoded = await verifyToken(userToken);
        login(decoded)
    }

    const verifyToken = async (token: string | undefined | null) => {
        if (typeof token !== 'string') {
            console.error('Invalid token: not a string', token);
            return null;
        }

        const encoder = new TextEncoder();
        const secretKey = import.meta.env.VITE_SECRET_KEY;
        try {
            const { payload } = await jwtVerify(token, encoder.encode(secretKey));
            console.log('Verified Payload:', payload);
            return payload;
        } catch (err) {
            console.error('Invalid token', err);
            return null;
        }
    };

    const createToken = async (user: StoredUser) => {
        const encoder = new TextEncoder();
        const secretKey = import.meta.env.VITE_SECRET_KEY;
        const token = await new SignJWT(user)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('720h')
        .sign(encoder.encode(secretKey));
        
        localStorage.setItem('userToken', token);
    };

    function login (decoded: JWTPayload | null) {
        if(decoded === null){
            setIsLoggedIn(false);
            return;
        }
        const allUsers = localStorage.getItem('allUsers');
        let parsedAllUsers = allUsers ? JSON.parse(allUsers) : [];
        if(parsedAllUsers == null || parsedAllUsers == undefined) parsedAllUsers = [];
        

        let flag = false; // if user present
        let correctEmail = '';
        let correctUsername = ''
        parsedAllUsers.map((e: StoredUser) => {
            if(e.password === decoded.password){
                if(e.email === decoded.username || e.username === decoded.username){
                    correctUsername = e.username;
                    correctEmail = e.email;
                    flag = true;
                }
            }
        })

        setIsLoggedIn(flag);
        if(flag){
            setUser({
                username: correctUsername,
                email: correctEmail
            })
            createToken({
                username: correctUsername,
                email: correctEmail,
                password: decoded.password
            });
            setIsLoggedIn(true);
            getUserNotes(correctUsername);
        }else {
            alert('Unable to login');
        }
    }

    function logout () {
        localStorage.removeItem('userToken');
        alert('Logged Out')
        window.location.reload();
    }

    function deleteUser (password: string) {

        const temp = {
            password: password,
            email: user?.email,
            username: user?.username
        }
        const unparsedAllUsers = localStorage.getItem('allUsers');
        const allUsers = unparsedAllUsers ? JSON.parse(unparsedAllUsers) : []; 
        let index = -1;
        allUsers.map((e: StoredUser, idx: number) => {
            if(e.password === temp.password){
                if(e.email === temp.email || e.username === temp.username){
                    index = idx;
                }
            }
        })
        if(index !== -1){
            const newAllUsers = allUsers.splice(index, 1);
            localStorage.setItem('allUsers', JSON.stringify(newAllUsers));
            localStorage.removeItem('userToken');
            window.location.reload();
        }else{
            alert('No such user exists');
            return;
        }
        // TODO: all functionality to delete notes associated with the user


        window.location.reload();
    }

    function register(user: StoredUser) {
        const unparsedAllUsers = localStorage.getItem('allUsers');
        const allUsers = unparsedAllUsers ? JSON.parse(unparsedAllUsers) : []; 
        let exists = false;
        allUsers.map((e: StoredUser) => {
            if(e.email === user.email){
                exists = true;
                alert("This email already exists")
            }else if(e.username === user.username){
                exists = true;
                alert("This username already exists")
            }
        })

        if(!exists){
            try{
                const temp = {
                    username: user.username,
                    email: user.email,
                    password: user.password
                }
                const newAllUsers = [...allUsers, temp];
                localStorage.setItem('allUsers', JSON.stringify(newAllUsers));
                createToken(temp);
                setIsLoggedIn(true);
                getUserNotes(user.username)
                setUser({
                    username: user.username,
                    email: user.email
                })
                alert("Registered Successfully");
            } catch {
                alert("Error occured while saving user")
            }
        }
    }

    function addNote(note: NoteInterface){
        const unparsedAllNotes = localStorage.getItem('allNotes');
        const allNotes = unparsedAllNotes ? JSON.parse(unparsedAllNotes) : [];
        if(note.title.length === 0){
            alert("Give title");
            return;
        }
        if(allNotes.length === 0){
            note.id = 0
        }else{
            note.id = allNotes[allNotes.length - 1].id + 1;
        }
        const newAllNotes = [...allNotes, note];
        localStorage.setItem('allNotes', JSON.stringify(newAllNotes));
        console.log(notes);
        setNotes(newAllNotes);
        window.location.reload();
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

    return (
        <AuthContext.Provider value={{ notes, addNote, deleteNote, register, login, logout, deleteUser, user, isLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )

    
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
export default AuthContext;