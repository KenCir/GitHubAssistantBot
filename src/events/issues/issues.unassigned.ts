import { addLabel, IN_PROGRESS_LABEL, removeLabels, TODO_LABEL } from '../../util/issueLabels.js';
import { defineEvent } from '../index.js';

export default defineEvent({
	name: 'issues.unassigned',
	async execute(context) {
		if (context.payload.issue.state === 'closed') return;

		await addLabel(context, TODO_LABEL);
		await removeLabels(context, [IN_PROGRESS_LABEL]);
	},
});
