import {Button, Container, Group, Text, Title} from '@mantine/core';
import classes from './SuccessApply.module.css';
import Link from "next/link";

export default function SuccessApply() {
    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <div className={classes.label}>Sukces</div>
                <Title className={classes.title}>Twoja aplikacja została zartejestrowana.</Title>
                <Text size="lg" ta="center" className={classes.description}>
                    Dziękujemy za zgłoszenie na podany przez ciebie adres e-mail wysłalismy daldze instrukcje.
                    Jeżeli nie otrzymałeś maila sprawdź czy wiadomość nie trafiła do spamu, jeżeli nadal jej nie widzisz
                    skontaktuj się ze nami poprzez email kontaktowy Stowarzyszenia.
                </Text>
                <Group justify="center">
                    <Button variant="filled" color="dark" size="md" component={Link} href="/">
                        Wróć na stronę główną
                    </Button>
                </Group>
            </Container>
        </div>
    );
}