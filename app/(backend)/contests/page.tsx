import {ContestInfoListItem, ContestTable} from "../../../components/ContestsTable/ContestsTable";
import { getContests } from "../../actions";
import {Button, Flex, Title} from "@mantine/core";
import Link from "next/link";


export default async function Contestants() {
    const data = await getContests();
    return (<>
        <Flex direction="row" justify="space-between" p="md">
        <Title>Contests</Title>
            <Button component={Link} href="/contests/add"
                variant="filled">
                Add
            </Button>
        </Flex>
        <ContestTable data={data}/>
    </>);
}