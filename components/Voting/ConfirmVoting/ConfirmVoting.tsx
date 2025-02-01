import {IconDeviceMobile, IconSwimming} from '@tabler/icons-react';
import {Badge, Button, Group, Paper, PinInput, Progress, Text, ThemeIcon} from '@mantine/core';
import classes from './ConfirmVoting.module.css';

export function ConfirmVoting() {
    return (
        <Paper radius="md" withBorder className={classes.card} mt={30}>
            <ThemeIcon className={classes.icon} size={60} radius={60}>
                <IconDeviceMobile size={32} stroke={2.5}/>
            </ThemeIcon>

            <Text ta="center" fw={700} className={classes.title} size="xl">
                Wprowadź otrzymany kod, aby potwierdzić swój głos.
            </Text>

            <Group justify="space-around" mt="lg">
                <PinInput length={6} size="xl"/>
            </Group>
            <Group justify="space-around" mt="lg">
                <Button size="xl" variant="filled" color="blue">
                    Potwierdź
                </Button>
            </Group>

        </Paper>
    );
}