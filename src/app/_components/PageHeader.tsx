type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="m-0 text-[32px] font-bold leading-9 text-dark">{title}</h1>
      {subtitle ? (
        <p className="m-0 text-base font-normal leading-5 text-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
