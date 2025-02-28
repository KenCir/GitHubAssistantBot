import { Context } from "probot";

export async function removeLabel(
  context: Context<any>,
  labelName: string
): Promise<void> {
  if (
    context.payload.issue.labels?.find((label: any) => label.name === labelName)
  ) {
    await context.octokit.issues.removeLabel(
      context.issue({ name: labelName })
    );
  }
}

export async function removeLabels(
  context: Context<any>,
  labelNames: Array<string>
): Promise<void> {
  labelNames.forEach(async (labelName) => {
    await removeLabel(context, labelName);
  });
}
