import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Clock, Send, Users } from "lucide-react";
import { useGetFocusMode } from "../hooks/useBackend";
import { useAppStore } from "../store";

// Meetings that would be auto-declined during a focus block
const AUTO_DECLINED_MEETINGS = [
  {
    id: "m1",
    time: "2:30 PM",
    title: "Weekly Status Sync",
    attendees: 8,
    declineMessage:
      "Thanks for the invite — I'm in a deep work block until 4:00 PM. I've reviewed the agenda and the team is well-equipped to move this forward without me. I'll catch up on notes afterwards.",
  },
  {
    id: "m2",
    time: "3:15 PM",
    title: "Vendor Demo: Analytics Platform",
    attendees: 4,
    declineMessage:
      "Appreciate the time, but I'm protecting this block for high-leverage work. Please connect with our Head of Ops — they have full context and decision authority here.",
  },
  {
    id: "m3",
    time: "3:45 PM",
    title: "Cross-team Process Review",
    attendees: 6,
    declineMessage:
      "I'm blocked for focus work right now. My EA has flagged this as low-urgency for my attendance — happy to review any action items after 4:00 PM.",
  },
];

export function FocusMode() {
  const { data, isLoading } = useGetFocusMode();
  const { focusModeEnabled, setFocusModeEnabled, openDelegateModal } =
    useAppStore();

  if (isLoading) {
    return (
      <section
        data-ocid="focus_mode.card"
        className="rounded-xl border border-border bg-card p-5 space-y-4"
      >
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <Skeleton className="h-14 w-full rounded-lg" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-20 w-full rounded-lg"
              data-ocid={`focus_mode.loading_state.${i}`}
            />
          ))}
        </div>
      </section>
    );
  }

  const block = data?.currentBlock;
  const blockStart = block?.startTime ?? "2:00 PM";
  const blockEnd = block?.endTime ?? "4:00 PM";
  const priority = block?.title ?? "Deep Work";

  const handleDelegate = () => {
    openDelegateModal(
      "focus-mode",
      "Focus Mode",
      `Heads up @team — I'm in focus mode from ${blockStart} to ${blockEnd}. Protecting this time for ${priority}. Will be back after.`,
    );
  };

  return (
    <section
      data-ocid="focus_mode.card"
      className={`rounded-xl border border-border bg-card p-5 space-y-4 transition-smooth ${
        !focusModeEnabled ? "opacity-60" : "opacity-100"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-display text-sm text-foreground tracking-tight">
          Focus Mode
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-3 text-xs gap-1.5 border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-smooth"
          onClick={handleDelegate}
          data-ocid="focus_mode.delegate_button"
        >
          <Send className="w-3 h-3" />
          Delegate
        </Button>
      </div>

      {/* Focus Block pill */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {priority}
            </p>
            <p className="text-xs text-muted-foreground">
              {blockStart} – {blockEnd}
            </p>
          </div>
        </div>
        <span className="text-overline text-primary shrink-0 ml-3">
          Focus Block
        </span>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="focus-toggle"
          className="text-sm text-muted-foreground cursor-pointer select-none"
        >
          Auto-decline low-leverage meetings
        </label>
        <SwitchPrimitive.Root
          id="focus-toggle"
          checked={focusModeEnabled}
          onCheckedChange={setFocusModeEnabled}
          data-ocid="focus_mode.toggle"
          className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent
            bg-muted data-[state=checked]:bg-primary transition-colors duration-200 focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <SwitchPrimitive.Thumb
            className="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-sm
              translate-x-0 data-[state=checked]:translate-x-4 transition-transform duration-200"
          />
        </SwitchPrimitive.Root>
      </div>

      {/* Meetings to be declined */}
      <div
        className="space-y-2.5"
        data-ocid="focus_mode.declined_meetings.list"
      >
        <p className="text-overline">Would auto-decline</p>
        {AUTO_DECLINED_MEETINGS.map((meeting, index) => (
          <div
            key={meeting.id}
            data-ocid={`focus_mode.declined_meetings.item.${index + 1}`}
            className="rounded-lg border border-border bg-background/60 p-3 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {meeting.title}
                </p>
                <div className="flex items-center gap-2.5 mt-0.5">
                  <span className="text-xs text-muted-foreground font-mono">
                    {meeting.time}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    {meeting.attendees}
                  </span>
                </div>
              </div>
            </div>
            {/* AI decline message */}
            <blockquote className="border-l-2 border-primary/30 pl-3 text-xs text-muted-foreground leading-relaxed italic">
              {meeting.declineMessage}
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
