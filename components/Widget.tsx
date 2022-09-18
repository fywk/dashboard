import clsx from "clsx";

type Props = {
  title: string;
  accentColor: "primary" | "secondary";
  children: React.ReactNode;
};

const Widget = ({ title, accentColor, children }: Props) => {
  return (
    <div className="mx-auto grid w-full max-w-[1040px] grid-rows-[auto_1fr]">
      <h2
        className={clsx(
          "mb-4 border-t-2 border-b py-1 text-lg font-bold uppercase text-primary",
          accentColor === "primary"
            ? "[border-top-color:rgb(var(--color-primary)/.35)] [border-bottom-color:rgb(var(--color-primary)/1)]"
            : "[border-top-color:rgb(var(--color-secondary)/.35)] [border-bottom-color:rgb(var(--color-secondary)/1)]"
        )}
      >
        <span className="brightness-[2.5]">{title}</span>
        <div className="mb-px h-px bg-primary/50"></div>
      </h2>
      <div className="px-0.5 sm:px-1">{children}</div>
    </div>
  );
};

export default Widget;
