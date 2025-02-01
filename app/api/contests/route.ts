import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { headers } from "next/headers";

/// This is the route for reading all contests
export async function GET(request:NextRequest){
    const contests = await prisma.contest.findMany();
    return new NextResponse(JSON.stringify(contests), {status: 200})
}

/// This is the route for creating a new contest
export async function POST(request:NextRequest){
    const headersList = await headers();

    const body = await request.json();
    const contest = await prisma.contest.create({
        data: {
            name: body.name,
            year: body.year,
            logo: body.logo,
        }
    });

    return new NextResponse(contest.id.toString(), {status: 200})
}