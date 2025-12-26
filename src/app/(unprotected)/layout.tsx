import FooterMenu from "./_components/FooterMenu";
import NavMenu from "./_components/NavMenu";

export default function UnprotectedRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavMenu />
      {children}
      <FooterMenu />
    </>
  );
}
