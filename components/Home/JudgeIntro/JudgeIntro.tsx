'use client';
import {Button, Container, Flex, Image, Paper, Text, Title} from "@mantine/core";
import classes from "./JudgeIntro.module.css";
import Link from "next/link";
import {sendMail} from "../../../email/sender";

export default function JudgeIntro(){
    return (<Paper shadow="md" withBorder={true} h={560} w={1080} p={10} m="md" radius="lg"
                   className={classes.wrapper}>
        <Button onClick={() => {
            sendMail({
                email: 'wfw@plug.org.pl',
                sendTo: 'tomasz.slawomir.molis@gmail.com',
                subject:'Test',
                text:'Test'
            })
        }}>Test</Button>
        <Flex direction="row" justify="flex-start" h={560}>
            <Image src="judgeVote.png" fit="cover"
                   w={340}
                   h={540}
                   fallbackSrc="https://placehold.co/400x600?text=Vote"
                   radius="lg"/>
            <Container fluid>
                <Title size="xl" className={classes.header}>
                    <Text variant="gradient" size="xl" fw="bolder" tt="uppercase"
                          gradient={{ from: 'blue', to: 'indigo', deg: 0 }}>
                        Please provide your ranking
                    </Text>
                </Title>
                <Text size="lg" className={classes.paragraph}>
                    As a judge you were asked to rate our contestants in 5 categories.
                    Use button belowe to provide your rankings. We made sure to make
                    it pretty straightforward and easy to do.
                </Text>
                <Text size="lg" className={classes.paragraph}>
                    After you complete your ratings please confirm them and handover paper
                    card to the tally master, who will verify if both are the same.
                </Text>
                <Text size="lg" className={classes.paragraph}>
                    System will make sure that you give valid rankings and will
                    inform you about possible mistakes.
                </Text>
                <Button variant="gradient" gradient={{ from: 'blue', to: 'indigo', deg: 0 }}
                size="xl" m="md" radius="md" component={Link} href={`/judge/1/vote`}>
                    Get me to my ranking.
                </Button>
            </Container>
        </Flex>

    </Paper>);
}