<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { Engine, Runner, Body } from 'matter-js';

	// --- Configuration ---
	const SEGMENT_LENGTH = 15; // Shorter segments for smoother look
	
	let svgHeight = $state(4000);
	let pathData = $state('');
	
	// Physics state
	let ropeBodies = $state<Body[]>([]);
	let bobBody = $state<Body | null>(null);
	let anchorBody = $state<Body | null>(null);
	
	// Library reference
	let MatterLib: typeof import('matter-js');
	
	// Physics engine references
	let engine: Engine;
	let runner: Runner;
	let renderRunner: number;
	
	// DOM references
	let svgElement: SVGSVGElement;
	let containerRef: HTMLDivElement;

	async function initPhysics() {
		if (!containerRef) return;
		
		const m = await import('matter-js');
		MatterLib = m.default || m;
		const { Engine, Runner, Body, Composite, Composites, Constraint, Bodies } = MatterLib;

		engine = Engine.create({
			constraintIterations: 4, // Higher for stiffer, more stable rope
			positionIterations: 8,
			velocityIterations: 8
		});
		const world = engine.world;
		engine.gravity.y = 1;

		const group = Body.nextGroup(true);
		
		const startX = window.innerWidth - (window.innerWidth * 0.125); 
		const startY = 80;

		// 1. Calculate required rope length based on page height
		const pageHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight);
		const targetLength = pageHeight + 100; // Little extra
		const segmentCount = Math.ceil(targetLength / SEGMENT_LENGTH);

		// 2. Create Anchor
		const anchor = Bodies.circle(startX, startY, 5, { 
			isStatic: true,
			render: { visible: false }
		});
		anchorBody = anchor;

		// 3. Create Rope Segments
		// Create them manually to control initial positions for "drop" effect
		const ropeBodiesArray = [];
		for (let i = 0; i < segmentCount; i++) {
			// Initial position: bunched up vertically
			const x = startX + (Math.random() - 0.5) * 5; // Tiny jitter
			const y = startY + 20 + i * 2; // Very bunched (2px spacing vs 15px length)
			
			const body = Bodies.rectangle(x, y, 4, SEGMENT_LENGTH, { 
				collisionFilter: { group: group },
				frictionAir: 0.005, // Low drag for realistic swing
				render: { visible: false },
				density: 0.001
			});
			ropeBodiesArray.push(body);
		}
		
		const rope = Composite.create({ bodies: ropeBodiesArray });
		
		// 4. Chain Segments
		Composites.chain(rope, 0, -0.5, 0, 0.5, { 
			stiffness: 0.9, 
			length: SEGMENT_LENGTH, 
			render: { visible: false } 
		});

		// 5. Connect to Anchor
		Composite.add(rope, Constraint.create({ 
			bodyA: anchor,
			bodyB: ropeBodiesArray[0],
			pointB: { x: 0, y: -SEGMENT_LENGTH/2 },
			stiffness: 0.9,
			length: 10
		}));

		// 6. Create Bob
		const lastSegment = ropeBodiesArray[ropeBodiesArray.length - 1];
		const bobX = lastSegment.position.x;
		const bobY = lastSegment.position.y + 30;
		
		const bob = Bodies.polygon(bobX, bobY, 3, 20, {
			collisionFilter: { group: group },
			density: 0.04, // Heavy bob
			frictionAir: 0.002 // Very low drag for bob
		});
		bobBody = bob;
		
		const bobConstraint = Constraint.create({
			bodyA: lastSegment,
			bodyB: bob,
			pointA: { x: 0, y: SEGMENT_LENGTH/2 },
			stiffness: 0.9,
			length: 10
		});

		ropeBodies = ropeBodiesArray;
		Composite.add(world, [anchor, rope, bob, bobConstraint]);

		// 7. Run
		runner = Runner.create();
		Runner.run(runner, engine);

		// 8. Scroll Handling
		let lastScrollY = window.scrollY;
		const handleScroll = () => {
			if (!bobBody || !engine || !MatterLib) return;
			
			const currentScrollY = window.scrollY;
			const deltaY = currentScrollY - lastScrollY;
			lastScrollY = currentScrollY;

			// Inertia force
			const force = deltaY * 0.0001 * bob.mass;
			MatterLib.Body.applyForce(bob, bob.position, { x: force, y: 0 });
		};
		window.addEventListener('scroll', handleScroll);

		// 9. Render Loop
		const updateLoop = () => {
			if (ropeBodies.length && anchorBody && bobBody) {
				updateSVG();
			}
			renderRunner = requestAnimationFrame(updateLoop);
		};
		updateLoop();
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (renderRunner) cancelAnimationFrame(renderRunner);
			if (runner && engine) {
				MatterLib.Runner.stop(runner);
				MatterLib.Engine.clear(engine);
			}
		};
	}

	function updateSVG() {
		if (!ropeBodies.length || !anchorBody || !bobBody) return;

		let d = `M ${anchorBody.position.x} ${anchorBody.position.y}`;
		
		for (let i = 0; i < ropeBodies.length; i++) {
			d += ` L ${ropeBodies[i].position.x} ${ropeBodies[i].position.y}`;
		}
		
		d += ` L ${bobBody.position.x} ${bobBody.position.y}`;
		pathData = d;
	}

	function handleResize() {
		if (!anchorBody || !engine || !MatterLib) return;
		
		const newX = window.innerWidth - (window.innerWidth * 0.125);
		MatterLib.Body.setPosition(anchorBody, { x: newX, y: 80 });
		
		svgHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight);
	}

	onMount(() => {
		if (!browser) return;
		
		svgHeight = document.documentElement.scrollHeight;
		window.addEventListener('resize', handleResize);
		
		let cleanupPhysics: (() => void) | undefined;
		
		initPhysics().then(cleanup => {
			cleanupPhysics = cleanup;
		}).catch(e => console.error("Physics init failed:", e));
		
		return () => {
			window.removeEventListener('resize', handleResize);
			if (cleanupPhysics) cleanupPhysics();
		};
	});
</script>

<div bind:this={containerRef} class="plumb-line-container">
	<svg 
		bind:this={svgElement}
		width="100%" 
		height={svgHeight} 
		style="position: absolute; top: 0; left: 0; pointer-events: none;"
	>
		<defs>
			<linearGradient id="stringGradient" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" style="stop-color:var(--color-gold);stop-opacity:0.9" />
				<stop offset="50%" style="stop-color:var(--color-gold);stop-opacity:1" />
				<stop offset="100%" style="stop-color:var(--color-gold);stop-opacity:0.95" />
			</linearGradient>
			<linearGradient id="bobGradient" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" style="stop-color:var(--color-gold);stop-opacity:1" />
				<stop offset="100%" style="stop-color:#8B7355;stop-opacity:1" />
			</linearGradient>
		</defs>

		<!-- The Rope -->
		<path 
			d={pathData}
			stroke="url(#stringGradient)" 
			stroke-width="1.5" 
			fill="none" 
			stroke-linecap="round"
			stroke-linejoin="round"
		/>

		<!-- Hook at top -->
		{#if anchorBody}
			<circle 
				cx={anchorBody.position.x} 
				cy={anchorBody.position.y} 
				r="8" 
				fill="var(--color-panel)" 
				stroke="var(--color-gold)" 
				stroke-width="2"
			/>
		{/if}

		<!-- Bob at bottom -->
		{#if bobBody}
			<g transform="translate({bobBody.position.x}, {bobBody.position.y}) rotate({bobBody.angle * (180/Math.PI)})">
				<!-- Compensate for bob center of mass offset visually -->
				<g transform="translate(0, 10)"> 
					<polygon 
						points="0,-10 -12,-60 -8,-90 0,-100 8,-90 12,-60" 
						fill="url(#bobGradient)" 
						stroke="#5a4a3a" 
						stroke-width="1.5"
						opacity="0.95"
					/>
					<circle cx="0" cy="-10" r="4" fill="#5a4a3a" />
					<ellipse cx="-3" cy="-70" rx="3" ry="15" fill="#f4e4c1" opacity="0.4" />
				</g>
			</g>
		{/if}
	</svg>
</div>

<style>
	.plumb-line-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		pointer-events: none;
		overflow: hidden;
	}
</style>
