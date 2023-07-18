import type { Period } from "@/lib/types/lastfm";

export function humanizePeriod(period: Period): string {
  switch (period) {
    case "overall":
      return "All time";
    default:
      return `Last ${convertPeriodToDays(period)} days`;
  }
}

export function convertPeriodToDays(period: Period): number {
  switch (period) {
    case "overall":
      return Infinity;
    case "7day":
      return 7;
    case "1month":
      return 30;
    case "3month":
      return 90;
    case "6month":
      return 180;
    case "12month":
      return 365;
  }
}
