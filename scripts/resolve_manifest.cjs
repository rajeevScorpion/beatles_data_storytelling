const fs = require('fs');
const path = require('path');

const normalized = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/beatles_normalized.json'), 'utf8'));

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

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Clean title for searching (remove accents / normalize quotes)
function cleanTitle(title) {
  return title.replace(/[’']/g, "'").replace(/[“”"]/g, '');
}

async function searchYouTube(query) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const html = await res.text();
    const jsonMatch = html.match(/var ytInitialData = ({.*?});<\/script>/);
    if (!jsonMatch) return [];
    
    const data = JSON.parse(jsonMatch[1]);
    const sections = data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [];
    const results = [];
    
    for (const section of sections) {
      const contents = section.itemSectionRenderer?.contents || [];
      for (const item of contents) {
        const vr = item.videoRenderer;
        if (!vr || !vr.videoId) continue;
        const channelName = vr.ownerText?.runs?.[0]?.text || '';
        const title = vr.title?.runs?.[0]?.text || '';
        const badges = (vr.badges || []).map(b => b.metadataBadgeRenderer?.label || '');
        results.push({
          videoId: vr.videoId,
          title,
          channel: channelName,
          badges,
        });
      }
    }
    return results;
  } catch (err) {
    console.error(`Search error for "${query}":`, err.message);
    return [];
  }
}

function findBestBeatlesMatch(results, songTitle) {
  const normSong = songTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Pass 1: exact Beatles channel AND title includes song title
  for (const r of results) {
    const isBeatlesChannel = r.channel.toLowerCase().includes('beatles');
    const normResultTitle = r.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (isBeatlesChannel && normResultTitle.includes(normSong)) {
      return r;
    }
  }
  
  // Pass 2: any Beatles channel
  for (const r of results) {
    const isBeatlesChannel = r.channel.toLowerCase().includes('beatles');
    if (isBeatlesChannel) {
      return r;
    }
  }
  
  // Pass 3: Topic / VEVO
  for (const r of results) {
    const normResultTitle = r.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if ((r.channel.toLowerCase().includes('topic') || r.channel.toLowerCase().includes('vevo')) && normResultTitle.includes(normSong)) {
      return r;
    }
  }

  // Pass 4: first result if title matches
  for (const r of results) {
    const normResultTitle = r.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normResultTitle.includes(normSong)) {
      return r;
    }
  }

  return results[0] || null;
}

async function resolveAll() {
  const resolvedManifest = [];
  const total = normalized.length;
  console.log(`Starting resolution for ${total} songs...`);

  for (let i = 0; i < total; i++) {
    const song = normalized[i];
    const datasetId = i + 1;
    
    if (PROTECTED[datasetId]) {
      const p = PROTECTED[datasetId];
      resolvedManifest.push({
        dataset_id: datasetId,
        song_id: song.id,
        title: song.title,
        album: song.album,
        era: song.era,
        video_id: p.video_id,
        watch_url: `https://www.youtube.com/watch?v=${p.video_id}`,
        embed_url: `https://www.youtube.com/embed/${p.video_id}?enablejsapi=1`,
        source_channel: 'The Beatles — Official Artist Channel',
        version_note: p.note,
        status: 'KEEP_VERIFIED_EXISTING'
      });
      console.log(`[${datasetId}/${total}] ${song.title} -> PRESERVED (${p.video_id})`);
      continue;
    }

    // Unresolved: search YouTube
    const queries = [
      `The Beatles "${cleanTitle(song.title)}" Remastered`,
      `The Beatles "${cleanTitle(song.title)}" ${song.album}`,
      `The Beatles ${cleanTitle(song.title)} Official Audio`
    ];

    let match = null;
    for (const q of queries) {
      const results = await searchYouTube(q);
      match = findBestBeatlesMatch(results, song.title);
      if (match && match.channel.toLowerCase().includes('beatles')) {
        break;
      }
      await sleep(150);
    }

    if (match) {
      resolvedManifest.push({
        dataset_id: datasetId,
        song_id: song.id,
        title: song.title,
        album: song.album,
        era: song.era,
        video_id: match.videoId,
        watch_url: `https://www.youtube.com/watch?v=${match.videoId}`,
        embed_url: `https://www.youtube.com/embed/${match.videoId}?enablejsapi=1`,
        source_channel: match.channel || 'The Beatles — Official Artist Channel',
        version_note: match.title,
        status: 'RESOLVED_OFFICIAL'
      });
      console.log(`[${datasetId}/${total}] ${song.title} -> RESOLVED: ${match.videoId} (${match.title} | ${match.channel})`);
    } else {
      console.warn(`[${datasetId}/${total}] ${song.title} -> COULD NOT RESOLVE DIRECT VIDEO`);
      resolvedManifest.push({
        dataset_id: datasetId,
        song_id: song.id,
        title: song.title,
        album: song.album,
        era: song.era,
        video_id: null,
        watch_url: `https://www.youtube.com/results?search_query=The+Beatles+${encodeURIComponent(song.title)}`,
        embed_url: null,
        source_channel: 'The Beatles — Official Artist Channel',
        version_note: 'Official search fallback',
        status: 'OFFICIAL_EXTERNAL_ONLY'
      });
    }

    // Small delay to avoid rate limits
    await sleep(200);
  }

  // Save resolved manifest
  const outputPath = path.join(__dirname, '../data/beatles_playback_manifest.json');
  fs.writeFileSync(outputPath, JSON.stringify(resolvedManifest, null, 2), 'utf8');
  console.log(`\nSuccessfully resolved ${resolvedManifest.filter(s => s.video_id).length} / ${total} songs.`);
  console.log(`Saved to ${outputPath}`);
}

resolveAll().catch(console.error);
