<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	interface CanvasItem {
		id: number;
		title: string;
		x: number;
		y: number;
		rotation: number;
		width: number;
		height: number;
		color: string;
		zIndex: number;
	}

	let items: CanvasItem[] = [
		{ id: 1, title: 'RaskRask Recharge', x: 15, y: 20, rotation: -5, width: 280, height: 200, color: 'var(--color-brand-primary)', zIndex: 1 },
		{ id: 2, title: 'About', x: 55, y: 15, rotation: 3, width: 200, height: 120, color: 'var(--color-accent-amber)', zIndex: 2 },
		{ id: 3, title: 'Harmony UI', x: 35, y: 55, rotation: -2, width: 240, height: 160, color: 'var(--color-brand-primary-light)', zIndex: 3 },
		{ id: 4, title: 'Contact', x: 70, y: 50, rotation: 8, width: 160, height: 100, color: 'var(--color-accent-emerald)', zIndex: 4 },
		{ id: 5, title: 'Skills', x: 10, y: 60, rotation: -8, width: 180, height: 140, color: 'var(--color-accent-purple)', zIndex: 5 },
		{ id: 6, title: 'Frontend Work', x: 60, y: 75, rotation: 4, width: 220, height: 150, color: 'var(--color-brand-accent)', zIndex: 6 },
	];

	let mounted = false;
	let dragging: number | null = null;
	let dragOffset = { x: 0, y: 0 };
	let maxZIndex = 7;
	let canvasEl: HTMLDivElement;

	onMount(() => {
		mounted = true;
	});

	function handleMouseDown(e: MouseEvent, item: CanvasItem) {
		if (!canvasEl) return;

		dragging = item.id;
		const rect = canvasEl.getBoundingClientRect();
		const itemX = (item.x / 100) * rect.width;
		const itemY = (item.y / 100) * rect.height;

		dragOffset = {
			x: e.clientX - rect.left - itemX,
			y: e.clientY - rect.top - itemY
		};

		// Bring to front
		items = items.map(i =>
			i.id === item.id ? { ...i, zIndex: maxZIndex++ } : i
		);
	}

	function handleMouseMove(e: MouseEvent) {
		if (dragging === null || !canvasEl) return;

		const rect = canvasEl.getBoundingClientRect();
		const newX = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
		const newY = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

		items = items.map(item =>
			item.id === dragging
				? { ...item, x: Math.max(0, Math.min(85, newX)), y: Math.max(0, Math.min(85, newY)) }
				: item
		);
	}

	function handleMouseUp() {
		dragging = null;
	}

	function scatter() {
		items = items.map(item => ({
			...item,
			x: 10 + Math.random() * 60,
			y: 10 + Math.random() * 60,
			rotation: -15 + Math.random() * 30
		}));
	}

	function stack() {
		items = items.map((item, i) => ({
			...item,
			x: 30 + i * 3,
			y: 25 + i * 3,
			rotation: -5 + i * 2,
			zIndex: i + 1
		}));
		maxZIndex = items.length + 1;
	}
</script>

<svelte:head>
	<title>Style 2: Free Canvas | Paolo Papania</title>
</svelte:head>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div class="page">
	<header class="page-header">
		<h1 class="font-display">Free Canvas</h1>
		<p>Drag items around to explore</p>
		<div class="controls">
			<button on:click={scatter}>Scatter</button>
			<button on:click={stack}>Stack</button>
		</div>
	</header>

	{#if mounted}
		<div
			class="canvas"
			bind:this={canvasEl}
			in:fade={{ duration: 400 }}
		>
			{#each items as item (item.id)}
				<div
					class="canvas-item"
					class:dragging={dragging === item.id}
					style="
						--x: {item.x}%;
						--y: {item.y}%;
						--rotation: {item.rotation}deg;
						--width: {item.width}px;
						--height: {item.height}px;
						--color: hsl({item.color});
						z-index: {item.zIndex};
					"
					role="button"
					tabindex="0"
					on:mousedown={(e) => handleMouseDown(e, item)}
				>
					<div class="item-inner">
						<h3>{item.title}</h3>
						<div class="item-visual"></div>
					</div>
					<div class="item-shadow"></div>
				</div>
			{/each}

			<div class="canvas-hint">
				<span>← drag me →</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.page {
		padding: 2rem;
		height: calc(100vh - 5rem);
		display: flex;
		flex-direction: column;
	}

	.page-header {
		text-align: center;
		margin-bottom: 1.5rem;
		flex-shrink: 0;
	}

	.page-header h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.page-header p {
		color: hsl(var(--color-text-secondary));
		margin-bottom: 1rem;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
	}

	.controls button {
		padding: 0.5rem 1.25rem;
		border-radius: var(--radius-full);
		border: 1px solid hsl(var(--color-border-primary));
		background: hsl(var(--color-surface));
		font-size: 0.875rem;
		font-weight: 500;
		transition: all var(--transition-base);
	}

	.controls button:hover {
		background: hsl(var(--color-brand-primary));
		color: hsl(var(--color-text-inverted));
		border-color: hsl(var(--color-brand-primary));
	}

	.canvas {
		flex: 1;
		position: relative;
		background: hsl(var(--color-surface) / 0.5);
		border-radius: var(--radius-xl);
		border: 2px dashed hsl(var(--color-border-primary));
		overflow: hidden;
		cursor: grab;
	}

	.canvas:active {
		cursor: grabbing;
	}

	.canvas-item {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--width);
		height: var(--height);
		transform: rotate(var(--rotation));
		cursor: grab;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		user-select: none;
	}

	.canvas-item:active,
	.canvas-item.dragging {
		cursor: grabbing;
		transform: rotate(var(--rotation)) scale(1.05);
	}

	.canvas-item:hover:not(.dragging) {
		transform: rotate(var(--rotation)) scale(1.02) translateY(-4px);
	}

	.item-inner {
		width: 100%;
		height: 100%;
		background: hsl(var(--color-surface));
		border: 1px solid hsl(var(--color-border-primary));
		border-radius: var(--radius-lg);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 1;
		overflow: hidden;
	}

	.canvas-item:hover .item-inner {
		border-color: var(--color);
	}

	.item-inner h3 {
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.item-visual {
		flex: 1;
		background: linear-gradient(135deg, var(--color) / 0.2, var(--color) / 0.05);
		border-radius: var(--radius-md);
	}

	.item-shadow {
		position: absolute;
		inset: 8px;
		background: hsl(var(--color-text-primary) / 0.1);
		border-radius: var(--radius-lg);
		filter: blur(12px);
		z-index: 0;
		transition: all var(--transition-base);
	}

	.canvas-item:hover .item-shadow,
	.canvas-item.dragging .item-shadow {
		inset: 12px;
		filter: blur(20px);
		background: var(--color) / 0.2;
	}

	.canvas-hint {
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.75rem;
		color: hsl(var(--color-text-muted));
		padding: 0.5rem 1rem;
		background: hsl(var(--color-surface));
		border-radius: var(--radius-full);
		border: 1px solid hsl(var(--color-border-primary));
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateX(-50%) translateY(0); }
		50% { transform: translateX(-50%) translateY(-5px); }
	}

	@media (max-width: 768px) {
		.canvas-item {
			width: calc(var(--width) * 0.7) !important;
			height: calc(var(--height) * 0.7) !important;
		}
	}
</style>
