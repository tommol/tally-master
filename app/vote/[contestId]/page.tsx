import {getContest, getContestants} from "../../actions";
import {VotingItem, VotingList} from "../../../components/Voting/VotingList/VotingList";
import {Container} from "@mantine/core";
import {randomUUID} from "node:crypto";

export default async function Vote({params}: { params: Promise<{ contestId: string }> }) {
    const {contestId} = await params;
    const contest = await getContest(Number.parseInt(contestId));
    const contestants: VotingItem[] = (await getContestants(contest.id))
        .map((contestant) => (
            {
                id: Number.parseInt(contestant.id),
                name: contestant.name,
                image: contestant.image,
            }
        ));
    const sessionId = randomUUID();
    return (
        <Container pt={80}>
            <VotingList contestId={contest.id} contestName={contest.name} contestLogo={contest.logo}
                        contestants={contestants} sessionId={sessionId}
            />
        </Container>
    );
}