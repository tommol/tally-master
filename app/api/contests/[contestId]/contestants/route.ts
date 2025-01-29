import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

/// This is the route for reading all contestants
export async function GET(request:NextRequest, { params }: { params: Promise<{ contestId: string }> }){
    const contestants = await prisma.contestant.findMany({
        where: {
        contestId: parseInt((await params).contestId)
        },
    });
    return new NextResponse(JSON.stringify(contestants), {status: 200})
}

/// This is the route for creating a new contestant
export async function POST(request:NextRequest, { params }: { params: Promise<{ contestId: string }> }){
    return new NextResponse('OK', {status: 200})
}