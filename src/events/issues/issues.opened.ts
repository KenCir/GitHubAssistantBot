import { addLabel, TODO_LABEL } from "../../util/labels.js";
import { defineEvent } from "../index.js";

export default defineEvent({
  name: "issues.opened",
  async execute(context) {
    if (!context.payload.issue.assignee) {
      await addLabel(context, TODO_LABEL);
    }
  },
});
