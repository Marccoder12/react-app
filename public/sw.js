self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      let data = {};

      try {
        data = event.data ? event.data.json() : {};
      } catch (error) {
        data = {
          title: "FineTask diagnostic",
          body: event.data ? event.data.text() : "Push received without data",
        };
      }

      try {
        await self.registration.showNotification(
          data.title || "FineTask diagnostic",
          {
            body: data.body || "The service worker displayed this notification.",
            icon: "/icons/notification.png",
            badge: "/icons/notification.png",
            data: {
              url: data.url || "/dashboard/finetasks",
            },
          },
        );

        console.log("Notification displayed successfully.");
      } catch (error) {
        console.error("showNotification failed:", error);
        throw error;
      }
    })(),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = new URL(
    event.notification.data?.url || "/dashboard/finetasks",
    self.location.origin
  ).href;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (new URL(client.url).origin === self.location.origin) {
          return client.navigate(targetUrl).then((navigatedClient) =>
            navigatedClient ? navigatedClient.focus() : clients.openWindow(targetUrl)
          );
        }
      }

      return clients.openWindow(targetUrl);
    })
  );
});