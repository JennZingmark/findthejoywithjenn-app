/* global self, clients */

// Push notification received
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Jenn Juice Today ✨";
  const message = data.message || "";
  const url = data.url || "/";

  event.waitUntil(
    self.registration.showNotification(title, {
      body: message,
      // Your icons are in /icons/ per your generated SW precache list
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: { url },
    })
  );
});

// User taps notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      const existing = allClients.find((c) =>
        c.url.startsWith(self.location.origin)
      );

      if (existing) {
        await existing.focus();
        await existing.navigate(url);
        return;
      }

      await clients.openWindow(url);
    })()
  );
});