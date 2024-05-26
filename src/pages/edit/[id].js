import { useDisclosure } from "@mantine/hooks";
import { Group } from "@mantine/core";
import DropBoxPopup from "@/components/dropbox_popup";

import { Editor } from "@/components/Editor";

function Edit() {
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <Group>
      <DropBoxPopup opened={opened} close={close}></DropBoxPopup>
      <Editor />
    </Group>
  );
}

export default Edit;
