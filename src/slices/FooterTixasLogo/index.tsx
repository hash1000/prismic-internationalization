import { FC } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import Image from "next/image";

export type FooterTixasProps =
  SliceComponentProps<Content.FooterTixasSlice>;

const FooterTixas: FC<FooterTixasProps> = ({ slice }) => {
  const logo = slice.primary.tixas_footer;

  return (
    <section
      data-slice-type={slice.slice_type}
      className="border-t border-white/10 bg-[#061C33]"
    >
      <div className="max-w-7xl mx-auto py-10 flex flex-col items-center text-center gap-4">
        
        {/* Logo */}
        {logo?.url && (
          <Image
            src={logo.url}
            alt={logo.alt || "TISAX Certification"}
            width={160}
            height={70}
            className="opacity-90"
          />
        )}

        {/* Trademark */}
        <p className="text-xs text-gray-500">
          TISAX® is a registered trademark of ENX Association.
        </p>
      </div>
    </section>
  );
};

export default FooterTixas;
