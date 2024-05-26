import {
  Modal,
  Button,
  Title,
  Center,
  Group,
  Text,
  rem,
  Box,
  useMantineTheme,
  Stack,
  Image,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import React from "react";
import { StoreContext } from "@/store";

function DropBoxPopup({ opened, close }) {
  const theme = useMantineTheme();
  const store = React.useContext(StoreContext);
  const handleFileChange = (files) => {
    const file = files?.[0];
    if (!file) return;
    store.addVideoResource(URL.createObjectURL(file));
  };

  return (
    <>
      <Modal opened={opened} onClose={close} radius={20} size="60%">
        <Dropzone
          onDrop={(files) => {
            handleFileChange(files);
            close();
          }}
          onReject={(files) => console.log("rejected files", files)}
          p="xl"
          pt={0}
        >
          <Dropzone.Idle>
            <Center>
              <Title order={2}>Lets make a video!</Title>
            </Center>
            <Stack
              justify="center"
              align="center"
              gap="4"
              mih={220}
              style={{
                pointerEvents: "none",
                background: "rgba(0,0,0,0.05)",
                border: "dashed lightgray",
                borderRadius: 8,
              }}
              my="xl"
            >
              <Box
                p={12}
                style={{
                  background: theme.colors.indigo[5],
                  borderRadius: "50%",
                  display: "flex",
                }}
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
                    stroke="white"
                    strokeWidth={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 12V21"
                    stroke="white"
                    strokeWidth={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5799 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6902 21.9435 10.7355 21.0667 10.0535C20.1899 9.3714 19.1109 9.00075 18 9.00001H16.74C16.4373 7.82926 15.8732 6.74235 15.09 5.82101C14.3067 4.89967 13.3249 4.16786 12.2181 3.68062C11.1114 3.19338 9.90856 2.96337 8.70012 3.0079C7.49169 3.05242 6.30907 3.37031 5.24118 3.93768C4.17329 4.50505 3.24792 5.30712 2.53463 6.2836C1.82134 7.26008 1.3387 8.38555 1.12299 9.57541C0.907276 10.7653 0.964111 11.9885 1.28922 13.1533C1.61433 14.318 2.19925 15.3939 3.00001 16.3"
                    stroke="white"
                    strokeWidth={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M16 16L12 12L8 16"
                    stroke="white"
                    strokeWidth={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </Box>
              <Text size="sm" fw={600}>
                Upload files
              </Text>
              <Group gap={6}>
                <Text
                  size="sm"
                  c={theme.colors.indigo[8]}
                  style={{ textDecoration: "underline" }}
                >
                  Choose files{" "}
                </Text>
                <Text size="sm"> or drag them here</Text>
              </Group>
            </Stack>

            <Group gap={"4%"}>
              <Button variant="default" size="md" h={80} radius={12} w="46%">
                <Group>
                  <Image w={126} src={"/recording-DCq298co.webp"}></Image>
                  <Text color={theme.black} size="sm" fw={700}>
                    Start by recording
                  </Text>
                </Group>
              </Button>
              <Button variant="default" size="md" h={80} radius={12} w="50%">
                <Group>
                  <Image w={126} src="/start_with_ai-BqlejP0t.webp"></Image>
                  <Text color={theme.black} size="sm" fw={700}>
                    Start with AI
                  </Text>
                </Group>
              </Button>
            </Group>
          </Dropzone.Idle>
          <Dropzone.Accept>
            <Stack
              align="center"
              justify="center"
              gap={4}
              h="56vh"
              style={{
                pointerEvents: "none",
                background: theme.colors.indigo[2],
                border: "dashed var(--mantine-color-indigo-6)",
                borderRadius: 8,
              }}
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
                  stroke={theme.colors.indigo[6]}
                  strokeWidth={2}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M12 12V21"
                  stroke={theme.colors.indigo[6]}
                  strokeWidth={2}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5799 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6902 21.9435 10.7355 21.0667 10.0535C20.1899 9.3714 19.1109 9.00075 18 9.00001H16.74C16.4373 7.82926 15.8732 6.74235 15.09 5.82101C14.3067 4.89967 13.3249 4.16786 12.2181 3.68062C11.1114 3.19338 9.90856 2.96337 8.70012 3.0079C7.49169 3.05242 6.30907 3.37031 5.24118 3.93768C4.17329 4.50505 3.24792 5.30712 2.53463 6.2836C1.82134 7.26008 1.3387 8.38555 1.12299 9.57541C0.907276 10.7653 0.964111 11.9885 1.28922 13.1533C1.61433 14.318 2.19925 15.3939 3.00001 16.3"
                  stroke={theme.colors.indigo[6]}
                  strokeWidth={2}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M16 16L12 12L8 16"
                  stroke={theme.colors.indigo[6]}
                  strokeWidth={2}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <Text size="md" fw={700} c={theme.colors.indigo[8]}>
                Drop your file here
              </Text>
            </Stack>
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
        </Dropzone>
      </Modal>
    </>
  );
}

export default DropBoxPopup;
