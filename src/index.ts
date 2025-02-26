import { Probot } from "probot";
import { removeLabels } from "./utils.js";

const todoLabel = "Status: Todo";
const inProgressLabel = "Status: In Progress";
const completedLabel = "Status: Completed";
const blockedLabel = "Status: Blocked";
const inactiveInvalidLabel = "Status: Inactive(Invalid)";
const inactiveDuplicateLabel = "Status: Inactive(Duplicate)";
const inactiveAbandonedLabel = "Status: Inactive(Abandoned)";

export default (app: Probot) => {
  app.onError(async (error) => {
    app.log.error(error);
  });

  app.on("issues.opened", async (context) => {
    if (!context.payload.issue.assignee) {
      context.octokit.issues.addLabels(context.issue({ labels: [todoLabel] }));
    }
  });

  app.on("issues.reopened", async (context) => {
    if (context.payload.issue.assignee) {
      context.octokit.issues.addLabels(
        context.issue({ labels: [inProgressLabel] })
      );
    } else {
      context.octokit.issues.addLabels(context.issue({ labels: [todoLabel] }));
    }

    removeLabels(context, [
      completedLabel,
      inactiveInvalidLabel,
      inactiveDuplicateLabel,
      inactiveAbandonedLabel,
    ]);
  });

  app.on("issues.assigned", async (context) => {
    if (context.payload.issue.state === "closed") return;

    context.octokit.issues.addLabels(
      context.issue({ labels: [inProgressLabel] })
    );
    removeLabels(context, [todoLabel, blockedLabel]);
  });

  app.on("issues.unassigned", async (context) => {
    if (context.payload.issue.state === "closed") return;

    context.octokit.issues.addLabels(context.issue({ labels: [todoLabel] }));
    removeLabels(context, [inProgressLabel]);
  });

  app.on("issues.closed", async (context) => {
    if (context.payload.issue.state_reason === "not_planned") {
      context.octokit.issues.addLabels(
        context.issue({ labels: [inactiveAbandonedLabel] })
      );
    } else if (context.payload.issue.state_reason === "duplicate") {
      context.octokit.issues.addLabels(
        context.issue({ labels: [inactiveDuplicateLabel] })
      );
    } else {
      context.octokit.issues.addLabels(
        context.issue({ labels: [completedLabel] })
      );
    }

    removeLabels(context, [todoLabel, inProgressLabel, blockedLabel]);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
