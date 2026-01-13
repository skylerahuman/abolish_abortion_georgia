<script lang="ts">
	let searchZipCode = $state('');
	let district = $state<string | null>(null);
	let errorMessage = $state('');
	let loading = $state(false);

	let zipToDistrictMap: Record<string, string> | null = null;

	async function loadZipData() {
		if (zipToDistrictMap) return;
		loading = true;
		try {
			const response = await fetch('/data/zip_to_district.csv');
			const csvText = await response.text();
			const lines = csvText.split('\n');
			const map: Record<string, string> = {};
			for (let i = 1; i < lines.length; i++) {
				const [zip, district] = lines[i].split(',');
				if (zip && district) {
					map[zip.trim()] = district.trim();
				}
			}
			zipToDistrictMap = map;
		} catch (error) {
			errorMessage = 'Could not load district data.';
		} finally {
			loading = false;
		}
	}

	async function performDistrictLookup() {
		await loadZipData();

		if (!zipToDistrictMap) {
			errorMessage = 'District data is not loaded.';
			return;
		}

		loading = true;
		errorMessage = '';
		district = null;

		const foundDistrict = zipToDistrictMap[searchZipCode];

		if (foundDistrict) {
			district = foundDistrict;
		} else {
			errorMessage = 'District not found for this ZIP code.';
		}

		loading = false;
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			performDistrictLookup();
		}
	}
</script>

<div class="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Left Panel: Input and Results -->
	<div class="lg:w-1/3 space-y-6">
		<div>
			<h1 class="text-4xl font-bold text-charcoal-900 dark:text-cream-100 mb-4">Who Do I Call</h1>
			<p class="text-charcoal-700 dark:text-cream-200">
				Enter your Georgia ZIP code to find your U.S. House District.
			</p>
		</div>

		<!-- Search Input -->
		<div class="bg-cream-50 dark:bg-charcoal-800 rounded-lg shadow-lg p-6">
			<label for="zipcode" class="block text-sm font-medium text-charcoal-700 dark:text-cream-200 mb-2">
				Enter your Georgia ZIP code
			</label>
			<div class="flex gap-2">
				<input
					type="text"
					id="zipcode"
					bind:value={searchZipCode}
					onkeypress={handleKeyPress}
					placeholder="e.g., 30309"
					maxlength="5"
					class="flex-1 px-4 py-2 rounded-lg border border-charcoal-300 dark:border-charcoal-600 bg-white dark:bg-charcoal-900 text-charcoal-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-crimson-600"
				/>
				<button
					onclick={performDistrictLookup}
					disabled={loading}
					class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
				>
					{loading ? 'Searching...' : 'Find'}
				</button>
			</div>
			{#if errorMessage}
				<p class="mt-2 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
			{/if}
		</div>

		<!-- Results -->
		{#if district}
			<div class="bg-cream-50 dark:bg-charcoal-800 rounded-lg shadow-lg p-6 space-y-4">
				<div>
					<h2 class="text-xl font-semibold text-crimson-700 dark:text-crimson-500 mb-2">Your U.S. House District</h2>
					<p class="text-charcoal-700 dark:text-cream-200">{district}</p>
				</div>
			</div>
		{/if}
	</div>
</div>
