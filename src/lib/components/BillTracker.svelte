<script lang="ts">
	interface Step {
		id: string;
		label: string;
		date?: string;
		description?: string;
	}

	interface Props {
		billNumber: string;
		billTitle: string;
		sponsor: string;
		currentStep: number;
		steps: Step[];
		lastAction?: string;
		lastActionDate?: string;
	}

	let {
		billNumber,
		billTitle,
		sponsor,
		currentStep,
		steps,
		lastAction,
		lastActionDate
	}: Props = $props();

	function getStepStatus(index: number): 'completed' | 'current' | 'pending' {
		if (index < currentStep) return 'completed';
		if (index === currentStep) return 'current';
		return 'pending';
	}
</script>

<div class="card">
	<!-- Bill Header -->
	<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 pb-6 border-b border-neutral-700">
		<div>
			<div class="flex items-center gap-3 mb-2">
				<span class="mono text-neutral-400">{billNumber}</span>
				<span class="badge-alert">Killed in Committee</span>
			</div>
			<h2 class="serif text-2xl font-bold text-paper mb-2">{billTitle}</h2>
			<p class="text-neutral-400 text-sm">Sponsor: {sponsor}</p>
		</div>

		{#if lastAction}
			<div class="text-right">
				<p class="text-xs text-neutral-500 uppercase tracking-wider mb-1">Last Action</p>
				<p class="text-sm text-paper font-medium">{lastAction}</p>
				{#if lastActionDate}
					<p class="mono text-xs text-neutral-400">{lastActionDate}</p>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Status Stepper -->
	<div class="mb-8">
		<p class="text-xs text-neutral-500 uppercase tracking-wider mb-4">Legislative Progress</p>
		<div class="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0">
			{#each steps as step, index}
				<div class="flex items-center {index < steps.length - 1 ? 'w-full md:w-auto md:flex-1' : ''}">
					<div class="stepper-step {getStepStatus(index)}">
						{#if getStepStatus(index) === 'completed'}
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						{:else if getStepStatus(index) === 'current'}
							<div class="w-2 h-2 bg-current rounded-full animate-pulse"></div>
						{/if}
						<span class="hidden md:inline">{step.label}</span>
						<span class="md:hidden">{step.id}</span>
					</div>
					{#if index < steps.length - 1}
						<div class="hidden md:block flex-1 h-px mx-2 {getStepStatus(index) === 'completed' ? 'bg-green-600' : 'bg-neutral-700'}"></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Mobile Stepper - Vertical -->
	<div class="md:hidden">
		<div class="space-y-3">
			{#each steps as step, index}
				<div class="flex items-start gap-3">
					<div class="flex flex-col items-center">
						<div class="w-6 h-6 rounded-full flex items-center justify-center {getStepStatus(index) === 'completed' ? 'bg-green-600' : getStepStatus(index) === 'current' ? 'bg-crimson' : 'bg-neutral-700'}">
							{#if getStepStatus(index) === 'completed'}
								<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							{:else if getStepStatus(index) === 'current'}
								<div class="w-2 h-2 bg-white rounded-full"></div>
							{/if}
						</div>
						{#if index < steps.length - 1}
							<div class="w-px h-8 {getStepStatus(index) === 'completed' ? 'bg-green-600' : 'bg-neutral-700'}"></div>
						{/if}
					</div>
					<div class="flex-1 pb-6">
						<p class="font-medium text-paper {getStepStatus(index) === 'pending' ? 'text-neutral-500' : ''}">{step.label}</p>
						{#if step.date}
							<p class="mono text-xs text-neutral-500">{step.date}</p>
						{/if}
						{#if step.description && getStepStatus(index) !== 'pending'}
							<p class="text-sm text-neutral-400 mt-1">{step.description}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Current Status Summary -->
	<div class="bg-neutral-800/50 p-4 rounded border-l-2 border-crimson">
		<p class="text-sm text-paper">
			<span class="font-semibold">Status:</span> {steps[currentStep].label}
			{#if steps[currentStep].description}
				— {steps[currentStep].description}
			{/if}
		</p>
	</div>
</div>
