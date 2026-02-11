import {
	addLabel,
	BLOCKED_LABEL,
	COMPLETED_LABEL,
	IN_PROGRESS_LABEL,
	INACTIVE_ABANDONED_LABEL,
	INACTIVE_DUPLICATE_LABEL,
	removeLabels,
	TODO_LABEL,
} from '../../util/issueLabels.js';
import { defineEvent } from '../index.js';

export default defineEvent({
	name: 'issues.closed',
	async execute(context) {
		if (context.payload.issue.state_reason === 'not_planned') {
			await addLabel(context, INACTIVE_ABANDONED_LABEL);
		} else if (context.payload.issue.state_reason === 'duplicate') {
			await addLabel(context, INACTIVE_DUPLICATE_LABEL);
		} else {
			await addLabel(context, COMPLETED_LABEL);
		}

		await removeLabels(context, [TODO_LABEL, IN_PROGRESS_LABEL, BLOCKED_LABEL]);
	},
});
