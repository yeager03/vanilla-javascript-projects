export const postData = async (url, data) => {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(Object.fromEntries(data)),
	});

	if (!response.ok) {
		throw new Error(response.status);
	}

	return response.json();
};

export const getData = async (url) => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Could not fetch: ${url}, status: ${response.status}`);
	}

	return response.json();
};
