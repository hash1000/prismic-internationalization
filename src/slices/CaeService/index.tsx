import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import { asText } from "@prismicio/client";
import Link from "next/link";

/**
 * Props for `CaeService`.
 */
export type CaeServiceProps = SliceComponentProps<Content.CaeServiceSlice>;

/**
 * Component for "CaeService" and "CadService" Slices.
 */
const CaeService: FC<CaeServiceProps> = ({ slice }) => {
  const normalizeString = (str: string) => str.toLowerCase().replace(/_/g, " ");

  return (
    <>
      <Bounded
        className="pt-[100px] mx-auto w-full"
        backgroundImage={slice.primary.backgroung_image?.url || ""}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {/* Main Section */}
        <div>
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-4xl font-bold mb-4 text-center">
                  {children}
                </h2>
              ),
            }}
          />
        </div>

        {/* Card Section */}
        <div
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-offset="200"
          className=" mx-auto max-w-[1240px] py-[100px]"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 place-content-center px-6 justify-center">
          {slice.primary.card.map((item, index) => {
            const cardHeadingKey = asText(item.card_heading);
            return (
              <div
                key={index}
                className="rounded-md flex flex-col h-full w-5/6 justify-center mx-auto" // Use h-full for equal height
                style={{
                  background:
                    "radial-gradient(at top center, #235683 0%, #0D2F4B 100%)",
                }}
              >
                <div className="w-full h-[250px] relative bg-white">
                  <Image
                    src={item.card_image.url || ""}
                    alt={item.card_image.alt || ""}
                    layout="fill" // Ensures the image fills the div completely
                    objectFit="center" // Maintains aspect ratio while covering the area
                    className="rounded-t-md"
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <h1 className="text-xl font-bold text-[#5AB7B5] p-2 text-center">
                    <PrismicRichText field={item.card_heading} />
                  </h1>
                  <div className="flex-grow overflow-y-auto min-h-[200px] p-3">
                    {Object.entries(slice.primary).map(([key, value], i) => {
                      if (
                        normalizeString(key) === normalizeString(cardHeadingKey)
                      ) {
                        return (
                          <ul
                            key={i}
                            className="list-disc list-inside text-white"
                          >
                            {Array.isArray(value) &&
                              value.map((subItem: any, subIndex) => (
                                <li key={subIndex}>
                                  {subItem?.label || subItem?.lable || ""}
                                </li>
                              ))}
                          </ul>
                        );
                      }
                    })}
                  </div>
                  {/* {item.card_link && (
                    <PrismicRichText 
                    field={item.card_link}
                            href={item.card_link?.text ?? "#"}/>
                  )} */}
                  <Link className="underline text-xl  text-[#56AFB0] p-3" href={"/it-software-solution"}>{item.card_link?.text}</Link>
                </div>
              </div>
            );
          })}

          </div>
        </div>
      </Bounded>
      <div className="border-b-4 border-white"></div>
    </>
  );
};

export default CaeService;
