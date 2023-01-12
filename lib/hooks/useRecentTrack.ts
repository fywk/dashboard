import useSWR from "swr";

import fetcher from "../fetcher";
import { RecentTrack } from "../types/lastfm";

const useRecentTrack = () => {
  const { data, isLoading } = useSWR<RecentTrack>(
    "/api/music/recent-track",
    fetcher,
    {
      refreshInterval: 30_000, // 30 seconds in milliseconds
    }
  );

  return {
    recentTrack: data,
    isLoadingRecentTrack: isLoading,
  };
};

export default useRecentTrack;
