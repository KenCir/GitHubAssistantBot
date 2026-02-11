import type { EmitterWebhookEventName } from '@octokit/webhooks';
import type { Context } from 'probot';
import { z } from 'zod';
import type { StructurePredicate } from '../util/loaders.js';

export type ProbotEvent<EventName extends EmitterWebhookEventName = EmitterWebhookEventName> = {
	execute(context: Context<EventName>): Promise<void> | void;
	name: EventName;
};

export function defineEvent<E extends EmitterWebhookEventName>(event: ProbotEvent<E>): ProbotEvent<E> {
	return event;
}

export const schema = z.object({
	name: z.string(),
	execute: z.function(),
});

export const predicate: StructurePredicate<ProbotEvent> = (structure: unknown): structure is ProbotEvent =>
	schema.safeParse(structure).success;
