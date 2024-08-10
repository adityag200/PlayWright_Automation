const { test, expect, request } = require('@playwright/test');
const createBookingData = require('../../testData/createBookingData.json');
const createToken = require('../../testData/createToken.json'); // Adjust path if needed

let apiRequest;
let token;

test.beforeAll(async () => {
  console.log("Setting up API context...");

  // Use request directly to create a context
  apiRequest = await request.newContext(); // Create an API context

  // Get the authentication token
  console.log("Requesting authentication token...");
  console.log("Request data:", createToken);
  console.log("base URL:", apiRequest.request);
  const response = await apiRequest.post('/auth', {
    data: createToken
  });

  // Check if response is successful
  if (!response.ok()) {
    const responseBody = await response.text();
    throw new Error(`Failed to get token: ${response.status()} - ${responseBody}`);
  }

  const responseBody = await response.json();
  token = responseBody.token;

  console.log(`Received authentication token: ${token}`);
});

test.only('should create a booking', async () => {
  console.log("Creating a booking...");

  // Log request data
  console.log("Request data:", createBookingData);

  // Make a request to create a booking
  const response = await apiRequest.post('/booking', {
    data: createBookingData,
    headers: {
      Authorization: `Bearer ${token}` // Add token to the request header
    }
  });

  // Check if response is successful
  if (!response.ok()) {
    const responseBody = await response.text();
    console.error("Failed to create booking response body:", responseBody);
    throw new Error(`Failed to create booking: ${response.status()} - ${responseBody}`);
  }

  const responseBody = await response.json();

  // Log response for debugging
  console.log("Booking creation response:", responseBody);

  expect(response.status()).toBe(200); // Expect status code 200 (OK)
  expect(responseBody).toHaveProperty('bookingid');
  expect(responseBody.bookingid).not.toBeNull();

  console.log("Booking created and validated successfully.");
});