"use client";
import React, { useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import DragableView from "./DragableView";
import { Box, Flex, Text } from "@mantine/core";

export const TimeFrameView = observer((props) => {
  const store = React.useContext(StoreContext);
  const { element } = props;
  const disabled = element.type === "audio";
  const isSelected = store.selectedElement?.id === element.id;
  const bgColorOnSelected = isSelected
    ? "var(--mantine-color-gray-8)"
    : "var(--mantine-color-gray-6)";

  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  return (
    <Box
      onClick={() => {
        store.setSelectedElement(element);
      }}
      key={element.id}
      pos={"relative"}
      w={"100%"}
      h={50}
      my={8}
      mx={8}
      style={
        isSelected
          ? {
              outline: "4px solid var(--mantine-color-orange-3)",
              background: "var(--mantine-color-gray-2)",
              borderRadius: 2,
            }
          : {}
      }
    >
      <DragableView
        style={{ zIndex: 10 }}
        value={element.timeFrame.start}
        total={store.maxTime}
        disabled={disabled}
        onChange={(value) => {
          store.updateEditorElementTimeFrame(element, {
            start: value,
          });
        }}
      >
        <Box
          w={6}
          h={14}
          mt={"calc(50px/2)"}
          style={{
            borderRight: "2px solid white",
            borderLeft: "2px solid white",
            translate: "300% -50%",
          }}
        ></Box>
      </DragableView>

      <DragableView
        className={disabled ? "cursor-no-drop" : "cursor-col-resize"}
        value={element.timeFrame.start}
        disabled={disabled}
        style={{
          position: "relative",
          width: `${
            ((element.timeFrame.end - element.timeFrame.start) /
              store.maxTime) *
            100
          }%`,
        }}
        total={store.maxTime}
        onChange={(value) => {
          const { start, end } = element.timeFrame;
          store.updateEditorElementTimeFrame(element, {
            start: value,
            end: value + (end - start),
          });
        }}
      >
        <Flex h={50} w={"100%"} c={"white"} size="xs" miw={0} px={8}>
          <Text pos={"absolute"} size="xs">
            {element.name}
          </Text>
          {thumbnailUrl &&
            thumbnailUrl.map((url, index) => (
              <Box
                key={index}
                w={"10%"}
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundRepeat: "repeat-x",
                  backgroundSize: "contain",
                  opacity: isSelected ? 0.7 : 1,
                }}
              />
            ))}
        </Flex>
        {element.type === "video" ? (
          <video
            style={{
              opacity: 0,
              maxHeight: 20,
              maxWidth: 20,
              position: "absolute",
              left: 0,
            }}
            src={element.properties.src}
            autoPlay={true}
            muted={true}
            crossOrigin="anonymous"
            onLoad={() => {
              store.refreshElements();
            }}
            onLoadedData={async (e) => {
              const canvas = document.createElement("canvas");
              const video = e.target;
              const frames = [];

              let ctx = canvas.getContext("2d");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              video.pause();

              const end = element.timeFrame.end;

              for (let i = 0; i < end; i += end / 11) {
                video.currentTime = i;
                ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL("image/png");
                const blob = await (await fetch(dataUrl)).blob();
                const blobUrl = URL.createObjectURL(blob);
                frames.push(blobUrl);
              }

              store.refreshElements();
              setThumbnailUrl(frames);
            }}
            height={20}
            width={20}
            id={element.properties.elementId}
          ></video>
        ) : null}
      </DragableView>
      <DragableView
        style={{ zIndex: 10 }}
        disabled={disabled}
        value={element.timeFrame.end}
        total={store.maxTime}
        onChange={(value) => {
          store.updateEditorElementTimeFrame(element, {
            end: value,
          });
        }}
      >
        <Box
          w={6}
          h={14}
          mt={"calc(50px/2)"}
          style={{
            borderRight: "2px solid white",
            borderLeft: "2px solid white",
            translate: "-350% -50%",
          }}
        ></Box>
      </DragableView>
    </Box>
  );
});
