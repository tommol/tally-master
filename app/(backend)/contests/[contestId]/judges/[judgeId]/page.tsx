'use client';
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { getJudgeVotes } from "../../../../../actions";
import JudgeVotingTable, { JudgeVoteItem } from "../../../../../../components/JudgeVotingTable/JudgeVotingTable";

const categories = [{id: 1, name: 'Presence'}, {id: 2, name: 'Eloquention'}, {id: 3, name: 'Creativity'},{id: 4, name: 'Integration'},{id: 5, name: 'Activity'}];
const contestants = [{id:1, name: 'Szymon'}, {id:2, name: 'Łukasz'}, {id:4, name: 'Jakub'}];

export default function Judge() {
    const {contestId, judgeId} = useParams<{ contestId: string; judgeId: string }>()
    const [data, setData] = useState<JudgeVoteItem[]|null>(null);
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
              const result = await getJudgeVotes(Number.parseInt(contestId), Number.parseInt(judgeId)); // Invoke the server action
              setData(result);
            } catch (err) {
              setError('Failed to fetch data');
            } finally {
              setLoading(false);
            }
          }
      
          fetchData();
    },[]);
    return (
        <div>
            <h1>Judge</h1>
            <JudgeVotingTable votes={data ??[]} judge={""} contestants={contestants} categories={categories} />
        </div>
    );
}