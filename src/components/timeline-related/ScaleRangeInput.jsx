"use client";
import { Box } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

export const ScaleRangeInput = (props) => {
  const { max, value, onChange } = props;
  const ref = useRef(null);
  const refIsMouseDown = useRef(false);
  const [canvasSize, setCanvasSize] = useState({
    width: 50,
    height: props.height,
  });
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setCanvasSize({
          width: ref.current.parentElement?.clientWidth ?? 50,
          height: ref.current.parentElement?.clientHeight ?? props.height,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = props.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        props.markings.forEach((marking) => {
          ctx.strokeStyle = marking.color;
          ctx.lineWidth = marking.width;
          ctx.beginPath();
          for (let i = 0; i < max; i += marking.interval) {
            ctx.moveTo((i / max) * canvas.width, 0);
            ctx.lineTo((i / max) * canvas.width, marking.size);
          }
          ctx.stroke();
        });
      }
    }
  }, [props.markings, props.backgroundColor, max, canvasSize]);

  const updateFromMouseEvent = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const value = (x / canvasSize.width) * max;
      const normalizedValue = Math.min(max, Math.max(0, value));
      onChange(normalizedValue);
    }
  };

  return (
    <Box
      pos={"relative"}
      w={"100%"}
      style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
      onMouseDown={(e) => {
        refIsMouseDown.current = true;
        updateFromMouseEvent(e);
      }}
      onMouseUp={(e) => {
        refIsMouseDown.current = false;
      }}
      onMouseMove={(e) => {
        if (refIsMouseDown.current) {
          updateFromMouseEvent(e);
        }
      }}
      onMouseLeave={(e) => {
        refIsMouseDown.current = false;
      }}
    >
      <canvas height={2} ref={ref}></canvas>
      <Box
        bg={"var(--mantine-color-violet-7)"}
        w={2}
        pos={"absolute"}
        top={0}
        left={0}
        h={"100%"}
        style={{
          transform: `translateX(${
            (value / max) * canvasSize.width
          }px)`,
          borderRadius: 50,
        }}
      ></Box>
    </Box>
  );
};
