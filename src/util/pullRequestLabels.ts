import type { Context } from 'probot';

export const IN_PROGRESS_LABEL = 'PR: In Progress';
export const REVIEW_LABEL = 'PR: Review';
export const READY_LABEL = 'PR: Ready';
export const CHANGES_REQUESTED_LABEL = 'PR: Changes Requested';
export const BLOCKED_LABEL = 'PR: Blocked';
export const MERGED_LABEL = 'PR: Merged';
export const DRAFT_LABEL = 'PR: Draft';

export async function addLabel(context: Context<'pull_request'>, labelName: string) {
	await context.octokit.rest.issues.addLabels(context.issue({ labels: [labelName] }));
}

export async function addLabels(context: Context<'pull_request'>, labelNames: string[]): Promise<void> {
	await context.octokit.rest.issues.addLabels(context.issue({ labels: labelNames }));
}

export async function removeLabel(context: Context<'pull_request'>, labelName: string): Promise<void> {
	if (context.payload.pull_request.labels?.find((label: any) => label.name === labelName)) {
		await context.octokit.rest.issues.removeLabel(context.issue({ name: labelName }));
	}
}

export async function removeLabels(context: Context<'pull_request'>, labelNames: string[]): Promise<void> {
	for (const labelName of labelNames) {
		await removeLabel(context, labelName);
	}
}

export async function removeAllStatusLabels(context: Context<'pull_request'>): Promise<void> {
	const statusLabels = [
		IN_PROGRESS_LABEL,
		REVIEW_LABEL,
		READY_LABEL,
		CHANGES_REQUESTED_LABEL,
		BLOCKED_LABEL,
		MERGED_LABEL,
		DRAFT_LABEL,
	];
	await removeLabels(context, statusLabels);
}
