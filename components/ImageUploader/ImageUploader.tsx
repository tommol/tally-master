"use client";

import { MouseEventHandler, useState } from "react";
import { FileInput, Text, Loader, TextInput, Button, Group } from "@mantine/core";
import classes from "./ImageUploader.module.css";

interface ImageUploaderProps {
    label: string;
    placeholder?: string;
    inputProps: ReturnType<typeof Object>; // Accepts props from `getInputProps`
    rightSection?: React.ReactNode;
    directory: string;
}

export default function ImageUploader({ inputProps, rightSection, label, placeholder, directory }: ImageUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const uploadImage = async () => {

        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("directory", directory);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setImageUrl(data.url);
        setLoading(false);
    };

    return (<>
        <Group>
            {!loading &&
                <FileInput w="50%"
                    classNames={classes}
                    placeholder={placeholder}
                    value={file}
                    onChange={setFile}
                    accept="image/*"
                    label={label}
                    rightSection={rightSection}
                />}
            <Button onClick={(e) => {
                e.preventDefault();
                uploadImage();
            }} disabled={!file || loading}>
                {loading ? <Loader size="xs" /> : "Upload"}
            </Button>
        </Group>
        {imageUrl && <TextInput value={imageUrl} readOnly {...inputProps} />}
    </>);
}
