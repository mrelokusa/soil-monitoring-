const CACHE_NAME = 'arc-agri-cache-v1';
// All the files that make up the "app shell"
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/services/supabaseService.ts',
  '/services/greenhouseService.ts',
  '/services/geminiService.ts',
  '/components/Header.tsx',
  '/components/Footer.tsx',
  '/components/MetricCard.tsx',
  '/components/NPKChart.tsx',
  '/components/Icons.tsx',
  '/components/HistoryTable.tsx',
  '/components/HistoricalDataChart.tsx',
  '/components/AIAnalysis.tsx',
  '/components/GreenhousePanel.tsx',
  '/components/EmailSubscription.tsx',
  '/components/RefreshControl.tsx',
  '/components/AnimatedNumber.tsx',
  '/components/Dashboard.tsx', // Added
  '/components/Documentation.tsx', // Added
  '/assets/icon.svg',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0/client.js',
  'https://aistudiocdn.com/recharts@^3.2.1',
  'https://aistudiocdn.com/@google/genai@^1.25.0',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Install event: cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Use { cache: 'reload' } to ensure we're fetching the latest versions from the network during install.
        const requests = URLS_TO_CACHE.map(url => new Request(url, { cache: 'reload' }));
        return cache.addAll(requests);
      })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: serve from cache first, then network
self.addEventListener('fetch', (event) => {
    // We only want to cache GET requests.
    if (event.request.method !== 'GET') {
        return;
    }

    // For API calls for sensor data, always go to the network.
    // This ensures the dashboard always displays the freshest data.
    // The app's built-in error handling will manage network failures.
    if (event.request.url.includes('oracleapex.com')) {
        event.respondWith(fetch(event.request));
        return;
    }

    // For all other requests (the app shell), use a cache-first strategy.
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // Cache hit - return response from cache
            if (response) {
                return response;
            }

            // Not in cache - fetch from network, and cache it for next time
            return fetch(event.request).then(
                (networkResponse) => {
                    if (!networkResponse || networkResponse.status !== 200) {
                        return networkResponse;
                    }
                    
                    // Clone the response because it's a stream that can only be consumed once.
                    const responseToCache = networkResponse.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                             // Don't cache Gemini API calls, only app shell assets
                            if (!event.request.url.includes('google.com')) {
                                cache.put(event.request, responseToCache);
                            }
                        });

                    return networkResponse;
                }
            );
        })
    );
});