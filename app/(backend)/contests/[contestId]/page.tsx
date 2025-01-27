'use client'
import React from "react";
import {
    Container,
    SimpleGrid,
    Grid,
    Skeleton,
    Box,
    Paper,
    Title,
    Group,
    Flex,
    Button,
    AspectRatio
} from "@mantine/core";
import ContestantsGrid, {ContestantGridItem} from "../../../../components/CostentantsGrid/ContestantsGrid";

const PRIMARY_COL_HEIGHT = '300px';
export type ContestModel ={
    contestants: ContestantGridItem[]
}
export default function Contest() {
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    const data:ContestModel ={
        contestants: [{
            id: '1',
            name: 'Łukasz',
            image: 'https://wfw.plug.org.pl/wp-content/uploads/2024/03/lukasz-1-e1738010779949.webp',
            runningOrder: 1,
        },{
            id:'2',
            name:'Szymon',
            image:'https://wfw.plug.org.pl/wp-content/uploads/2024/03/image-2-e1738010936551.png',
            runningOrder:2,
        },{
            id:'3',
            name:'Jakub',
            image:'https://wfw.plug.org.pl/wp-content/uploads/2024/03/IMG_3553-scaled-e1738011154142.jpg',
            runningOrder:3
        }]
    };
    return (
        <Container fluid p="md" mt={3} bd={1} miw={600}>
            <ContestantsGrid data={data.contestants} />
            <Grid gutter="sm">
                <Grid.Col>
                    <Flex direction="row" justify="space-between" bg="var(--mantine-color-blue-0" p="sm">
                        <Title>Judges</Title>
                        <Button variant="filled" size="compact-lg" my="xs" color="blue">Add</Button>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={4}>
                    <AspectRatio ratio={1} maw={300} mx="auto">
                        <Skeleton  radius="md" animate={false}/>
                    </AspectRatio>
                </Grid.Col>
                <Grid.Col span={4}>
                    <AspectRatio ratio={1} maw={300} mx="auto">
                        <Skeleton  radius="md" animate={false}/>
                    </AspectRatio>
                </Grid.Col>
                <Grid.Col span={4}>
                    <AspectRatio ratio={1} maw={300} mx="auto">
                        <Skeleton  radius="md" animate={false}/>
                    </AspectRatio>
                </Grid.Col>
                <Grid.Col span={4}>
                    <AspectRatio ratio={1} maw={300} mx="auto">
                        <Skeleton  radius="md" animate={false}/>
                    </AspectRatio>
                </Grid.Col>
                <Grid.Col span={4}>
                    <AspectRatio ratio={1} maw={300} mx="auto">
                        <Skeleton  radius="md" animate={false}/>
                    </AspectRatio>
                </Grid.Col>

            </Grid>
        </Container>
    );
}