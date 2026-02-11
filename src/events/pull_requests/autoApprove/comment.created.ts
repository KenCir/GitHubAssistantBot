import { defineEvent } from '../../index.js';

export default defineEvent({
	name: 'issue_comment.created',
	async execute(context) {
		if (!context.payload.issue.pull_request) return;

		const comment = context.payload.comment;
		if (comment?.body?.trim() !== '/approve' || comment.user?.login !== 'KenCir') return;

		const pullNumber = context.payload.issue.number;

		const { data: pr } = await context.octokit.rest.pulls.get({
			...context.repo(),
			pull_number: pullNumber,
		});

		const sha = pr.head.sha;
		const checks = await context.octokit.rest.checks.listForRef({
			...context.repo(),
			ref: sha,
		});

		const allPassed = checks.data.check_runs.every((check) => check.conclusion === 'success');
		if (!allPassed) {
			await context.octokit.rest.issues.createComment({
				...context.issue(),
				body: 'すべてのCIチェックが成功している必要があります。チェック結果を確認してください。',
			});
			return;
		}

		const reviews = await context.octokit.rest.pulls.listReviews(context.pullRequest());
		const hasUnresolved = reviews.data.some((review) => review.state === 'CHANGES_REQUESTED');

		if (hasUnresolved) {
			await context.octokit.rest.issues.createComment({
				...context.issue(),
				body: '未解決の変更リクエストがあります。まずはそれらに対応してください。',
			});
			return;
		}

		await context.octokit.rest.pulls.createReview({
			...context.pullRequest(),
			event: 'APPROVE',
			body: '👍',
		});
	},
});
