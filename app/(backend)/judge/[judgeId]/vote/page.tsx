import JudgeRanking, {Contestant, JuryCategory} from "../../../../../components/JudgeRanking/JudgeRanking";
import React from "react";
import {
    IconCheck,
    IconFileDescription,
    IconNumber1,
    IconNumber2,
    IconNumber3,
    IconNumber4,
    IconNumber5
} from "@tabler/icons-react";
import {getContestants} from "../../../../actions";

export default async function StartVotingPage() {
    const categories: JuryCategory[] = [
        {id: 0, name: 'Instruction', icon: <IconFileDescription/>},
        {id: 1, name: 'Presence', icon: <IconNumber1/>},
        {id: 2, name: 'Erudition', icon: <IconNumber2/>},
        {id: 3, name: 'Creativity', icon: <IconNumber3/>},
        {id: 4, name: 'Integration', icon: <IconNumber4/>},
        {id: 5, name: 'Activity', icon: <IconNumber5/>},
        {id: 6, name: 'Verify', icon: <IconCheck/>},

    ];
    const contestants: Contestant[] = (await getContestants(1)).map((contestant) => {
        return {
            id: Number.parseInt(contestant.id),
            name: contestant.name,
            photo: contestant.image,
        } as Contestant;
    });

    return (
        <div>
            <JudgeRanking categories={categories} contestants={contestants} judgeId={1}/>
        </div>
    )
}