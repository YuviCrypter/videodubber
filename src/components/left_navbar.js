"use client";

import React from "react";
import {
  Center,
  UnstyledButton,
  Stack,
  rem,
  Text,
  Box,
  ScrollArea,
} from "@mantine/core";
import {
  IconMenu2,
  IconSearch,
  IconSettings2,
  IconPlus,
  IconMusic,
  IconArticle,
  IconLetterT,
  IconSticker,
  IconVideo,
  IconQuestionMark,
  IconColorFilter,
  IconTransitionRight,
} from "@tabler/icons-react";
import classes from "../styles/Navbar.module.css";

import { StoreContext } from "@/store";
import { observer } from "mobx-react";

function NavbarLink({ icon: Icon, label, active, onClick, style }) {
  return (
    <UnstyledButton onClick={onClick} mx={16} my={8}>
      <Center>
        <Stack gap={0} justify="center" align="center">
          <Box
            p={8}
            className={classes.linkWrapper}
            data-active={active || undefined}
          >
            <Box
              p={4}
              w={"fit-content"}
              className={classes.link}
              data-active={active || undefined}
              style={style}
            >
              <Icon style={{ width: rem(20), height: rem(20) }} stroke={2} />
            </Box>
          </Box>
          <Text ta={"center"} size="xs">
            {label}
          </Text>
        </Stack>
      </Center>
    </UnstyledButton>
  );
}

const mockdata = [
  {
    icon: IconSearch,
    label: "Search",
    action: (store) => {
      store.setSelectedMenuOption("Search");
    },
  },
  {
    icon: IconSettings2,
    label: "Settings",
    action: (store) => {
      store.setSelectedMenuOption("Settings");
    },
  },
  {
    icon: IconPlus,
    label: "Media",
    action: (store) => {
      store.setSelectedMenuOption("Media");
    },
  },
  {
    icon: IconMusic,
    label: "Audio",
    action: (store) => {
      store.setSelectedMenuOption("Audio");
    },
  },
  {
    icon: IconArticle,
    label: "Subtitles",
    action: (store) => {
      store.setSelectedMenuOption("Subtitles");
    },
  },
  {
    icon: IconLetterT,
    label: "Text",
    action: (store) => {
      store.setSelectedMenuOption("Text");
    },
  },
  {
    icon: IconSticker,
    label: "Elements",
    action: (store) => {
      store.setSelectedMenuOption("Elements");
    },
  },
  {
    icon: IconVideo,
    label: "Record",
    action: (store) => {
      store.setSelectedMenuOption("Record");
    },
  },
  {
    icon: IconTransitionRight,
    label: "Transitions",
    action: (store) => {
      store.setSelectedMenuOption("Transitions");
    },
  },
  {
    icon: IconColorFilter,
    label: "Filters",
    action: (store) => {
      store.setSelectedMenuOption("Filters");
    },
  },
];

const LeftNavbar = observer(() => {
  const store = React.useContext(StoreContext);

  const links = mockdata.map((link, index) => {
    const isSelected = store.selectedMenuOption === link.label;
    return (
      <NavbarLink
        {...link}
        key={link.label}
        active={isSelected}
        onClick={() => link.action(store)}
      />
    );
  });

  return (
    <ScrollArea
      h={"100vh"}
      gap={0}
      style={{ borderRight: "1px solid var(--mantine-color-gray-3)" }}
    >
      <Center my={16}>
        <IconMenu2 type="mark" size={16} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0} my={8}>
        <NavbarLink icon={IconQuestionMark} style={{ borderRadius: "50%" }} />
      </Stack>
    </ScrollArea>
  );
});

export default LeftNavbar;
