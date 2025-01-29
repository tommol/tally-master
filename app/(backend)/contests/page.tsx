import {ContestInfoListItem, ContestTable} from "../../../components/ContestsTable/ContestsTable";
import { getContests } from "../../actions";


export default async function Contestants() {
    const data = await getContests();
    return (<>
        <h1>Contests</h1>
        <ContestTable data={data}/>
    </>);
}