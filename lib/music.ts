import { RecentTrack, TopAlbums, TopArtists, TotalStats } from "./types/lastfm";
import { ArtistImage } from "./types/spotify";

export const fetchArtistAvatar = async (name: string): Promise<ArtistImage> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/music/artist-image?name=${name}`
  );
  return res.json();
};

export const fetchTopArtists = async (): Promise<TopArtists> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/music/top-artists?period=1month`,
    { cache: "no-store" }
  );
  return res.json();
};

export const fetchTopAlbums = async (): Promise<TopAlbums> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/music/top-albums?period=3month`,
    { cache: "no-store" }
  );
  return res.json();
};

export const fetchTotalPlays = async (): Promise<RecentTrack> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/music/recent-track`,
    { cache: "no-store" }
  );
  return res.json();
};

export const fetchTotalTracks = async (): Promise<TotalStats> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/music/track-total?period=7day`,
    { cache: "no-store" }
  );
  return res.json();
};

export const fetchTotalAlbums = async (): Promise<TotalStats> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/music/album-total?period=7day`,
    { cache: "no-store" }
  );
  return res.json();
};

export const fetchTotalArtists = async (): Promise<TotalStats> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/music/artist-total?period=7day`,
    { cache: "no-store" }
  );
  return res.json();
};
