import { addLabel, removeAllStatusLabels, REVIEW_LABEL } from '../../util/pullRequestLabels.js';
import { defineEvent } from '../index.js';

export default defineEvent({
	name: 'pull_request.review_requested',
	async execute(context) {
		await removeAllStatusLabels(context);
		await addLabel(context, REVIEW_LABEL);
	},
});
