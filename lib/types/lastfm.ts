export const PERIOD = [
  "overall",
  "7day",
  "1month",
  "3month",
  "6month",
  "12month",
] as const;

export type Period = (typeof PERIOD)[number];

export type Timestamp = number;

type MethodParams =
  | {
      method: "user.getrecenttracks";
      from: Timestamp;
      extended: "0" | "1";
    }
  | {
      method: "user.gettopalbums" | "user.gettopartists" | "user.gettoptracks";
      period: Period;
    };

export type LastfmParams = MethodParams & { limit: number };

export type Track = {
  name: string;
  artist: string;
};

export type Album = {
  name: string;
  artist: string;
  image: string;
  playcount: string;
};

export type Artist = {
  name: string;
  playcount: string;
  image_url?: string;
};

export type Total = string;

export type RecentTrack = {
  track: Track & {
    album: string;
    image: string;
    timestamp?: Timestamp;
    loved: boolean;
  };
  total: Total;
};

export type TopTracks = Track[];

export type TopAlbums = Album[];

export type TopArtists = Artist[];

export type TotalStats = { total: Total };

export type TopTracksResponse = {
  track: (Omit<Track, "artist"> & {
    artist: { name: string };
  })[];
};

export type TopAlbumsResponse = {
  album: (Omit<Album, "artist" | "image"> & {
    artist: { name: string };
    image: { ["#text"]: string }[];
  })[];
};

export type TopArtistsResponse = {
  artist: Artist[];
};
