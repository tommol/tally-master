'use client';
import {UnstyledButton, Image, Title, Text, Flex, Paper, Group, TextInput, Button} from "@mantine/core";
import React, {useState} from "react";
import classes from "./VotingList.module.css";

export  type VotingItem = {
    id: number;
    name: string;
    image: string;
}

export interface VotingListProps {
    contestId: number;
    contestName: string;
    contestLogo: string;
    contestants: VotingItem[];
    sessionId: string;
}

export function VotingList(props: VotingListProps) {

    const [selectedContestant, setSelectedContestant] = useState<number | null>(null);

    const renderItem = (item: VotingItem) => (
        <UnstyledButton key={item.id} className={item.id == selectedContestant ? classes.selected : classes.unselected}
                        onClick={() => {
                            setSelectedContestant(item.id)
                        }}
        >
            <Group><Image src={item.image} w={120} h={120}/>
                <Title>{item.name}</Title>
            </Group>
        </UnstyledButton>
    )

    return (
        <Paper mt={10} className={classes.card}>
            <Image src={props.contestLogo} className={classes.icon} w={80}/>
            <Text ta="center" className={classes.title}>
                {props.contestName}
            </Text>
            <Flex justify="space-between" direction="column" className={classes.content}>
                {props.contestants.map((item: VotingItem) => renderItem(item))}
                {selectedContestant && <div style={{ textAlign: "center" }}>
                    <TextInput type="tel"
                               size="xl"
                               label="Numer telefonu" m="sm"
                               w={"50%"}
                               mx="auto"

                    />
                    <Button variant="filled" color="blue" size="xl" mx="auto">
                        Zagłosuj
                    </Button>
                </div>}
            </Flex>


        </Paper>

    )
}