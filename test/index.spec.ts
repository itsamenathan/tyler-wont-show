import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker, { escapeHtml, extractHeadline } from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Tyler Won\'t Show worker', () => {
	it('renders the development fallback headline', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toContain('Tyler&#39;s No-Show Epidemic Spreads');
	});

	it('renders the development fallback headline (integration style)', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(await response.text()).toContain('Tyler&#39;s No-Show Epidemic Spreads');
	});

	it('extracts headlines from current and legacy AI response shapes', () => {
		expect(extractHeadline({ response: { headline: 'Tyler no-show strikes again' } })).toBe('Tyler no-show strikes again');
		expect(extractHeadline('{"headline":"Tyler misses kickoff"}')).toBe('Tyler misses kickoff');
		expect(extractHeadline('"Tyler misses dinner again"')).toBe('Tyler misses dinner again');
	});

	it('escapes generated HTML', () => {
		expect(escapeHtml('<script>alert("x")</script>')).toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
	});
});
