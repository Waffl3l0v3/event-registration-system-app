import axios from 'axios';

const BASE = '/api/registrations';

export const registerForEvent = (data) => axios.post(BASE, data);
export const getAllRegistrations = () => axios.get(BASE);
export const getRegistrationsByEvent = (eventName) =>
  axios.get(`${BASE}/event/${encodeURIComponent(eventName)}`);
export const deleteRegistration = (id) => axios.delete(`${BASE}/${id}`);
