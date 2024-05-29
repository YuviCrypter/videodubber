import { Box } from "@mantine/core";
import React, { useEffect, useRef } from "react";

function DragableView(props) {
  const ref = useRef({
    div: null,
    isDragging: false,
    initialMouseX: 0,
  });
  const { current: data } = ref;
  function calculateNewValue(mouseX) {
    if (!data.div) return 0;
    const deltaX = mouseX - data.initialMouseX;
    const deltaValue =
      (deltaX / data.div.parentElement.clientWidth) * props.total;
    return props.value + deltaValue;
  }

  const handleMouseDown = (event) => {
    if (!data.div) return;
    if (props.disabled) return;
    data.isDragging = true;
    data.initialMouseX = event.clientX;
  };
  const handleMouseMove = (event) => {
    if (!data.div) return;
    if (!data.isDragging) return;
    data.div.style.left = `${
      (calculateNewValue(event.clientX) / props.total) * 100
    }%`;
    event.stopPropagation();
    event.preventDefault();
  };

  const handleMouseUp = (event) => {
    if (!data.div) return;
    if (!data.isDragging) return;
    data.isDragging = false;
    props.onChange(calculateNewValue(event.clientX));
    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  return (
    <Box
      ref={(r) => {
        data.div = r;
      }}
      
      style={{
        left: (props.value / props.total) * 100 + "%",
        top: 0,
        bottom: 0,
        position: "absolute",
        height: 100,

        ...props.style,
      }}
      onMouseDown={handleMouseDown}
    >
      {props.children}
    </Box>
  );
}

export default DragableView;
