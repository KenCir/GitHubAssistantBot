import { Context } from "probot";

export function removeLabel(context: Context<any>, labelName: string) {
  if (
    context.payload.issue.labels?.find((label: any) => label.name === labelName)
  ) {
    context.octokit.issues.removeLabel(context.issue({ name: labelName }));
  }
}

export function removeLabels(context: Context<any>, labelNames: Array<string>) {
  labelNames.forEach((labelName) => {
    removeLabel(context, labelName);
  });
}
