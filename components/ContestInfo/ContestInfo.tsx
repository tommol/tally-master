import {Group, Paper, Image, Text, Switch, Flex, Title, Loader, Skeleton} from "@mantine/core";
import {DateTimePicker} from '@mantine/dates';
import {
    setContestApplyEnd,
    setContestApplyStart,
    setContestVotingEnd,
    setContestVotingStart,
    toggleContestJudging
} from "../../app/actions";
import {useForm} from "@mantine/form";
import {useState, useEffect, Suspense} from "react";
import {revalidatePath} from "next/cache";

export type ContestInfoType = {
    id: number;
    name: string;
    year: string;
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
    const [loading, setLoading] = useState(true);
    const [applyStart, setApplyStart] = useState<Date | null | undefined>(null);
    const [applyEnd, setApplyEnd] = useState<Date | null | undefined>(null);
    const [votingStart, setVotingStart] = useState<Date | null | undefined>(null);
    const [votingEnd, setVotingEnd] = useState<Date | null | undefined>(null);
    const handleApplyStartChange = async (date?: Date | null) => {
        setApplyStart(date);
        if (date) {
            try {
                setContestApplyStart(date, data.id)
            } catch (error) {
                console.error("Error sending date:", error);
            }
        }
    };
    const handleApplyEndChange = async (date?: Date | null) => {
        setApplyStart(date);
        if (date) {
            try {
                setContestApplyEnd(date, data.id)
            } catch (error) {
                console.error("Error sending date:", error);
            }
        }
    };
    const handlevotingStartChange = async (date?: Date | null) => {
        setApplyStart(date);
        if (date) {
            try {
                setContestVotingStart(date, data.id)
            } catch (error) {
                console.error("Error sending date:", error);
            }
        }
    };
    const handleVotingEndChange = async (date?: Date | null) => {
        setApplyStart(date);
        if (date) {
            try {
                setContestVotingEnd(date, data.id)
            } catch (error) {
                console.error("Error sending date:", error);
            }
        }
    };
    useEffect(() => {
        setApplyStart(data.applyStart)
        setApplyEnd(data.applyEnd)
        setVotingEnd(data.votingEnd);
        setVotingStart(data.votingStart);
        setLoading(false);
    }, [data])
    return (<>
        {!loading && <Paper withBorder radius="md" p="xs">
            <Group align="start">
                <Image src={data.logo} alt="logo" width={200} maw={200}/>
                <Flex direction="column">
                    <Title>{data.name} {data.year}</Title>
                    <Group my="sm">
                        <DateTimePicker label="Application Start"
                                        dropdownType="modal"
                                        placeholder="Pick date and time"
                                        value={applyStart}
                                        onChange={handleApplyStartChange}
                        />
                        <DateTimePicker label="Application End"
                                        placeholder="Pick date and time"
                                        value={applyEnd}
                                        dropdownType="modal"
                                        onChange={handleApplyEndChange}
                        />
                    </Group>
                    <Group my="sm">
                        <DateTimePicker label="Voting Start"
                                        placeholder="Pick date and time"
                                        value={votingStart}
                                        dropdownType="modal"
                                        onChange={handlevotingStartChange}
                        />
                        <DateTimePicker label="Voting End"
                                        placeholder="Pick date and time"
                                        value={votingEnd}
                                        dropdownType="modal"
                                        onChange={handleVotingEndChange}
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
        </Paper>}
            {loading && <Skeleton />}
        </>
    )
}