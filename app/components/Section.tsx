import clsx from "clsx";

type Props = {
  title: string | React.ReactNode;
  subtitle?: React.ReactNode;
  accentColor?: "primary" | "secondary";
  customClasses?: string;
  children: React.ReactNode;
};

const Section = ({
  title,
  subtitle,
  accentColor,
  customClasses,
  children,
}: Props) => {
  return (
    <section
      className={clsx(
        "grid w-full grid-rows-[auto_1fr] gap-y-4 @container/section min-[1440px]:gap-y-4.5",
        accentColor === "secondary" &&
          "[--border-accent-color:var(--color-secondary)]",
        customClasses
      )}
    >
      <div
        className={clsx(
          "border-b border-t-2 py-1 [border-bottom-color:rgb(var(--border-accent-color)/1)] [border-top-color:rgb(var(--border-accent-color)/.35)]"
        )}
      >
        <div className="flex items-center justify-between px-px py-1.5 @xl/section:px-0.5">
          <h2 className="-mb-px font-oxanium text-[17px] font-[650] uppercase !leading-none text-gray-50 [text-shadow:0_0_0.5rem_rgb(var(--color-primary))] @1.5xl/quadrant:text-lg @1.5xl/section:text-lg">
            {title}
          </h2>
          {subtitle}
        </div>
        <div className="mb-px h-px w-full bg-primary/50"></div>
      </div>
      <div className="px-0.5 @1.5xl/quadrant:px-1 @1.5xl/section:px-1">
        {children}
      </div>
    </section>
  );
};

export default Section;