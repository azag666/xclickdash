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

**Resumo dos passos para funcionar no iPhone:**
1. Atualize o `dashboard-pwa.html` no seu alojamento.
2. Crie e faça upload do ficheiro `sw.js` para a mesma pasta.
3. Abra a página no Safari.
4. Clique em Partilhar -> **Adicionar ao Ecrã Principal**.
5. Abra a "App" que foi criada no seu telemóvel, faça login e clique no botão das notificações para ativar!
