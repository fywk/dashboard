import useSWR from "swr";

import fetcher from "../fetcher";
import { RecentTrack } from "../types/lastfm";

const useRecentTrack = () => {
  const { data, error } = useSWR<RecentTrack>(
    "/api/music/recent-track",
    fetcher,
    {
      refreshInterval: 30_000, // 30 seconds in milliseconds
    }
  );

  return {
    recentTrack: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useRecentTrack;
