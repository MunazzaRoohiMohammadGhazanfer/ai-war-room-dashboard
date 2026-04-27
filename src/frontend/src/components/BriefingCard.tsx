import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  HelpCircle,
  Share2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { CalendarConflict, RiskBlocker, WarRoomBriefing } from "../types";

/* ── Helpers ─────────────────────────────────────── */

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning, founder.";
  if (h < 17) return "Good afternoon, founder.";
  return "Good evening, founder.";
}

function getTimeLabel() {
  const h = new Date().getHours();
  if (h < 8) return "Early start — your briefing is ready.";
  if (h < 10) return "Your daily briefing is ready.";
  if (h < 14) return "Mid-morning check-in.";
  return "Evening review mode.";
}

function formatMRR(n: number) {
  return `$${(n / 1000).toFixed(1)}k`;
}

/* ── Sub-badges ───────────────────────────────────── */

function SourceBadge({ source }: { source: RiskBlocker["source"] }) {
  return (
    <span
      className={[
        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider",
        source === "slack"
          ? "bg-primary/10 text-primary border border-primary/20"
          : "bg-muted/50 text-muted-foreground border border-border",
      ].join(" ")}
    >
      {source === "slack" ? "Slack" : "Email"}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: RiskBlocker["severity"] }) {
  const styles = {
    high: "bg-destructive/15 text-destructive border border-destructive/30",
    medium: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
    low: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
  };
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${styles[severity]}`}
    >
      {severity}
    </span>
  );
}

/* ── Section header (collapsible) ────────────────── */

interface SectionHeaderProps {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  onToggle: () => void;
  ocid: string;
  rightSlot?: React.ReactNode;
}

function SectionHeader({
  icon,
  label,
  open,
  onToggle,
  ocid,
  rightSlot,
}: SectionHeaderProps) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onToggle}
      className="flex w-full items-center justify-between py-2.5 text-left group"
      aria-expanded={open}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200 flex-shrink-0">
          {icon}
        </span>
        <span className="text-overline group-hover:text-foreground transition-colors duration-200">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {rightSlot}
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </div>
    </button>
  );
}

/* ── Skeleton loading state ───────────────────────── */

export function BriefingCardSkeleton() {
  return (
    <div
      className="rounded-xl border border-border bg-card p-5 space-y-4"
      data-ocid="briefing.loading_state"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 bg-secondary" />
          <Skeleton className="h-6 w-56 bg-secondary" />
          <Skeleton className="h-3 w-44 bg-secondary/60" />
        </div>
        <Skeleton className="h-8 w-24 bg-secondary" />
      </div>
      <div className="space-y-2.5 pt-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border-t border-border pt-2.5 space-y-1.5">
            <Skeleton className="h-3 w-28 bg-secondary/70" />
            <Skeleton className="h-4 w-full bg-secondary/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main BriefingCard ────────────────────────────── */

interface BriefingCardProps {
  briefing: WarRoomBriefing;
  onDelegate: () => void;
}

export function BriefingCard({ briefing, onDelegate }: BriefingCardProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    revenue: true,
    risks: true,
    calendar: false,
    question: true,
  });

  const toggle = (key: string) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const { revenuePulse, risks, calendarConflicts, uncomfortableQuestion } =
    briefing;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-xl border border-border bg-card overflow-hidden"
      data-ocid="briefing.card"
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-overline mb-1">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="font-display font-bold text-xl text-foreground tracking-tight leading-tight">
              {getGreeting()}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {getTimeLabel()}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            data-ocid="briefing.delegate_button"
            onClick={onDelegate}
            className="flex-shrink-0 border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-smooth text-xs gap-1.5 h-8"
          >
            <Share2 className="w-3 h-3" />
            Delegate
          </Button>
        </div>
      </div>

      {/* Collapsible sections */}
      <div className="px-5 divide-y divide-border">
        {/* Revenue Pulse */}
        <div>
          <SectionHeader
            icon={<TrendingUp className="w-3.5 h-3.5" />}
            label="Revenue Pulse"
            open={openSections.revenue}
            onToggle={() => toggle("revenue")}
            ocid="briefing.revenue.toggle"
            rightSlot={
              <span className="font-mono text-xs text-foreground font-semibold">
                {formatMRR(revenuePulse.mrr)} MRR
              </span>
            }
          />
          <AnimatePresence initial={false}>
            {openSections.revenue && (
              <motion.div
                key="revenue"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="pb-4 space-y-3"
                  data-ocid="briefing.revenue.section"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <RevenueMetric
                      label="MRR"
                      value={formatMRR(revenuePulse.mrr)}
                      mono
                    />
                    <RevenueMetric
                      label="MRR Change"
                      value={`${revenuePulse.mrrChange > 0 ? "+" : ""}${revenuePulse.mrrChange}%`}
                      positive={revenuePulse.mrrChange > 0}
                      mono
                    />
                    <RevenueMetric
                      label="New customers"
                      value={`+${revenuePulse.newCustomers}`}
                      positive
                      mono
                    />
                    <RevenueMetric
                      label="Churned"
                      value={`−${revenuePulse.churnedCustomers}`}
                      positive={false}
                      mono
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {revenuePulse.mrrChange > 0 ? (
                      <TrendingUp className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-destructive flex-shrink-0" />
                    )}
                    <p className="text-xs text-muted-foreground">
                      Top customer:{" "}
                      <span className="text-foreground font-medium">
                        Acme Corp
                      </span>{" "}
                      — $8,400/mo
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top Risks */}
        <div>
          <SectionHeader
            icon={<AlertTriangle className="w-3.5 h-3.5" />}
            label="Top Risks"
            open={openSections.risks}
            onToggle={() => toggle("risks")}
            ocid="briefing.risks.toggle"
            rightSlot={
              <Badge
                variant="destructive"
                className="text-[10px] px-1.5 py-0 h-4 font-semibold"
              >
                {risks.filter((r) => r.severity === "high").length} high
              </Badge>
            }
          />
          <AnimatePresence initial={false}>
            {openSections.risks && (
              <motion.div
                key="risks"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="pb-4 space-y-2.5"
                  data-ocid="briefing.risks.section"
                >
                  {risks.map((risk, i) => (
                    <RiskItem key={risk.id} risk={risk} index={i + 1} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Calendar Conflicts */}
        <div>
          <SectionHeader
            icon={<Calendar className="w-3.5 h-3.5" />}
            label="Calendar Conflicts"
            open={openSections.calendar}
            onToggle={() => toggle("calendar")}
            ocid="briefing.calendar.toggle"
            rightSlot={
              calendarConflicts.length > 0 ? (
                <span className="text-[10px] font-mono text-amber-400">
                  {calendarConflicts.length} conflict
                  {calendarConflicts.length > 1 ? "s" : ""}
                </span>
              ) : undefined
            }
          />
          <AnimatePresence initial={false}>
            {openSections.calendar && (
              <motion.div
                key="calendar"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="pb-4 space-y-2"
                  data-ocid="briefing.calendar.section"
                >
                  {calendarConflicts.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      No conflicts today.
                    </p>
                  ) : (
                    calendarConflicts.map((event, i) => (
                      <ConflictItem
                        key={event.id}
                        event={event}
                        index={i + 1}
                      />
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Uncomfortable Question */}
        <div>
          <SectionHeader
            icon={<HelpCircle className="w-3.5 h-3.5" />}
            label="Uncomfortable Question"
            open={openSections.question}
            onToggle={() => toggle("question")}
            ocid="briefing.question.toggle"
          />
          <AnimatePresence initial={false}>
            {openSections.question && (
              <motion.div
                key="question"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-5" data-ocid="briefing.question.section">
                  <p className="text-sm font-display font-semibold text-foreground leading-snug border-l-2 border-primary/60 pl-3 py-0.5">
                    {uncomfortableQuestion}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Small sub-components ─────────────────────────── */

function RevenueMetric({
  label,
  value,
  positive,
  mono,
}: {
  label: string;
  value: string;
  positive?: boolean;
  mono?: boolean;
}) {
  const valueColor =
    positive === undefined
      ? "text-foreground"
      : positive
        ? "text-emerald-400"
        : "text-destructive";

  return (
    <div className="bg-secondary/60 rounded-lg px-3 py-2.5">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>
      <p
        className={`text-sm font-bold ${mono ? "font-mono" : "font-display"} ${valueColor}`}
      >
        {value}
      </p>
    </div>
  );
}

function RiskItem({ risk, index }: { risk: RiskBlocker; index: number }) {
  return (
    <div
      className="flex gap-3 p-3 rounded-lg bg-secondary/40 border border-border/60 hover:border-border transition-colors duration-200"
      data-ocid={`briefing.risk.item.${index}`}
    >
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <SourceBadge source={risk.source} />
          <SeverityBadge severity={risk.severity} />
        </div>
        <p className="text-sm font-medium text-foreground leading-tight">
          {risk.title}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {risk.description}
        </p>
      </div>
    </div>
  );
}

function ConflictItem({
  event,
  index,
}: { event: CalendarConflict; index: number }) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40 border border-border/60"
      data-ocid={`briefing.conflict.item.${index}`}
    >
      <div className="flex-shrink-0 text-center min-w-[48px]">
        <p className="text-[10px] font-mono text-muted-foreground">
          {event.startTime}
        </p>
        <p className="text-[9px] font-mono text-muted-foreground/60">
          –{event.endTime}
        </p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-tight truncate">
          {event.title}
        </p>
        {event.conflictWith && (
          <p className="text-xs text-amber-400/80 mt-0.5 truncate">
            ⚠ Conflicts with: {event.conflictWith}
          </p>
        )}
      </div>
    </div>
  );
}
