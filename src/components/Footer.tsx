import { createClient } from "@/prismicio";
import Image from "next/image";
import React from "react";
import { CiPhone, CiMail } from "react-icons/ci";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { IconType } from "react-icons";
import { PrismicNextLink } from "@prismicio/next";
import {
  SettingsDocumentDataFooterIconItem,
  SettingsDocumentDataFooterLinkItem,
  Simplify,
} from "../../prismicio-types";
import tixasLogo from "../../public/tixas.png";
import isoLogo from "../../public/isoCertified.png";
import { getLocales } from "@/utils/getLocales";

const iconComponents: Record<string, IconType> = {
  phone: CiPhone,
  linkdine: TiSocialLinkedinCircular,
  mail: CiMail,
};

export default async function Footer({ lang }: { lang: string }) {
  const client = createClient();
  const data = await client.getSingle("settings", { lang });
  await getLocales(data, client);

  return (
    <footer className=" text-white mt-16">
      <div className="border-t-4 border-white" />

      <div className=" mx-auto px-6 py-6 flex flex-col lg:flex-row items-center gap-6">
        {/* Certifications - 20% */}
        <div className="w-full lg:max-w-[10%] flex justify-center lg:justify-start gap-4">
          <Image
            src={tixasLogo}
            alt="TISAX Certified"
            className="h-12 w-auto object-contain"
          />
          <Image
            src={isoLogo}
            alt="ISO Certified"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Footer Content - 80% */}
        <div className="w-[80%] flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Footer Logo */}
          <div>
            <Image
              src={data?.data?.footer_logo?.url ?? "/fallback-image.jpg"}
              alt="Company Logo"
              width={160}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-3">
            {data?.data?.footer_link?.length > 0 ? (
              data.data.footer_link.map((item, index) => (
                <div key={index} className="flex items-center">
                  <PrismicNextLink
                    field={item.link}
                    className="hover:text-[#6FDCD6] transition"
                  />
                  {index !== data.data.footer_link.length - 1 && (
                    <span className="mx-2 text-gray-500">|</span>
                  )}
                </div>
              ))
            ) : (
              <span className="text-gray-400">No links available</span>
            )}
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {data.data.footer_icon.map((item, index) => {
              const IconComponent =
                item.icon?.toLowerCase() &&
                iconComponents[item.icon.toLowerCase()];

              return (
                <PrismicNextLink
                  key={index}
                  href={item.link?.text ?? "#"}
                  className="bg-[#6FDCD6] text-black p-2 rounded-full hover:scale-110 transition"
                >
                  {IconComponent && <IconComponent size={18} />}
                </PrismicNextLink>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
