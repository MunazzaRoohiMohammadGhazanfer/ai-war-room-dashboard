import { useQuery } from "@tanstack/react-query";
import type { Decision, FocusMode, WarRoomBriefing } from "../types";

// Mock data for v1 — all integrations use mock data
const MOCK_BRIEFING: WarRoomBriefing = {
  id: "briefing-today",
  generatedAt: new Date().toISOString(),
  revenuePulse: {
    mrr: 48200,
    mrrChange: 12.4,
    newCustomers: 7,
    churnedCustomers: 1,
  },
  risks: [
    {
      id: "r1",
      source: "slack",
      title: "Deployment pipeline broken in staging",
      description:
        "#engineering: CI has been red for 18h — blocking Friday release. @devops needs unblocking.",
      severity: "high",
    },
    {
      id: "r2",
      source: "email",
      title: "Enterprise contract renewal at risk",
      description:
        "Acme Corp has not signed renewal. Legal flagged a clause. Decision needed before Friday.",
      severity: "high",
    },
    {
      id: "r3",
      source: "slack",
      title: "Head of Sales offsite next week",
      description:
        "#sales: Pipeline review moved — three key demos unowned. Coverage gap identified.",
      severity: "medium",
    },
  ],
  calendarConflicts: [
    {
      id: "c1",
      title: "Board prep / Investor sync",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      conflictWith: "Design review",
    },
    {
      id: "c2",
      title: "1:1 with CTO",
      startTime: "2:00 PM",
      endTime: "2:30 PM",
    },
  ],
  uncomfortableQuestion:
    "You haven't spoken to a paying customer in 19 days. Is the product still solving the right problem?",
};

const MOCK_DECISIONS: Decision[] = [
  {
    id: "d1",
    title: "Approve Series A pitch deck revisions?",
    context:
      "Your designer sent v7. Investors meet Thursday. Two board members flagged the traction slide needs updating with August numbers.",
    source: "gmail",
    urgency: "critical",
    autoDrafted: false,
  },
  {
    id: "d2",
    title: "Approve Team Paitter Deck revisions?",
    context:
      "How many key hires are we approving this quarter? Budget owner is waiting on headcount sign-off to finalize their media plan.",
    source: "slack",
    urgency: "high",
    autoDrafted: false,
  },
  {
    id: "d3",
    title: "Approve Revision to enterprise pricing?",
    context:
      "Sales wants to discount 20% to close Acme. This sets a precedent. Finance needs a decision by EOD.",
    source: "gmail",
    urgency: "high",
    draftReply:
      "Thanks for the context. I'd like to discuss this on our next call before committing to a discount. Can we schedule 15 min today?",
    autoDrafted: true,
  },
];

const MOCK_FOCUS_MODE: FocusMode = {
  enabled: false,
  currentBlock: {
    id: "fb1",
    title: "Product Strategy",
    startTime: "9:00 AM",
    endTime: "10:45 AM",
    duration: 105,
  },
  blockedMeetings: 3,
  nextAvailableSlot: "11:00 AM",
};

export function useGetBriefing() {
  return useQuery<WarRoomBriefing>({
    queryKey: ["briefing"],
    queryFn: async () => {
      // Simulate async fetch latency
      await new Promise((r) => setTimeout(r, 600));
      return MOCK_BRIEFING;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetDecisions() {
  return useQuery<Decision[]>({
    queryKey: ["decisions"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return MOCK_DECISIONS;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetFocusMode() {
  return useQuery<FocusMode>({
    queryKey: ["focusMode"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return MOCK_FOCUS_MODE;
    },
    staleTime: 60 * 1000,
  });
}
