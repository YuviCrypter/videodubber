// import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider, virtualColor } from "@mantine/core";
import Head from "next/head";

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: "primary",
      dark: "rgb(86, 102, 245)",
      light: "rgb(86, 102, 245)",
    }),
  },
  primaryColor: "indigo",
  fontFamily: "Inter, sans-serif",
});

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="light"
    >
      <Head>
        <title>VEED - Create, Edit & Share Videos Online for free</title>
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
