<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Paolo Papania | Portfolio</title>
	<meta name="description" content="Digital Concept Developer & UX Designer" />
</svelte:head>

<div class="home">
	{#if mounted}
		<section class="hero" in:fade={{ duration: 600 }}>
			<div class="hero-content">
				<p class="hero-subtitle" in:fly={{ y: 20, delay: 200, duration: 400 }}>
					Digital Concept Developer & UX Designer
				</p>
				<h1 class="hero-title font-display" in:fly={{ y: 30, delay: 300, duration: 500 }}>
					Paolo Papania
				</h1>
				<p class="hero-description" in:fly={{ y: 20, delay: 400, duration: 400 }}>
					Crafting thoughtful digital experiences where design meets function.
				</p>
			</div>

			<div class="style-selector" in:fly={{ y: 30, delay: 600, duration: 500 }}>
				<p class="selector-label">Explore different styles:</p>
				<div class="style-cards">
					<a href="/style-1" class="style-card">
						<div class="style-card-preview bento-preview">
							<div class="bento-item"></div>
							<div class="bento-item large"></div>
							<div class="bento-item"></div>
							<div class="bento-item"></div>
						</div>
						<span class="style-card-name">Bento Grid</span>
					</a>

					<a href="/style-2" class="style-card">
						<div class="style-card-preview canvas-preview">
							<div class="canvas-item" style="--x: 20%; --y: 30%; --rotate: -5deg;"></div>
							<div class="canvas-item" style="--x: 60%; --y: 50%; --rotate: 8deg;"></div>
							<div class="canvas-item" style="--x: 35%; --y: 70%; --rotate: -3deg;"></div>
						</div>
						<span class="style-card-name">Free Canvas</span>
					</a>

					<a href="/style-3" class="style-card">
						<div class="style-card-preview flow-preview">
							<div class="flow-line"></div>
							<div class="flow-line"></div>
							<div class="flow-line short"></div>
						</div>
						<span class="style-card-name">Minimal Flow</span>
					</a>
				</div>
			</div>
		</section>
	{/if}
</div>

<style>
	.home {
		min-height: calc(100vh - 5rem);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.hero {
		max-width: 800px;
		text-align: center;
	}

	.hero-content {
		margin-bottom: 4rem;
	}

	.hero-subtitle {
		font-size: 0.875rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: hsl(var(--color-brand-primary));
		margin-bottom: 1rem;
	}

	.hero-title {
		font-size: clamp(3rem, 8vw, 5rem);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 1.5rem;
		letter-spacing: -0.02em;
	}

	.hero-description {
		font-size: 1.25rem;
		color: hsl(var(--color-text-secondary));
		max-width: 500px;
		margin: 0 auto;
	}

	.style-selector {
		margin-top: 3rem;
	}

	.selector-label {
		font-size: 0.875rem;
		color: hsl(var(--color-text-muted));
		margin-bottom: 1.5rem;
	}

	.style-cards {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.style-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		border-radius: var(--radius-lg);
		border: 2px solid hsl(var(--color-border-primary));
		background: hsl(var(--color-surface));
		transition: all var(--transition-base);
		cursor: pointer;
	}

	.style-card:hover {
		border-color: hsl(var(--color-brand-primary));
		transform: translateY(-4px);
		box-shadow: 0 10px 30px hsl(var(--color-brand-primary) / 0.15);
	}

	.style-card-preview {
		width: 120px;
		height: 80px;
		border-radius: var(--radius-sm);
		background: hsl(var(--color-background));
		position: relative;
		overflow: hidden;
	}

	.style-card-name {
		font-size: 0.875rem;
		font-weight: 600;
	}

	/* Bento Preview */
	.bento-preview {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4px;
		padding: 6px;
	}

	.bento-item {
		background: hsl(var(--color-brand-primary) / 0.3);
		border-radius: 4px;
	}

	.bento-item.large {
		grid-row: span 2;
	}

	/* Canvas Preview */
	.canvas-preview {
		position: relative;
	}

	.canvas-item {
		position: absolute;
		width: 30px;
		height: 20px;
		background: hsl(var(--color-brand-primary) / 0.4);
		border-radius: 4px;
		left: var(--x);
		top: var(--y);
		transform: rotate(var(--rotate));
	}

	/* Flow Preview */
	.flow-preview {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 12px;
	}

	.flow-line {
		height: 8px;
		background: hsl(var(--color-brand-primary) / 0.25);
		border-radius: 4px;
	}

	.flow-line.short {
		width: 60%;
	}
</style>
