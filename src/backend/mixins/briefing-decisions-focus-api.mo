import Types "../types/briefing-decisions-focus";
import BriefingLib "../lib/briefing-decisions-focus";

mixin () {
  public query func getBriefing() : async Types.WarRoomBriefing {
    BriefingLib.getBriefing();
  };

  public query func getDecisions() : async [Types.Decision] {
    BriefingLib.getDecisions();
  };

  public query func getFocusMode() : async Types.FocusMode {
    BriefingLib.getFocusMode();
  };
};
