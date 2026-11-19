export function trackWhopEvent(eventName, properties = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    ...properties,
    timestamp: new Date().toISOString(),
  };

  // Whop Websites otomatis menginjeksi window.whop.track di *.whop.app
  if (window.whop && typeof window.whop.track === "function") {
    window.whop.track(eventName, payload);
  }

  // Log untuk verifikasi di DevTools saat rekaman demo
  console.log(`[whop.track] ${eventName}`, payload);
}
