const fs = require('fs');
const path = require('path');

const playlists = [
  { album: "Please Please Me", id: "PLycVTiaj8OI9COuVDJdw_RdBWy11ALc4T" },
  { album: "With the Beatles", id: "PLycVTiaj8OI-XRoKhxMmBhnsefIc77M2_" },
  { album: "A Hard Day's Night", id: "PLycVTiaj8OI-HjTjakWPpJO9Y6kh1icp2" },
  { album: "Beatles for Sale", id: "PLycVTiaj8OI-DkxXKgnI5w2PKgUKoPLQ8" },
  { album: "Help!", id: "PLycVTiaj8OI9JtydS7uKMO1FGl8UDBmcZ" },
  { album: "Rubber Soul", id: "PLycVTiaj8OI9Ptzsl9nzxfwUgZ0jx-Hyb" },
  { album: "Revolver", id: "PLycVTiaj8OI9QBZWsldja1JJwsIO-2xtY" },
  { album: "Sgt. Pepper's Lonely Hearts Club Band", id: "PL3PhWT10BW3VDM5IcVodrdUpVIhU8f7Z-" },
  { album: "Magical Mystery Tour", id: "PLycVTiaj8OI8F5vZlwv4NnvGwc84ITnW2" },
  { album: "The Beatles", id: "PLYq_mcte9NvDA2Xi5Qjl1DrH5LuDKDlAI" },
  { album: "The Beatles (Alt)", id: "PLI6kLIhBBwmTPr39yGcDUI8kHp_VegoHY" },
  { album: "Yellow Submarine", id: "PLycVTiaj8OI-Ob2F_f7E7mq6XDfeYTYOP" },
  { album: "Abbey Road", id: "PLycVTiaj8OI-kwvNjgvvopMJt__x-y5mD" },
  { album: "Let It Be", id: "PL0jp-uZ7a4g-D0lR2E89c9Rz4hM7qYfV_" },
  { album: "Past Masters", id: "PLI6kLIhBBwmTj_ZAGzkIk6tzAftXXkVeE" },
  { album: "Past Masters 2", id: "PL0jp-uZ7a4g-q3_ZJ5C2a2W5rR1E3gV_8" },
  { album: "Anthology", id: "PLUZeBJ4AU71AxmjigL8i8zELphHAFvIos" }
];

async function extractFromPlaylist(pl) {
  const url = `https://www.youtube.com/playlist?list=${pl.id}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const pattern = /"title":\{"content":"(.*?)"\}.*?"videoId":"([a-zA-Z0-9_-]{11})"/gs;
    const tracks = [];
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const title = match[1];
      const videoId = match[2];
      if (!tracks.some(t => t.videoId === videoId)) {
        tracks.push({ title, videoId, playlist: pl.album });
      }
    }
    return tracks;
  } catch (e) {
    console.error(`Error loading playlist ${pl.album}:`, e.message);
    return [];
  }
}

async function main() {
  const allTracks = [];
  for (const pl of playlists) {
    console.log(`Fetching playlist: ${pl.album} (${pl.id})...`);
    const tracks = await extractFromPlaylist(pl);
    console.log(`  -> Found ${tracks.length} tracks.`);
    allTracks.push(...tracks);
    await new Promise(r => setTimeout(r, 600));
  }

  console.log(`\nTotal unique video tracks extracted: ${allTracks.length}`);
  fs.writeFileSync(path.join(__dirname, 'extracted_playlist_tracks.json'), JSON.stringify(allTracks, null, 2));
}

main();
