import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Image from "next/image";

/**
 * Props for `Partners`.
 */
export type PartnersProps = SliceComponentProps<Content.PartnersSlice>;

/**
 * Component for "Partners" Slices.
 */
const Partners: FC<PartnersProps> = ({ slice }) => {
  return (
    <Bounded
      id="partners"
      className="pt-[100px] w-full"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="text-center">
        {/* Heading and Subheading */}
        <div data-aos="fade-right" data-aos-delay="50" data-aos-offset="300">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-4xl font-bold mb-4 flex justify-center items-center">
                  {children}
                  <span className="text-primary ml-3 text-[#6FDCD6]">
                    <PrismicRichText field={slice.primary.sub_headeing} />
                  </span>
                </h2>
              ),
            }}
          />
        </div>

        {/* Description */}
        <div data-aos="fade-left" data-aos-delay="50" data-aos-offset="300">
          <PrismicRichText
            field={slice.primary.contact}
            components={{
              paragraph: ({ children }) => (
                <p className="tex-white mb-8">{children}</p>
              ),
            }}
          />
        </div>

        {/* Cards Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-[80%] xl:max-w-[1140px] mx-auto"
          data-aos="fade-left"
          data-aos-delay="50"
          data-aos-offset="300"
        >
          {slice.primary.partners_card.map((item, index) => (
            <div
              key={index}
              className=" p-5 rounded-lg shadow-lg bg-white text-black flex flex-col items-center h-full text-center"
              style={{
                background:
                  "radial-gradient(at top center, #235683 0%, #0D2F4B 100%)",
              }}
            >
              {item.card_image && (
                <div className="mb-4 flex justify-center items-center w-full h-[80px]">
                  <Image
                    src={item.card_image.url || ""}
                    alt="company logo"
                    width={150}
                    height={65}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Partners;
