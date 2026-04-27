import Types "../types/briefing-decisions-focus";

module {
  public func getBriefing() : Types.WarRoomBriefing {
    {
      revenuePulse = {
        mrr = 48200;
        mrrChange = 3100;
        churnRate = 1.8;
        topCustomer = "Acme Corp";
      };
      topRisks = [
        {
          source = "Slack";
          text = "Backend deploy pipeline has been red for 18 hours — no one owns it";
          severity = #high;
        },
        {
          source = "Gmail";
          text = "Series A lead investor wants updated cap table by Friday";
          severity = #high;
        },
        {
          source = "Slack";
          text = "Two engineers mentioned burnout in #random this week";
          severity = #medium;
        },
      ];
      calendarConflicts = [
        {
          time = "10:00–11:00";
          title = "Investor Sync vs. Team Standup";
          participants = ["Sarah K.", "Marcus T.", "Priya R."];
        },
        {
          time = "14:00–15:00";
          title = "Design Review vs. Sales Demo Prep";
          participants = ["Jordan L.", "Casey M."];
        },
      ];
      uncomfortableQuestion = "You haven't spoken to a paying customer in 23 days — are you building what they actually need?";
    };
  };

  public func getDecisions() : [Types.Decision] {
    [
      {
        id = 1;
        source = #gmail;
        sender = "David Chen";
        senderAvatar = "DC";
        subject = "Re: Partnership proposal — need your call";
        snippet = "Hi, we've been waiting 10 days for a decision on the co-marketing terms. Can you confirm by EOD?";
        draftReply = "Hi David — thanks for following up. We're in, let's lock in the co-marketing terms this week. I'll have my team send over a signed copy by Thursday.";
        urgency = #high;
      },
      {
        id = 2;
        source = #slack;
        sender = "Priya R.";
        senderAvatar = "PR";
        subject = "Hire the contractor or promote internally?";
        snippet = "We need someone to own infra by next sprint. Raj is ready but wants a title bump. The contractor is available immediately but costs 2x.";
        draftReply = "Let's promote Raj — he knows the system and team morale matters right now. Draft the title change with a 15% bump and get it to me to approve.";
        urgency = #high;
      },
      {
        id = 3;
        source = #gmail;
        sender = "Notion Billing";
        senderAvatar = "NB";
        subject = "Your plan renews at $1,200 — confirm or downgrade";
        snippet = "Your annual Notion team plan renews in 3 days. You currently have 40 seats; usage shows 12 active in the last 30 days.";
        draftReply = "Please downgrade to 15 seats on the next renewal cycle. Remove inactive users and send me the updated invoice.";
        urgency = #medium;
      },
    ];
  };

  public func getFocusMode() : Types.FocusMode {
    {
      enabled = true;
      blockStart = "09:00";
      blockEnd = "12:00";
      priority = "Finish Series A deck — slide 8 through 14";
      meetingsToDecline = [
        {
          time = "09:30";
          title = "Weekly Vendor Sync";
          attendees = ["vendor@acme.io", "ops@acme.io"];
          declineMessage = "Thanks for the invite — I'm heads-down on a critical deadline this morning. Let's reconnect next week or async via email.";
        },
        {
          time = "11:00";
          title = "Optional: Product Guild";
          attendees = ["team@company.io"];
          declineMessage = "Going to skip this one to protect deep work time. Please share notes and tag me on anything that needs my input.";
        },
      ];
    };
  };
};
