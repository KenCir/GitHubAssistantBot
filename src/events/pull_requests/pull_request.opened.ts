import {
  addLabel,
  IN_PROGRESS_LABEL,
  removeAllStatusLabels,
} from "../../util/pullRequestLabels.js";
import { defineEvent } from "../index.js";

export default defineEvent({
  name: "pull_request.opened",
  async execute(context) {
    await removeAllStatusLabels(context);
    await addLabel(context, IN_PROGRESS_LABEL);
  },
});
