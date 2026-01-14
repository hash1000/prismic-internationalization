"use client";
import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import Image from "next/image";

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 */
const Services: FC<ServicesProps> = ({ slice }) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  return (
    <div className="sm:pt-[200px] lg:pt-[20px]">
      <div className="bg-[#51B0AB]">
        <div className="flex items-center justify-center w-full px-4 py-10 flex-col sm:flex-row">
          <Image
            src={slice.primary.iso_image.url || "/placeholder.png"}
            alt={slice.primary.iso_image.alt || "ISO Certification"}
            width={150}
            height={100}
          />

          <PrismicRichText
            field={slice.primary.iso_label}
            components={{
              heading1: ({ children }) => (
                <h1 className="text-[#06263E] text-4xl font-bold mb-4 text-center">
                  {children}
                  {
                    <PrismicRichText
                      field={slice.primary.iso_license}
                      components={{
                        paragraph: ({ children }) => (
                          <span className=" block text-5xl text-white px-4 py-2 ">
                            {children}
                          </span>
                        ),
                      }}
                    />
                  }
                </h1>
              ),
            }}
          />
          {slice.primary.tixas_image && slice.primary.tixas_image.url ? (
            <Image
              src={slice.primary.tixas_image.url}
              alt={slice.primary.tixas_image.alt ?? "TISAX Certification"}
              width={130}
              height={80}
            />
          ) : null}
        </div>
      </div>

      <div className=" w-full flex justify-center items-center my-3">
        <Image
          src={slice.primary.qr_code.url || "/placeholder.png"}
          alt={slice.primary.qr_code.alt || "QR Code"}
          width={100}
          height={100}
          className="rounded-lg"
        />
      </div>

      <Bounded
        id="services"
        className="mx-auto w-11/12
      "
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className="text-center">
          {/* Render the label */}
          <PrismicRichText
            field={slice.primary.lable}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  flex justify-center flex-col sm:flex-row font-bold mb-4">
                  {children}
                  <span className="text-primary ml-3 text-[#6FDCD6]">
                    {slice.primary.span_lable}
                  </span>
                </h2>
              ),
            }}
          />

          {/* Render the description */}
          <div data-aos="fade-right" data-aos-delay="50" data-aos-offset="200">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-white mb-8">{children}</p>
                ),
              }}
            />
          </div>

          {/* Render the cards */}
          <div
            className="grid md:grid-cols-[repeat(2,minmax(300px,350px))] xl:grid-cols-4 justify-center gap-4 place-items-center max-w-[1240px] mx-auto"
            data-aos="fade-left"
            data-aos-delay="50"
            data-aos-offset="200"
          >
            {slice.primary.card.map((item, index) => {
              return (
                <PrismicNextLink
                  key={index}
                  field={item.card_link}
                  className="md:p-3 xl:p-6 rounded-lg shadow-lg text-white transition-colors duration-300 flex flex-col h-full"
                  style={{
                    background:
                      isHovered === index
                        ? "#51B0AB"
                        : "radial-gradient(at top center, #235683 0%, #0D2F4B 100%)",
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Card Image */}
                  {item.card_image && (
                    <div className="mb-4 max-w-[270px]">
                      <Image
                        src={item.card_image.url || ""}
                        alt={item.card_image.alt || "Card Image"}
                        width={270}
                        height={180}
                        className="w-full h-auto"
                      />
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="flex-grow">
                    {item.card_heading && (
                      <div className=" text-lg md:text-2xl font-bold mb-2">
                        <PrismicRichText field={item.card_heading} />
                      </div>
                    )}
                    {item.card_sub_heading && (
                      <div className="text-lg md:text-2xl font-bold mb-2">
                        <PrismicRichText field={item.card_sub_heading} />
                      </div>
                    )}
                  </div>
                </PrismicNextLink>
              );
            })}
          </div>
        </div>
      </Bounded>
    </div>
  );
};

export default Services;
