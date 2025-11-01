type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "font-dmmono px-6 py-2 rounded bg-sereniteAccent text-sereniteText w-full text-center";
  return (
    <button
      className={`${base} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
