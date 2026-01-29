"use client";
import { FC, useMemo, useState } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Props for `IndustrialCae`.
 */
export type IndustrialCaeProps =
  SliceComponentProps<Content.IndustrialCaeSlice>;

/** Locale helper (based on /de path) */
function getLocaleFromPath(pathname: string) {
  if (pathname?.startsWith("/de")) return "de";
  return "en";
}

/**
 * Component for "IndustrialCae" Slices.
 * ✅ New flow: bullets come from item.card_bullets, no matching keys/labels.
 */
const IndustrialCae: FC<IndustrialCaeProps> = ({ slice }) => {
  return (
    <Bounded
      backgroundImage={slice.primary.backgroung_image?.url || ""}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div data-aos="fade-right" data-aos-delay="100" data-aos-offset="200">
        {/* Heading */}
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            paragraph: ({ children }) => (
              <h1 className="text-4xl font-bold text-center mb-4">
                {children}
              </h1>
            ),
          }}
        />

        {/* Sub Heading */}
        <PrismicRichText
          field={slice.primary.sub_heading}
          components={{
            paragraph: ({ children }) => (
              <h1 className="text-sm lg:text-lg text-center max-w-3xl mx-auto">
                {children}
              </h1>
            ),
          }}
        />
      </div>

      <div
        data-aos="fade-right"
        data-aos-delay="50"
        data-aos-offset="200"
        className="mx-auto max-w-[1240px] py-[100px]"
      >
        <div className="grid gap-6 md:grid-cols-2 place-content-center px-6 justify-center">
          {slice.primary.cards.map((item: any, index: any) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </Bounded>
  );
};

type CardProps = {
  item: any;
};

const Card: FC<CardProps> = ({ item }) => {
  const [readMore, setReadMore] = useState(false);

  const pathname = usePathname();
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);

  const t = useMemo(() => {
    return locale === "de"
      ? { more: "Mehr lesen", less: "Weniger anzeigen" }
      : { more: "Read More", less: "Read Less" };
  }, [locale]);

  // ✅ Convert bullets to plain text for "Read More" decision
  const bulletsText = asText(item.card_bullets);
  const isLong = (bulletsText || "").length > 300;

  // ✅ If not readMore, we show only first ~500 chars worth of list items (same behavior as your old code)
  // But we keep the design the same: still render list using PrismicRichText.
  // The simple safe version: show full list always, and only toggle based on length.
  // (If you want strict truncation per bullet item, tell me and I’ll do it, but it requires parsing rich text nodes.)
  const shouldHide = isLong && !readMore;

  console.log(item.card_heading, "item");
  return (
    <div className="w-full flex justify-center">
      <div className="rounded-md flex flex-col h-full w-4/5 mx-auto bg-gradient-to-b from-[#235683] to-[#0D2F4B]">
        {/* IMAGE */}
        <div className="w-full relative h-64 md:h-80 lg:h-96">
          <Image
            src={item.card_image?.url || ""}
            alt={item.card_image?.alt || ""}
            fill
            className="object-cover rounded-t-md"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-grow py-3 relative">
          {/* Heading (translated per locale automatically) */}

          <h1 className="text-xl font-bold text-[#5AB7B5] p-2 text-center">
            {asText(item.card_heading)}
          </h1>

          {/* Bullets (translated per locale automatically) */}
          <div className="flex-grow p-3 mb-8 overflow-hidden text-white">
            <div className={`${shouldHide ? "max-h-[220px]" : ""} overflow-hidden`}>
              <PrismicRichText
                field={item.card_bullets}
                components={{
                  // list: ({ children }) => (
                  //   <ul className="list-disc list-inside space-y-2">{children}</ul>
                  // ),
                  oList: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2">{children}</ol>
                  ),
                  listItem: ({ children }) => (
                    <li className="list-disc list-inside text-white">{children}</li>
                  ),
                  oListItem: ({ children }) => (
                    <li className="list-decimal list-inside text-white">{children}</li>
                  ),
                  paragraph: ({ children }) => <>{children}</>,
                }}
              />
            </div>

            {isLong && (
              <button
                className="mt-4 text-sm text-[#6FDCD6] font-semibold absolute right-3 bottom-3"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? t.less : t.more}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrialCae;