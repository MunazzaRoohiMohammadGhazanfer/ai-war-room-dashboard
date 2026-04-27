import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "../store";
import type { DelegateModalState } from "../types";

const RECIPIENTS: DelegateModalState["recipient"][] = [
  "@team",
  "@engineering",
  "@marketing",
];

export function DelegateModal() {
  const {
    delegateModal,
    closeDelegateModal,
    setDelegateMessage,
    setDelegateRecipient,
  } = useAppStore();

  const handleSend = () => {
    toast.success(`Slack draft sent to ${delegateModal.recipient}`, {
      description: delegateModal.itemTitle,
      duration: 4000,
    });
    closeDelegateModal();
  };

  return (
    <Dialog
      open={delegateModal.open}
      onOpenChange={(open) => !open && closeDelegateModal()}
    >
      <DialogContent
        className="bg-card border-border max-w-lg"
        data-ocid="delegate.dialog"
      >
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg">💬</span>
              <DialogTitle className="font-display text-base font-semibold text-foreground truncate">
                Draft Slack message
              </DialogTitle>
            </div>
          </div>
          {delegateModal.itemTitle && (
            <p className="text-xs text-muted-foreground mt-1 truncate">
              Re: {delegateModal.itemTitle}
            </p>
          )}
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Recipient selector */}
          <div className="space-y-1.5">
            <Label className="text-overline">Send to</Label>
            <fieldset className="flex gap-2" aria-label="Recipient">
              {RECIPIENTS.map((r) => (
                <button
                  key={r}
                  type="button"
                  data-ocid={`delegate.recipient.${r.replace("@", "")}`}
                  onClick={() => setDelegateRecipient(r)}
                  className={[
                    "px-3 py-1.5 rounded-md text-sm font-mono transition-smooth border",
                    delegateModal.recipient === r
                      ? "bg-primary/15 border-primary/60 text-primary"
                      : "bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-border/80",
                  ].join(" ")}
                >
                  {r}
                </button>
              ))}
            </fieldset>
          </div>

          {/* Message editor */}
          <div className="space-y-1.5">
            <Label className="text-overline">Message</Label>
            <Textarea
              data-ocid="delegate.textarea"
              value={delegateModal.draftMessage}
              onChange={(e) => setDelegateMessage(e.target.value)}
              className="bg-secondary border-border text-foreground min-h-[120px] resize-none font-body text-sm leading-relaxed focus-visible:ring-primary/50"
              placeholder="Draft your message…"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button
            variant="ghost"
            data-ocid="delegate.cancel_button"
            onClick={closeDelegateModal}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5 mr-1.5" />
            Cancel
          </Button>
          <Button
            data-ocid="delegate.confirm_button"
            onClick={handleSend}
            disabled={!delegateModal.draftMessage.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            Send to Slack
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
