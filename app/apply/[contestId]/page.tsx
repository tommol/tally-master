import ApplyForm from "../../../components/ApplyForm/ApplyForm";
import {getContest} from "../../actions";

export default async function ApplyPage({params}: {params: Promise<{contestId: string}>}) {
    const param = await params;
    const contest = await getContest(Number.parseInt(param.contestId));
    return <div>
        <ApplyForm contestId={contest.id} contestName={contest.name} contestLogo={contest.logo}  />
    </div>
}