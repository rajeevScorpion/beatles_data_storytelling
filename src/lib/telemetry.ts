/**
 * Server-Backed Telemetry Client for The Beatles Archive
 * Persists and synchronizes visit and music playback counts globally across all browser sessions.
 */

export interface TelemetryData {
  visits: number;
  plays: number;
}

export const BASELINE_VISITS = 746;
export const BASELINE_PLAYS = 315;

const STORAGE_VISIT_KEY = 'beatles_archive_visit_count';
const STORAGE_PLAY_KEY = 'beatles_archive_music_play_count';

// Local cache helpers to prevent flicker before server response
export function getCachedTelemetry(): TelemetryData {
  let visits = BASELINE_VISITS;
  let plays = BASELINE_PLAYS;

  try {
    const v = localStorage.getItem(STORAGE_VISIT_KEY);
    if (v) {
      const parsedV = parseInt(v, 10);
      if (!isNaN(parsedV) && parsedV >= BASELINE_VISITS) visits = parsedV;
    }
    const p = localStorage.getItem(STORAGE_PLAY_KEY);
    if (p) {
      const parsedP = parseInt(p, 10);
      if (!isNaN(parsedP) && parsedP >= BASELINE_PLAYS) plays = parsedP;
    }
  } catch {}

  return { visits, plays };
}

export function updateLocalCache(data: Partial<TelemetryData>): void {
  try {
    if (typeof data.visits === 'number') {
      localStorage.setItem(STORAGE_VISIT_KEY, String(data.visits));
    }
    if (typeof data.plays === 'number') {
      localStorage.setItem(STORAGE_PLAY_KEY, String(data.plays));
    }
  } catch {}
}

export async function fetchServerTelemetry(): Promise<TelemetryData> {
  try {
    const res = await fetch('/api/telemetry', {
      headers: { credentials: 'omit' },
    });
    if (res.ok) {
      const data: TelemetryData = await res.json();
      updateLocalCache(data);
      return data;
    }
  } catch (err) {
    console.warn('Could not fetch server telemetry, using cached/fallback:', err);
  }
  return getCachedTelemetry();
}

export async function recordServerVisit(): Promise<TelemetryData> {
  try {
    const res = await fetch('/api/telemetry/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data: TelemetryData = await res.json();
      updateLocalCache(data);
      window.dispatchEvent(new CustomEvent('beatles:telemetry-updated', { detail: data }));
      return data;
    }
  } catch (err) {
    console.warn('Could not record server visit, incrementing locally:', err);
  }

  // Fallback if server is starting or unreachable
  const current = getCachedTelemetry();
  const next = { ...current, visits: current.visits + 1 };
  updateLocalCache(next);
  window.dispatchEvent(new CustomEvent('beatles:telemetry-updated', { detail: next }));
  return next;
}

export async function recordServerPlay(): Promise<TelemetryData> {
  try {
    const res = await fetch('/api/telemetry/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data: TelemetryData = await res.json();
      updateLocalCache(data);
      window.dispatchEvent(new CustomEvent('beatles:telemetry-updated', { detail: data }));
      return data;
    }
  } catch (err) {
    console.warn('Could not record server play, incrementing locally:', err);
  }

  // Fallback
  const current = getCachedTelemetry();
  const next = { ...current, plays: current.plays + 1 };
  updateLocalCache(next);
  window.dispatchEvent(new CustomEvent('beatles:telemetry-updated', { detail: next }));
  return next;
}
