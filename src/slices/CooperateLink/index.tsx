import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { CiPhone, CiMail } from "react-icons/ci";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { PrismicNextLink } from "@prismicio/next";
import { IconType } from "react-icons";

/**
 * Props for `CooperateLink`.
 */
export type CooperateLinkProps =
  SliceComponentProps<Content.CooperateLinkSlice>;

// Define the icon mapping
const iconComponents: Record<string, IconType> = {
  phone: CiPhone,
  linkdine: TiSocialLinkedinCircular, // Corrected key from 'Linkdine'
  email: CiMail,
  mail: CiMail,
};

/**
 * Component for "CooperateLink" Slices.
 */
const CooperateLink: FC<CooperateLinkProps> = ({ slice }) => {
  return (
    <Bounded
      id="contact"
      className="pt-[100px] w-full"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="text-center">
        {/* Heading and Subheading */}
        <div data-aos="fade-right" data-aos-delay="100" data-aos-offset="100">
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
        <div data-aos="fade-right" data-aos-delay="50" data-aos-offset="500">
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
          className="flex justify-evenly w-full bg-[#2B465B] p-8 rounded-lg"
          data-aos="fade-right"
          data-aos-delay="100"
          data-aos-offset="200"
        >
          {slice.primary.cooperate_links.map((item, index) => {
            // Handle cases where `item.icon` is null or undefined
            const iconName = item.icon?.toLowerCase() ?? ""; // Use optional chaining and nullish coalescing
            const IconComponent = iconComponents[iconName];
            return (
              <div key={index} className="flex gap-4 items-center">
                {/* Icon Link */}
                <PrismicNextLink
                  field={item.link}
                  className="rounded-full bg-[#6FDCD6] p-3 flex items-center justify-center"
                >
                  {IconComponent && <IconComponent className="text-2xl" />}
                </PrismicNextLink>

                {/* Text Content */}
                <div className="text-left">
                  <PrismicRichText
                    field={item.title}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="text-white font-semibold">{children}</p>
                      ),
                    }}
                  />
                  {item.link && (
                    <PrismicNextLink
                      field={item.link}
                      className="text-[#6FDCD6] hover:underline"
                    >
                      {item.link.text}
                    </PrismicNextLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Bounded>
  );
};

export default CooperateLink;
