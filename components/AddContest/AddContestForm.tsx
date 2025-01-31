'use client';
import {Button, Container, Paper, Progress, TextInput, Title} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {addContestSchema} from "./schema";
import classes from "../ApplyForm/ApplyForm.module.css";
import ImageUploader from "../ImageUploader/ImageUploader";
import {useState} from "react";
import {redirect} from "next/navigation";
import {z} from "zod";
import {applySchema} from "../ApplyForm/schema";

export default function AddContestForm() {
    const [sending, setSending] = useState(false);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            year: '',
            logo: ''
        }, validateInputOnChange: true,
        clearInputErrorOnChange: true,
        validate: zodResolver(addContestSchema),
    });
    const submitHandler = async (values: z.infer<typeof addContestSchema>) => {
        setSending(true);
        const res = await fetch("/api/contests", {
            method: "POST",
            body: JSON.stringify(values),
        });
        if(res.ok) {
            redirect('/contests');
        }else{
            setSending(false);
        }
    }

    return (<Paper mx="auto" my="lg" p="lg" shadow="xs" maw={800} withBorder>
        <Title>Add Contest</Title>
        {!sending &&
        <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
            <Container size="lg">
                <TextInput
                    w={"70%"}
                    label="Name"
                    placeholder="Name"
                    required
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                    autoComplete="nope"
                    classNames={classes}
                    onBlur={(e) => form.validateField('name')}
                />
                <TextInput
                    w={"70%"}
                    label="Year"
                    placeholder="Year"
                    required
                    key={form.key('year')}
                    {...form.getInputProps('year')}
                    autoComplete="nope"
                    classNames={classes}
                    onBlur={(e) => form.validateField('year')}
                />
                <ImageUploader label={"Logo"} inputProps={form.getInputProps('logo')} directory={'logos'} parent={form} name="logo" />
            <Button type="submit" my="sm">Save</Button>
            </Container>
        </form>
        }
        {sending && <Progress value={100} animated size="xl" />}
    </Paper>)
}