import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Bounded from "@/components/Bounded";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq: FC<FaqProps> = ({ slice }) => {
  return (
    <>
      <Bounded
        className="py-[100px] mx-auto !w-4/5"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className="max-w-4xl mx-auto pt-[200px] pb-[50px] h-screen">
          <div className="text-center text-3xl font-bold mb-6">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                // Use a component from another file.
                heading1: ({ children }) => <h1>{children}</h1>,
              }}
            />
          </div>

          {slice.primary.faq?.map((item, index) => (
            <div key={index} className="mb-6">
              <PrismicRichText
                field={item.question}
                components={{
                  // Use a component from another file.
                  paragraph: ({ children }) => (
                    <p className="text-xl font-semibold">{children}</p>
                  ),
                }}
              />
              <PrismicRichText
                field={item.answer}
                components={{
                  // Use a component from another file.
                  heading1: ({ children }) => (
                    <p className="text-gray-700">{children}</p>
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </Bounded>

      <div className="border-b-4 border-white"></div>
    </>
  );
};

export default Faq;
