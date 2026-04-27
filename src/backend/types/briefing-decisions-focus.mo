module {
  // --- Briefing types ---

  public type RevenuePulse = {
    mrr : Nat;
    mrrChange : Int;
    churnRate : Float;
    topCustomer : Text;
  };

  public type RiskSeverity = { #high; #medium; #low };

  public type RiskItem = {
    source : Text;
    text : Text;
    severity : RiskSeverity;
  };

  public type CalendarConflict = {
    time : Text;
    title : Text;
    participants : [Text];
  };

  public type WarRoomBriefing = {
    revenuePulse : RevenuePulse;
    topRisks : [RiskItem];
    calendarConflicts : [CalendarConflict];
    uncomfortableQuestion : Text;
  };

  // --- Decision types ---

  public type DecisionSource = { #gmail; #slack };

  public type DecisionUrgency = { #high; #medium };

  public type Decision = {
    id : Nat;
    source : DecisionSource;
    sender : Text;
    senderAvatar : Text;
    subject : Text;
    snippet : Text;
    draftReply : Text;
    urgency : DecisionUrgency;
  };

  // --- Focus Mode types ---

  public type MeetingToDecline = {
    time : Text;
    title : Text;
    attendees : [Text];
    declineMessage : Text;
  };

  public type FocusMode = {
    enabled : Bool;
    blockStart : Text;
    blockEnd : Text;
    priority : Text;
    meetingsToDecline : [MeetingToDecline];
  };
};
