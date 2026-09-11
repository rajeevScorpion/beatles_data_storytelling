const fs = require('fs');
const path = require('path');

const normalized = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/beatles_normalized.json'), 'utf8'));
let extracted = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted_playlist_tracks.json'), 'utf8'));

// Add Let It Be playlist tracks
const letItBeTracks = [
  { title: "Two Of Us (Remastered 2009)", videoId: "cLQox8e9688", playlist: "Let It Be" },
  { title: "Dig A Pony (Remastered 2009)", videoId: "LpdJE7HG8Ls", playlist: "Let It Be" },
  { title: "Across The Universe (Remastered 2009)", videoId: "90M60PzmxEE", playlist: "Let It Be" },
  { title: "I Me Mine (Remastered 2009)", videoId: "seqaTuXkqFI", playlist: "Let It Be" },
  { title: "Dig It (Remastered 2009)", videoId: "fUUOX6kAIxI", playlist: "Let It Be" },
  { title: "Let It Be (Remastered 2009)", videoId: "QDYfEBY9NM4", playlist: "Let It Be" },
  { title: "Maggie Mae (Remastered 2009)", videoId: "tSn1r9--tq4", playlist: "Let It Be" },
  { title: "I've Got A Feeling (Remastered 2009)", videoId: "DbKPZd5oihc", playlist: "Let It Be" },
  { title: "One After 909 (Remastered 2009)", videoId: "t8UeWjynWvE", playlist: "Let It Be" },
  { title: "The Long And Winding Road (Remastered 2009)", videoId: "fR4HjTH_fTM", playlist: "Let It Be" },
  { title: "For You Blue (Remastered 2009)", videoId: "TIFHRaZERHg", playlist: "Let It Be" },
  { title: "Get Back (Remastered 2009)", videoId: "IKJqecxswCA", playlist: "Let It Be" }
];

extracted.push(...letItBeTracks);

// 15 protected mappings
const PROTECTED = {
  1: { video_id: "usNsCeOV4GM", note: "Remix / 2017 Mix" },
  30: { video_id: "45cYwDMibGo", note: "2019 Mix" },
  45: { video_id: "HuS5NuXRb5Y", note: "Official Video" },
  66: { video_id: "2Q_ZzBGPdqE", note: "Remastered 2015" },
  69: { video_id: "KQetemT1sWc", note: "2019 Mix" },
  71: { video_id: "A_MjCqQoLLA", note: "Official Video" },
  85: { video_id: "jenWdylTtzs", note: "Live on Ed Sullivan" },
  111: { video_id: "CGj85pVzRJs", note: "2021 Mix" },
  115: { video_id: "XB16AkSGLqk", note: "Remastered 2009" },
  135: { video_id: "De1LCQvbqV4", note: "2019 Mix" },
  141: { video_id: "yYvkICbTZIQ", note: "Official Video" },
  166: { video_id: "HtUH9z_Oey8", note: "Official Video" },
  186: { video_id: "m4BuziKGMy4", note: "Remastered 2009" },
  195: { video_id: "zOKGcEfSwnY", note: "2018 Mix" },
  204: { video_id: "wXTJBr9tt8Q", note: "Live on Ed Sullivan" },
};

function normalizeForComparison(str) {
  return str.toLowerCase()
    .replace(/\(.*?\)/g, '') // remove parentheses
    .replace(/[^a-z0-9]/g, ''); // alphanumeric only
}

const matched = [];
const unmatched = [];

for (let i = 0; i < normalized.length; i++) {
  const song = normalized[i];
  const datasetId = i + 1;

  if (PROTECTED[datasetId]) {
    matched.push({
      dataset_id: datasetId,
      song_id: song.id,
      title: song.title,
      album: song.album,
      era: song.era,
      video_id: PROTECTED[datasetId].video_id,
      watch_url: `https://www.youtube.com/watch?v=${PROTECTED[datasetId].video_id}`,
      embed_url: `https://www.youtube.com/embed/${PROTECTED[datasetId].video_id}?enablejsapi=1`,
      source_channel: "The Beatles — Official Artist Channel",
      version_note: PROTECTED[datasetId].note,
      status: "KEEP_VERIFIED_EXISTING"
    });
    continue;
  }

  const normSong = normalizeForComparison(song.title);
  
  // Try to find in extracted playlist tracks
  // 1. Exact or strict title match with matching album
  let found = extracted.find(t => {
    const normTrack = normalizeForComparison(t.title);
    return normTrack === normSong;
  });

  // 2. Substring match
  if (!found) {
    found = extracted.find(t => {
      const normTrack = normalizeForComparison(t.title);
      return normTrack.length >= 4 && (normTrack.includes(normSong) || normSong.includes(normTrack));
    });
  }

  if (found) {
    matched.push({
      dataset_id: datasetId,
      song_id: song.id,
      title: song.title,
      album: song.album,
      era: song.era,
      video_id: found.videoId,
      watch_url: `https://www.youtube.com/watch?v=${found.videoId}`,
      embed_url: `https://www.youtube.com/embed/${found.videoId}?enablejsapi=1`,
      source_channel: "The Beatles — Official Artist Channel",
      version_note: found.title,
      status: "RESOLVED_OFFICIAL"
    });
  } else {
    unmatched.push({ datasetId, song });
  }
}

console.log(`Matched: ${matched.length} / ${normalized.length}`);
console.log(`Unmatched: ${unmatched.length}`);
if (unmatched.length > 0) {
  console.log("Unmatched songs:", unmatched.map(u => `[${u.datasetId}] ${u.song.title} (${u.song.album})`));
}

fs.writeFileSync(path.join(__dirname, 'matched_partial.json'), JSON.stringify({ matched, unmatched }, null, 2));
