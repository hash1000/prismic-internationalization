import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Params = {
  lang: string;
};

export default async function  Layout({ children, params }: { children: React.ReactNode; params: Params }) {
  const resolvedParams = await Promise.resolve(params);
  const { lang } = resolvedParams;
  
  return (
    <>
      <Header lang={lang} />
      {children}
      <Footer lang={lang} />
    </>
  );
}
