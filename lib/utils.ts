import { Period, PERIOD } from "./types/lastfm";

export const isValidPeriod = (period: string | null): period is Period => {
  return PERIOD.includes(period as Period);
};
