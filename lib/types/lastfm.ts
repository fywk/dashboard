import type { NumericRange } from "./utility";

export type Period = "overall" | "7day" | "1month" | "3month" | "6month" | "12month";

export type Timestamp = number;

type MethodParams =
  | {
      method: "user.getrecenttracks";
      from: Timestamp | undefined;
      extended: "1";
    }
  | {
      method: "user.gettopalbums" | "user.gettopartists" | "user.gettoptracks";
      period: Period;
    };

export type Limit = NumericRange<1, 10>;

export type LastfmParams = MethodParams & { limit: Limit };

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

export type RecentTrack = Track & {
  album: string;
  image: string;
  timestamp?: Timestamp;
  loved: boolean;
};

export type TopTracks = Track[];

export type TopAlbums = Album[];

export type TopArtists = Artist[];

export type TotalStats = { total: string };
