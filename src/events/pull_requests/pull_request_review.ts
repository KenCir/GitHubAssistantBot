import {
  addLabel,
  CHANGES_REQUESTED_LABEL,
  READY_LABEL,
  removeAllStatusLabels,
} from "../../util/pullRequestLabels.js";
import { defineEvent } from "../index.js";

export default defineEvent({
  name: "pull_request_review",
  async execute(context) {
    const reviewState = context.payload.review.state;
    if (reviewState === "approved") {
      await removeAllStatusLabels(context);
      await addLabel(context, READY_LABEL);
    } else if (reviewState === "changes_requested") {
      await removeAllStatusLabels(context);
      await addLabel(context, CHANGES_REQUESTED_LABEL);
    }
  },
});
