import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContext";
import Button from '@mui/material/Button';
import { useUtils } from "../../Context/utilsContext";
import CreateBox from "./CreateBox";
import Search from "./Search";

const MainArea: React.FC = () => {

    const {darkMode} = useUtils();
    const {user} = useAuth();
    const [greeting, setGreeting] = useState("Good morning")
    const [createBox, setCreateBox] = useState(false);

    useEffect(() => {
        const now = new Date();
        const hours = now.getHours();
        if(6 <= hours && hours < 12) setGreeting("Good Morning ☀️");
        else if(12 <= hours && hours < 18) setGreeting("Good Afternoon 🌤️");
        else setGreeting("Good Evening 🌙")
    }, [])

    return(
        <div className="flex flex-col items-center p-4">

            {createBox && <CreateBox setCreateBox={setCreateBox} />}

            <h1 className="p-4"> {greeting} , {user?.username}</h1>

            <div className="w-[100%] flex flex-col justify-start items-start">
            <Button
                    variant="contained"
                    onClick={() => setCreateBox(true)}
                    sx={{
                        backgroundColor: darkMode ? '#27ae60' : '#2ecc71',
                        color: darkMode ? '#ffff' : '#fff',
                        '&:hover': {
                        backgroundColor: darkMode ? '#1f844a' : '#25a35a',
                        },
                        fontSize: '20px',
                        marginX: '40px',
                        marginY: '20px'
                    }}
                    >
                        Create +
            </Button>

            <Search />

            </div>
        </div>
    )
}

export default MainArea;