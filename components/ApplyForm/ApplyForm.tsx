'use client';
import { Text, Paper, TextInput, Title, Tooltip, Center, Container, Textarea, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { applySchema } from "./schema";
import classes from './ApplyForm.module.css';
import { IconInfoCircle } from "@tabler/icons-react";
import ImageUploader from "../ImageUploader/ImageUploader";

export interface ApplyFormProps {
    contestId: number;
    contestName: string;
}

export default function ApplyForm({ contestId, contestName }: ApplyFormProps) {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstName: '',
            lastName: '',
            nickname: '',
            email: '',
            city: '',
            bio: '',
            motivation: '',
            performance: '',
            instagram: '',
            mainPhoto: '',
            photo1: '',
            photo2: '',
        },
        validateInputOnChange: true,
        clearInputErrorOnChange: true,
        validate: zodResolver(applySchema),
    });

    const toolTip = (info: string) => (
        <Tooltip
            label={info}
            position="top-end"
            withArrow
            transitionProps={{ transition: 'pop-bottom-right' }}
        >
            <Text component="div" c="dimmed" style={{ cursor: 'help' }}>
                <Center>
                    <IconInfoCircle size={18} stroke={1.5} />
                </Center>
            </Text>
        </Tooltip>
    );

    return (
        <Paper mx="auto" my="lg" p="lg" shadow="xs" maw={800} withBorder>
            <Title order={1} size="h1">Formularz Zgłoszeniowy</Title>
            <Title order={3} size="h2">Wybory {contestName}</Title>
            <hr />
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Container size="lg">
                    <TextInput
                        w={"70%"}
                        label="Imię"
                        placeholder="Imię"
                        required
                        key={form.key('firstName')}
                        {...form.getInputProps('firstName')}
                        autoComplete="nope"
                        classNames={classes}
                        onBlur={(e) => form.validateField('firstName')}
                        rightSection={toolTip('Będzie widoczne publicznie chyba że podasz pseudonim')}
                    />
                    <TextInput
                        w={"70%"}
                        label="Nazwisko"
                        placeholder="Nazwisko"
                        required
                        key={form.key('lastName')}
                        {...form.getInputProps('lastName')}
                        autoComplete="nope"
                        classNames={classes}
                        onBlur={(e) => form.validateField('lastName')}
                        rightSection={toolTip('Będzie widoczne jedynie dla organizatorów')}
                    />
                    <TextInput
                        w={"70%"}
                        label="Pseudonim"
                        placeholder="Pseudonim"
                        key={form.key('nickname')}
                        {...form.getInputProps('nickname')}
                        autoComplete="nope"
                        classNames={classes}
                        onBlur={(e) => form.validateField('nickname')}
                        rightSection={toolTip('Będzie używane zamist imienia')}
                    />
                    <TextInput
                        w={"70%"}
                        label="E-mail"
                        placeholder="E-mail"
                        required
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                        autoComplete="nope"
                        classNames={classes}
                        onBlur={(e) => form.validateField('email')}
                        rightSection={toolTip('Będzie widoczny jedynie dla organizatorów')}
                    />
                    <TextInput
                        w={"70%"}
                        label="Miasto"
                        placeholder="Miasto"
                        required
                        key={form.key('city')}
                        {...form.getInputProps('city')}
                        autoComplete="nope"
                        classNames={classes}
                        onBlur={(e) => form.validateField('city')}
                        rightSection={toolTip('Będzie podawane publicznie')}
                    />
                    <Textarea
                        w={"70%"}
                        label="Napisz kilka zdań o sobie"
                        placeholder="O mnie..."
                        required
                        autosize
                        key={form.key('bio')}
                        {...form.getInputProps('bio')}
                        autoComplete="nope"
                        classNames={classes}
                        minRows={3}
                        maxRows={5}
                        onBlur={(e) => form.validateField('bio')}
                        rightSection={toolTip('Wszystko, co chcesz napisać o sobie. Będzie to wykorzysane w prezentacji Twojej osoby')}
                    />
                    <Textarea
                        w={"70%"}
                        label="Motywacja"
                        placeholder="Motywacja do startu..."
                        required
                        autosize
                        key={form.key('motivation')}
                        {...form.getInputProps('motivation')}
                        autoComplete="nope"
                        classNames={classes}
                        minRows={3}
                        maxRows={5}
                        onBlur={(e) => form.validateField('motivation')}
                        rightSection={toolTip('Napisz dlaczego się zgłosiłeś. Będzie to wykorzysane w prezentacji Twojej osoby')}
                    />
                    <Textarea
                        w={"70%"}
                        label="Opisz co chcesz zaprezentować"
                        placeholder="Opisz co chcesz zaprezentować..."
                        required
                        autosize
                        key={form.key('performance')}
                        {...form.getInputProps('performance')}
                        autoComplete="nope"
                        classNames={classes}
                        minRows={3}
                        maxRows={5}
                        onBlur={(e) => form.validateField('performance')}
                        rightSection={toolTip('Jako kandydat, będziesz miał okazję zaprezentować swoje umiejętności. Opisz co chcesz zaprezentować, pozwoli nam tolepiej zaplanować kolejność występów')}
                    />
                    <TextInput
                        w={"70%"}
                        label="Profil na Instagramie"
                        placeholder="Adres profilu na instagramie"

                        key={form.key('instagram')}
                        {...form.getInputProps('instagram')}
                        autoComplete="nope"
                        classNames={classes}
                        onBlur={(e) => form.validateField('instagram')}
                        rightSection={toolTip('Podanie powoli nam oznczać twoje konto w celu promocji')}
                    />
                    <ImageUploader inputProps={form.getInputProps('mainPhoto')} rightSection={toolTip('Prześlij główne zdjęcie')} label="Zdjęcie główne" />
                    <ImageUploader inputProps={form.getInputProps('photo1')} rightSection={toolTip('Prześlij dodatkowe zdjęcie')} label="Zdjęcie dodatkowe" />
                    <ImageUploader inputProps={form.getInputProps('photo2')} rightSection={toolTip('Prześlij dodatkowe zdjęci')} label="Zdjęcie sylwetki" />
                    <Button type="submit" onClick={(e) => e.preventDefault()} disabled={!form.isValid} classNames={classes}
                        variant="filled" size="lg" color="red" my="sm" w="70%">
                        Wyślij zgłoszenie
                    </Button>
                </Container>
            </form>
        </Paper>
    )
}