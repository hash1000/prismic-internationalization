"use client";
import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import { asText } from "@prismicio/client";

/**
 * Props for `CaeService`.
 */
export type CaeServiceProps = SliceComponentProps<Content.CaeServiceSlice>;

/**
 * Component for "CaeService" and "CadService" Slices.
 */
const CadService: FC<CaeServiceProps> = ({ slice }) => {
  const normalizeString = (str: string) => str.toLowerCase().replace(/_/g, " ");

  return (
    <Bounded
      className="pt-[100px] mx-auto w-full"
      backgroundImage={slice.primary.backgroung_image?.url || ""}
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

  const matchedEntry = Object.entries(slicePrimary).find(
    ([key]) => normalizeString(key) === normalizeString(cardHeadingKey)
  );

  const listItems: any[] = Array.isArray(matchedEntry?.[1])
    ? matchedEntry![1]
    : [];

  // Calculate total text length
  const fullTextLength = listItems
    .map((subItem: any) => subItem?.label || subItem?.lable || "")
    .join(" ").length;

  const isLong = fullTextLength > 300;

  // Determine which items to show
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
      <div className="rounded-md flex flex-col h-full w-4/5 mx-auto bg-gradient-to-b from-[#235683] to-[#0D2F4B]">
        <div className="w-full relative h-64 md:h-80 lg:h-96">
          <Image
            src={item.card_image.url || ""}
            alt={item.card_image.alt || ""}
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
          />
        </div>
        <div className="flex flex-col flex-grow py-3 relative">
          <h1 className="text-xl font-bold text-[#5AB7B5] p-2 text-center">
            <PrismicRichText field={item.card_heading} />
          </h1>
          <div className="flex-grow p-3 mb-3 overflow-hidden text-white">
            <ul className="list-disc list-inside">
              {displayedItems.map((subItem: any, subIndex: number) => (
                <li key={subIndex}>{subItem?.label || subItem?.lable || ""}</li>
              ))}
            </ul>
            {isLong && (
              <button
                className="mt-5 text-sm text-[#6FDCD6] font-semibold absolute right-3 bottom-3"
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

export default CadService;
