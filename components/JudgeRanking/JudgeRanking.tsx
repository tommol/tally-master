'use client';
import {Button, Card, Group, Image, List, Paper, Stepper, Text, Title} from "@mantine/core";
import React, {JSX, useEffect, useMemo, useState} from "react";
import classes from "./JudgeRanking.module.css";
import {IconChevronLeft, IconChevronRight, IconSend, IconSend2, TablerIcon} from "@tabler/icons-react";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import {useListState} from "@mantine/hooks";
import cx from 'clsx';

export type JuryCategory = {
    id: number,
    name: string,
    icon: JSX.Element
}
export type Contestant = {
    id: number,
    name: string,
    photo: string,
}

export type ContestantRanked = {
    contestantId: number,
    rank: number,
    order: number,
}

export interface JudgeRankingProps {
    judgeId: number,
    categories: JuryCategory[];
    contestants: Contestant[];
}

export type CategoryRanking = {
    categoryId: number,
    ranking: ContestantRanked[]
}
export type JudgeRanking = {
    judgeId: number,
    rankings: CategoryRanking[]
}

export default function JudgeRanking(props: JudgeRankingProps) {
    const [fullRankings, setFullRankings] = useState<JudgeRanking>({
        judgeId: props.judgeId,
        rankings: props.categories.map((category) => ({
            categoryId: category.id,
            ranking: props.contestants.map((contestant, index) => ({
                contestantId: contestant.id,
                rank: 0,
                order: index,
            }))
        }))
    });
    const [state, handlers] = useListState<ContestantRanked>(fullRankings.rankings[0].ranking);

    const [activeStep, setActiveStep] = useState(1);
    const nextStep = () => {
        setActiveStep((current) => {
            if (current > 1 && current <= props.categories.length) {
                setFullRankings((prev) => {
                    const copy = {...prev};
                    copy.rankings = prev.rankings.map((ranking)=>{
                        if(ranking.categoryId === current+1){
                            return {
                                ...ranking,
                                ranking: state
                            }
                        }else{
                            return ranking;
                        }
                    })
                    return copy;
                });
                handlers.setState(fullRankings.rankings[current+1].ranking);
            }
            return (current < props.categories.length ? current + 1 : current)
        });
    }
    const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));

    const header = (categories: JuryCategory[]) => (
        <Stepper active={activeStep} onStepClick={setActiveStep} allowNextStepsSelect={false} className={classes.steps}>
            {categories.map((category) => (
                <Stepper.Step key={category.id} label={category.name} icon={category.icon}
                              completedIcon={category.icon}/>
            ))}
        </Stepper>
    )

    const items = state.map((contestant, index) => (
        <Draggable key={contestant.contestantId} index={index} draggableId={contestant.contestantId.toString()}>
            {(provided, snapshot) => (
                <div className={cx(classes.contestant, {[classes.itemDragging]: snapshot.isDragging})}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}>
                    <Image src={props.contestants.find((c)=>c.id ==contestant.contestantId)?.photo} className={classes.avatar}/>

                    <Text className={classes.name}>{props.contestants.find((c)=>c.id ==contestant.contestantId)?.name}</Text>
                    {contestant.rank != 0 &&
                        <Text className={classes.rank}>{contestant.rank}</Text>
                    }
                </div>
            )}
        </Draggable>
    ));

    const renderStep = (step: number, steps: number) => {
        if (step === 1) {
            return (
                <Card withBorder={true} className={classes.stepContent}>
                    <Card.Section className={classes.stepHeader}>
                        <Title> Instructions</Title>
                    </Card.Section>
                    <Card.Section>
                        <List type="ordered" size="lg" withPadding w={"60%"} mx={"auto"} my="md">
                            <List.Item>Double check if you provide ranking for correct category</List.Item>
                            <List.Item>You can drag and drop contestants to order them.</List.Item>
                            <List.Item>When you provide ranking for each category you will have chance to verify
                                it.</List.Item>
                            <List.Item>If you made any mistake you can return to previous steps and reorder</List.Item>
                            <List.Item>After you are sure that rankings are correct, submit your rankings and provide
                                paper copy to tally master for his review.</List.Item>
                        </List>
                    </Card.Section>
                </Card>)
        }
        if (step === steps) {
            return (
                <Card withBorder={true} className={classes.stepContent}>
                    Verification
                </Card>)
        }
        return (
            <Card withBorder={true} className={classes.stepContent}>
                <Card.Section className={classes.stepHeader}>
                    <Title> Ranking of {props.categories.find((category) => (category.id === step - 1))?.name}</Title>
                </Card.Section>
                <Card.Section w={"70%"} mx={"auto"}>
                    <DragDropContext
                        onDragEnd={({destination, source}) =>{
                            handlers.reorder({from: source.index, to: destination?.index || 0})
                        }}
                    >
                        <Droppable droppableId="dnd-list" direction="vertical">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {items}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Card.Section>
            </Card>)
    }

    return (<Paper>
        {header(props.categories)}
        {renderStep(activeStep, props.categories.length)}
        <Group className={classes.navButtons}>

            <Button variant="default" className={classes.button} onClick={prevStep}
                    disabled={activeStep === 1}
                    leftSection={<IconChevronLeft/>}>
                Back
            </Button>
            {activeStep < props.categories.length &&
                <Button variant="filled" className={classes.button} onClick={nextStep}
                        rightSection={<IconChevronRight/>}>
                    Next
                </Button>}
            {activeStep === props.categories.length &&
                <Button variant="filled" className={classes.button} onClick={nextStep}
                        rightSection={<IconSend/>}>
                    Submit
                </Button>}
        </Group>
    </Paper>)
}