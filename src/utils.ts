import { Context } from "probot";

export async function removeLabel(
  context: Context<"issues">,
  labelName: string
): Promise<void> {
  if (
    context.payload.issue.labels?.find((label: any) => label.name === labelName)
  ) {
    await context.octokit.rest.issues.removeLabel(
      context.issue({ name: labelName })
    );
  }
}

export async function removeLabels(
  context: Context<"issues">,
  labelNames: Array<string>
): Promise<void> {
  labelNames.forEach(async (labelName) => {
    await removeLabel(context, labelName);
  });
}
