import NowPlaying from "./NowPlaying";
import Section from "./Section";
import Statistics from "./Statistics";
import TopAlbumsGrid from "./TopAlbumsGrid";
import TopArtistsGrid from "./TopArtistsGrid";

const Music = () => {
  const SUBTITLE_STYLE = "mb-2 text-gray-600 text-sm @1.5xl/section:text-base";

  return (
    <Section title="Music" accentColor="secondary">
      <div className="grid grid-cols-1 gap-3.5 @lg/section:grid-cols-2 @lg/section:gap-x-7 @xl/section:gap-x-7.5 @1.5xl/section:gap-x-8 @2xl/section:gap-x-9">
        <div className="@container/now-playing @lg/section:order-2">
          <h3 className={SUBTITLE_STYLE}>Recently Played</h3>
          <NowPlaying />
        </div>
        <div className="@lg/section:order-1">
          <h3 className={SUBTITLE_STYLE}>
            Statistics <small className="pl-0.5">Last 7 days</small>
          </h3>
          <Statistics />
        </div>
        <div className="@lg/section:order-3 @lg/section:col-span-full">
          <h3 className={SUBTITLE_STYLE}>
            Top Artists <small className="pl-0.5">Last 30 days</small>
          </h3>
          <TopArtistsGrid />
        </div>
        <div className="w-full @lg/section:order-5 @lg/section:col-span-full">
          <h3 className={SUBTITLE_STYLE}>
            Top Albums <small className="pl-0.5">Last 90 days</small>
          </h3>
          <TopAlbumsGrid />
        </div>
      </div>
    </Section>
  );
};

export default Music;
