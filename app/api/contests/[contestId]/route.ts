import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import {ContestAction} from "../../../actions";

/// This is the route for reading the contest
export async function GET(request:NextRequest, { params }: { params: Promise<{ contestId: string }> }){
    const contest = await prisma.contest.findFirstOrThrow({
        where: {
            id: parseInt((await params).contestId)
        },
    });
    console.log(contest);
    if (!contest) {
        throw new Error("Failed to fetch data");
    }
    return new NextResponse(JSON.stringify(contest), {status: 200})
}


/// This is the route for update the contest
export async function PUT(request:NextRequest, { params }: { params: Promise<{ contestId: string }> }){
    const {contestId} = await  params;
    const body = await request.json() as ContestAction;
    console.log(body);
    console.log(body.enableJudging);
    if(body.enableJudging !== undefined){
        console.log('Toggle judging');
        try {
            await prisma.contest.update({
                where: {
                    id: Number.parseInt(contestId)
                },
                data: { enableJudging: body.enableJudging },
            });
            return new NextResponse('OK', {status: 200})
        }catch(error){
            console.log((error as Error).stack);
            return new NextResponse(JSON.stringify(error), {status: 500})
        }
    }
    if(body.applyStart){
        await prisma.contest.update({
            where:{
                id: Number.parseInt(contestId)
            },
            data: {
                applyStart:body.applyStart
            }
        });
    }
    if(body.applyEnd){
        await prisma.contest.update({
            where:{
                id: Number.parseInt(contestId)
            },
            data: {
                applyEnd:body.applyEnd
            }
        });
    }
    if(body.votingStart){
        await prisma.contest.update({
            where:{
                id: Number.parseInt(contestId)
            },
            data: {
                applyStart:body.applyStart
            }
        });
    }
    if(body.votingEnd){
        await prisma.contest.update({
            where:{
                id: Number.parseInt(contestId)
            },
            data: {
                applyEnd:body.applyEnd
            }
        });
    }
    return new NextResponse('OK', {status: 400})
}