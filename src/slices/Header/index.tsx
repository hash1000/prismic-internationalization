import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TopNavbar`.
 */
export type TopNavbarProps = SliceComponentProps<Content.TopNavbarSlice>;

/**
 * Component for "TopNavbar" Slices.
 */
const TopNavbar: FC<TopNavbarProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for top_navbar (variation: {slice.variation}) Slices
    </section>
  );
};

export default TopNavbar;
