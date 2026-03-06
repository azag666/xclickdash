self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('push', e => {
    let data = { title: 'xClick Tracker', body: 'Nova atualização registada!' };
    if (e.data) {
        try {
            data = e.data.json();
        } catch (err) {
            data.body = e.data.text();
        }
    }
    e.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgcng9IjExNSIgZmlsbD0iIzNiODJmNiIvPjxwYXRoIGQ9Ik0yNTYgMTQ0YTExMiAxMTIgMCAxMDAgMjI0IDExMiAxMTIgMCAwMDAtMjI0em0wIDE3NmE2NCA2NCAwIDExMC0xMjggNjQgNjQgMCAwMTAgMTI4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
            badge: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgcng9IjExNSIgZmlsbD0iIzNiODJmNiIvPjxwYXRoIGQ9Ik0yNTYgMTQ0YTExMiAxMTIgMCAxMDAgMjI0IDExMiAxMTIgMCAwMDAtMjI0em0wIDE3NmE2NCA2NCAwIDExMC0xMjggNjQgNjQgMCAwMTAgMTI4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=='
        })
    );
});

self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            if (windowClients.length > 0) {
                windowClients[0].focus();
            } else {
                clients.openWindow('/');
            }
        })
    );
});
