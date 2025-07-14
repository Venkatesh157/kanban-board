"use client";
import React, { ReactNode, useState } from "react";
import { Button, Dialog, DialogTrigger, Portal } from "@chakra-ui/react";

type Props = {
  triggerLabel: () => ReactNode;
  title: string;
  children: ReactNode;
  onSubmit: () => void;
};

const BoardModal = ({ triggerLabel, title, children, onSubmit }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
      <DialogTrigger asChild>{triggerLabel()}</DialogTrigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">{children}</Dialog.Body>
            <Dialog.Footer>
              <Button variant="ghost" onClick={() => setOpen(false)} mr={3}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  onSubmit();
                  setOpen(false);
                }}
              >
                Save
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default BoardModal;
