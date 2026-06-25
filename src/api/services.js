/**
 * API Services
 * 
 * Each function represents a backend endpoint.
 * Currently loads local JSON. When backend is ready,
 * just change the import source in each function.
 * 
 * 🔌 BACKEND INTEGRATION: See BACKEND_INTEGRATION.md for full details.
 */

import { get, post } from './client';

// Local placeholder data
import servicesData from '../data/services.json';
import feesData from '../data/fees.json';
import aboutData from '../data/about.json';
import locationsData from '../data/locations.json';
import testimonialsData from '../data/testimonials.json';

/**
 * GET /api/services
 * Returns all notary services
 */
export async function getServices() {
  return get('/api/services', servicesData.services);
}

/**
 * GET /api/fees
 * Returns pricing information
 */
export async function getFees() {
  return get('/api/fees', feesData);
}

/**
 * GET /api/about
 * Returns notary profile and milestones
 */
export async function getAbout() {
  return get('/api/about', aboutData);
}

/**
 * GET /api/locations
 * Returns office locations and contact info
 */
export async function getLocations() {
  return get('/api/locations', locationsData);
}

/**
 * GET /api/testimonials
 * Returns client testimonials
 */
export async function getTestimonials() {
  return get('/api/testimonials', testimonialsData.testimonials);
}

/**
 * POST /api/contact
 * Submits a contact form enquiry
 * 
 * @param {Object} data - { name, email, phone, service, message }
 */
export async function submitContact(data) {
  return post('/api/contact', data);
}

/**
 * POST /api/quote
 * Requests a custom quote
 * 
 * @param {Object} data - { name, email, phone, serviceType, details }
 */
export async function requestQuote(data) {
  return post('/api/quote', data);
}

/**
 * POST /api/remote-notary
 * Submits a remote notarisation request with documents
 * 
 * @param {FormData} data - Multipart form data containing details and files
 */
export async function submitRemoteNotarisation(data) {
  // We use post() but the client.js will need to detect FormData
  // to avoid setting Content-Type to application/json
  return post('/api/remote-notary', data);
}
export default { getServices, getFees, getAbout, getLocations, getTestimonials, submitContact, requestQuote, submitRemoteNotarisation };
