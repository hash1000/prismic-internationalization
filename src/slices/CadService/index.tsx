"use client";

import { FC, useMemo, useState } from "react";
import { Content, asText } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Props for CadService.
 */
export type CadServiceProps = SliceComponentProps<Content.CaeServiceSlice>;

function getLocaleFromPath(pathname: string) {
  if (pathname?.startsWith("/de")) return "de";
  return "en";
}

/**
 * Component for "CadService" Slice.
 * ✅ New flow: bullet points come from item.card_points.
 */
const CadService: FC<CadServiceProps> = ({ slice }) => {
  return (
    <Bounded
      className="pt-[100px] mx-auto w-full"
      backgroundImage={slice.primary.background_image?.url || ""}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading1: ({ children }) => (
              <h2 className="text-4xl font-bold text-center">{children}</h2>
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

  const pointsText = asText(item.card_points);
  const isLong = (pointsText || "").length > 300;

  return (
    <div className="w-full flex justify-center">
      <div className="rounded-md flex flex-col h-full w-4/5 mx-auto bg-gradient-to-b from-[#235683] to-[#0D2F4B]">
        <div className="w-full relative h-64 md:h-80 lg:h-96">
          <Image
            src={item.card_image?.url || ""}
            alt={item.card_image?.alt || ""}
            fill
            className="rounded-t-md object-cover"
          />
        </div>

        <div className="flex flex-col flex-grow py-3 relative">
          <h1 className="text-xl font-bold text-[#5AB7B5] p-2 text-center">
            <PrismicRichText field={item.card_heading} />
          </h1>

          <div className="flex-grow p-3 mb-3 overflow-hidden text-white relative">
            <div className={`${isLong && !readMore ? "max-h-[230px]" : ""} overflow-hidden my-3`}>
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

            {isLong && (
              <button
                className="mt-10 text-sm text-[#6FDCD6] font-semibold absolute right-3 bottom-0 z-30"
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

export default CadService;