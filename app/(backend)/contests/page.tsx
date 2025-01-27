import {ContestInfoListItem, ContestTable} from "../../../components/ContestsTable/ContestsTable";
import {Title} from "@mantine/core";

const data: ContestInfoListItem[] = [
    {
        id: '1',
        name: "Mister Leatherman Poland",
        year: "2025"
    },
    {
        id: '2',
        name: "Mister Rubber Poland",
        year: "2025"
    }
]
export default function Contestants() {
    return (<>
        <h1>Contests</h1>
        <ContestTable data={data}/>
    </>);
}