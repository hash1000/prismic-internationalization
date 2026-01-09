"use client";
import { FC, useState, useEffect } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import { Modal } from "@/components/Modal";

export type AutomotiveServicesProps =
  SliceComponentProps<Content.AutomotiveServicesSlice>;

type ReadMoreProps = { text: string; limit?: number };

const ReadMore = ({ text, limit = 300 }: any) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const isLong = text.length > limit;
  const displayedText = expanded ? text : text.slice(0, limit);

  return (
    <div className="text-xs sm:text-sm text-white">
      {displayedText}
      {isLong && (
        <span
          onClick={() => setExpanded(!expanded)}
          className="ml-2 cursor-pointer text-[#6FDCD6] font-semibold"
        >
          {expanded ? "Show less" : "...Read more"}
        </span>
      )}
    </div>
  );
};

const AutomotiveServices: FC<AutomotiveServicesProps> = ({ slice }) => {
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const normalizeString = (str: string) => str.toLowerCase().replace(/_/g, " ");

  return (
    <>
      <Bounded
        className="py-[100px] mx-auto w-full"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        backgroundImage={slice.primary.background_image?.url || ""}
      >
        {/* Modal */}
        <Modal
          shouldShow={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <div
            className="w-11/12 h-4/5 md:w-[600px] md:h-[400px] lg:w-[700px] lg:h-[500px] xl:w-[900px] xl:h-[600px] grid place-items-end p-4 rounded-md"
            style={{
              backgroundImage: selectedCard?.card_popup_background?.url
                ? `url(${selectedCard.card_popup_background.url})`
                : "none",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="w-full">
              <PrismicRichText
                field={selectedCard?.card_popup_heading}
                components={{
                  heading1: ({ children }) => (
                    <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 text-[#6FDCD6]">
                      {children}
                    </h2>
                  ),
                }}
              />
              <ReadMore text={asText(selectedCard?.card_popup_detail)} />
            </div>
          </div>
        </Modal>

        {/* Main Section */}
        <div className="text-center">
          <PrismicRichText
            field={slice.primary.lable}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-4xl font-bold mb-4">
                  {children}
                  <span className="text-primary ml-3 text-[#6FDCD6]">
                    {slice.primary.span_lable}
                  </span>
                </h2>
              ),
            }}
          />

          <div className="w-4/5 mx-auto mb-12">
            <PrismicRichText
              field={slice.primary.content}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-white mb-8">{children}</p>
                ),
              }}
            />
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 mx-auto max-w-[1240px]">
            {slice.primary.card.map((item, index) => (
              <div key={index} className="flex justify-center">
                <div
                  className="w-4/5 bg-gradient-to-b from-[#235683] to-[#0D2F4B] rounded-md flex flex-col cursor-pointer"
                  onClick={() => {
                    if (item.popup) {
                      setSelectedCard(item);
                      setShowModal(true);
                    }
                  }}
                >
                  {/* Image */}
                  {item.card_image?.url && (
                    <div className="relative h-64 md:h-80 lg:h-96">
                      <Image
                        src={item.card_image.url}
                        alt={item.card_image.alt || "Card Image"}
                        fill
                        className="object-cover rounded-t-md"
                      />
                    </div>
                  )}

                  {/* Heading */}
                  <h1 className="text-xl font-bold text-[#5AB7B5] p-2 text-center">
                    <PrismicRichText field={item.card_heading} />
                  </h1>

                  {/* Details */}
                  <div className="flex-grow p-3 mb-3 text-white relative">
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-start">
                      {Object.entries(slice.primary).map(([key, value], i) => {
                        const cardHeadingKey = asText(item.card_heading);

                        if (
                          normalizeString(key) ===
                          normalizeString(cardHeadingKey)
                        ) {
                          return (
                            Array.isArray(value) &&
                            value.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                {(subItem as { label: string }).label}
                              </li>
                            ))
                          );
                        }
                      })}
                    </ul>
                  </div>

                  {/* Link */}
                  {item.card_link?.text && (
                    <PrismicNextLink
                      field={item.card_link}
                      className="underline text-xl text-[#56AFB0] p-3 text-center"
                    >
                      {item.card_link.text}
                    </PrismicNextLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Bounded>
      <div className="border-b-4 border-white"></div>
    </>
  );
};

export default AutomotiveServices;
