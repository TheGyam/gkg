/**
 * API Client
 * 
 * Centralized HTTP client for all API requests.
 * Currently returns local data with simulated network delay.
 * 
 * 🔌 BACKEND INTEGRATION:
 * When the backend is ready, update BASE_URL and switch
 * the request methods to use fetch/axios against real endpoints.
 */

// TODO: Replace with actual API base URL when backend is ready
const BASE_URL = '';
const SIMULATED_DELAY = 300; // ms

/**
 * Simulates network delay for realistic UX during development
 */
const delay = (ms = SIMULATED_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generic GET request
 * Currently loads local JSON data with simulated delay.
 * 
 * 🔌 BACKEND: Replace body with:
 *   const response = await fetch(`${BASE_URL}${endpoint}`, { headers });
 *   if (!response.ok) throw new ApiError(response.status, await response.text());
 *   return response.json();
 */
export async function get(endpoint, localData) {
  await delay();

  if (BASE_URL) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  // Development: return local data
  return structuredClone(localData);
}

/**
 * Generic POST request
 * Currently logs data and returns a mock success response.
 * 
 * 🔌 BACKEND: Replace body with:
 *   const response = await fetch(`${BASE_URL}${endpoint}`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(data),
 *   });
 *   if (!response.ok) throw new ApiError(response.status, await response.text());
 *   return response.json();
 */
export async function post(endpoint, data) {
  await delay(500);

  if (BASE_URL) {
    const isFormData = data instanceof FormData;
    
    const options = {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    };

    if (!isFormData) {
      options.headers = { 'Content-Type': 'application/json' };
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  // Development: log and return mock success
  console.log(`[API Mock] POST ${endpoint}:`, data instanceof FormData ? 'FormData containing files' : data);
  
  // Specific mock response for the remote notary
  if (endpoint === '/api/remote-notary') {
    return { 
      success: true, 
      message: 'Submission received', 
      id: Date.now()
    };
  }
  
  return { success: true, message: 'Submission received', id: Date.now() };
}

export default { get, post };
