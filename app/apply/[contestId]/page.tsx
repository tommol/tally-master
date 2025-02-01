import ApplyForm from "../../../components/ApplyForm/ApplyForm";
import {getContest} from "../../actions";
import {Card, Container} from "@mantine/core";
import ApplicationClosed from "../../../components/ApplicationClosed/ApplicationClosed";

export default async function ApplyPage({params}: { params: Promise<{ contestId: string }> }) {
    const param = await params;
    const contest = await getContest(Number.parseInt(param.contestId));
    const applyEnabled = contest.applyStart !== undefined &&
        contest.applyEnd !== undefined &&
        new Date() > contest.applyStart &&
        new Date() < contest.applyEnd;
    return <Container p="xl" bg={"var(--mantine-color-gray-2)"}>
        {applyEnabled &&
            <ApplyForm contestId={contest.id} contestName={contest.name} contestLogo={contest.logo}/>
        }
        {!applyEnabled && <ApplicationClosed />}
    </Container>
}