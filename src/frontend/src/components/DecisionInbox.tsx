import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCheck, Hash, Mail, Send, Sparkles, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetDecisions } from "../hooks/useBackend";
import { useAppStore } from "../store";
import type { Decision } from "../types";

/* ── Source badge ─────────────────────────────────────────────── */
function SourceBadge({ source }: { source: Decision["source"] }) {
  if (source === "gmail") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[oklch(0.35_0.08_25/0.30)] text-[oklch(0.85_0.12_25)] border border-[oklch(0.55_0.12_25/0.40)]">
        <Mail className="w-3 h-3" />
        Gmail
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[oklch(0.35_0.1_260/0.30)] text-[oklch(0.80_0.10_260)] border border-[oklch(0.55_0.12_260/0.40)]">
      <Hash className="w-3 h-3" />
      Slack
    </span>
  );
}

/* ── Urgency badge ────────────────────────────────────────────── */
function UrgencyBadge({ urgency }: { urgency: Decision["urgency"] }) {
  if (urgency === "critical" || urgency === "high") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-primary/10 text-primary border border-primary/40 shadow-[0_0_8px_0_oklch(0.75_0.15_190/0.35)]">
        {urgency === "critical" ? "Critical" : "High"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-muted text-muted-foreground border border-border">
      Medium
    </span>
  );
}

/* ── Card skeleton ────────────────────────────────────────────── */
function DecisionSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="h-4 w-12 rounded-full" />
      </div>
      <Skeleton className="h-4 w-3/4 rounded" />
      <Skeleton className="h-3 w-full rounded" />
      <Skeleton className="h-3 w-5/6 rounded" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-28 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg ml-auto" />
      </div>
    </div>
  );
}

/* ── Single Decision card ─────────────────────────────────────── */
interface DecisionCardProps {
  decision: Decision;
  index: number;
  handled: boolean;
  onHandle: (id: string) => void;
}

function DecisionCard({
  decision,
  index,
  handled,
  onHandle,
}: DecisionCardProps) {
  const [autoReplyOpen, setAutoReplyOpen] = useState(false);
  const { openDelegateModal } = useAppStore();

  const draftText =
    decision.draftReply ??
    `Hi, thanks for reaching out. I've reviewed this and will follow up shortly. — ${decision.title}`;

  const handleDelegate = () => {
    openDelegateModal(
      decision.id,
      decision.title,
      `Hey @team, delegating this: "${decision.title}" from ${decision.source === "gmail" ? "Gmail" : "Slack"}. Can someone handle the reply? Draft: ${draftText}`,
    );
  };

  const isHighUrgency =
    decision.urgency === "critical" || decision.urgency === "high";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: handled ? 0.45 : 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.07,
        ease: [0.4, 0, 0.2, 1],
      }}
      data-ocid={`decisions.item.${index + 1}`}
      className={[
        "rounded-xl border bg-card overflow-hidden transition-smooth",
        handled ? "order-last" : "",
        isHighUrgency && !handled
          ? "border-primary/30 shadow-[0_0_12px_0_oklch(0.75_0.15_190/0.18)]"
          : "border-border",
      ].join(" ")}
    >
      <div className="p-4 space-y-3">
        {/* Header row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <SourceBadge source={decision.source} />
            <UrgencyBadge urgency={decision.urgency} />
          </div>
          {handled && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <CheckCheck className="w-3.5 h-3.5 text-primary" />
              Handled
            </span>
          )}
        </div>

        {/* Title + snippet */}
        <div
          className={
            handled ? "line-through decoration-muted-foreground/60" : ""
          }
        >
          <p className="text-sm font-semibold text-foreground font-display leading-snug">
            {decision.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {decision.context}
          </p>
        </div>

        {/* Actions */}
        {!handled && (
          <div className="flex items-center gap-2 flex-wrap pt-0.5">
            <Button
              size="sm"
              data-ocid={`decisions.handle_button.${index + 1}`}
              onClick={() => onHandle(decision.id)}
              className="h-7 px-3 text-xs bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-smooth font-semibold"
              variant="ghost"
            >
              <CheckCheck className="w-3.5 h-3.5 mr-1.5" />
              Handle it
            </Button>

            <Button
              size="sm"
              data-ocid={`decisions.auto_reply_button.${index + 1}`}
              onClick={() => setAutoReplyOpen((v) => !v)}
              className="h-7 px-3 text-xs bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-border/80 transition-smooth"
              variant="ghost"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Auto-reply
            </Button>

            <Button
              size="sm"
              data-ocid={`decisions.delegate_button.${index + 1}`}
              onClick={handleDelegate}
              className="h-7 px-3 text-xs bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-border/80 transition-smooth ml-auto"
              variant="ghost"
            >
              <Users className="w-3.5 h-3.5 mr-1.5" />
              Delegate
            </Button>
          </div>
        )}
      </div>

      {/* Auto-reply panel */}
      <AnimatePresence>
        {autoReplyOpen && !handled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
            data-ocid={`decisions.auto_reply_panel.${index + 1}`}
          >
            <div className="px-4 pb-4 pt-0 border-t border-border/60 mt-0 space-y-3">
              <p className="text-overline pt-3">AI-drafted reply</p>
              <div className="rounded-lg bg-secondary/80 border border-border/60 p-3 font-mono text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {draftText}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  data-ocid={`decisions.send_reply_button.${index + 1}`}
                  onClick={() => {
                    toast.success("Reply sent", {
                      description: decision.title,
                      duration: 4000,
                    });
                    setAutoReplyOpen(false);
                    onHandle(decision.id);
                  }}
                  className="h-7 px-3 text-xs bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Send Reply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  data-ocid={`decisions.close_reply_button.${index + 1}`}
                  onClick={() => setAutoReplyOpen(false)}
                  className="h-7 px-3 text-xs text-muted-foreground hover:text-foreground"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── DecisionInbox ────────────────────────────────────────────── */
export function DecisionInbox() {
  const { data: decisions, isLoading } = useGetDecisions();
  const [handledIds, setHandledIds] = useState<Set<string>>(new Set());

  const handleDecision = (id: string) => {
    setHandledIds((prev) => new Set([...prev, id]));
  };

  const sorted = decisions
    ? [
        ...decisions.filter((d) => !handledIds.has(d.id)),
        ...decisions.filter((d) => handledIds.has(d.id)),
      ]
    : [];

  return (
    <section data-ocid="decisions.section" className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-overline">Decisions</h2>
        {!isLoading && decisions && (
          <span className="text-xs text-muted-foreground font-mono">
            {decisions.length - handledIds.size}/{decisions.length} pending
          </span>
        )}
      </div>

      {/* Cards */}
      <div className="space-y-2">
        {isLoading ? (
          <>
            <DecisionSkeleton />
            <DecisionSkeleton />
            <DecisionSkeleton />
          </>
        ) : sorted.length === 0 ? (
          <div
            data-ocid="decisions.empty_state"
            className="rounded-xl border border-border bg-card p-8 text-center"
          >
            <CheckCheck className="w-8 h-8 text-primary mx-auto mb-2 opacity-60" />
            <p className="text-sm font-semibold text-foreground">All clear</p>
            <p className="text-xs text-muted-foreground mt-1">
              No decisions need your attention right now.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="sync">
            {sorted.map((decision, i) => (
              <DecisionCard
                key={decision.id}
                decision={decision}
                index={i}
                handled={handledIds.has(decision.id)}
                onHandle={handleDecision}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
