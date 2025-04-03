import { FC, ReactNode, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface ModalProps {
  shouldShow: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ shouldShow, onRequestClose, children }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  if (!shouldShow) return null;

  return (
    <div
      className="fixed inset-0  flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
      onClick={onRequestClose}
    >
      <div
        className="bg-[#06263E] rounded-lg shadow-lg"
        data-aos="zoom-in"
        data-aos-duration="300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-[20px] right-4 text-xl font-bold hover:text-[#6FDCD6] text-white"
          onClick={onRequestClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};
