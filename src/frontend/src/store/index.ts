import { create } from "zustand";
import type { DelegateModalState } from "../types";

interface AppStore {
  // Focus mode toggle
  focusModeEnabled: boolean;
  setFocusModeEnabled: (enabled: boolean) => void;
  toggleFocusMode: () => void;

  // Delegate modal
  delegateModal: DelegateModalState;
  openDelegateModal: (
    itemId: string,
    itemTitle: string,
    draftMessage?: string,
  ) => void;
  closeDelegateModal: () => void;
  setDelegateMessage: (message: string) => void;
  setDelegateRecipient: (recipient: DelegateModalState["recipient"]) => void;
}

const DEFAULT_DELEGATE_MODAL: DelegateModalState = {
  open: false,
  itemId: null,
  itemTitle: "",
  draftMessage: "",
  recipient: "@team",
};

export const useAppStore = create<AppStore>((set) => ({
  focusModeEnabled: false,
  setFocusModeEnabled: (enabled) => set({ focusModeEnabled: enabled }),
  toggleFocusMode: () =>
    set((state) => ({ focusModeEnabled: !state.focusModeEnabled })),

  delegateModal: DEFAULT_DELEGATE_MODAL,
  openDelegateModal: (itemId, itemTitle, draftMessage = "") =>
    set({
      delegateModal: {
        open: true,
        itemId,
        itemTitle,
        draftMessage:
          draftMessage || `Hey team, can someone handle this? → "${itemTitle}"`,
        recipient: "@team",
      },
    }),
  closeDelegateModal: () => set({ delegateModal: DEFAULT_DELEGATE_MODAL }),
  setDelegateMessage: (message) =>
    set((state) => ({
      delegateModal: { ...state.delegateModal, draftMessage: message },
    })),
  setDelegateRecipient: (recipient) =>
    set((state) => ({
      delegateModal: { ...state.delegateModal, recipient },
    })),
}));
