"use client";
import { StoreContext } from "@/store";
import { formatTimeToMinSecMili } from "../../utils";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";

import { Flex, Button, Box, Text } from "@mantine/core";

export const SeekPlayer = observer((_props) => {
  const store = useContext(StoreContext);
  const Icon = store.playing ? IconPlayerPauseFilled : IconPlayerPlayFilled;
  const formattedTime = formatTimeToMinSecMili(store.currentTimeInMs);
  const formattedMaxTime = formatTimeToMinSecMili(store.maxTime);
  return (
    // <Flex direction={"column"}>
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
  );
});
