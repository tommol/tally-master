'use client';
import {
    BackgroundImage,
    Badge,
    Button,
    Card,
    Flex,
    Grid,
    Title,
    Transition
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";

export type JudgesGridItem = {
    id: string,
    name: string,
    image: string,
    title: string,
}

export interface JudgesGridProps {
    contestId: string;
    data: JudgesGridItem[];
}

export default function JudgesGrid({ data , contestId}: JudgesGridProps) {
    const [mounted, setMounted] = useState(false);

    // Trigger the animation on component mount
    useEffect(() => {
        setMounted(true);
    }, []);
    const gridItem = (item: JudgesGridItem, index: number) => (
        <Grid.Col span={4} key={item.id}>
            <Transition
                mounted={mounted}
                transition="slide-down"
                duration={800}
                enterDelay={(index + 1) * 200}
                timingFunction="ease"
            >
                {(transition) =>
                    <Card h={300} p={0} shadow="sm" withBorder radius="md" style={transition} bg={"var(--mantine-color-blue-1)"}>
                        <BackgroundImage src={item.image} h={300}>
                            <Flex direction="column" justify="space-between" h={300}>
                                <Flex direction="column" justify="space-between" p="md">
                                    <Badge size="md" color="orange">{item.title}</Badge>
                                    <Title size="xl" order={1} c={"var(--mantine-color-gray-3)"} >{item.name}</Title>
                                </Flex>
                                <Flex direction="row" justify="flex-end" bg={"rgba(255,255,255,0.4"} p="sm">
                                    <Button leftSection={<IconEye />} variant="filled" component={Link} href={`/contests/${contestId}/judges/${item.id}`}>
                                        View
                                    </Button>
                                </Flex>
                            </Flex>
                        </BackgroundImage>
                    </Card>}
            </Transition>
        </Grid.Col>
    )
    return (
        <Grid gutter="sm" miw={"900"} my="md">
            <Grid.Col>
                <Flex direction="row" p="sm" justify="space-between" bg="var(--mantine-color-blue-0">
                    <Title>Judges</Title>
                    <Button variant="filled" size="compact-lg" my="xs" color="blue">Add</Button>
                </Flex>
            </Grid.Col>
            {data.map((item: JudgesGridItem, index: number) => gridItem(item, index))}
        </Grid>
    )
}