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

const fallbackItems = [
  { label: "" },
  {
    label:
      "",
  },
  { label: "" },
];

const CaeService: FC<CaeServiceProps> = ({ slice }) => {
  return (
    <>
      <Bounded
        className="pt-[100px] mx-auto w-full"
        backgroundImage={slice.primary.backgroung_image?.url || ""}
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
              <Card
                key={index}
                item={item}
                cardHeadingKey={asText(item.card_heading)}
                slicePrimary={slice.primary}
              />
            ))}
          </div>
        </div>
      </Bounded>
      {/* <div className="border-b-4" /> */}
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

  console.log("cardHeadingKey:", cardHeadingKey);
  // Find the matching entry in slicePrimary
  const matchedEntry = Object.entries(slicePrimary).find(
    ([key]) => normalizeString(key) === normalizeString(cardHeadingKey)
  );

  const listItems: any[] = Array.isArray(matchedEntry?.[1])
    ? matchedEntry![1]
    : [];

console.log("listItems Entry:", listItems);
  // Determine if Read More button is needed
  const fullTextLength = listItems
    .map((i) => i?.label || i?.lable || "")
    .join(" ")
    .length;

  const isLong = fullTextLength > 500;

  // Calculate which items to display
  let displayedItems: any[] = [];

  if (!readMore && isLong) {
    let charCount = 0;
console.log("Full text length:", fullTextLength);
    for (let i = 0; i < listItems.length; i++) {
      const text = listItems[i]?.label || listItems[i]?.lable || "";

      console.log("Current charCount:", charCount, "Adding text length:", text.length);
        displayedItems.push(listItems[i]);
        charCount += text.length;
       
      // After first 3, stop if adding this item exceeds 500 chars
      if (charCount + text.length > 500) break;

      displayedItems.push(listItems[i]);
      charCount += text.length;
    }
  } else {
    displayedItems = listItems;
  }

  return (
    <div className="flex justify-center">
      <div className="w-4/5 bg-gradient-to-b from-[#235683] to-[#0D2F4B] rounded-md flex flex-col">
        {/* Image */}
        <div className="relative h-64 md:h-80 lg:h-96">
          <Image
            src={item.card_image.url || ""}
            alt={item.card_image.alt || ""}
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
            <ul className="list-disc list-inside">
              {displayedItems.map((subItem, i) => (
                <li key={i}>{subItem?.label || subItem?.lable}</li>
              ))}
            </ul>

            {/* Read More button */}
            {isLong && (
              <button
                className="mt-5 text-sm text-[#6FDCD6] font-semibold absolute right-3 bottom-3"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read Less" : "Read More"}
              </button>
            )}
          </div>

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
