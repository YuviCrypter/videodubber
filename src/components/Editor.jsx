"use client";

import { fabric } from "fabric";
import React, { useEffect, useState } from "react";
import { StoreContext } from "../store";
import { observer } from "mobx-react";
import { TimeLine } from "./TimeLine";
import LeftNavbar from "./left_navbar";
import { Store } from "../store/Store";
import "../utils/fabric-utils";
import { Flex } from "@mantine/core";
import { Resources } from "./Resources";

export const EditorWithStore = () => {
  const [store] = useState(new Store());
  return (
    <StoreContext.Provider value={store}>
      <Editor></Editor>
    </StoreContext.Provider>
  );
};

export const Editor = observer(() => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      height: 500,
      width: 800,
      backgroundColor: "#ededed",
    });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#00a0f5";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerStrokeColor = "#0063d8";
    fabric.Object.prototype.cornerSize = 10;

    canvas.on("mouse:down", function (e) {
      if (!e.target) {
        store.setSelectedElement(null);
      }
    });

    store.setCanvas(canvas);
    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  }, []);
  return (
    <Flex flex={1}>
      <LeftNavbar />
      <Flex direction={"column"} flex={1} h={"100vh"}>
        <Flex flex={1}>
          <Resources />
          <Flex unselectable="on" flex={1} justify="center" align="center">
            <canvas id="canvas" height={500} width={800} />
          </Flex>
        </Flex>
        <TimeLine />
      </Flex>
    </Flex>
  );
});
