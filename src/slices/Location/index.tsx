"use client";
import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { FaLocationDot } from "react-icons/fa6";
import Map from "@/components/Map";

export type LocationProps = SliceComponentProps<Content.LocationSlice>;

const Location: FC<LocationProps> = ({ slice }) => {
  const [location, setLocation] = useState({
    latitude: slice.primary.longitude_latitude.latitude,
    longitude: slice.primary.longitude_latitude.longitude,
  });

  function Location(location: any) {
    setLocation(location);
  }

  return (
    <div className="relative">
      <Bounded
        className="pt-[100px] w-full max-w-[1920px] mx-auto"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className="text-center">
          {/* Heading and Subheading */}
          <div data-aos="fade-right" data-aos-delay="100" data-aos-offset="200">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading1: ({ children }) => (
                  <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  flex justify-center font-bold mb-4">
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
          <div data-aos="fade-right" data-aos-delay="50" data-aos-offset="200">
            <PrismicRichText
              field={slice.primary.contact}
              components={{
                paragraph: ({ children }) => (
                  <p className="tex-white mb-8">{children}</p>
                ),
              }}
            />
          </div>

          {/* Cards and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[80%] mx-auto">
            {/* Location Cards */}
            <div className="max-h-[480px] overflow-y-scroll overflow-x-hidden">
              {slice.primary.location_card.map((item, index) => {
                return (
                  <div
                    data-aos="fade-left"
                    key={index}
                    className="p-5 rounded-lg flex gap-4  mb-2 shadow-lg bg-[#2B465B] text-[#6FDCD6] items-center text-start border-l-4 border-[#6FDCD6] cursor-pointer"
                    onClick={() => Location(item.longitude_latitude)}
                  >
                    <FaLocationDot color="#6FDCD6" />
                    <div>
                      <PrismicRichText
                        field={item.title}
                        components={{
                          heading1: ({ children }) => (
                            <h1 className="text-4xl text-[#6FDCD6] font-bold mb-2">
                              {children}
                            </h1>
                          ),
                        }}
                      />
                      <div className="text-[#6FDCD6]">{item.place}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Section */}
            <div
              className="flex flex-col h-full"
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-offset="500"
            >
              <div
                className="flex justify-center items-center text-white font-bold text-4xl py-4"
                style={{
                  background:
                    "radial-gradient(at top center, #235683 0%, #0D2F4B 100%)",
                }}
              >
                Our Location
              </div>
              <div className="flex-grow">
                {location.latitude && location.longitude ? (
                  <Map
                    latitude={location.latitude}
                    longitude={location.longitude}
                  />
                ) : (
                  <p className="tex-white flex justify-center items-center h-full">
                    Location data not available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Bounded>
    </div>
  );
};

export default Location;
