"use client";

import {useState} from "react";
import {FileInput, Button, Group, Progress, Badge, InputLabel} from "@mantine/core";
import classes from "./ImageUploader.module.css";
import {UseFormReturnType} from "@mantine/form";
import {IconFileCheck} from "@tabler/icons-react";

interface ImageUploaderProps {
    label: string;
    placeholder?: string;
    inputProps: ReturnType<typeof Object>; // Accepts props from `getInputProps`
    rightSection?: React.ReactNode;
    directory: string;
    name: string;
    parent: UseFormReturnType<any>
}

export default function ImageUploader({
                                          name,
                                          parent,
                                          inputProps,
                                          rightSection,
                                          label,
                                          placeholder,
                                          directory
                                      }: ImageUploaderProps) {
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
        parent.setValues({
            ...parent.getValues(),
            [name]: data.url,
        });
        console.log(parent.getValues());
    };

    return (<>
        {!loading && !imageUrl && <Group>
            <FileInput w="50%"
                       classNames={classes}
                       placeholder={placeholder}
                       value={file}
                       onChange={setFile}
                       accept="image/*"
                       label={label}
                       rightSection={rightSection}
            />
            <Button onClick={(e) => {
                e.preventDefault();
                uploadImage();
            }} disabled={!file || loading}>
                Upload
            </Button>
        </Group>}
            {loading && <Progress value={100} animated size="md" m="sm"/>}
            {imageUrl && <Group my="sm">
                <InputLabel>{label}</InputLabel>
                <Badge color="green" m="sm" size="xl"
                                       leftSection={<IconFileCheck/>}>Uploaded</Badge>
            </Group>}
    </>);
}
