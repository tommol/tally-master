'use client';
import React, { useEffect, useState } from "react";
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
    AspectRatio
} from "@mantine/core";
import ContestantsGrid, {ContestantGridItem} from "../../../../components/CostentantsGrid/ContestantsGrid";
import { useParams } from "next/navigation";
import { JudgeVoteItem } from "../../../../components/JudgeVotingTable/JudgeVotingTable";
import { getContestants, getJudges, getJudgeVotes } from "../../../actions";
import JudgesGrid, { JudgesGridItem } from "../../../../components/JudgesGrid/JudgesGrid";

export type ContestModel ={
    contestants: ContestantGridItem[]
}
export default function Contest() {
        const {contestId, judgeId} = useParams<{ contestId: string; judgeId: string }>()
        const [contestants, setContestants] = useState<ContestantGridItem[]|null>(null);
        const [judges, setJudges] = useState<JudgesGridItem[]|null>(null);
        const [error, setError] = useState<string|null>(null);
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            async function fetchContestantsData() {
                try {
                  const contestantsData = await getContestants(Number.parseInt(contestId)); // Invoke the server action
                  setContestants(contestantsData);
                } catch (err) {
                  setError('Failed to fetch data');
                } finally {
                  setLoading(false);
                }
              }
              async function fetchJudgesData() {
                try {
                  const judgesData = await getJudges(Number.parseInt(contestId)); // Invoke the server action
                  setJudges(judgesData);
                } catch (err) {
                  setError('Failed to fetch data');
                } finally {
                  setLoading(false);
                }
              }
          
              fetchContestantsData();
              fetchJudgesData();
        },[]);
    return (
        <Container fluid p="md" mt={3} bd={1} miw={600}>
            <ContestantsGrid data={contestants ??[]} />            
            <JudgesGrid data={judges??[]}  contestId={contestId}/>
        </Container>
    );
}