"use client";
import React, { useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { VideoResource } from "../entity/VideoResource";
import {
  Text,
  Stack,
  useMantineTheme,
  Group,
  Flex,
  ScrollArea,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

export const VideoResourcesPanel = observer(() => {
  const theme = useMantineTheme();
  const store = React.useContext(StoreContext);

  // const [newVideo, setNewVideo] = useState(null);

  const handleFileChange = (files) => {
    const file = files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    store.addVideoResource(url);
    // setNewVideo(url);
  };

  return (
    <>
      <Dropzone
        onDrop={(files) => {
          console.log("Accepted", files);
          handleFileChange(files);
        }}
        onReject={(files) => console.log("rejected files", files)}
        accept="video/mp4,video/x-m4v,video/*"
        p="xl"
        pt={0}
      >
        <Stack
          justify="center"
          align="center"
          gap="4"
          mih={180}
          miw={320}
          style={{
            pointerEvents: "none",
            background: "rgba(0,0,0,0.02)",
            border: "dashed rgba(0,0,0,0.1)",
            borderRadius: 8,
          }}
          my="xl"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="20"
            height="20"
            class="sc-bgqQPU loMkTG"
          >
            <path
              d="M16 16L12 12L8 16"
              stroke="var(--mantine-color-gray-7)"
              strokeWidth={2}
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 12V21"
              stroke="var(--mantine-color-gray-7)"
              strokeWidth={2}
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5799 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6902 21.9435 10.7355 21.0667 10.0535C20.1899 9.3714 19.1109 9.00075 18 9.00001H16.74C16.4373 7.82926 15.8732 6.74235 15.09 5.82101C14.3067 4.89967 13.3249 4.16786 12.2181 3.68062C11.1114 3.19338 9.90856 2.96337 8.70012 3.0079C7.49169 3.05242 6.30907 3.37031 5.24118 3.93768C4.17329 4.50505 3.24792 5.30712 2.53463 6.2836C1.82134 7.26008 1.3387 8.38555 1.12299 9.57541C0.907276 10.7653 0.964111 11.9885 1.28922 13.1533C1.61433 14.318 2.19925 15.3939 3.00001 16.3"
              stroke="var(--mantine-color-gray-7)"
              strokeWidth={2}
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M16 16L12 12L8 16"
              stroke="var(--mantine-color-gray-7)"
              strokeWidth={2}
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>

          <Text size="sm">Upload a File</Text>
          <Group gap={6}>
            <Text size="xs" c={theme.colors.gray[5]}>
              {" "}
              Drag or drop a file or
            </Text>
            <Text size="xs" c={theme.colors.indigo[7]}>
              import from a link
            </Text>
          </Group>
        </Stack>
      </Dropzone>
      <ScrollArea maw={400} mah={120} scrollbars="x">
        <Flex>
          {store.videos.map((video, index) => {
            return (
              <VideoResource
                key={video}
                video={video}
                index={index}
                // newVideo={newVideo}
              />
            );
          })}
        </Flex>
      </ScrollArea>
    </>
  );
});
