<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	interface Section {
		id: string;
		title: string;
		subtitle?: string;
		content?: string;
	}

	const sections: Section[] = [
		{
			id: 'intro',
			title: 'Paolo Papania',
			subtitle: 'Digital Concept Developer & UX Designer',
			content: 'Creating thoughtful digital experiences where design meets function.'
		},
		{
			id: 'work',
			title: 'Selected Work',
			subtitle: 'Case studies & projects'
		},
		{
			id: 'about',
			title: 'About',
			content: 'Based in Denmark. Focused on user-centered design and clean code.'
		},
		{
			id: 'contact',
			title: "Let's Talk",
			content: 'Open to opportunities and collaborations.'
		}
	];

	let mounted = false;
	let scrollY = 0;
	let activeSection = 'intro';

	onMount(() => {
		mounted = true;
	});

	function handleScroll() {
		const sectionEls = document.querySelectorAll('.section');
		sectionEls.forEach(el => {
			const rect = el.getBoundingClientRect();
			if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
				activeSection = el.id;
			}
		});
	}
</script>

<svelte:head>
	<title>Style 3: Minimal Flow | Paolo Papania</title>
</svelte:head>

<svelte:window bind:scrollY on:scroll={handleScroll} />

<div class="page">
	{#if mounted}
		<!-- Progress indicator -->
		<div class="progress-track" in:fade={{ delay: 500, duration: 400 }}>
			{#each sections as section}
				<button
					class="progress-dot"
					class:active={activeSection === section.id}
					on:click={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
					aria-label="Go to {section.title}"
				>
					<span class="dot-label">{section.title}</span>
				</button>
			{/each}
		</div>

		<!-- Sections -->
		<section id="intro" class="section hero-section">
			<div class="section-content" in:fly={{ y: 50, duration: 600, easing: quintOut }}>
				<p class="hero-subtitle">{sections[0].subtitle}</p>
				<h1 class="hero-title font-display">{sections[0].title}</h1>
				<p class="hero-description">{sections[0].content}</p>
				<div class="scroll-hint" in:fade={{ delay: 1000, duration: 400 }}>
					<span>Scroll to explore</span>
					<div class="scroll-line"></div>
				</div>
			</div>
		</section>

		<section id="work" class="section work-section">
			<div class="section-content">
				<h2 class="section-title font-display" in:fly={{ y: 30, duration: 500 }}>{sections[1].title}</h2>
				<p class="section-subtitle">{sections[1].subtitle}</p>

				<div class="work-list">
					<a href="#" class="work-item">
						<span class="work-number">01</span>
						<div class="work-info">
							<h3>RaskRask Recharge</h3>
							<p>UX Research · UI Design · Thesis Project</p>
						</div>
						<span class="work-arrow">→</span>
					</a>

					<a href="#" class="work-item">
						<span class="work-number">02</span>
						<div class="work-info">
							<h3>Harmony UI</h3>
							<p>Design System · Component Library</p>
						</div>
						<span class="work-arrow">→</span>
					</a>

					<a href="#" class="work-item">
						<span class="work-number">03</span>
						<div class="work-info">
							<h3>More Coming Soon</h3>
							<p>Additional projects in progress</p>
						</div>
						<span class="work-arrow">→</span>
					</a>
				</div>
			</div>
		</section>

		<section id="about" class="section about-section">
			<div class="section-content">
				<h2 class="section-title font-display">{sections[2].title}</h2>
				<p class="about-text">{sections[2].content}</p>

				<div class="skills-row">
					<div class="skill-tag">Figma</div>
					<div class="skill-tag">React</div>
					<div class="skill-tag">Svelte</div>
					<div class="skill-tag">TypeScript</div>
					<div class="skill-tag">User Research</div>
				</div>
			</div>
		</section>

		<section id="contact" class="section contact-section">
			<div class="section-content">
				<h2 class="section-title font-display">{sections[3].title}</h2>
				<p class="contact-text">{sections[3].content}</p>

				<div class="contact-links">
					<a href="mailto:papaniap11@gmail.com" class="contact-link">
						<span>Email</span>
						<span class="link-arrow">↗</span>
					</a>
					<a href="https://linkedin.com/in/papaniap" target="_blank" rel="noopener" class="contact-link">
						<span>LinkedIn</span>
						<span class="link-arrow">↗</span>
					</a>
					<a href="https://github.com/PapaniaP" target="_blank" rel="noopener" class="contact-link">
						<span>GitHub</span>
						<span class="link-arrow">↗</span>
					</a>
				</div>
			</div>
		</section>
	{/if}
</div>

<style>
	.page {
		position: relative;
	}

	.progress-track {
		position: fixed;
		right: 2rem;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		z-index: 100;
	}

	.progress-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: hsl(var(--color-border-primary));
		position: relative;
		transition: all var(--transition-base);
	}

	.progress-dot.active {
		background: hsl(var(--color-brand-primary));
		transform: scale(1.3);
	}

	.progress-dot:hover {
		background: hsl(var(--color-brand-primary-light));
	}

	.dot-label {
		position: absolute;
		right: 1.5rem;
		top: 50%;
		transform: translateY(-50%);
		font-size: 0.75rem;
		white-space: nowrap;
		opacity: 0;
		transition: opacity var(--transition-base);
		pointer-events: none;
		color: hsl(var(--color-text-secondary));
	}

	.progress-dot:hover .dot-label {
		opacity: 1;
	}

	.section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
	}

	.section-content {
		max-width: 700px;
		width: 100%;
	}

	/* Hero Section */
	.hero-section {
		text-align: center;
	}

	.hero-subtitle {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: hsl(var(--color-brand-primary));
		margin-bottom: 1rem;
	}

	.hero-title {
		font-size: clamp(3rem, 10vw, 6rem);
		line-height: 1;
		margin-bottom: 1.5rem;
		letter-spacing: -0.03em;
	}

	.hero-description {
		font-size: 1.25rem;
		color: hsl(var(--color-text-secondary));
		margin-bottom: 3rem;
	}

	.scroll-hint {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		color: hsl(var(--color-text-muted));
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.scroll-line {
		width: 1px;
		height: 60px;
		background: linear-gradient(to bottom, hsl(var(--color-border-primary)), transparent);
		animation: scrollPulse 2s ease-in-out infinite;
	}

	@keyframes scrollPulse {
		0%, 100% { opacity: 0.3; transform: scaleY(1); }
		50% { opacity: 1; transform: scaleY(1.2); }
	}

	/* Work Section */
	.section-title {
		font-size: 3rem;
		margin-bottom: 0.5rem;
	}

	.section-subtitle {
		color: hsl(var(--color-text-secondary));
		margin-bottom: 3rem;
	}

	.work-list {
		display: flex;
		flex-direction: column;
	}

	.work-item {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 2rem 0;
		border-bottom: 1px solid hsl(var(--color-border-primary));
		transition: all var(--transition-base);
	}

	.work-item:hover {
		padding-left: 1rem;
		border-color: hsl(var(--color-brand-primary));
	}

	.work-number {
		font-size: 0.875rem;
		color: hsl(var(--color-text-muted));
		font-family: 'Archiv Grotesk', sans-serif;
	}

	.work-info {
		flex: 1;
	}

	.work-info h3 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.work-info p {
		font-size: 0.875rem;
		color: hsl(var(--color-text-secondary));
	}

	.work-arrow {
		font-size: 1.5rem;
		opacity: 0;
		transform: translateX(-10px);
		transition: all var(--transition-base);
	}

	.work-item:hover .work-arrow {
		opacity: 1;
		transform: translateX(0);
	}

	/* About Section */
	.about-text {
		font-size: 1.5rem;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.skills-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.skill-tag {
		padding: 0.5rem 1rem;
		border: 1px solid hsl(var(--color-border-primary));
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		transition: all var(--transition-base);
	}

	.skill-tag:hover {
		border-color: hsl(var(--color-brand-primary));
		background: hsl(var(--color-brand-primary) / 0.1);
	}

	/* Contact Section */
	.contact-text {
		font-size: 1.25rem;
		color: hsl(var(--color-text-secondary));
		margin-bottom: 2rem;
	}

	.contact-links {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.contact-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		border: 1px solid hsl(var(--color-border-primary));
		border-radius: var(--radius-md);
		font-weight: 500;
		transition: all var(--transition-base);
	}

	.contact-link:hover {
		background: hsl(var(--color-brand-primary));
		color: hsl(var(--color-text-inverted));
		border-color: hsl(var(--color-brand-primary));
	}

	.link-arrow {
		transition: transform var(--transition-base);
	}

	.contact-link:hover .link-arrow {
		transform: translate(2px, -2px);
	}

	@media (max-width: 768px) {
		.progress-track {
			display: none;
		}

		.section {
			padding: 3rem 1.5rem;
		}

		.work-item {
			flex-wrap: wrap;
			gap: 1rem;
		}

		.work-number {
			width: 100%;
		}
	}
</style>
