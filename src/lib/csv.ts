/**
 * Streams a CSV file from a Response object and invokes a callback for each row.
 * This prevents blocking the main thread with large string allocations and processing.
 */
export async function streamCsv(
	response: Response,
	onRow: (row: string[]) => void
): Promise<void> {
	const reader = response.body?.getReader();
	if (!reader) throw new Error('Response body is missing');

	const decoder = new TextDecoder('utf-8');
	let buffer = '';

	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			buffer += decoder.decode(value, { stream: true });
			const lines = buffer.split('\n');
			// Keep the last partial line in the buffer
			buffer = lines.pop() ?? '';

			for (const line of lines) {
				// Skip empty lines
				if (line.trim()) {
					onRow(line.split(','));
				}
			}
		}

		// Process the remaining buffer
		if (buffer.trim()) {
			onRow(buffer.split(','));
		}
	} finally {
		reader.releaseLock();
	}
}
