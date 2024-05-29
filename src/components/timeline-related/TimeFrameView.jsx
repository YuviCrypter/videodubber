"use client";
import React, { useRef, useEffect, useState } from "react";
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

  const [loadedVideo, setLoadedVideo] = useState(false);

  const videoRef = useRef(null);
  const thumbnailsContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const video = videoRef.current;
    const thumbnailsContainer = thumbnailsContainerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const captureFrame = (time) => {
      console.log(time);
      return new Promise((resolve) => {
        video.currentTime = time;

        video.addEventListener(
          "seeked",
          () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnailURL = canvas.toDataURL();
            resolve({ time, url: thumbnailURL });
          },
          { once: true }
        );
      });
    };

    const captureThumbnails = async () => {
      const duration = video.duration;
      const interval = duration / 5; // Divide the video duration into 5 intervals
      const capturePromises = [];

      for (let i = 1; i <= 5; i++) {
        const time = i * interval;
        capturePromises.push(captureFrame(time));
      }

      const thumbnails = await Promise.all(capturePromises);
      setThumbnails(thumbnails);
    };

    if (video && thumbnailsContainer && canvas && loadedVideo) {
      captureThumbnails();
    }

    return () => {
      // Cleanup code here if needed
    };
  }, [videoRef, thumbnailsContainerRef, canvasRef, loadedVideo]);

  return (
    <Box
      onClick={() => {
        store.setSelectedElement(element);
      }}
      key={element.id}
      pos={"relative"}
      // w={"100%"}
      flex={1}
      h={50}
      my={8}
      mx={8}
      style={
        isSelected
          ? {
              background: "var(--mantine-color-gray-2)",
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

      <canvas ref={canvasRef} style={{ display: "none" }} />
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

          outline: isSelected
            ? "4px solid var(--mantine-color-orange-3)"
            : "none",
          borderRadius: isSelected ? 2 : 0,
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
          <div ref={thumbnailsContainerRef}>
            {thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail.url}
                alt={`Thumbnail ${index + 1}`}
                height={"100%"}
                width={100}
              />
            ))}
          </div>
        </Flex>
        {element.type === "video" ? (
          <video
            style={{
              opacity: 0,
              maxHeight: 20,
              maxWidth: 20,
              position: "absolute",
              left: 0,
              top: 0,
            }}
            src={element.properties.src}
            height={20}
            width={20}
            id={element.properties.elementId}
            ref={videoRef}
            onLoadedData={() => {
              setLoadedVideo(true);
            }}

            // autoPlay={true}
            // muted={true}
            // crossOrigin="anonymous"
            // onLoad={() => {
            //   store.refreshElements();
            // }}
            // onLoadedData={async (e) => {
            //   const canvas = document.createElement("canvas");
            //   const video = e.target;
            //   const frames = [];

            //   let ctx = canvas.getContext("2d");
            //   canvas.width = video.videoWidth;
            //   canvas.height = video.videoHeight;
            //   video.pause();

            //   const end = element.timeFrame.end;

            //   for (let i = 0; i < end; i += end / 11) {
            //     video.currentTime = i;
            //     ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            //     const dataUrl = canvas.toDataURL("image/png");
            //     const blob = await (await fetch(dataUrl)).blob();
            //     const blobUrl = URL.createObjectURL(blob);
            //     frames.push(blobUrl);
            //   }

            //   store.refreshElements();
            //   setThumbnailUrl(frames);
            // }}
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
