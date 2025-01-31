import { NextResponse } from "next/server";
import { put, PutBlobResult } from "@vercel/blob";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    try {
        const fileBuffer = await file.arrayBuffer();
 
        const fileName = `${process.env.BLOB_BASE_PATH}/${formData.get('name')} as string`;

        const {url} = await put(fileName, fileBuffer, {
            access: "public",
            multipart: false,
            contentType: file.type,
            onUploadProgress: (progress) => {
                console.log(`Uploaded ${progress.loaded} bytes of ${progress.total}`);
            },
        });

        return NextResponse.json({url}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
