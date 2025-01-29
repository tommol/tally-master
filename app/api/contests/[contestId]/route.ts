import { NextRequest, NextResponse } from "next/server";

/// This is the route for reading the contest
export async function GET(request:NextRequest, { params }: { params: Promise<{ contestId: string }> }){
    return new NextResponse('OK', {status: 200})
}

/// This is the route for update the contest
export async function PUT(request:NextRequest, { params }: { params: Promise<{ contestId: string }> }){
    return new NextResponse('OK', {status: 200})
}