'use client';
import { Button, Card, Group, Image, List, Paper, Stepper, Text, Title } from "@mantine/core";
import React, { JSX, useEffect, useMemo, useState } from "react";
import classes from "./JudgeRanking.module.css";
import { IconCheck, IconChevronLeft, IconChevronRight, IconFileDescription, IconSend, IconSend2, TablerIcon } from "@tabler/icons-react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useListState } from "@mantine/hooks";
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
    ranked: boolean,
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
    const emptyRanking = props.contestants.map((contestant, index) => ({
        contestantId: contestant.id,
        rank: index + 1,
        ranked: false
    }));
    const [fullRankings, setFullRankings] = useState<JudgeRanking>({
        judgeId: props.judgeId,
        rankings: props.categories.map((category) => ({
            categoryId: category.id,
            ranking: emptyRanking
        }))
    });
    const [state, handlers] = useListState<ContestantRanked>(fullRankings.rankings[0].ranking);

    const [activeStep, setActiveStep] = useState(1);
    const nextStep = () => {        
        setActiveStep((current) => {
            console.log(`Current step ${activeStep}`);
            const next  = current < props.categories.length ? current + 1 : current
            console.log(`Next step ${next}`);
            if (current > 0 && current < props.categories.length-1) {
                console.log(`State ${JSON.stringify(state)}`);
                saveState(current, state);
                console.log(`Saved state ${JSON.stringify(fullRankings.rankings[current-1].ranking)}`);
                handlers.setState(readState(current+1) ?? emptyRanking);
            }
            return next;
        });
    }

    const saveState = (step: number, ranking: ContestantRanked[]) => {
        console.log(`Saving state for step ${step} with ranking ${ranking}`);
        setFullRankings((prev) => (
            {
                ...prev,
                rankings: prev.rankings.map((item) => {
                    if (item.categoryId === step) {
                        return {
                            ...item,
                            ranking: ranking
                        }
                    } else {
                        return item;
                    }
                })
            }
        ));
    };
    const readState = (step: number) => {
        console.log(`Reading state for step ${step}`);
        return fullRankings.rankings[step-1].ranking;
    }

    const prevStep = () => {
        setActiveStep((current) => {
            console.log(`Current step ${activeStep}`);
            const prev= (current > 0 ? current - 1 : current);
            console.log(`Prev step ${prev}`);
            if (prev>0) {
                saveState(current, state);
                handlers.setState(readState(current-1) ?? emptyRanking);
            }
            return prev;
        })
    };

    const header = (categories: JuryCategory[]) => (
        <Stepper active={activeStep} onStepClick={setActiveStep} allowNextStepsSelect={false} className={classes.steps}>
            {categories.map((category) => (
                <Stepper.Step key={category.id} label={category.name} icon={category.icon}
                    completedIcon={category.icon} />
            ))}
        </Stepper>
    )

    const items = state.map((contestant, index) => (
        <Draggable key={contestant.contestantId} index={index} draggableId={contestant.contestantId.toString()}>
            {(provided, snapshot) => {
                return (
                    <div className={cx(classes.contestant, { [classes.itemDragging]: snapshot.isDragging })}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <Image src={props.contestants.find((c) => c.id == contestant.contestantId)?.photo} className={classes.avatar} />

                        <Text className={classes.name}>{props.contestants.find((c) => c.id == contestant.contestantId)?.name}</Text>

                        <Text className={contestant.ranked ? classes.rank : classes.empty}>{contestant.rank}</Text>

                    </div>
                )
            }}
        </Draggable>
    ));
    const instructions =()=>(
        <Card withBorder={true} className={classes.stepContent}>
            <Card.Section className={classes.stepHeader}>
                <Title> {activeStep}.Instructions</Title>
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

    const renderStep = (step: number, steps: number) => (
             <Card withBorder={true} className={classes.stepContent}>
                <Card.Section className={classes.stepHeader}>
                    <Title>{activeStep} Ranking of {props.categories.find((category) => (category.id === step))?.name}</Title>
                </Card.Section>
                <Card.Section w={"70%"} mx={"auto"}>
                    <DragDropContext

                        onDragEnd={({ destination, source }) => {
                            handlers.reorder({ from: source.index, to: destination?.index || 0 });
                            handlers.setItemProp(destination?.index ??0, 'ranked', true);   
                            state.forEach((item, index) => {
                                handlers.setItemProp(index, 'rank', index + 1);
                            });
                            
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
    

    return (<Paper>
        {header(props.categories)}
        {renderStep(activeStep, props.categories.length)}
        <Group className={classes.navButtons}>

            <Button variant="default" className={classes.button} onClick={prevStep}
                disabled={activeStep === 1}
                leftSection={<IconChevronLeft />}>
                Back
            </Button>
            {activeStep < props.categories.length &&
                <Button variant="filled" className={classes.button} onClick={nextStep}
                    rightSection={<IconChevronRight />}>
                    Next
                </Button>}
            {activeStep === props.categories.length &&
                <Button variant="filled" className={classes.button} onClick={nextStep}
                    rightSection={<IconSend />}>
                    Submit
                </Button>}
        </Group>
    </Paper>)
}