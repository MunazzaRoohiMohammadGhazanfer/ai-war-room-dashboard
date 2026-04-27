import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CalendarConflict {
    title: string;
    participants: Array<string>;
    time: string;
}
export interface RiskItem {
    source: string;
    text: string;
    severity: RiskSeverity;
}
export interface FocusMode {
    blockEnd: string;
    meetingsToDecline: Array<MeetingToDecline>;
    blockStart: string;
    enabled: boolean;
    priority: string;
}
export interface Decision {
    id: bigint;
    draftReply: string;
    urgency: DecisionUrgency;
    subject: string;
    source: DecisionSource;
    snippet: string;
    sender: string;
    senderAvatar: string;
}
export interface WarRoomBriefing {
    calendarConflicts: Array<CalendarConflict>;
    topRisks: Array<RiskItem>;
    uncomfortableQuestion: string;
    revenuePulse: RevenuePulse;
}
export interface RevenuePulse {
    mrr: bigint;
    topCustomer: string;
    mrrChange: bigint;
    churnRate: number;
}
export interface MeetingToDecline {
    title: string;
    time: string;
    attendees: Array<string>;
    declineMessage: string;
}
export enum DecisionSource {
    slack = "slack",
    gmail = "gmail"
}
export enum DecisionUrgency {
    high = "high",
    medium = "medium"
}
export enum RiskSeverity {
    low = "low",
    high = "high",
    medium = "medium"
}
export interface backendInterface {
    getBriefing(): Promise<WarRoomBriefing>;
    getDecisions(): Promise<Array<Decision>>;
    getFocusMode(): Promise<FocusMode>;
}
