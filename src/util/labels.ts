import { Context } from "probot";

export const TODO_LABEL = "Status: Todo";
export const IN_PROGRESS_LABEL = "Status: In Progress";
export const COMPLETED_LABEL = "Status: Completed";
export const BLOCKED_LABEL = "Status: Blocked";
export const INACTIVE_INVALID_LABEL = "Status: Inactive(Invalid)";
export const INACTIVE_DUPLICATE_LABEL = "Status: Inactive(Duplicate)";
export const INACTIVE_ABANDONED_LABEL = "Status: Inactive(Abandoned)";

export async function addLabel(context: Context<"issues">, labelName: string) {
  await context.octokit.rest.issues.addLabels(
    context.issue({ labels: [labelName] }),
  );
}

export async function addLabels(
  context: Context<"issues">,
  labelNames: Array<string>,
): Promise<void> {
  await context.octokit.rest.issues.addLabels(
    context.issue({ labels: labelNames }),
  );
}

export async function removeLabel(
  context: Context<"issues">,
  labelName: string,
): Promise<void> {
  if (
    context.payload.issue.labels?.find((label: any) => label.name === labelName)
  ) {
    await context.octokit.rest.issues.removeLabel(
      context.issue({ name: labelName }),
    );
  }
}

export async function removeLabels(
  context: Context<"issues">,
  labelNames: Array<string>,
): Promise<void> {
  labelNames.forEach(async (labelName) => {
    await removeLabel(context, labelName);
  });
}
