import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";

/// This is the route for reading all contestants
export async function GET(request:NextRequest, { params }: { params: Promise<{ contestId: string, judgeId: string }> }){
    const{contestId, judgeId} = await params;
    const votes = await prisma.Judgevote.findMany({
        where:{
            contestId: Number.parseInt(contestId),
            judgeId: Number.parseInt(judgeId)
        }
    });
    return new NextResponse(JSON.stringify(votes), {status: 200})
}

/// This is the route for creating a new contestant
export async function POST(request:NextRequest, { params }: { params: Promise<{ contestId: string }> }){
    return new NextResponse('OK', {status: 200})
}