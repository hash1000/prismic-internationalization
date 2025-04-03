// components/HexagonImage.tsx
import React from "react";

interface HexagonImageProps {
  imgSrc: string;
  size?: number; // Optional size prop
  zoom?: number; // Zoom factor for the image inside
}

const SingleImageMask: React.FC<HexagonImageProps> = ({
  imgSrc,
  size = 260,
  zoom = 1.3,
}) => {
  return (
    <div
      className="relative mx-auto"
      style={{ width: `${size}px`, height: `${size * 0.9}px` }}
    >
      {/* Hexagon Shape */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 476.39 428.38"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient
            id="hexagon-gradient"
            x1="0"
            y1="214.19"
            x2="476.39"
            y2="214.19"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#071b2e" />
            <stop offset=".52" stopColor="#3373ab" />
            <stop offset=".57" stopColor="#2d689c" />
            <stop offset=".77" stopColor="#183e61" />
            <stop offset=".92" stopColor="#0b243c" />
            <stop offset="1" stopColor="#071b2e" />
          </linearGradient>
        </defs>
        <path
          fill="url(#hexagon-gradient)"
          d="M330.34,428.38h-184.29c-17.68,0-38.44-11.99-47.27-27.29L6.63,241.48c-8.84-15.31-8.84-39.28,0-54.59L98.78,27.29C107.61,11.99,128.38,0,146.05,0h184.29c17.68,0,38.44,11.99,47.27,27.29l92.15,159.61c8.84,15.31,8.84,39.28,0,54.59l-92.15,159.6c-8.83,15.31-29.59,27.29-47.27,27.29Z"
        />
      </svg>

      {/* Image inside hexagon */}
      <div
        className="absolute inset-0 flex justify-center items-center overflow-hidden"
        style={{
          width: "95%",
          height: "95%",
          margin: "2.5%",
          WebkitMaskImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 476.39 428.38\"><path d=\"M330.34,428.38h-184.29c-17.68,0-38.44-11.99-47.27-27.29L6.63,241.48c-8.84-15.31-8.84-39.28,0-54.59L98.78,27.29C107.61,11.99,128.38,0,146.05,0h184.29c17.68,0,38.44,11.99,47.27,27.29l92.15,159.61c8.84,15.31,8.84,39.28,0,54.59l-92.15,159.6c-8.83,15.31-29.59,27.29-47.27,27.29Z\" fill=\"black\"/></svg>')",
          WebkitMaskSize: "100% 100%",
          maskImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 476.39 428.38\"><path d=\"M330.34,428.38h-184.29c-17.68,0-38.44-11.99-47.27-27.29L6.63,241.48c-8.84-15.31-8.84-39.28,0-54.59L98.78,27.29C107.61,11.99,128.38,0,146.05,0h184.29c17.68,0,38.44,11.99,47.27,27.29l92.15,159.61c8.84,15.31,8.84,39.28,0,54.59l-92.15,159.6c-8.83,15.31-29.59,27.29-47.27,27.29Z\" fill=\"black\"/></svg>')",
          maskSize: "100% 100%",
        }}
      >
        <img
          src={imgSrc}
          alt="Hexagon Image"
          className="object-cover"
          style={{
            width: `${zoom * 100}%`,
            height: `${zoom * 100}%`,
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default SingleImageMask;