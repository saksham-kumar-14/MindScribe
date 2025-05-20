import React, { useRef, useState } from "react";
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface props{
    images: string[]
    setImages: Function
}

const ImageUploader: React.FC<props> = ({ images, setImages }) => {

    const [uploading, setUploading] = useState(false);
    const inputRef = useRef(null);

    const handleFiles = async (files) => {
        const imageFiles = Array.from(files).filter(file =>
            file.type.startsWith("image/")
        );

        if (imageFiles.length === 0) return;

        setUploading(true);
        const uploaded = [];

        for (const file of imageFiles) {
            const url = await uploadToFirebase(file);
            uploaded.push(url);
        }

        setImages((prev) => [...prev, ...uploaded]);
        setUploading(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleFileChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const uploadToFirebase = async (file) => {
        const fileRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
    };

    return (
    <div>
        <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors"
        >
        <input
            type="file"
            accept="image/*"
            multiple
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
        />
        <p className="text-gray-500 mb-2">
            Click to select or drag & drop images here
        </p>
        {uploading && <p className="text-blue-500">Uploading...</p>}
        </div>

        {/* <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((url, idx) => (
            <img
            key={idx}
            src={url}
            alt={`uploaded-${idx}`}
            className="rounded shadow max-h-48 object-contain"
            />
        ))}
        </div> */}
    </div>
    );
};

export default ImageUploader;
