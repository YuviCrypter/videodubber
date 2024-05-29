"use client";
import React, { useEffect } from "react";
import { StoreContext } from "@/store";
import { formatTimeToMinSec } from "../../utils";
import { observer } from "mobx-react";
import { Button, Text } from "@mantine/core";

export const VideoResource = observer(({ video, index }) => {
  const store = React.useContext(StoreContext);
  const ref = React.useRef(null);
  const [formatedVideoLength, setFormatedVideoLength] = React.useState("00:00");

  return (
    <Button
      onClick={() => store.addVideo(index)}
      h={100}
      style={{
        display: "flex",
        overflow: "hidden",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "0.5rem",
        margin: "15px",
      }}
    >
      <Text
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          background: "rgba(0,0,0,.25)",
        }}
        size="xs"
        p={4}
      >
        {formatedVideoLength}
      </Text>
      {/* <button
        className="hover:bg-[#00a0f5] bg-[rgba(0,0,0,.25)] rounded z-10 text-white font-bold py-1 absolute text-lg bottom-2 right-2"
        onClick={() => store.addVideo(index)}
      >
        Add
      </button> */}
      <video
        onLoadedData={() => {
          const videoLength = ref.current?.duration ?? 0;
          setFormatedVideoLength(formatTimeToMinSec(videoLength));

          store.addVideo(index);
        }}
        ref={ref}
        style={{ maxHeight: "100px", maxWidth: "150px" }}
        src={video}
        height={200}
        width={200}
        id={`video-${index}`}
      ></video>
    </Button>
  );
});
