import { addLabel, BLOCKED_LABEL, MERGED_LABEL, removeAllStatusLabels } from '../../util/pullRequestLabels.js';
import { defineEvent } from '../index.js';

export default defineEvent({
	name: 'pull_request.closed',
	async execute(context) {
		await removeAllStatusLabels(context);
		if (context.payload.pull_request.merged) {
			await addLabel(context, MERGED_LABEL);
		} else {
			await addLabel(context, BLOCKED_LABEL);
		}
	},
});
