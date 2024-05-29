"use client";
import React from "react";
import { Box, Flex, ScrollArea } from "@mantine/core";
import { SeekPlayer } from "./timeline-related/SeekPlayer";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { TimeFrameView } from "./timeline-related/TimeFrameView";
import { ScaleRangeInput } from "./timeline-related/ScaleRangeInput";

const MARKINGS = [
  {
    interval: 5000,
    color: "black",
    size: 4,
    width: 1,
  },
  {
    interval: 1000,
    color: "black",
    size: 1,
    width: 1,
  },
];

export const TimeLine = observer(() => {
  const store = React.useContext(StoreContext);
  const percentOfCurrentTime = (store.currentTimeInMs / store.maxTime) * 100;
  return (
    <Flex
      direction={"column"}
      pos={"relative"}
      flex={1}
      style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}
    >
      {/* <Flex direction={"column"}> */}
      <SeekPlayer />
      <ScrollArea scrollbars="x">
        <ScaleRangeInput
          max={store.maxTime}
          value={store.currentTimeInMs}
          onChange={(value) => {
            store.handleSeek(value);
          }}
          markings={MARKINGS}
          backgroundColor="white"
        />
        {/* </Flex> */}

        <ScrollArea scrollbars="y">
          <Box style={{ position: "relative" }}>
            {store.editorElements.map((element) => {
              return <TimeFrameView key={element.id} element={element} />;
            })}
            <Box
              style={{
                left: `${percentOfCurrentTime}%`,
                position: "absolute",
                top: "-10px",
                bottom: "-10px",
                zIndex: 20,
                backgroundColor: "var(--mantine-color-violet-7)",
                width: "2px",
              }}
            ></Box>
          </Box>
        </ScrollArea>
      </ScrollArea>
    </Flex>
  );
});
