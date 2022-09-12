import {
  Album,
  Artist,
  LastfmAPIParams,
  RecentTrack,
  TopAlbums,
  TopArtists,
  TopTracks,
  TotalStats,
  Track
} from "./types/lastfm";

const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME;

const API_ROOT = "https://ws.audioscrobbler.com/2.0/";

const generateURL = (params: LastfmAPIParams) => {
  const stringifyParams = Object.entries(params)
    .map(([key, val]) => typeof val !== "undefined" && `${key}=${val}`)
    .join("&");
  return `${API_ROOT}?${stringifyParams}&user=${USERNAME}&api_key=${API_KEY}&format=json`;
};

export const getRecentTrack = async (
  from: LastfmAPIParams["from"]
): Promise<RecentTrack> => {
  const GET_RECENT_TRACKS: LastfmAPIParams = {
    method: "user.getrecenttracks",
    limit: 1,
    from,
    extended: "1",
  };

  const res = await fetch(generateURL(GET_RECENT_TRACKS));
  const { recenttracks } = await res.json();

  // Get the first/latest track
  const firstTrack = recenttracks.track.at(0);
  const { artist, image, album, name, loved } = firstTrack;
  const timestamp = Object.prototype.hasOwnProperty.call(firstTrack, "date")
    ? firstTrack["date"]["uts"]
    : null;

  const track: RecentTrack["track"] = {
    name,
    artist: artist.name,
    album: album["#text"],
    image: image.at(2)["#text"], // Large (174x174) image URL
    timestamp,
    loved: loved === "1",
  };

  const total: RecentTrack["total"] = recenttracks["@attr"]["total"];

  return { track, total };
};

export const getTopTracks = async (
  period: LastfmAPIParams["period"],
  limit: LastfmAPIParams["limit"] = 6 // default to 6
): Promise<TopTracks> => {
  const GET_TOP_TRACKS: LastfmAPIParams = {
    method: "user.gettoptracks",
    period,
    limit,
  };

  const res = await fetch(generateURL(GET_TOP_TRACKS));
  const { toptracks } = await res.json();

  const tracks: TopTracks = toptracks.track.map(
    (track: any): Track => ({
      name: String(track.name),
      artist: String(track.artist.name),
    })
  );

  return tracks;
};

export const getTopAlbums = async (
  period: LastfmAPIParams["period"],
  limit: LastfmAPIParams["limit"] = 6 // default to 6
): Promise<TopAlbums> => {
  const GET_TOP_ALBUMS: LastfmAPIParams = {
    method: "user.gettopalbums",
    period,
    limit,
  };

  const res = await fetch(generateURL(GET_TOP_ALBUMS));
  const { topalbums } = await res.json();

  const albums: TopAlbums = topalbums.album.map(
    (album: any): Album => ({
      name: album.name,
      artist: album.artist.name,
      image: album.image.at(2)["#text"],
      playcount: album.playcount,
    })
  );

  return albums;
};

export const getTopArtists = async (
  period: LastfmAPIParams["period"],
  limit: LastfmAPIParams["limit"] = 6 // default to 6
): Promise<TopArtists> => {
  const GET_TOP_ARTISTS: LastfmAPIParams = {
    method: "user.gettopartists",
    period,
    limit,
  };

  const res = await fetch(generateURL(GET_TOP_ARTISTS));
  const { topartists } = await res.json();

  const artists: TopArtists = topartists.artist.map(
    (artist: any): Artist => ({
      name: artist.name,
      playcount: artist.playcount,
    })
  );

  return artists;
};

export const getTrackTotal = async (
  period: LastfmAPIParams["period"]
): Promise<TotalStats> => {
  const GET_TRACK_TOTAL: LastfmAPIParams = {
    method: "user.gettoptracks",
    period,
  };

  const res = await fetch(generateURL(GET_TRACK_TOTAL));
  const { toptracks } = await res.json();

  return { total: toptracks["@attr"]["total"] };
};

export const getAlbumTotal = async (
  period: LastfmAPIParams["period"]
): Promise<TotalStats> => {
  const GET_ALBUM_TOTAL: LastfmAPIParams = {
    method: "user.gettopalbums",
    period,
  };

  const res = await fetch(generateURL(GET_ALBUM_TOTAL));
  const { topalbums } = await res.json();

  return { total: topalbums["@attr"]["total"] };
};

export const getArtistTotal = async (
  period: LastfmAPIParams["period"]
): Promise<TotalStats> => {
  const GET_ARTIST_TOTAL: LastfmAPIParams = {
    method: "user.gettopartists",
    period,
  };

  const res = await fetch(generateURL(GET_ARTIST_TOTAL));
  const { topartists } = await res.json();

  return { total: topartists["@attr"]["total"] };
};
