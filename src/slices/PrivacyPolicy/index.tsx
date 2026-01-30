import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";

export type PrivacyPolicyProps = SliceComponentProps<Content.PrivacyPolicySlice>;

/**
 * Small helper:
 * - Text fields => PrismicText
 * - Rich Text fields => PrismicRichText
 *
 * (If your "heading" is Rich Text, switch PrismicText -> PrismicRichText)
 */

const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ slice }) => {
  const nonRepeated = slice.primary.non_repeated;
  const repeatable = slice.primary.repeatable;

  return (
    <Bounded
      className="py-[100px] mx-auto !w-4/5"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-7xl mx-auto pt-[50px]">
        {/* Non Repeated (one time) */}
        {Array.isArray(nonRepeated) &&

          nonRepeated.map((item, index) => (
            <div key={index} className="mb-8">
              <div className="text-5xl font-bold text-[#5AB7B5] my-4 pb-[50px]">
                {item.heading}
              </div>
              <div className="mb-10">
                {/* content should be Rich Text (paragraphs) */}
                <PrismicRichText
                  field={item.contant}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-lg mb-4">{children}</p>
                    ),
                    listItem: ({ children }) => <li className="ml-6 list-disc">{children}</li>,
                    oListItem: ({ children }) => <li className="ml-6 list-decimal">{children}</li>,
                  }}
                />
              </div>
            </div>))}

        {/* Repeatable (many sections) */}
        {Array.isArray(repeatable) &&
          repeatable.map((item, index) => (
            <div key={index} className="mb-8">
              <div className="text-2xl font-semibold mb-2">
                <PrismicText field={item.heading} />
              </div>

              <PrismicRichText
                field={item.body}
                components={{
                  paragraph: ({ children }) => <p className="mb-4">{children}</p>,
                  listItem: ({ children }) => <li className="ml-6 list-disc">{children}</li>,
                  oListItem: ({ children }) => <li className="ml-6 list-decimal">{children}</li>,
                }}
              />
            </div>
          ))}
      </div>
    </Bounded>
  );
};

export default PrivacyPolicy;