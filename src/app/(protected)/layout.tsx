import NavMenu from "./_components/NavMenu";

export default function ProtectedRoutesLayout({
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
