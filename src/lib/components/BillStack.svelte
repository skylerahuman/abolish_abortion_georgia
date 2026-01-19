<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	
	let isExpanded = $state(false);
	let isSlammingDown = $state(true);
	let pdfPages: string[] = $state([]);
	let currentAnnotation = $state<{text: string, top: number} | null>(null);
	
	interface Annotation {
		page: number;
		scrollPercent: number;
		title: string;
		text: string;
	}
	
	const annotations: Annotation[] = [
		{
			page: 1,
			scrollPercent: 0.2,
			title: "Equal Protection",
			text: "This bill extends constitutional equal protection to all human beings from fertilization, without exception."
		},
		{
			page: 1,
			scrollPercent: 0.5,
			title: "Life Begins at Fertilization",
			text: "Georgia law recognizes that human life begins at fertilization, making all prenatal human beings persons under the law."
		},
		{
			page: 2,
			scrollPercent: 0.7,
			title: "No Arbitrary Lines",
			text: "Unlike heartbeat bills, this provides equal protection from the moment of conception—no arbitrary developmental milestones."
		}
	];
	
	let stackContainer: HTMLDivElement;
	let expandedContainer: HTMLDivElement;
	
	onMount(() => {
		// Particle effect on slam
		setTimeout(() => {
			isSlammingDown = false;
			createParticles();
		}, 600);
	});
	
	function createParticles() {
		if (!stackContainer) return;
		
		const container = stackContainer;
		for (let i = 0; i < 20; i++) {
			const particle = document.createElement('div');
			particle.className = 'dust-particle';
			particle.style.left = `${Math.random() * 100}%`;
			particle.style.animationDelay = `${Math.random() * 0.3}s`;
			container.appendChild(particle);
			
			setTimeout(() => particle.remove(), 1000);
		}
	}
	
	function handleStackClick() {
		isExpanded = true;
	}
	
	function handleCollapse() {
		isExpanded = false;
		currentAnnotation = null;
	}
	
	function handleScroll(e: Event) {
		if (!expandedContainer || !isExpanded) return;
		
		const container = expandedContainer;
		const scrollPercent = container.scrollTop / (container.scrollHeight - container.clientHeight);
		
		// Find relevant annotation
		const annotation = annotations.find(a => 
			Math.abs(scrollPercent - a.scrollPercent) < 0.1
		);
		
		if (annotation) {
			const topPosition = container.scrollTop + 200;
			currentAnnotation = {
				text: `${annotation.title}: ${annotation.text}`,
				top: topPosition
			};
		} else {
			currentAnnotation = null;
		}
	}
</script>

{#if !isExpanded}
	<!-- Stack View -->
	<div 
		bind:this={stackContainer}
		class="bill-stack-container"
		class:slamming={isSlammingDown}
		onclick={handleStackClick}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && handleStackClick()}
	>
		<div class="stack-wrapper">
			<!-- Multiple layers for 3D effect -->
			<div class="paper-layer" style="transform: translateY(-8px) translateZ(-30px);"></div>
			<div class="paper-layer" style="transform: translateY(-4px) translateZ(-20px);"></div>
			<div class="paper-layer" style="transform: translateY(-2px) translateZ(-10px);"></div>
			<div class="paper-layer primary">
				<div class="bill-title">HB 441</div>
				<div class="bill-subtitle">Equal Protection Act</div>
				<div class="click-hint">Click to unfurl →</div>
			</div>
		</div>
	</div>
{:else}
	<!-- Expanded View -->
	<div class="expanded-container">
		<button 
			class="collapse-button"
			onclick={handleCollapse}
		>
			← Fold Bill
		</button>
		
		<div 
			bind:this={expandedContainer}
			class="pdf-viewer"
			onscroll={handleScroll}
		>
			<!-- PDF Embed -->
			<iframe
				src="{base}/HB441.pdf"
				title="HB 441 - Equal Protection Act"
				class="pdf-iframe"
			></iframe>
			
			<!-- Annotation overlay -->
			{#if currentAnnotation}
				<div 
					class="annotation-box"
					style="top: {currentAnnotation.top}px;"
				>
					{currentAnnotation.text}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.bill-stack-container {
		width: 400px;
		height: 300px;
		margin: 100px auto;
		perspective: 1000px;
		cursor: pointer;
		position: relative;
		z-index: 10;
	}
	
	.bill-stack-container.slamming .stack-wrapper {
		animation: slam-down 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	
	@keyframes slam-down {
		0% {
			transform: translateY(-400px) rotateX(20deg) scale(0.8);
			opacity: 0;
		}
		70% {
			transform: translateY(10px) rotateX(-5deg) scale(1.05);
		}
		100% {
			transform: translateY(0) rotateX(0) scale(1);
			opacity: 1;
		}
	}
	
	.stack-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 0.4s ease;
	}
	
	.bill-stack-container:hover .stack-wrapper {
		transform: translateY(-10px) rotateX(5deg);
	}
	
	.paper-layer {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, #f8f6f0, #e8e6e0);
		border: 2px solid var(--color-gold);
		border-radius: 4px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
	}
	
	.paper-layer.primary {
		background: linear-gradient(135deg, #fff9e6, #f5f0dc);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		animation: pulse-gold 3s ease-in-out infinite;
	}
	
	@keyframes pulse-gold {
		0%, 100% {
			box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(205, 167, 99, 0.3);
		}
		50% {
			box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 40px rgba(205, 167, 99, 0.6);
		}
	}
	
	.bill-title {
		font-size: 3rem;
		font-weight: 900;
		color: var(--color-gold);
		font-family: var(--font-serif);
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
		margin-bottom: 0.5rem;
	}
	
	.bill-subtitle {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-charcoal);
		margin-bottom: 2rem;
	}
	
	.click-hint {
		font-size: 0.9rem;
		color: var(--color-teal);
		font-weight: 600;
		opacity: 0.8;
		animation: bounce-hint 2s ease-in-out infinite;
	}
	
	@keyframes bounce-hint {
		0%, 100% { transform: translateX(0); }
		50% { transform: translateX(10px); }
	}
	
	:global(.dust-particle) {
		position: absolute;
		bottom: 0;
		width: 4px;
		height: 4px;
		background: rgba(205, 167, 99, 0.6);
		border-radius: 50%;
		animation: float-up 1s ease-out forwards;
		pointer-events: none;
	}
	
	@keyframes float-up {
		0% {
			transform: translateY(0) scale(1);
			opacity: 1;
		}
		100% {
			transform: translateY(-100px) scale(0);
			opacity: 0;
		}
	}
	
	.expanded-container {
		position: relative;
		width: 90%;
		max-width: 900px;
		height: 80vh;
		margin: 2rem auto;
		z-index: 60;
		animation: unfurl 0.8s cubic-bezier(0.22, 1, 0.36, 1);
	}
	
	@keyframes unfurl {
		0% {
			transform: scaleY(0.1) translateY(-200px);
			opacity: 0;
		}
		100% {
			transform: scaleY(1) translateY(0);
			opacity: 1;
		}
	}
	
	.collapse-button {
		position: absolute;
		top: -50px;
		left: 0;
		background: var(--color-gold);
		color: var(--color-charcoal);
		border: none;
		padding: 0.75rem 1.5rem;
		font-weight: 700;
		font-size: 1rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 100;
	}
	
	.collapse-button:hover {
		background: var(--color-ember);
		color: white;
		transform: translateX(-5px);
	}
	
	.pdf-viewer {
		position: relative;
		width: 100%;
		height: 100%;
		background: white;
		border: 3px solid var(--color-gold);
		border-radius: 4px;
		overflow-y: auto;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
	}
	
	.pdf-iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
	
	.annotation-box {
		position: absolute;
		right: -320px;
		width: 300px;
		padding: 1.5rem;
		background: var(--color-gold);
		color: var(--color-charcoal);
		border-radius: 8px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		font-size: 0.95rem;
		line-height: 1.6;
		font-weight: 600;
		animation: slide-in-annotation 0.4s ease-out;
		z-index: 50;
	}
	
	@keyframes slide-in-annotation {
		from {
			transform: translateX(-50px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
	
	.annotation-box::before {
		content: '';
		position: absolute;
		left: -10px;
		top: 50%;
		transform: translateY(-50%);
		width: 0;
		height: 0;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-right: 10px solid var(--color-gold);
	}
	
	@media (max-width: 1200px) {
		.annotation-box {
			position: relative;
			right: auto;
			margin: 1rem;
			width: calc(100% - 2rem);
		}
		
		.annotation-box::before {
			display: none;
		}
	}
	
	@media (max-width: 768px) {
		.bill-stack-container {
			width: 90%;
			max-width: 350px;
			height: 250px;
		}
		
		.bill-title {
			font-size: 2rem;
		}
		
		.bill-subtitle {
			font-size: 1rem;
		}
		
		.expanded-container {
			width: 95%;
			height: 70vh;
		}
	}
</style>
