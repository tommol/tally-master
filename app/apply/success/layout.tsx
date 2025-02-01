import "@mantine/core/styles.css";
import React from "react";

export const metadata = {
    title: "Warsaw Fetish Weekend",
};

export default function RootLayout({children}: { children: any }) {
    return (
        <div style={{minWidth: '100%'}}>{children}</div>
    );
}
