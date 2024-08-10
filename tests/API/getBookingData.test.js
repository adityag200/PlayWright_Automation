const { test, expect } = require('@playwright/test');

test('should retrieve booking details', async ({ request, baseURL }) => {
    console.log('Base URL:', baseURL); // Log the base URL

  // Make a GET request to retrieve the booking details
  const response = await request.get('/booking', {
    headers: {
      'Accept': 'application/json' // Set Accept header to request JSON format
    }
  });

  console.log('GET request made to /booking');

  // Validate the status code
  const statusCode = response.status();
  console.log(`Response status code: ${statusCode}`);
  expect(statusCode).toBe(200); // Expect status code 200 (OK)

  // Parse the response body as JSON
  const responseBody = await response.json();
  console.log('Response generated successfully');
});