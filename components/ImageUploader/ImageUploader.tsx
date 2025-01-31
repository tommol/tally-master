"use client";

import { useState } from "react";
import { FileInput, Text, Loader, TextInput } from "@mantine/core";
import classes from "./ImageUploader.module.css";

interface ImageUploaderProps {
    label: string;
    placeholder?: string;
    inputProps: ReturnType<typeof Object>; // Accepts props from `getInputProps`
    rightSection?: React.ReactNode;
}

export default function ImageUploader({ inputProps, rightSection , label, placeholder}: ImageUploaderProps) {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (file: File | null) => {
        if (!file) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Upload failed");
            }

            setImageUrl(data.url);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (<>
            {!loading &&
                       <FileInput w="70%"
                classNames={classes}
                placeholder={placeholder}
                onChange={handleFileChange}
                accept="image/*"
                label={label}
                rightSection={rightSection} 
            />}
            {loading && <Loader />}
            {error && <Text c="red">{error}</Text>}
            {imageUrl && <TextInput value={imageUrl} readOnly {...inputProps}/>}
        </>);
}
