// API base resolution:
// 1. Use explicit VITE_API_URL if set.
// 2. Else if running on a Render / Netlify host, infer backend root (assumes same primary domain without -adminpanel).
// 3. Else fallback to localhost for dev.
let inferredBase = '';
const envBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
if (envBase) {
  inferredBase = envBase.replace(/\/$/, '');
} else if (typeof window !== 'undefined') {
  const host = window.location.host; // e.g. viransh-adminpanel.onrender.com
  if (/viransh-adminpanel\.onrender\.com$/.test(host)) {
    inferredBase = 'https://viransh.onrender.com';
  }
}
export const API_BASE = inferredBase || 'http://localhost:5000';

// Lightweight connectivity check (optional) - could be extended to switch to prod when localhost down

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken');
  const isAdminEndpoint = endpoint.startsWith('/api/admin/');
  const isLogin = endpoint === '/api/admin/login';
  // Allow login without token, block other admin endpoints
  if (isAdminEndpoint && !isLogin && !token) {
    throw new Error('Authentication required');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = new URL(endpoint.startsWith('/') ? endpoint : `/${endpoint}`, API_BASE);
  
  try {
    const res = await fetch(url.href, { ...options, headers });
    
    if (res.status === 401) {
      if (!isLogin) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
      }
      const errorBody = await res.json().catch(()=>({ message:'Unauthorized'}));
      throw new Error(errorBody.message || 'Unauthorized');
    }
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message || 'Request failed');
    }
    
    return res.json();
  } catch (error) {
    throw error;
  }
};
