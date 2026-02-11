import { addLabel, BLOCKED_LABEL, IN_PROGRESS_LABEL, removeLabels, TODO_LABEL } from '../../util/issueLabels.js';
import { defineEvent } from '../index.js';

export default defineEvent({
	name: 'issues.assigned',
	async execute(context) {
		if (context.payload.issue.state === 'closed') return;

		await addLabel(context, IN_PROGRESS_LABEL);
		await removeLabels(context, [TODO_LABEL, BLOCKED_LABEL]);
	},
});
