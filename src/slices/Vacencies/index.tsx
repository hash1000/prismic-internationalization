import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import { montserrat } from "@/app/font";

/**
 * Props for `Vacencies`.
 */
export type VacenciesProps = SliceComponentProps<Content.VacenciesSlice>;

/**
 * Component for "Vacencies" Slices.
 */
const Vacencies: FC<VacenciesProps> = ({ slice }) => {
  return (
    <Bounded
      id="career"
      className="pt-[100px] w-full max-w-[1240px] mx-auto"
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
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 flex justify-center flex-col sm:flex-row items-center capitalize">
                  {children}
                  <span className="text-primary sm:ml-3 text-[#6FDCD6] capitalize">
                    <PrismicRichText field={slice.primary.sub_headeing} />
                  </span>
                </h2>
              ),
            }}
          />
        </div>

        {/* Description */}
        <PrismicRichText
          field={slice.primary.conatct}
          components={{
            paragraph: ({ children }) => (
              <p className="tex-white mb-8 capitalize">{children}</p>
            ),
          }}
        />

        {/* Cards Section */}
        {slice.primary.vacency_card.length > 0 ? (
          <div
            className="grid md:grid-cols-[repeat(2,minmax(300px,350px))] xl:grid-cols-4 justify-center w-full max-w-[1240px] mx-auto  gap-4 place-items-center"
            data-aos="fade-right"
            data-aos-delay="50"
            data-aos-offset="300"
          >
            {slice.primary.vacency_card.map((item, index) => (
              <div
                key={index}
                className="rounded-lg pt-1 pb-5 px-2 min-w-[17rem] shadow-lg bg-white text-black flex flex-col justify-center items-center text-center "
                style={{
                  background:
                    "radial-gradient(at top center, #235683 0%, #0D2F4B 100%)",
                }}
              >
                {item.card_image && (
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={item.card_image.url || ""}
                      alt="person image"
                      width={203}
                      height={203}
                    />
                  </div>
                )}

                <PrismicRichText
                  field={item.card_heading}
                  components={{
                    heading1: ({ children }) => (
                      <h1 className={`text-2xl font-bold  text-[#6FDCD6] ${montserrat.className}`}>
                        {children}
                      </h1>
                    ),
                  }}
                />
                <h2 className={`text-2xl font-bold  text-[#6FDCD6] ${montserrat.className}`}>{item.card_sub_heading}</h2>
                <h3 className={`text-2xl font-bold  text-[#6FDCD6]  ${montserrat.className}`}>{item.card_label}</h3>
                {item.card_button && (
                  <PrismicNextLink
                    field={item.card_button}
                    className="inline-block text-start bg-[#6FDCD6] text-black px-4 py-2 mt-4 rounded-lg font-medium hover:bg-[#5AC1B9]"
                  >
                    Read More
                  </PrismicNextLink>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center text-xl text-[#6FDCD6] font-bold"
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-offset="300"
          >
            <p>Currently, we do not have any vacancies. Stay tuned for updates!</p>
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default Vacencies;
