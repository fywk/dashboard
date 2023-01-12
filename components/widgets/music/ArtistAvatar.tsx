import Image from "next/image";
import useSWR from "swr";

import fetcher from "../../../lib/fetcher";
import { ArtistImage } from "../../../lib/types/spotify";

const ArtistAvatar = ({ name }: { name: string }) => {
  const { data, isLoading } = useSWR<ArtistImage>(
    `/api/music/artist-image?name=${name}`,
    fetcher,
    {
      refreshInterval: 3_600_000, // 1 hour in milliseconds
    }
  );

  if (!data || isLoading) return null;

  return (
    <Image
      src={data.url}
      className="h-full w-full object-cover"
      width={Number(data.width)}
      height={Number(data.height)}
      alt=""
    />
  );
};

export default ArtistAvatar;
