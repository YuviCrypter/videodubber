"use client";
import React from "react";
import { Box, Flex } from "@mantine/core";
import { SeekPlayer } from "./timeline-related/SeekPlayer";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { TimeFrameView } from "./timeline-related/TimeFrameView";

export const TimeLine = observer(() => {
  const store = React.useContext(StoreContext);
  const percentOfCurrentTime = (store.currentTimeInMs / store.maxTime) * 100;
  return (
    <Flex
      direction={"column"}
      pos={"relative"}
      style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}
    >
      <SeekPlayer />
      <Box style={{ position: "relative" }}>
        {store.editorElements.map((element) => {
          return <TimeFrameView key={element.id} element={element} />;
        })}
        <Box
          style={{
            left: `${percentOfCurrentTime}%`,
            position: "absolute",
            top: "0",
            bottom: "0",
            zIndex: 20,
            backgroundColor: "#F87171",
            width: "2px",
          }}
        ></Box>
      </Box>
    </Flex>
  );
});
