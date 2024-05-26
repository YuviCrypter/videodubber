"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { VideoResourcesPanel } from "./panels/VideoResourcesPanel";
import { Box, Text } from "@mantine/core";

export const Resources = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedMenuOption = store.selectedMenuOption;
  const labels = {
    Media: "Add Media",
    Settings: "Project Settings",
    Audio: "Add Audio",
    Subtitles: "Subtitles",
    Text: "Add Text",
    Elements: "Elements",
    Record: "Record",
    Record: "Transitions",
    Record: "Filters",
  };

  return (
    <Box
      h={"100%"}
      bg={"white"}
      style={{ borderRight: "1px solid var(--mantine-color-gray-2)" }}
    >
      <Text fw={600} pb={16} pt={24} px={24} size="xl">
        {labels[selectedMenuOption]}
      </Text>
      {selectedMenuOption === "Media" ? <VideoResourcesPanel /> : null}
    </Box>
  );
});
