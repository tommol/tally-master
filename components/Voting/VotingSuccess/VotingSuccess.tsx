import {IconCheck, IconDeviceMobile, IconSwimming, IconX} from '@tabler/icons-react';
import {Badge, Button, Group, Paper, PinInput, Progress, Text, ThemeIcon} from '@mantine/core';
import classes from './VotingSuccess.module.css';

export function VotingSuccess() {
    return (
        <Paper radius="md" withBorder className={classes.card} mt={30}>
            <ThemeIcon className={classes.icon} size={60} radius={60} color="green">
                <IconCheck size={32} stroke={2.5}/>
            </ThemeIcon>

            <Text ta="center" fw={700} className={classes.title} size="xl">
                Dziękujemy za oddanie głosów. Wyniki głosowania zostaną
                ogłoszone podczas finału wyborów!

            </Text>

        </Paper>
    );
}