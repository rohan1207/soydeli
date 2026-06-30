let resolved = import.meta.env.VITE_API_BASE_URL;
if (!resolved && typeof window !== 'undefined') {
	const host = window.location.host; // e.g. viransh.onrender.com
	if (/viransh-?\d*\.onrender\.com$/.test(host)) {
		// If running on a numbered variant domain use the base non-numbered (adjust if backend differs)
		resolved = 'https://viransh.onrender.com';
	}
}
export const API_BASE_URL = (resolved ? resolved.replace(/\/$/, '') : 'http://localhost:5000');
