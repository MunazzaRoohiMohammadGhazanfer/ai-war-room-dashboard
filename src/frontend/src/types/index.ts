export interface RevenuePulse {
  mrr: number;
  mrrChange: number; // percentage delta vs last month
  newCustomers: number;
  churnedCustomers: number;
}

export interface RiskBlocker {
  id: string;
  source: "slack" | "email";
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}

export interface CalendarConflict {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  conflictWith?: string;
}

export interface WarRoomBriefing {
  id: string;
  generatedAt: string;
  revenuePulse: RevenuePulse;
  risks: RiskBlocker[];
  calendarConflicts: CalendarConflict[];
  uncomfortableQuestion: string;
}

export type DecisionAction = "approve" | "discuss" | "defer";

export interface Decision {
  id: string;
  title: string;
  context: string;
  source: "gmail" | "slack";
  urgency: "critical" | "high" | "medium";
  draftReply?: string;
  autoDrafted: boolean;
}

export interface FocusBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
}

export interface FocusMode {
  enabled: boolean;
  currentBlock?: FocusBlock;
  blockedMeetings: number;
  nextAvailableSlot: string;
}

export interface DelegateModalState {
  open: boolean;
  itemId: string | null;
  itemTitle: string;
  draftMessage: string;
  recipient: "@team" | "@engineering" | "@marketing";
}
