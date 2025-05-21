import React, { useState } from "react";
import { useUtils } from "../../Context/utilsContext";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../Context/authContext";
import TextEditor from "./TextEditor";
import { useMediaQuery } from '@mui/material';

interface props {
    setCreateBox: Function;
}

const CreateBox: React.FC<props> = ({ setCreateBox }) => {
    const { darkMode } = useUtils();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState<string>("");

    const { user, addNote } = useAuth();
    const isDesktop = useMediaQuery('(min-width:720px)');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] overflow-y-auto md:flex justify-center items-start pt-16 px-4">

            {
                !isDesktop && 
                <nav className=" max-w-3xl flex justify-end md:justify-center mb-4">
                    <IconButton
                    aria-label="close"
                    onClick={() => setCreateBox(false)}
                    sx={{ color: "white" }}
                    >
                    <CloseIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                </nav>
            }
            

            <div className="bg-gray-900 dark:bg-gray-800 rounded-lg w-full max-w-3xl p-6 flex flex-col items-center">
                <Input
                id="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                value={title}
                sx={{
                    color: "white",
                    "::placeholder": { color: "gray" },
                    "&:before": { borderBottom: "1px solid white" },
                    "&:hover:not(.Mui-disabled):before": { borderBottom: "2px solid white" },
                    fontSize: 25,
                    width: "100%",
                }}
                className="mb-6"
                />

                <div
                className="flex flex-wrap gap-2 max-w-full mb-6"
                style={{ maxHeight: "100px", overflowY: "auto" }}
                >
                {tags.map((e, idx) => (
                    <div
                    key={`${e}-${idx}`}
                    className="flex items-center bg-red-600 hover:bg-red-500 text-white rounded-lg px-3 py-1"
                    >
                    <span>{e}</span>
                    <IconButton
                        aria-label="remove tag"
                        onClick={() => {
                        const newTags = [...tags];
                        newTags.splice(idx, 1);
                        setTags(newTags);
                        }}
                        sx={{ color: "white", ml: 1, p: "2px" }}
                        size="small"
                    >
                        <CloseIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    </div>
                ))}
                </div>

                <div className="flex items-center w-full max-w-md mb-6 gap-3">
                <Input
                    placeholder="Add Tag"
                    onChange={(e) => setTag(e.target.value)}
                    type="text"
                    value={tag}
                    sx={{
                    color: "white",
                    "::placeholder": { color: "gray" },
                    "&:before": { borderBottom: "1px solid white" },
                    "&:hover:not(.Mui-disabled):before": { borderBottom: "2px solid white" },
                    fontSize: 16,
                    flexGrow: 1,
                    }}
                />

                <Button
                    onClick={() => {
                    if (tag.trim().length > 1 && !tags.includes(tag.trim())) {
                        setTags([...tags, tag.trim()]);
                        setTag("");
                    } else {
                        alert("Tags must be unique and at least 2 characters long");
                    }
                    }}
                    variant="contained"
                    sx={{
                    backgroundColor: darkMode ? "#27ae60" : "#2ecc71",
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: darkMode ? "#1f844a" : "#25a35a",
                    },
                    whiteSpace: "nowrap",
                    }}
                >
                    Add Tag
                </Button>
                </div>

                <div className="mb-6">
                    <TextEditor content={content} setContent={setContent} />
                </div>

                <Button
                variant="contained"
                sx={{
                    backgroundColor: darkMode ? "#27ae60" : "#2ecc71",
                    color: "#fff",
                    "&:hover": {
                    backgroundColor: darkMode ? "#1f844a" : "#25a35a",
                    },
                    px: 4,
                }}
                onClick={() => {
                    if (!title.trim()) {
                    alert("Title cannot be empty");
                    return;
                    }
                    addNote({
                        title: title.trim(),
                        content,
                        username: user?.username,
                        tags,
                    });
                    setCreateBox(false);
                }}
                >
                Add
                </Button>
            </div>

            {
                isDesktop && 
                <nav className=" max-w-3xl flex justify-end md:justify-center mb-4">
                    <IconButton
                    aria-label="close"
                    onClick={() => setCreateBox(false)}
                    sx={{ color: "white" }}
                    >
                    <CloseIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                </nav>
            }


        </div>
    );
    };

    export default CreateBox;
