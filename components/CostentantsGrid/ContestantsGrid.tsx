'use client';
import {
    AspectRatio,
    BackgroundImage,
    Badge,
    Button,
    Card,
    Flex,
    Grid,
    Paper,
    Skeleton,
    Title,
    Transition
} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {IconEye} from "@tabler/icons-react";

export type ContestantGridItem = {
    id: string,
    name: string,
    image: string,
    runningOrder: number,
}

export interface ContestantsGridProps {
    data: ContestantGridItem[];
}

export default function ContestantsGrid({data}: ContestantsGridProps) {
    const [mounted, setMounted] = useState(false);

    // Trigger the animation on component mount
    useEffect(() => {
        setMounted(true);
    }, []);
    const gridItem = (item: ContestantGridItem) => (
        <Grid.Col span={4} key={item.id}>
            <Transition
                mounted={mounted}
                transition="skew-down"
                duration={800}
                enterDelay={item.runningOrder*200}
                timingFunction="ease"
            >
                {(transition) =>
            <Card h={300} p={0} shadow="sm" withBorder radius="md" style={transition} >
                <BackgroundImage src={item.image} h={300}>
                    <Flex direction="column" justify="space-between" h={300}>
                        <Flex direction="column" justify="space-between" p="md">
                            <Badge size="md" color="orange">Canidate #{item.runningOrder}</Badge>
                            <Title size="xl" order={1} c={"var(--mantine-color-gray-0)"} >{item.name}</Title>
                        </Flex>
                        <Flex direction="row" justify="flex-end" bg={"rgba(255,255,255,0.4"} p="sm">
                            <Button leftSection={<IconEye/>} variant="filled">
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
                    <Title>Contestants</Title>
                    <Button variant="filled" size="compact-lg" my="xs" color="blue">Add</Button>
                </Flex>
            </Grid.Col>
            {data.map((item: ContestantGridItem) => gridItem(item))}
        </Grid>
    )
}