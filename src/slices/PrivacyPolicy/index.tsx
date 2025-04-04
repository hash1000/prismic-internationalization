import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";

/**
 * Props for `PrivacyPolicy`.
 */
export type PrivacyPolicyProps =
  SliceComponentProps<Content.PrivacyPolicySlice>;

/**
 * Component for "PrivacyPolicy" Slices.
 */
const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ slice }) => {
  return (

      <>
          <Bounded
      className="py-[100px] mx-auto !w-4/5"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
        <div className="max-w-7xl mx-auto pt-[150px] pb-[50px]">
          <div className="text-center text-3xl font-bold  my-4">
            <PrismicRichText
              field={slice.primary.label}
              components={{
                // Use a component from another file.
                heading1: ({ children }) => <h1>{children}</h1>,
              }}
            />
          </div>

          <section>
            <PrismicRichText
              field={slice.primary.contant}
              components={{
                // Use a component from another file.
                paragraph: ({ children }) => (
                  <p className="text-lg mb-4">{children}</p>
                ),
              }}
            />

            {slice.primary.privacypolicy.map((item, index) => (
              <div key={index}>
                <PrismicRichText
                  field={item.heading}
                  components={{
                    // Use a component from another file.
                    paragraph: ({ children }) => (
                      <p className="text-2xl font-semibold mb-2">{children}</p>
                    ),
                  }}
                />
                <PrismicRichText
                  field={item.description}
                  components={{
                    // Use a component from another file.
                    paragraph: ({ children }) => (
                      <p className="mb-4">{children}</p>
                    ),
                  }}
                />
              </div>
            ))}
          </section>
        </div>
        </Bounded>
        <div className="border-b-4 border-white"></div>
      </>
  );
};

export default PrivacyPolicy;
