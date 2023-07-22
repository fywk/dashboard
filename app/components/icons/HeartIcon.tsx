import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

export default function HeartIcon({ isFilled }: { isFilled: boolean }) {
  let Icon = IconHeart;

  if (isFilled) {
    Icon = IconHeartFilled;
  }

  return <Icon className="h-4.5 w-4.5 @[340px]/now-playing:h-5 @[340px]/now-playing:w-5" />;
}
