export default function EqualizerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-3.25 @[21.25rem]/now-playing:size-3.75"
      id="equalizer"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <rect className="eq-bar eq-bar--1" x="4" y="4" width="3.7" height="8"></rect>
      <rect className="eq-bar eq-bar--2" x="10.2" y="4" width="3.7" height="16"></rect>
      <rect className="eq-bar eq-bar--3" x="16.3" y="4" width="3.7" height="11"></rect>
    </svg>
  );
}
