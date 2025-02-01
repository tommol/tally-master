import {Paper, ThemeIcon, Text, Group} from "@mantine/core";
import {IconColorSwatch, IconMoodLookDown} from "@tabler/icons-react";
import classes from "./ApplicationClosed.module.css";

export default function ApplicationClosed() {
    return (
        <Paper withBorder radius="md" className={classes.card}>
            <Group>
                <ThemeIcon
                    size="xl"
                    radius="md"
                    variant="gradient"
                    gradient={{deg: 0, from: 'pink', to: 'orange'}}
                >
                    <IconMoodLookDown size={32} stroke={3}/>
                </ThemeIcon>
                <Text className={classes.title} fw={700} mt="md" variant="gradient" gradient={{deg: 0, from: 'pink', to: 'orange'}}>
                    Nie przyjmujemy aplikacji
                </Text>
            </Group>
            <Text size="lg" mt="md" >
                Konkurs na który próbujesz się zgłosić nie przyjmuje aplikacji. Jeżeli
                uważasz, że nastąpiła pomyłka skontaktuj się z nami mailowo.
            </Text>
        </Paper>
    )
}