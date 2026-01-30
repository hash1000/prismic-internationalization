import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";

/**
 * Props for `InformationObligations`.
 */
export type InformationObligationsProps =
  SliceComponentProps<Content.InformationObligationsSlice>;

/**
 * Component for "InformationObligations" Slices.
 */
const InformationObligations: FC<InformationObligationsProps> = ({ slice }) => {
  const nonRepeated = slice.primary.non_repeated;
  const repeatable = slice.primary.repeatable;

  return (
    <Bounded
      className="py-[100px] mx-auto !w-4/5"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-7xl mx-auto pt-[150px] pb-[50px]">
        {/* Non Repeated (one time) */}
        {Array.isArray(nonRepeated) &&

          nonRepeated.map((item, index) => (
            <div key={index} className="mb-8">
              <div className="text-5xl font-bold text-[#5AB7B5] my-4 pb-[50px]">
                <PrismicRichText field={item.heading} />
              </div>
              <div className="mb-10">
                {/* content should be Rich Text (paragraphs) */}
                <PrismicRichText
                  field={item.contant}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-lg mb-4">{children}</p>
                    ),
                    listItem: ({ children }) => (
                      <li className="ml-6 list-disc">{children}</li>
                    ),
                    oListItem: ({ children }) => (
                      <li className="ml-6 list-decimal">{children}</li>
                    ),
                  }}
                />
              </div>
            </div>))}

        {/* Repeatable (many sections) */}
        {Array.isArray(repeatable) &&
          repeatable.map((item, index) => (
            <div key={index} className="mt-8">
              <PrismicRichText
                field={item.heading}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="text-2xl font-semibold mb-2">{children}</h2>
                  ),
                  paragraph: ({ children }) => (
                    <p className="text-2xl font-semibold mb-2">{children}</p>
                  ),
                }}
              />

              <PrismicRichText
                field={item.body}
                components={{
                  paragraph: ({ children }) => <p className="mb-4">{children}</p>,
                  listItem: ({ children }) => (
                    <li className="ml-6 list-disc">{children}</li>
                  ),
                  oListItem: ({ children }) => (
                    <li className="ml-6 list-decimal">{children}</li>
                  ),
                }}
              />
            </div>
          ))}
      </div>
    </Bounded>
  );
};

export default InformationObligations;