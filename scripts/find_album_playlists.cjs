const albums = [
  "Please Please Me",
  "With the Beatles",
  "A Hard Day's Night",
  "Beatles for Sale",
  "Help!",
  "Rubber Soul",
  "Revolver",
  "Sgt. Pepper's Lonely Hearts Club Band",
  "Magical Mystery Tour",
  "The Beatles",
  "Yellow Submarine",
  "Abbey Road",
  "Let It Be",
  "Past Masters",
  "Anthology 1",
  "Anthology 2"
];

async function findPlaylistForAlbum(album) {
  const query = `The Beatles "${album}" full album playlist`;
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=EgIQAw%253D%253D`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const matches = [...html.matchAll(/"playlistId":"([a-zA-Z0-9_-]+)"/g)].map(m => m[1]);
    const unique = [...new Set(matches)];
    console.log(`Album: "${album}" -> found ${unique.length} playlists, first 3:`, unique.slice(0, 3));
  } catch (err) {
    console.error(`Error for "${album}":`, err.message);
  }
}

async function run() {
  for (const a of albums) {
    await findPlaylistForAlbum(a);
    await new Promise(r => setTimeout(r, 600));
  }
}

run();
