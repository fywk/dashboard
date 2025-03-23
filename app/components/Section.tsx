import clsx from "clsx";

type Props = {
  title: string | React.ReactNode;
  subtitle?: React.ReactNode;
  accentColor?: "primary" | "secondary";
  customClasses?: string;
  children: React.ReactNode;
};

export default function Section({ title, subtitle, accentColor, customClasses, children }: Props) {
  return (
    <section
      className={clsx(
        "@container/section grid w-full grid-rows-[auto_1fr] gap-y-4 2xl:gap-y-4.5",
        accentColor === "secondary" && "[--border-accent-color:var(--color-secondary)]",
        customClasses,
      )}
    >
      <div
        className={clsx(
          "border-t-2 border-b border-t-[color-mix(in_oklab,var(--border-accent-color)_35%,transparent)] [border-bottom-color:var(--border-accent-color)] py-1",
        )}
      >
        <hgroup className="flex items-center justify-between border-y border-t-transparent border-b-primary/50 px-px py-1.25 xs:px-0.5">
          <h2 className="font-oxanium text-[17px] leading-none! font-[650] text-gray-50 uppercase [text-shadow:0_0_0.5rem_var(--color-primary)] @[39rem]/quadrant:text-lg @[39rem]/section:text-lg">
            {title}
          </h2>
          {subtitle}
        </hgroup>
      </div>
      <div className="px-0.5 @[39rem]/quadrant:px-1 @[39rem]/section:px-1">{children}</div>
    </section>
  );
}
