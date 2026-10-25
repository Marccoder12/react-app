
self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data;

  try {
    data = event.data.json();
  } catch {
    data = {
      title: "FineTask",
      body: event.data.text(),
    };
  }

  const options = {
    body: data.body || "You have a new notification.",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: data.id || "finetask-notification",
    data: {
      url: data.url || "/home/notification",
      notificationId: data.id || null,
    },
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || "FineTask",
      options,
    ),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = new URL(
    event.notification.data?.url || "/home/notification",
    self.location.origin,
  ).href;

  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of windows) {
        if (client.url.startsWith(self.location.origin)) {
          await client.focus();
          await client.navigate(targetUrl);
          return;
        }
      }

      await self.clients.openWindow(targetUrl);
    })(),
  );
});
