addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  // Basit token kontrolü (kendi token'ınızı koyun)
  if (token !== 'benimgizlitokenim123') {
    return new Response('Unauthorized', { status: 401 });
  }

  // Eğer istek dış kaynaklı bir stream ise proxy ol
  if (url.pathname === '/proxy') {
    const targetUrl = url.searchParams.get('url');
    if (!targetUrl) return new Response('No URL', { status: 400 });
    
    const response = await fetch(targetUrl);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }

  return new Response('IPTV Worker Active', { status: 200 });
}
