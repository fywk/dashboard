import { env } from "@/lib/env.mjs";

import type {
  Album,
  Artist,
  LastfmParams,
  Period,
  RecentTrack,
  RecentTrackResponse,
  Timestamp,
  TopAlbums,
  TopAlbumsResponse,
  TopArtists,
  TopArtistsResponse,
  TopTracks,
  TopTracksResponse,
  TotalStats,
  Track,
} from "@/types/lastfm";

const API_KEY = env.LASTFM_API_KEY;
const USERNAME = env.LASTFM_USERNAME;

const API_ROOT = "https://ws.audioscrobbler.com/2.0/";

function generateURL(params: LastfmParams): string {
  const stringifyParams = Object.entries(params)
    .map(([key, val]) => typeof val !== "undefined" && `${key}=${val}`)
    .join("&");

  return `${API_ROOT}?${stringifyParams}&user=${USERNAME}&api_key=${API_KEY}&format=json`;
}

export async function getRecentTrack(from: Timestamp): Promise<RecentTrack> {
  const params: LastfmParams = {
    method: "user.getrecenttracks",
    limit: 1,
    from,
    extended: "1",
  };

  const res = await fetch(generateURL(params));
  const { recenttracks } = (await res.json()) as RecentTrackResponse;

  // Get the first/latest track
  const firstTrack = recenttracks.track.at(0)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  const { artist, image, album, name, loved } = firstTrack;
  const timestamp = firstTrack.date !== undefined && +firstTrack.date.uts;
  const track: RecentTrack["track"] = {
    name,
    artist: artist.name,
    album: album["#text"],
    image: image.at(3)?.["#text"] ?? "/images/album-error.jpg",
    ...(timestamp && { timestamp }),
    loved: loved === "1",
  };

  const total: RecentTrack["total"] = recenttracks["@attr"].total;

  return { track, total };
}

export async function getTopTracks(
  period: Period,
  limit = 6 // default to 6
): Promise<TopTracks> {
  const params: LastfmParams = {
    method: "user.gettoptracks",
    period,
    limit,
  };

  const res = await fetch(generateURL(params), { cache: "no-store" });
  const { toptracks } = (await res.json()) as TopTracksResponse;

  const tracks: TopTracks = toptracks.track.map(
    (track): Track => ({
      name: track.name,
      artist: track.artist.name,
    })
  );

  return tracks;
}

export async function getTopAlbums(
  period: Period,
  limit = 6 // default to 6
): Promise<TopAlbums> {
  const params: LastfmParams = {
    method: "user.gettopalbums",
    period,
    limit,
  };

  const res = await fetch(generateURL(params), { cache: "no-store" });
  const { topalbums } = (await res.json()) as TopAlbumsResponse;

  const albums: TopAlbums = topalbums.album.map(
    (album): Album => ({
      name: album.name,
      artist: album.artist.name,
      image: album.image.at(3)?.["#text"] ?? "/images/album-error.jpg",
      playcount: album.playcount,
    })
  );

  return albums;
}

export async function getTopArtists(
  period: Period,
  limit = 6 // default to 6
): Promise<TopArtists> {
  const params: LastfmParams = {
    method: "user.gettopartists",
    period,
    limit,
  };

  const res = await fetch(generateURL(params), { cache: "no-store" });
  const { topartists } = (await res.json()) as TopArtistsResponse;

  const artists: TopArtists = topartists.artist.map(
    (artist): Artist => ({
      name: artist.name,
      playcount: artist.playcount,
    })
  );

  return artists;
}

export async function getTotalTracks(period: Period): Promise<TotalStats> {
  const params: LastfmParams = {
    method: "user.gettoptracks",
    period,
    limit: 1, // set limit to 1 for smaller response
  };

  const res = await fetch(generateURL(params), { cache: "no-store" });
  const { toptracks } = (await res.json()) as TopTracksResponse;

  return { total: toptracks["@attr"].total };
}

export async function getTotalAlbums(period: Period): Promise<TotalStats> {
  const params: LastfmParams = {
    method: "user.gettopalbums",
    period,
    limit: 1,
  };

  const res = await fetch(generateURL(params), { cache: "no-store" });
  const { topalbums } = (await res.json()) as TopAlbumsResponse;

  return { total: topalbums["@attr"].total };
}

export async function getTotalArtists(period: Period): Promise<TotalStats> {
  const params: LastfmParams = {
    method: "user.gettopartists",
    period,
    limit: 1,
  };

  const res = await fetch(generateURL(params), { cache: "no-store" });
  const { topartists } = (await res.json()) as TopArtistsResponse;

  return { total: topartists["@attr"].total };
}
