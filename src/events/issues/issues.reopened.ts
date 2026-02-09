import {
  addLabel,
  COMPLETED_LABEL,
  IN_PROGRESS_LABEL,
  INACTIVE_ABANDONED_LABEL,
  INACTIVE_DUPLICATE_LABEL,
  INACTIVE_INVALID_LABEL,
  removeLabels,
  TODO_LABEL,
} from "../../util/labels.js";
import { defineEvent } from "../index.js";

export default defineEvent({
  name: "issues.reopened",
  async execute(context) {
    if (context.payload.issue.assignee) {
      await addLabel(context, IN_PROGRESS_LABEL);
    } else {
      await addLabel(context, TODO_LABEL);
    }

    await removeLabels(context, [
      COMPLETED_LABEL,
      INACTIVE_INVALID_LABEL,
      INACTIVE_DUPLICATE_LABEL,
      INACTIVE_ABANDONED_LABEL,
    ]);
  },
});
