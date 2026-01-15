<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	interface BentoItem {
		id: number;
		title: string;
		type: 'image' | 'text' | 'stat' | 'link';
		size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
		color: string;
		content?: string;
		value?: string;
		label?: string;
	}

	let items: BentoItem[] = [
		{ id: 1, title: 'RaskRask Recharge', type: 'image', size: 'large', color: 'var(--color-brand-primary)' },
		{ id: 2, title: 'About Me', type: 'text', size: 'medium', color: 'var(--color-accent-amber)', content: 'UX Designer & Frontend Developer based in Denmark' },
		{ id: 3, title: 'Projects', type: 'stat', size: 'small', color: 'var(--color-accent-emerald)', value: '8+', label: 'Completed' },
		{ id: 4, title: 'Experience', type: 'stat', size: 'small', color: 'var(--color-accent-purple)', value: '2yr', label: 'Design' },
		{ id: 5, title: 'Harmony UI', type: 'image', size: 'wide', color: 'var(--color-brand-primary-light)' },
		{ id: 6, title: 'Get in Touch', type: 'link', size: 'medium', color: 'var(--color-brand-accent)' },
		{ id: 7, title: 'Design System', type: 'image', size: 'tall', color: 'var(--color-brand-primary-dark)' },
		{ id: 8, title: 'Frontend', type: 'text', size: 'small', color: 'var(--color-accent-amber)', content: 'React, Svelte, TypeScript' },
	];

	let hoveredId: number | null = null;
	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function handleHover(id: number | null) {
		hoveredId = id;
	}
</script>

<svelte:head>
	<title>Style 1: Bento Grid | Paolo Papania</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<h1 class="font-display">Interactive Bento</h1>
		<p>Hover over items to see micro-interactions</p>
	</header>

	{#if mounted}
		<div class="bento-grid" in:fade={{ duration: 400 }}>
			{#each items as item, i (item.id)}
				<div
					class="bento-item {item.size}"
					class:hovered={hoveredId === item.id}
					class:dimmed={hoveredId !== null && hoveredId !== item.id}
					style="--item-color: hsl({item.color})"
					role="button"
					tabindex="0"
					in:fly={{ y: 30, delay: i * 80, duration: 400, easing: quintOut }}
					on:mouseenter={() => handleHover(item.id)}
					on:mouseleave={() => handleHover(null)}
					on:focus={() => handleHover(item.id)}
					on:blur={() => handleHover(null)}
				>
					<div class="item-content">
						{#if item.type === 'stat'}
							<span class="stat-value">{item.value}</span>
							<span class="stat-label">{item.label}</span>
						{:else if item.type === 'text'}
							<h3>{item.title}</h3>
							<p>{item.content}</p>
						{:else if item.type === 'link'}
							<h3>{item.title}</h3>
							<div class="arrow">→</div>
						{:else}
							<h3>{item.title}</h3>
							<div class="image-placeholder"></div>
						{/if}
					</div>

					{#if hoveredId === item.id}
						<div class="hover-glow" in:fade={{ duration: 200 }}></div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.page {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.page-header h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.page-header p {
		color: hsl(var(--color-text-secondary));
	}

	.bento-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: 120px;
		gap: 1rem;
	}

	.bento-item {
		background: hsl(var(--color-surface));
		border: 1px solid hsl(var(--color-border-primary));
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		transition: all var(--transition-slow);
		display: flex;
		flex-direction: column;
	}

	.bento-item::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, var(--item-color) / 0.1, transparent);
		opacity: 0;
		transition: opacity var(--transition-base);
	}

	.bento-item:hover::before,
	.bento-item:focus::before {
		opacity: 1;
	}

	.bento-item.hovered {
		transform: scale(1.02);
		border-color: var(--item-color);
		box-shadow: 0 20px 40px hsl(var(--color-brand-primary) / 0.15);
		z-index: 10;
	}

	.bento-item.dimmed {
		opacity: 0.5;
		transform: scale(0.98);
	}

	/* Size Variations */
	.bento-item.small {
		grid-column: span 1;
		grid-row: span 1;
	}

	.bento-item.medium {
		grid-column: span 1;
		grid-row: span 2;
	}

	.bento-item.large {
		grid-column: span 2;
		grid-row: span 2;
	}

	.bento-item.wide {
		grid-column: span 2;
		grid-row: span 1;
	}

	.bento-item.tall {
		grid-column: span 1;
		grid-row: span 3;
	}

	.item-content {
		position: relative;
		z-index: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.item-content h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.item-content p {
		font-size: 0.875rem;
		color: hsl(var(--color-text-secondary));
		line-height: 1.5;
	}

	.stat-value {
		font-size: 2.5rem;
		font-weight: 700;
		font-family: 'Archiv Grotesk', sans-serif;
		color: var(--item-color);
	}

	.stat-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: hsl(var(--color-text-muted));
	}

	.arrow {
		font-size: 2rem;
		margin-top: auto;
		transition: transform var(--transition-base);
	}

	.bento-item:hover .arrow {
		transform: translateX(8px);
	}

	.image-placeholder {
		flex: 1;
		margin-top: 1rem;
		background: linear-gradient(135deg, var(--item-color) / 0.2, var(--item-color) / 0.05);
		border-radius: var(--radius-md);
	}

	.hover-glow {
		position: absolute;
		inset: -50%;
		background: radial-gradient(circle, var(--item-color) / 0.1, transparent 70%);
		pointer-events: none;
	}

	@media (max-width: 900px) {
		.bento-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.bento-item.large,
		.bento-item.wide {
			grid-column: span 2;
		}
	}

	@media (max-width: 500px) {
		.bento-grid {
			grid-template-columns: 1fr;
		}

		.bento-item.large,
		.bento-item.wide,
		.bento-item.tall {
			grid-column: span 1;
			grid-row: span 2;
		}
	}
</style>
