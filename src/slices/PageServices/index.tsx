"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import { Modal } from "@/components/Modal";
import { usePathname } from "next/navigation";

export type AutomotiveServicesProps =
  SliceComponentProps<Content.AutomotiveServicesSlice>;

function getLocaleFromPath(pathname: string) {
  if (pathname?.startsWith("/de")) return "de";
  return "en";
}

type ReadMoreProps = {
  text: string;
  limit?: number;
  t: {
    readMore: string;
    showLess: string;
  };
};

const ReadMore = ({ text, limit = 300, t }: ReadMoreProps) => {
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
          {expanded ? t.showLess : t.readMore}
        </span>
      )}
    </div>
  );
};

const AutomotiveServices: FC<AutomotiveServicesProps> = ({ slice }) => {
  const pathname = usePathname();
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);

  const t = useMemo(() => {
    return locale === "de"
      ? {
          readMore: "...Mehr lesen",
          showLess: "Weniger anzeigen",
          noImage: "Kein Bild verfügbar",
        }
      : {
          readMore: "...Read more",
          showLess: "Show less",
          noImage: "No Image Available",
        };
  }, [locale]);

  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  console.log(slice.primary.card);
  return (
    <>
      <Bounded
        className="py-[100px] mx-auto w-full"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        backgroundImage={slice.primary.background_image?.url || ""}
      >
        {/* Modal */}
        <Modal shouldShow={showModal} onRequestClose={() => setShowModal(false)}>
          <div
            className="w-11/12 h-4/5 md:w-[600px] md:h-[400px] lg:w-[700px] lg:h-[500px] xl:w-[900px] xl:h-[600px] grid place-items-end p-2 sm:p-3 md:p-4 xl:p-6 rounded-md"
            style={{
              backgroundImage:
                matches && selectedCard?.card_popup_background?.url
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

              <div data-aos="fade-right" data-aos-delay="50" data-aos-offset="200">
                <PrismicRichText
                  field={selectedCard?.card_popup_detail}
                  components={{
                    paragraph: () => (
                      <ReadMore
                        text={asText(selectedCard?.card_popup_detail)}
                        t={t}
                      />
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>

        {/* Main Section */}
        <div className="text-center">
          <div className="flex gap-2 justify-center">
            <h2 className="text-4xl font-bold mb-4">
              <PrismicRichText field={slice.primary.heading} />
            </h2>
            <h2 className="text-4xl font-bold text-[#6FDCD6]">
              <PrismicRichText field={slice.primary.sub_heading} />
            </h2>
          </div>
        </div>

        {/* Description */}
        <div
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-offset="200"
          className="w-4/5 mx-auto"
        >
          <PrismicRichText
            field={slice.primary.content}
            components={{
              paragraph: ({ children }) => <p className="text-white mb-8">{children}</p>,
            }}
          />
        </div>

        {/* card */}
        <div
          className={` 
            ${
              slice.primary.card.length === 2
                ? "flex justify-center"
                : slice.primary.card.length === 4
                ? "flex flex-wrap justify-center w-11/12 mx-auto"
                : slice.primary.card.length > 5
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-fit"
                : "md:grid-cols-4"
            } 
            gap-2 lg:gap-3 flex-col sm:flex-row place-items-center max-w-[1240px] mx-auto`}
          data-aos="fade-left"
          data-aos-delay="50"
          data-aos-offset="200"
        >
          {slice.primary.card.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  if (item.popup) {
                    if (!item.card_link || !("text" in item.card_link)) {
                      setSelectedCard(item);
                      setShowModal(true);
                    }
                  }
                }}
                className="rounded-lg shadow-lg hover:cursor-pointer text-white transition-colors duration-300 flex flex-col h-full w-[280px] sm:w-[300px] min-h-[310px]"
                style={{
                  background: "radial-gradient(at top center, #235683 0%, #0D2F4B 100%)",
                }}
              >
                {item.popup ? (
                  <div className="flex flex-col h-full w-full p-4">
                    {/* Card Image */}
                    {item.card_image?.url ? (
                      <div className="mb-4 mx-auto max-w-[365px] h-[180px]">
                        <Image
                          src={item.card_image.url}
                          alt={item.card_image.alt || "Card Image"}
                          width={180}
                          height={180}
                          className="object-cover rounded-md max-w-[365px] h-[180px]"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-[180px] bg-gray-700 rounded-md flex items-center justify-center">
                        <span className="text-gray-300">{t.noImage}</span>
                      </div>
                    )}

                    {/* Heading */}
                    <div className="flex-grow text-center">
                      {item.card_heading && (
                        <div className="text-xl font-bold mb-2 hover:text-[#51B0AB] text-white">
                          <PrismicRichText field={item.card_heading} />
                        </div>
                      )}
                    </div>

                    {/* ✅ Bullets inside the card item (Rich Text list) */}
                    {item.card_points && (
                      <div className="mt-2 text-gray-300 text-start">
                        <PrismicRichText field={item.card_points} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col h-full w-full p-4">
                    <PrismicNextLink field={item.card_link}>
                      {/* Card Image */}
                      {item.card_image?.url ? (
                        <div className="mb-4 mx-auto max-w-[365px] h-[180px]">
                          <Image
                            src={item.card_image.url}
                            alt={item.card_image.alt || "Card Image"}
                            width={180}
                            height={180}
                            className="object-cover rounded-md max-w-[365px] h-[180px]"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-[180px] bg-gray-700 rounded-md flex items-center justify-center">
                          <span className="text-gray-300">{t.noImage}</span>
                        </div>
                      )}

                      {/* Heading */}
                      <div className="flex-grow text-center">
                        {item.card_heading && (
                          <div className="text-xl font-bold mb-2 hover:text-[#51B0AB] text-white">
                            <PrismicRichText field={item.card_heading} />
                          </div>
                        )}
                      </div>

                    </PrismicNextLink>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Bounded>
    </>
  );
};

export default AutomotiveServices;