import {Group, Paper, Image, Text, Switch, Flex, Title} from "@mantine/core";
import { DateTimePicker } from '@mantine/dates';
import {
    setContestApplyEnd,
    setContestApplyStart,
    setContestVotingEnd,
    setContestVotingStart,
    toggleContestJudging
} from "../../app/actions";
export type ContestInfoType ={
    id: number;
    name: string;
    year:string;
    enableJudging: boolean;
    applyStart?: Date;
    applyEnd?: Date;
    votingStart?: Date;
    votingEnd?: Date;
    logo: string;
}

export interface ContestInfoProps {
    data: ContestInfoType;
}

export default function ContestInfo({data}: ContestInfoProps) {
    return (
        <Paper withBorder radius="md" p="xs">
            <Group align="start">
                <Image src={data.logo} alt="logo" width={200} maw={200}/>
                <Flex direction="column">
                    <Title>{data.name} {data.year}</Title>
                    <Group my="sm">
                        <DateTimePicker label="Application Start"
                                        placeholder="Pick date and time"
                                        value={data.applyStart}
                                        onChange={async (e) => {
                                            if(e instanceof Date) {
                                                await setContestApplyStart(new Date(e.getDate()), data.id);
                                            }
                                        }}
                        />
                        <DateTimePicker label="Application End"
                                        placeholder="Pick date and time"
                                        value={data.applyEnd}
                                        onChange={async (e) => {
                                            if(e instanceof Date) {
                                                await setContestApplyEnd(new Date(e.getDate()), data.id);
                                            }
                                        }}
                        />
                    </Group>
                    <Group my="sm">
                        <DateTimePicker label="Voting Start"
                                        placeholder="Pick date and time"
                                        value={data.votingStart}
                                        onChange={async (e) => {
                                            if(e instanceof Date) {
                                                await setContestVotingStart(new Date(e.getDate()), data.id);
                                            }
                                        }}
                        />
                        <DateTimePicker label="Voting End"
                                        placeholder="Pick date and time"
                                        value={data.votingEnd}
                                        onChange={async (e) => {
                                            if(e instanceof Date) {
                                                await setContestVotingEnd(new Date(e.getDate()), data.id);
                                            }
                                        }}
                        />
                    </Group>
                    <Switch
                        my="sm"
                        checked={data.enableJudging}
                        size="md"
                        label="Judging enabled"
                        onChange={async (e) => {
                                await toggleContestJudging(e.target.checked, data.id);
                        }}
                    />
                </Flex>
            </Group>
        </Paper>
    )
}