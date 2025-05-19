// ImageUploader.tsx
import { useDropzone } from 'react-dropzone';
import { storage } from './firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const ImageUploader = ({ onUpload }: { onUpload: (urls: string[]) => void }) => {
    const onDrop = async (files: File[]) => {
    const urls: string[] = [];
    for (const file of files) {
    const fileRef = ref(storage, `uploads/${file.name}-${Date.now()}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    urls.push(url);
    }
    onUpload(urls);
};

const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
});

return (
    <div
    {...getRootProps()}
    className="border-dashed border-2 p-6 rounded-lg text-center cursor-pointer"
    >
    <input {...getInputProps()} />
    <p>Drag & drop images, or click to upload</p>
    </div>
);
};

export default ImageUploader;
