import "@mantine/core/styles.css";
import React from "react";
import {Header} from "../../components/Header/Header";
import {Container, Flex} from "@mantine/core";


export default function AdminLayout({children}: { children: any }) {
    return (
        <Flex direction="column" justify="flex-start">
            <Header/>
            <Container size="lg" mt="0">
                {children}
            </Container>
        </Flex>

    );
}
