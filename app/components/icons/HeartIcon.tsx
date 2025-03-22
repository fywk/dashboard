import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

export default function HeartIcon({ isFilled }: { isFilled: boolean }) {
  let Icon = IconHeart;

  if (isFilled) {
    Icon = IconHeartFilled;
  }

  return <Icon className="size-4.5 @[21.25rem]/now-playing:size-5" />;
}
