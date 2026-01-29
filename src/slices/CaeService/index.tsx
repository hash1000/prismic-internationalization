"use client";

import { FC, useMemo, useState } from "react";
import { Content, asText } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Props for CaeService.
 */
export type CaeServiceProps = SliceComponentProps<Content.CaeServiceSlice>;

function getLocaleFromPath(pathname: string) {
  if (pathname?.startsWith("/de")) return "de";
  return "en";
}

const CaeService: FC<CaeServiceProps> = ({ slice }) => {
  return (
    <Bounded
      className="pt-[100px] mx-auto w-full"
      backgroundImage={slice.primary.background_image?.url || ""}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Heading */}
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading1: ({ children }) => (
            <h2 className="text-4xl font-bold text-center">{children}</h2>
          ),
        }}
      />

      {/* Cards */}
      <div className="mx-auto max-w-[1240px] py-[100px]">
        <div className="grid gap-6 md:grid-cols-2 px-6">
          {slice.primary.card.map((item, index) => (
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

  // ✅ New flow: points live inside the card
  const pointsText = asText(item.card_points);
  const isLong = (pointsText || "").length > 500;

  return (
    <div className="flex justify-center">
      <div className="w-4/5 bg-gradient-to-b from-[#235683] to-[#0D2F4B] rounded-md flex flex-col">
        {/* Image */}
        <div className="relative h-64 md:h-80 lg:h-96">
          <Image
            src={item.card_image?.url || ""}
            alt={item.card_image?.alt || ""}
            fill
            className="object-cover rounded-t-md"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow py-3 relative">
          <h1 className="text-xl font-bold text-[#5AB7B5] p-2 text-center">
            <PrismicRichText field={item.card_heading} />
          </h1>

          <div className="flex-grow p-3 mb-3 text-white relative">
            {/* ✅ Keep design: list-disc list-inside */}
            <div className={`${isLong && !readMore ? "max-h-[220px]" : ""} overflow-hidden`}>
              <PrismicRichText
                field={item.card_points}
                components={{
                  list: ({ children }) => (
                    <ul className="list-disc list-inside">{children}</ul>
                  ),
                  oList: ({ children }) => (
                    <ol className="list-decimal list-inside">{children}</ol>
                  ),
                  listItem: ({ children }) => <li>{children}</li>,
                  oListItem: ({ children }) => <li>{children}</li>,
                  paragraph: ({ children }) => <>{children}</>,
                }}
              />
            </div>

            {/* Read More button */}
            {isLong && (
              <button
                className="mt-5 text-sm text-[#6FDCD6] font-semibold absolute right-3 bottom-3"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? t.less : t.more}
              </button>
            )}
          </div>

          {/* Link text (kept your design) */}
          {item.card_link?.text && (
            <Link
              href="/it-software-solution"
              className="underline text-xl text-[#56AFB0] p-3"
            >
              {item.card_link.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaeService;