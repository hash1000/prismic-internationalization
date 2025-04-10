import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { montserrat } from "../app/font";
import {
  Simplify,
  TopNavbarSliceDefaultPrimaryNavbarItem,
  TopNavbarSliceDefaultPrimaryServiceSubMenuItem,
} from "../../prismicio-types";

export default async function Header({ lang }: { lang: string }) {
  const client = createClient();
  const data = await client.getSingle("settings", { lang });

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row justify-between items-center absolute top-0 w-full z-10">
        {/* Logo */}
        <div className=" relative self-start h-20 w-36 sm:w-56 sm:h-28 md:w-60 md:h-32 lg:w-64 lg:h-36 xl:w-72 xl:h-40 aspect-[3/2]">
          <Image
            src={data.data.logo.url ?? "/fallback-image.jpg"}
            alt={data.data.logo.alt ?? "Logo"}
            fill
            className="object-contain !-top-3"
          />
        </div>

        {/* Navbar */}
        <div
          data-aos="fade-up"
          data-aos-offset="200"
          className="flex gap-3 sm:gap-4 p-5 justify-center sm:justify-end flex-wrap w-11/12"
        >
          {data.data.slices[0]?.primary.navbar.map(
            (
              item: Simplify<TopNavbarSliceDefaultPrimaryNavbarItem>,
              index: number
            ) => (
              <div key={index} className="relative group">
                {/* Main Menu Item */}
                <div className="flex gap-1 items-center">
                  <PrismicNextLink
                    field={item.link} // Only pass `field` to the `PrismicNextLink`
                    className={`${montserrat.className} text-xs sm:text-xl flex items-center gap-1 uppercase font-[600] hover:text-[#6FDCD6] hover:border-b-2 hover:border-[#6FDCD6]`}
                  />
                  {(item.link.text === "Services" ||
                    item.link.text === "Dienstleistungen") && (
                    <TiArrowSortedDown />
                  )}
                </div>

                {/* Submenu for "Services" */}
                {(item.link.text === "Services" ||
                  item.link.text === "Dienstleistungen") && (
                  <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {data.data.slices[0]?.primary?.service_sub_menu.map(
                      (
                        subItem: Simplify<TopNavbarSliceDefaultPrimaryServiceSubMenuItem>,
                        subIndex: number
                      ) => {
                        return (
                          <PrismicNextLink
                            key={subIndex}
                            field={subItem.link} // Only pass `field` to the `PrismicNextLink`
                            className="block px-4 py-2 text-black hover:bg-[#06263E] hover:text-[#6FDCD6] hover:rounded-md"
                          />
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
