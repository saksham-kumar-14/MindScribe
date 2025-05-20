import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContext";
import Button from '@mui/material/Button';
import { useUtils } from "../../Context/utilsContext";
import CreateBox from "./CreateBox";
import Search from "./Search";
import { useMediaQuery } from '@mui/material';

interface props {
    openMenu: Boolean;
}

const MainArea: React.FC<props> = ({ openMenu }) => {
    const { darkMode } = useUtils();
    const { user } = useAuth();
    const [greeting, setGreeting] = useState("Good Morning");
    const [createBox, setCreateBox] = useState(false);
    const isDesktop = useMediaQuery("(min-width:720px)");

    useEffect(() => {
        const now = new Date();
        const hours = now.getHours();
        if (6 <= hours && hours < 12) setGreeting("Good Morning ☀️");
        else if (12 <= hours && hours < 18) setGreeting("Good Afternoon 🌤️");
        else setGreeting("Good Evening 🌙");
    }, []);

    return (
        <div
        className={`h-[100%]flex flex-col items-center w-full px-4 sm:px-6 md:px-12 lg:px-20 py-6 ${
            openMenu ? "overflow-hidden" : ""
        }`}
        >
        {createBox && <CreateBox setCreateBox={setCreateBox} />}

        <h1 className="text-center text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
            {greeting}, <span className="underline">{user?.username}</span>
        </h1>

        <div className="w-full flex flex-col gap-4 items-center">
            <Button
            variant="contained"
            onClick={() => setCreateBox(true)}
            sx={{
                backgroundColor: darkMode ? "#27ae60" : "#2ecc71",
                color: "#fff",
                fontSize: isDesktop ? "18px" : "14px",
                paddingX: isDesktop ? "24px" : "16px",
                paddingY: isDesktop ? "10px" : "6px",
                '&:hover': {
                backgroundColor: darkMode ? "#1f844a" : "#25a35a"
                }
            }}
            >
            Create +
            </Button>

            <div className="w-full max-w-3xl">
            <Search />
            </div>
        </div>
        </div>
    );
};

export default MainArea;
