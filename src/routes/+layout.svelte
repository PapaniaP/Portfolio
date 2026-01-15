<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	const styles = [
		{ href: '/style-1', name: 'Bento Grid', description: 'Interactive bento layout' },
		{ href: '/style-2', name: 'Free Canvas', description: 'Draggable elements' },
		{ href: '/style-3', name: 'Minimal Flow', description: 'Clean & editorial' }
	];
</script>

<div class="app">
	<nav class="nav">
		<a href="/" class="logo font-handwritten">Papi.</a>

		<div class="nav-links">
			{#each styles as style}
				<a
					href={style.href}
					class="nav-link"
					class:active={$page.url.pathname === style.href}
				>
					<span class="nav-link-name">{style.name}</span>
					<span class="nav-link-desc">{style.description}</span>
				</a>
			{/each}
		</div>
	</nav>

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background: hsl(var(--color-surface) / 0.8);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid hsl(var(--color-border-primary) / 0.5);
	}

	.logo {
		font-size: 1.75rem;
		color: hsl(var(--color-brand-primary));
		transition: transform var(--transition-base);
	}

	.logo:hover {
		transform: scale(1.05) rotate(-2deg);
	}

	.nav-links {
		display: flex;
		gap: 0.5rem;
	}

	.nav-link {
		display: flex;
		flex-direction: column;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		transition: all var(--transition-base);
		border: 1px solid transparent;
	}

	.nav-link:hover {
		background: hsl(var(--color-surface-accent));
		border-color: hsl(var(--color-border-primary));
	}

	.nav-link.active {
		background: hsl(var(--color-brand-primary));
		color: hsl(var(--color-text-inverted));
	}

	.nav-link-name {
		font-weight: 600;
		font-size: 0.875rem;
	}

	.nav-link-desc {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	main {
		flex: 1;
		padding-top: 5rem;
	}

	@media (max-width: 768px) {
		.nav {
			padding: 1rem;
		}

		.nav-links {
			gap: 0.25rem;
		}

		.nav-link {
			padding: 0.375rem 0.75rem;
		}

		.nav-link-desc {
			display: none;
		}
	}
</style>
