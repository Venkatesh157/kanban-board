"use client";

import React, {
  ReactNode,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { Button, Dialog, DialogTrigger, Portal } from "@chakra-ui/react";

export interface BoardModalRef {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

type Props = {
  triggerLabel: () => ReactNode;
  title: string;
  children: ReactNode;
  onSubmit?: (() => void) | null;
};

const BoardModal = forwardRef<BoardModalRef, Props>(
  ({ triggerLabel, title, children, onSubmit }, ref) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    useImperativeHandle(
      ref,
      () => ({
        onOpen,
        onClose,
        isOpen: open,
      }),
      [open]
    );

    return (
      <Dialog.Root
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
        placement="center"
        size="lg"
      >
        <DialogTrigger asChild>{triggerLabel()}</DialogTrigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content padding="40px">
              <Dialog.Header>
                <Dialog.Title as="h2" mb="20px">
                  {title}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">{children}</Dialog.Body>
              {!onSubmit ? null : (
                <Dialog.Footer>
                  <Button variant="ghost" onClick={onClose} mr={3}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      onSubmit();
                      onClose();
                    }}
                  >
                    Save
                  </Button>
                </Dialog.Footer>
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }
);

BoardModal.displayName = "BoardModal";
export default BoardModal;
