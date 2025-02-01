import {IconDeviceMobile, IconSwimming, IconX} from '@tabler/icons-react';
import {Badge, Button, Group, Paper, PinInput, Progress, Text, ThemeIcon} from '@mantine/core';
import classes from './VotingError.module.css';

export function VotingError() {
    return (
        <Paper radius="md" withBorder className={classes.card} mt={30}>
            <ThemeIcon className={classes.icon} size={60} radius={60} color="orange">
                <IconX size={32} stroke={2.5}/>
            </ThemeIcon>

            <Text ta="center" fw={700} className={classes.title} size="xl">
                Zgodnie z naszymi informacjami już oddałeś swój głos w tych wyborach!

            </Text>

        </Paper>
    );
}