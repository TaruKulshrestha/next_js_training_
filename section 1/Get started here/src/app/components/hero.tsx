import type { StaticImageData } from "next/image";
import Image from "next/image";

// Define the props for the Hero component
interface HeroProps {
  imgData: StaticImageData;
  imgAlt: string;
  title: string;
}

// Hero component
export default function Hero(props: HeroProps) {
  return (
    <div className="relative h-screen">

      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={props.imgData}
          alt={props.imgAlt}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className ="absolute inset-0 bg-graduent-to-r from-slate-900"/>
      </div>

      {/* Hero title */}
      <div className="pt-48 flex justify-center items-center">
        <h1 className="text-white text-6xl">
          {props.title}
        </h1>
      </div>

    </div>
  );
}