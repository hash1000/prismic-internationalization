"use client";
import React from "react";
import { HexGrid, Layout, Hexagon, Pattern } from "react-hexgrid";

export default function ImageMask({ image }: any) {
  const hexagonSize = { x: 25, y: 25 };
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <HexGrid width={660} height={450}>
        <defs>
          {image.map((item: any, index: number) => (
            <Pattern
              key={index}
              id={`pat-${index + 1}`}
              link={item.hexa_image.url} 
              size={hexagonSize}
            />
          ))}
        </defs>
        <Layout
          size={hexagonSize}
          flat={true}
          spacing={1.1}
          origin={{ x: -40, y: -40 }}
        >
          <Hexagon q={1} r={0} s={-1} fill="pat-1" className="custom-hexagon"/>
          <Hexagon q={2} r={0} s={-1} fill="pat-2"  className="custom-hexagon"/>
          <Hexagon q={0} r={1} s={1} fill="pat-3"  className="custom-hexagon"/>
          <Hexagon q={1} r={1} s={1} fill="pat-4"  className="custom-hexagon"/>
        </Layout>
      </HexGrid>
    </div>
  );
}
