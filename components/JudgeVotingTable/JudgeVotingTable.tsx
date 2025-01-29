import { Container, Table } from "@mantine/core";

export type JudgeVoteItem = {
    judgeId: number;
    contestId: number;
    category: number
    table: {
        contestantId: number;
        rank: number;
    }[]
}

export interface JudgeVotingTableProps {
    edit?: boolean;
    votes: JudgeVoteItem[];
    judge: string;
    contestants: { id: number, name: string }[];
    categories: { id: number, name: string }[];
}

export default function JudgeVotingTable(props: JudgeVotingTableProps) {
    return (
        <Container fluid bg={"var(--mantine-colors-gray-2)"} p="lg">
            <Table withTableBorder withColumnBorders>
                <Table.Thead     >
                    <Table.Tr>
                        <Table.Th rowSpan={2} w={"15dvw"} ta="center">Category</Table.Th>
                        <Table.Th colSpan={props.contestants.length} > Voting of {props.judge}</Table.Th>
                    </Table.Tr>
                    <Table.Tr>                        
                        {props.contestants.map((contestant) => (<Table.Th key={contestant.id} miw={"10dvw"} ta="center">{contestant.name}</Table.Th>))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {props.votes.map((vote) => (
                        <Table.Tr key={vote.category}>
                            <Table.Td>{props.categories.find((category) => category.id === vote.category)?.name}</Table.Td>
                            {props.contestants.map((contestant) => (
                                <Table.Td key={contestant.id} fs="lg" ta="center">
                                    {vote.table.find((item) => item.contestantId === contestant.id)?.rank}
                                </Table.Td>
                            ))}
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Container>
    );
}