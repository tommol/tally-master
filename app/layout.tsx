import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";

export const metadata = {
  title: "Warsaw Fetish Weekend",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body style={{ background: "var(--mantine-color-gray-2)"}}>
        <MantineProvider theme={theme}>
            <div style={{width: '100%'}}>{children}
            </div></MantineProvider>
      </body>
    </html>
  );
}
