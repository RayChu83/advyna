import NavMenu from "./_components/NavMenu";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavMenu />
      {children}
    </>
  );
}
