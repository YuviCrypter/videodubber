import { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript } from "@mantine/core";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />

        <meta
          name="description"
          content="VEED is a simple but powerful video editor, try our free video editor to, resize video, trim video add loads more!"
          data-react-helmet="true"
        />
        <meta
          name="keywords"
          content="Instagram video editor, Online Video editor, Video Editor, Video Resizer, Trim Video, Draw On Video, Resize Video, Edit videos online, Online video editor"
          data-react-helmet="true"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
