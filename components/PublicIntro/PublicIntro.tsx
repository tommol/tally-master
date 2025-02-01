'use client';
import {Button, Container, Flex, Group, Image, Overlay, Text, Title} from '@mantine/core';
import classes from './PublicIntro.module.css';
import Link from "next/link";
import React from "react";
import {IconLogin} from "@tabler/icons-react";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export function PublicIntro() {
    return (
        <div className={classes.hero}>
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
                opacity={1}
                zIndex={0}
            />

            <Flex direction="row" p="sm" w="90dvw" mx="auto" className={classes.header}>
                <Group>
                    <Image src="/logo.png" h={62} alt="Warsaw Fetish Weekend" className={classes.headerLogo}/>
                    <Title size="xl" c="white" className={classes.headerTitle}>Voting</Title>
                </Group>
                <div>
                    <Button variant="light" size="xl" component={LoginLink}
                            rightSection={<IconLogin />}
                    >
                        Login
                    </Button>
                </div>
            </Flex>
            <Container className={classes.container} size="md">
                <Title className={classes.title}>Warsaw Fetish Weekend 2005</Title>
                <Text className={classes.description} size="xl" mt="xl">
                    When voting starts you will be able to cast your votes here. Right
                    now we encourage to learn more about Warsaw Fetish Weekend 2005.
                </Text>

                <Button variant="gradient" size="xl" radius="xl" className={classes.control} component={Link}
                        href="https://wfw.plug.org.pl" target="_blank">
                    About WFW
                </Button>
            </Container>
        </div>
    );
}