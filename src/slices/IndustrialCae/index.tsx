"use client";
import { FC, useState } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Image from "next/image";

/**
 * Props for `IndustrialCae`.
 */
export type IndustrialCaeProps =
  SliceComponentProps<Content.IndustrialCaeSlice>;

/**
 * Component for "IndustrialCae" Slices.
 */
const IndustrialCae: FC<IndustrialCaeProps> = ({ slice }) => {
  const normalizeString = (str: string) => str.toLowerCase().replace(/_/g, " ");
  return (
  <Bounded
      backgroundImage={slice.primary.backgroung_image?.url || ""}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div data-aos="fade-right" data-aos-delay="100" data-aos-offset="200">
        {/* HEADING */}
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading1: ({ children }) => (
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#6FDCD6] font-bold text-center mb-3">
                {children}
              </h2>
            ),
          }}
        />

        {/* SUB HEADING */}
        <PrismicRichText
          field={slice.primary.sub_heading}
          components={{
            paragraph: ({ children }) => (
              <p className="text-sm md:text-base lg:text-lg text-center  max-w-3xl mx-auto">
                {children}
              </p>
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
          {slice.primary.cards.map((item: any, index: any) => {
            const cardHeadingKey =
              typeof item.card_heading === "string"
                ? item.card_heading
                : (asText(item.card_heading) ?? "");

            return (
              <Card
                key={index}
                item={item}
                cardHeadingKey={cardHeadingKey}
                slicePrimary={slice.primary}
              />
            );
          })}
        </div>
      </div>
    </Bounded>

  );
};

type CardProps = {
  item: any;
  cardHeadingKey: string;
  slicePrimary: any;
};

const Card: FC<CardProps> = ({ item, cardHeadingKey, slicePrimary }) => {
  const [readMore, setReadMore] = useState(false);

  const normalizeKey = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_") // spaces → underscore
      .replace(/_+/g, "_");

  const matchedEntry = Object.entries(slicePrimary).find(
    ([key]) => normalizeKey(key) === normalizeKey(cardHeadingKey)
  );

  const listItems: any[] = Array.isArray(matchedEntry?.[1])
    ? matchedEntry![1]
    : [];

  const fullTextLength = listItems
    .map((subItem) => subItem?.label || subItem?.lable || "")
    .join(" ").length;

  const isLong = fullTextLength > 300;

  let displayedItems = listItems;
  if (isLong && !readMore) {
    let charCount = 0;
    displayedItems = [];
    for (const item of listItems) {
      const text = item?.label || item?.lable || "";
      if (charCount + text.length > 500) break;
      displayedItems.push(item);
      charCount += text.length;
    }
  }


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
          <h1 className="text-xl font-bold text-[#5AB7B5] p-2 text-center">
            {cardHeadingKey}
          </h1>

          <div className="flex-grow p-3 mb-8 overflow-hidden text-white">
            <ul className="list-disc list-inside space-y-2">
              {displayedItems.map((point, idx) => {
                return (
                  <li className="list-disc list-inside text-white">
                    <PrismicRichText
                      field={point.label}
                      components={{
                        paragraph: ({ children }) => <>{children}</>,
                      }}
                    />
                  </li>
                );
              })}
            </ul>

            {isLong && (
              <button
                className="mt-4 text-sm text-[#6FDCD6] font-semibold absolute right-3 bottom-3"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrialCae;
