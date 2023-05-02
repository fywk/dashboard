import clsx from "clsx";

type Props = {
  title: string;
  subtitle?: React.ReactNode;
  accentColor: "primary" | "secondary";
  children: React.ReactNode;
};

const Section = ({ title, subtitle, accentColor, children }: Props) => {
  return (
    <section className="mx-auto grid w-full max-w-[800px] grid-rows-[auto_1fr] min-[1440px]:max-w-[1040px]">
      <div
        className={clsx(
          "mb-4 border-t-2 border-b py-1",
          accentColor === "primary"
            ? "[border-top-color:rgb(var(--color-primary)/.35)] [border-bottom-color:rgb(var(--color-primary)/1)]"
            : "[border-top-color:rgb(var(--color-secondary)/.35)] [border-bottom-color:rgb(var(--color-secondary)/1)]"
        )}
      >
        <div className="flex items-center justify-between px-px py-1.5">
          <h2 className="-mb-0.5 font-oxanium text-lg font-bold leading-none text-primary">
            <span className="uppercase brightness-[2.5]">{title}</span>
          </h2>
          {subtitle}
        </div>
        <div className="mb-px h-px w-full bg-primary/50"></div>
      </div>
      <div className="px-0.5 sm:px-1">{children}</div>
    </section>
  );
};

export default Section;