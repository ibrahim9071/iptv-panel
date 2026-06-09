export default function handler(req, res) {
    // Örnek sabit liste – veritabanı olarak KV veya başka servis ekleyebilirsin
    const playlists = {
        "spor": ["http://example.com/sport1.m3u8", "http://example.com/sport2.m3u8"],
        "haber": ["http://example.com/news.m3u8"]
    };

    if (req.method === 'GET') {
        res.status(200).json(playlists);
    } else if (req.method === 'POST') {
        // Yeni playlist ekleme
        const { name, urls } = req.body;
        playlists[name] = urls;
        res.status(201).json({ message: "Eklendi" });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
