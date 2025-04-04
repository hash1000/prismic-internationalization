import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TermAndCondtion`.
 */
export type TermAndCondtionProps =
  SliceComponentProps<Content.TermAndCondtionSlice>;

/**
 * Component for "TermAndCondtion" Slices.
 */
const TermAndCondtion: FC<TermAndCondtionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <>
        <div className="max-w-7xl mx-auto pt-[150px] pb-[50px]">
          <div className="text-center text-3xl font-bold my-4">
            <PrismicRichText
              field={slice.primary.label}
              components={{
                // Use a component from another file.
                heading1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-center my-4">
                    {children}
                  </h1>
                ),
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

            {slice.primary.terms_and_conditions.map((item,index) => (
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

        <div className="border-b-4 border-white"></div>
      </>
    </section>
  );
};

export default TermAndCondtion;
