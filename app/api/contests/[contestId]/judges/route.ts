import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

/// This is the route for reading all contestants
export async function GET(request:NextRequest, { params }: { params: Promise<{ contestId: string }> }){
    const judges = await prisma.judge.findMany({
        where: {
        contestId: parseInt((await params).contestId)
        },
    });
    return new NextResponse(JSON.stringify(judges), {status: 200})
}

/// This is the route for creating a new contestant
export async function POST(request:NextRequest, { params }: { params: Promise<{ contestId: string }> }){
    return new NextResponse('OK', {status: 200})
}