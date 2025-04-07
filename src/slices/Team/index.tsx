"use client";
import { FC, useEffect, useState } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextLink } from "@prismicio/next";
import { RiRadioButtonFill } from "react-icons/ri";
import SingleImageMask from "@/components/SingleImageMask";
import { montserrat } from "@/app/font";

/**
 * Props for `Team`.
 */
export type TeamProps = SliceComponentProps<Content.TeamSlice>;

/**
 * Component for "Team" Slices.
 */
const Team: FC<TeamProps> = ({ slice }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Bounded
      id="team"
      className="pt-[100px] w-full px-0"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="text-center w-full">
        {/* Render the label */}
        <div data-aos="fade-right" data-aos-delay="100" data-aos-offset="200">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center">
                  {children}
                  <span className="text-primary ml-3 text-[#6FDCD6]">
                    <PrismicRichText field={slice.primary.sub_headeing} />
                  </span>
                </h2>
              ),
            }}
          />
        </div>

        {/* Render the description */}
        <div data-aos="fade-right" data-aos-delay="50" data-aos-offset="200">
          <PrismicRichText field={slice.primary.contact} />
        </div>

        {/* Render the cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full justify-center items-center mt-8">
          {slice.primary.team_card.map((item, index) => (
            <div
              key={index}
              className="p-4"
              style={{
                background: "#FFFFFF26",
              }}
            >
              {/* Card Image */}
              <div
                className="flex flex-col lg:flex-row gap-2 items-center"
                data-aos="fade-right"
                data-aos-delay="50"
                data-aos-offset="200"
              >
                {item.person_image && (
                  <div className="mb-4 w-full max-w-[260px]">
                    <SingleImageMask
                      size={200}
                      imgSrc={item.person_image.url || ""}
                      zoom={2}
                    />
                  </div>
                )}

                {/* Card Text */}
                <div className="text-start">
                  <div
                    className="text-xl font-semibold mb-2 text-start text-[#6FDCD6]"
                    data-aos="fade-left"
                    data-aos-delay="100"
                    data-aos-offset="200"
                  >
                    <PrismicRichText field={item.name} />
                  </div>
                  <div
                    className="flex gap-2 text-start text-[#39B48E] "
                    data-aos="fade-left"
                    data-aos-delay="50"
                    data-aos-offset="200"
                  >
                    <div className="flex gap-2 text-sm opacity-75">
                      <RiRadioButtonFill color="#6FDCD6" />
                      <PrismicRichText field={item.desigation} />
                    </div>
                    <div className="flex gap-2 text-sm opacity-75 text-[#39B48E]">
                      <RiRadioButtonFill color="#6FDCD6" />{" "}
                      <PrismicRichText field={item.feild} />
                    </div>
                  </div>

                  <div
                    className={`${montserrat.className} mt-2 text-sm text-start`}
                    onClick={handleToggle}
                    data-aos="fade-up"
                    data-aos-delay="50"
                    data-aos-offset="200"
                  >
                    {matches && <p>{asText(item.description)}</p>}
                    {!matches && (
                      <>
                        <p>
                          {isExpanded
                            ? asText(item.description)
                            : asText(item.description).slice(0, 200)}
                        </p>
                        <span className="text-blue-500 ml-1 underline cursor-pointer">
                          {isExpanded ? "Show less" : "Read more"}
                        </span>
                      </>
                    )}
                  </div>

                  {item.button && (
                    <PrismicNextLink
                      field={item.button}
                      className="inline-block text-start bg-[#6FDCD6] text-black px-4 py-2 mt-4 rounded-lg font-medium hover:bg-[#5AC1B9]"
                    >
                      View Profile
                    </PrismicNextLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Team;
