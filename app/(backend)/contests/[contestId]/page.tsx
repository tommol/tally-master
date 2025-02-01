'use client';
import React, {useEffect, useState} from "react";
import {
    Container,
    SimpleGrid,
    Grid,
    Skeleton,
    Box,
    Paper,
    Title,
    Group,
    Flex,
    Button,
    AspectRatio, Switch
} from "@mantine/core";
import ContestantsGrid, {ContestantGridItem} from "../../../../components/CostentantsGrid/ContestantsGrid";
import {useParams} from "next/navigation";
import {JudgeVoteItem} from "../../../../components/JudgeVotingTable/JudgeVotingTable";
import {getContest, getContestants, getContests, getJudges, getJudgeVotes} from "../../../actions";
import JudgesGrid, {JudgesGridItem} from "../../../../components/JudgesGrid/JudgesGrid";
import ContestInfo, {ContestInfoType} from "../../../../components/ContestInfo/ContestInfo";

export type ContestModel = {
    contestants: ContestantGridItem[]
}
export default function Contest({
                                    params,
                                }: {
    params: Promise<{ contestId: string }>
}) {
    const {contestId, judgeId} = useParams<{ contestId: string; judgeId: string }>()
    const [contest, setContest] = useState<ContestInfoType | null>(null);
    const [contestants, setContestants] = useState<ContestantGridItem[] | null>(null);
    const [judges, setJudges] = useState<JudgesGridItem[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContest() {
            try {
                const {contestId} = await params;
                console.log(contestId);
                const contestData = await getContest(Number.parseInt(contestId));
                setContest(contestData)
            } catch (err) {
                setError('Failed to fetch data');
            }
        }

        async function fetchContestantsData() {
            try {
                const contestantsData = await getContestants(Number.parseInt(contestId)); // Invoke the server action
                setContestants(contestantsData);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {

            }
        }

        async function fetchJudgesData() {
            try {
                const judgesData = await getJudges(Number.parseInt(contestId)); // Invoke the server action
                setJudges(judgesData);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
            }
        }

        fetchContest();

        fetchContestantsData();
        fetchJudgesData();


    }, []);
    return (
        <Container fluid p="md" mt={3} bd={1} miw={600}>
            <ContestInfo data={contest ?? {} as ContestInfoType}/>
            <ContestantsGrid data={contestants ?? []}/>
            <JudgesGrid data={judges ?? []} contestId={contestId}/>
        </Container>
    );
}