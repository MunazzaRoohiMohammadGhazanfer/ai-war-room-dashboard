import { motion } from "motion/react";
import { BriefingCard, BriefingCardSkeleton } from "../components/BriefingCard";
import { useGetBriefing } from "../hooks/useBackend";
import { useAppStore } from "../store";

export function WarRoom() {
  const { data: briefing, isLoading, isError } = useGetBriefing();
  const { openDelegateModal } = useAppStore();

  const handleDelegate = () => {
    if (!briefing) return;
    const { revenuePulse, risks } = briefing;
    const topRisk = risks[0];
    const dateStr = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    const mrrStr = `$${(revenuePulse.mrr / 1000).toFixed(1)}k (${revenuePulse.mrrChange > 0 ? "+" : ""}${revenuePulse.mrrChange}% MoM)`;
    const highCount = risks.filter((r) => r.severity === "high").length;
    const draft = [
      `📋 *War Room Briefing — ${dateStr}*`,
      "",
      `• MRR: ${mrrStr}`,
      topRisk ? `• Top risk: ${topRisk.title}` : null,
      `• ${highCount} high-severity issues need attention today.`,
      "",
      "Who can pick this up?",
    ]
      .filter(Boolean)
      .join("\n");

    openDelegateModal("briefing-today", "War Room Briefing", draft);
  };

  return (
    <div className="space-y-8" data-ocid="warroom.page">
      {/* Page title */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
          War Room
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Your AI chief of staff. Only what matters.
        </p>
      </motion.div>

      {/* Briefing card */}
      {isLoading && <BriefingCardSkeleton />}

      {isError && (
        <div
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-6 text-center"
          data-ocid="briefing.error_state"
        >
          <p className="text-sm font-medium text-destructive">
            Failed to load briefing
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Check your connection and refresh the page.
          </p>
        </div>
      )}

      {briefing && !isLoading && (
        <BriefingCard briefing={briefing} onDelegate={handleDelegate} />
      )}
    </div>
  );
}
