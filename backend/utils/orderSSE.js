// Simple in-memory SSE client registry for order tracking
// Map: orderId -> Set of response objects
const orderWatchers = new Map();

export function addOrderWatcher(orderId, res) {
  if (!orderWatchers.has(orderId)) orderWatchers.set(orderId, new Set());
  orderWatchers.get(orderId).add(res);
}

export function removeOrderWatcher(orderId, res) {
  const set = orderWatchers.get(orderId);
  if (set) {
    set.delete(res);
    if (set.size === 0) orderWatchers.delete(orderId);
  }
}

export function broadcastOrderUpdate(orderId, payload) {
  const set = orderWatchers.get(orderId);
  if (!set) return;
  const data = `data: ${JSON.stringify(payload)}\n\n`;
  for (const res of set) {
    try { res.write(data); } catch (_) { /* ignore */ }
  }
}

export function computeDistanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function computeEtaMinutes(distanceKm, speedKmph = 20) { // default 20 km/h
  if (!distanceKm || distanceKm <= 0) return null;
  return Math.round((distanceKm / speedKmph) * 60);
}
