'use server';

import { JudgeVoteItem } from "../components/JudgeVotingTable/JudgeVotingTable";
import { ContestInfoListItem } from "../components/ContestsTable/ContestsTable";
import { ContestantGridItem } from "../components/CostentantsGrid/ContestantsGrid";
import { JudgesGridItem } from "../components/JudgesGrid/JudgesGrid";

export async function getJudgeVotes(contestId: number, judgeId: number): Promise<JudgeVoteItem[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contests/${contestId}/judges/${judgeId}/votes`, {
    cache: "no-store", // Ensures fresh data every request
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  const categories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }, { id: 3, name: 'Category 3' }, { id: 4, name: 'Category 4' }, { id: 5, name: 'Category 5' }];
  const grouped: JudgeVoteItem[] = categories.map((category) => {
    const votes = data.filter((vote: {
      judgeId: number,
      contestId: number,
      category: number;
    }) => vote.category === category.id);
    return {
      category: category.id,
      judgeId: judgeId,
      contestId: contestId,
      table: votes.map((vote: {
        contestantId: number;
        rank: number;
      }) => ({
        contestantId: vote.contestantId,
        rank: vote.rank
      }))
    };
  });

  console.log(grouped);
  return grouped;

}

export async function getContests(): Promise<ContestInfoListItem[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contests/`, {
    cache: "no-store", // Ensures fresh data every request
    method: "GET",
  });
  console.log(response)
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function getContestants(contestId:number): Promise<ContestantGridItem[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contests/${contestId}/contestants`, {
    cache: "no-store", // Ensures fresh data every request
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  const mapped = data.map((item:{id:number,firstName:string,mainPhoto:string, nickname:string})=>({
    id: item.id,
    name: item.nickname === '' ? item.firstName : item.nickname,
    image: item.mainPhoto
  }));
  console.log(mapped);
  return mapped;
}

export async function getJudges(contestId:number): Promise<JudgesGridItem[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contests/${contestId}/judges`, {
    cache: "no-store", // Ensures fresh data every request
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  const mapped = data.map((item:{id:number,firstName:string,title:string, nickname:string})=>({
    id: item.id,
    name: item.nickname === '' ? item.firstName : item.nickname,
    title: item.title,
  }));
  return mapped;
}