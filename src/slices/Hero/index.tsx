"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import { montserrat } from "@/app/font";
import SingleImageMask from "@/components/SingleImageMask";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {

  return (
    <Bounded
      id="hero"
      className=" flex justify-center lg:items-start xl:items-center"
      backgroundImage={slice.primary.backgroung_image?.url || ""}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className={`flex xl:justify-center flex-col xl:flex-row ${
          slice.primary.hexa_grid?.length > 0 && "items-center"
        } w-full sm:pt-36 lg:pt-28 relative max-w-[1920px] mx-auto min-h-[100vh] gap-3`}
        data-aos="fade-right"
        data-aos-offset="200"
      >
        <div
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-offset="200"
          className="flex flex-col px-9 ps-20 pr-9"
        >
          {/* Subheading */}
          <PrismicRichText
            field={slice.primary.sub_headeing}
            components={{
              heading1: ({ children }) => (
                <h1 className={`${montserrat.className} text-[44px] font-normal`}>
                  {children}
                </h1>
              ),
            }}
          />

          {/* Main Heading */}
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h1
                  className={`${montserrat.className} text-[80px] text-[#5AB7B5] font-bold leading-tight`}
                >
                  {children}
                </h1>
              ),
            }}
          />

          {/* Content */}
          <PrismicRichText
            field={slice.primary.contant}
            components={{
              paragraph: ({ children }) => (
                <p
                  className={`${montserrat.className} font-normal text-lg text-left`}
                >
                  {children}
                </p>
              ),
            }}
          />

          {/* Button */}
          {slice.primary.button?.text && (
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-offset="100"
              className="mt-10"
            >
              <PrismicNextLink
                field={slice.primary.button}
                className="text-[#214955] bg-[#6FDCD6] py-3 px-5 rounded-md"
              />
            </div>
          )}
        </div>

        {slice.primary.hexa_grid?.length > 0 ? (
          <>
            <div className="relative lg:max-w-[672px] min-w-[672px] mx-auto mt-52 xl:-mt-52">
              {slice.primary.hexa_grid.map((item, index) => {
                let positionClass = "";
                let size = 0;

                // Setting positions and sizes dynamically
                if (index === 0) {
                  positionClass = "absolute left-0";
                  size = 250;
                } else if (index === 1) {
                  positionClass = "absolute right-[10px]";
                  size = 250;
                } else if (index === 2) {
                  positionClass = "absolute -top-[93px] left-[30%]";
                  size = 220;
                } else if (index === 3) {
                  positionClass = "absolute top-[122px] left-[30%]";
                  size = 220;
                }

                return (
                  <div
                    key={index}
                    className={`w-full max-w-[260px] ${positionClass}`}
                  >
                    <SingleImageMask
                      size={size}
                      imgSrc={item.hexa_image?.url || ""}
                      zoom={2}
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="relative lg:max-w-[672px] min-w-[672px] mx-auto">
            <div className="flex items-center justify-center">
              <SingleImageMask
                size={400}
                imgSrc={slice.primary.header_image?.url || ""}
                zoom={2}
              />
            </div>
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default Hero;
