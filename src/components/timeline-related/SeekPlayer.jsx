"use client";
import { StoreContext } from "@/store";
import { formatTimeToMinSecMili } from "../../utils";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";
import { ScaleRangeInput } from "./ScaleRangeInput";
import { Flex, Button, Box, Text } from "@mantine/core";

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

export const SeekPlayer = observer((_props) => {
  const store = useContext(StoreContext);
  const Icon = store.playing ? IconPlayerPauseFilled : IconPlayerPlayFilled;
  const formattedTime = formatTimeToMinSecMili(store.currentTimeInMs);
  const formattedMaxTime = formatTimeToMinSecMili(store.maxTime);
  return (
    <Flex direction={"column"}>
      <Flex
        gap={4}
        align={"center"}
        justify={"center"}
        px={8}
        className="flex flex-row items-center px-2"
      >
        <Button
          c={"black"}
          bg={"var(--mantine-color-gray-2)"}
          radius={40}
          p={8}
          m={8}
          onClick={() => {
            store.setPlaying(!store.playing);
          }}
        >
          <Icon size="sm"></Icon>
        </Button>
        <Text fw={500} size="sm">
          {formattedTime}{" "}
        </Text>
        <Text> / </Text>
        <Text fw={500} size="sm">
          {" "}
          {formattedMaxTime}
        </Text>
      </Flex>
      <ScaleRangeInput
        max={store.maxTime}
        value={store.currentTimeInMs}
        onChange={(value) => {
          store.handleSeek(value);
        }}
        markings={MARKINGS}
        backgroundColor="white"
      />
    </Flex>
  );
});
