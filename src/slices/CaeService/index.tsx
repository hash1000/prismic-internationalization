"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import { asText } from "@prismicio/client";
import Link from "next/link";

/**
 * Props for `CaeService`.
 */
export type CaeServiceProps = SliceComponentProps<Content.CaeServiceSlice>;

/**
 * Component for "CaeService" and "CadService" Slices.
 */
const CaeService: FC<CaeServiceProps> = ({ slice }) => {
  const normalizeString = (str: string) => str.toLowerCase().replace(/_/g, " ");

  return (
    <>
      <Bounded
        className="pt-[100px] mx-auto w-full"
        backgroundImage={slice.primary.backgroung_image?.url || ""}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {/* Heading */}
        <div>
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-4xl font-bold mb-4 text-center">
                  {children}
                </h2>
              ),
            }}
          />
        </div>

        {/* Cards */}
        <div
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-offset="200"
          className="mx-auto max-w-[1240px] py-[100px]"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 place-content-center px-6 justify-center">
            {slice.primary.card.map((item, index) => {
              const cardHeadingKey = asText(item.card_heading);

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
      <div className="border-b-4"></div>
    </>
  );
};

type CardProps = {
  item: any;
  cardHeadingKey: string;
  slicePrimary: any;
};

const Card: FC<CardProps> = ({ item, cardHeadingKey, slicePrimary }) => {
  const [readMore, setReadMore] = useState(false);

  const normalizeString = (str: string) => str.toLowerCase().replace(/_/g, " ");

  // Get all list items for this card
  const listItems =
    Object.entries(slicePrimary).find(
      ([key]) => normalizeString(key) === normalizeString(cardHeadingKey)
    )?.[1] || [];

  // Total text length for Read More logic
  const fullTextLength = listItems
    .map((subItem: any) => subItem?.label || subItem?.lable || "")
    .join(" ").length;

  const isLong = fullTextLength > 500;

  // Determine items to display when collapsed
  let displayedItems = listItems;
  if (isLong && !readMore) {
    let charCount = 0;
    displayedItems = [];
    for (let i = 0; i < listItems.length; i++) {
      const text = listItems[i]?.label || listItems[i]?.lable || "";
      if (charCount + text.length > 500) break;
      displayedItems.push(listItems[i]);
      charCount += text.length;
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="rounded-md flex flex-col h-full w-5/6 mx-auto bg-gradient-to-b from-[#235683] to-[#0D2F4B] overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-64 md:h-72 lg:h-80">
          <Image
            src={item.card_image.url || ""}
            alt={item.card_image.alt || ""}
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow py-3 relative">
          <h1 className="text-xl font-bold text-[#5AB7B5] p-2 text-center">
            <PrismicRichText field={item.card_heading} />
          </h1>

          <div className="flex-grow p-3 mb-3 overflow-hidden text-white relative">
            <ul className="list-disc list-inside">
              {displayedItems.map((subItem: any, subIndex: number) => (
                <li key={subIndex}>{subItem?.label || subItem?.lable || ""}</li>
              ))}
            </ul>

            {/* Read More Button */}
            {isLong && (
              <button
                className="mt-5 text-sm text-[#6FDCD6] font-semibold absolute right-3 bottom-3"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read Less" : "Read More"}
              </button>
            )}
          </div>

          {/* Optional Card Link */}
          {item.card_link?.text && (
            <Link
              className="underline text-xl text-[#56AFB0] p-3"
              href={"/it-software-solution"}
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
