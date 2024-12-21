/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import YAML from 'yaml'

const BITNAMI_REPOSITORY_URL = 'https://charts.bitnami.com';
const DOCKER_REGISTRY = 'registry-1.docker.io';
const MIRRIR_REGISTRY = 'docker.eastcoal.tech';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { pathname, search, hash, username, password } = URL.parse(request.url) as URL
		const targetUrl = new URL(BITNAMI_REPOSITORY_URL);
		targetUrl.username = username;
		targetUrl.password = password;
		targetUrl.pathname = pathname;
		targetUrl.search = search;
		targetUrl.hash = hash;
		const headers = new Headers(request.headers);
		const response = await fetch(targetUrl, {
			headers: headers,
		})
		const text = await response.text()
		const result = text.replaceAll(DOCKER_REGISTRY, MIRRIR_REGISTRY)
		return new Response(result);
	},
} satisfies ExportedHandler<Env>;
