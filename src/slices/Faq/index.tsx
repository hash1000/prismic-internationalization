import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq: FC<FaqProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-4xl mx-auto pt-[200px] pb-[50px] h-screen">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            // Use a component from another file.
            heading1: ({ children }) => (
              <h1 className="text-3xl font-bold mb-6">{children}</h1>
            ),
          }}
        />

        {slice.primary.faq?.map((item, index) => (
          <div key={index} className="mb-6">
            <PrismicRichText
              field={item.question}
              components={{
                // Use a component from another file.
                paragraph: ({ children }) => (
                  <p className="text-xl font-semibold">{children}</p>
                )
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
      <div className="border-b-4 border-white"></div>
    </section>
  );
};

export default Faq;
