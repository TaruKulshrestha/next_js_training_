
import Link from "next/link"; // Import Link for navigation between pages
import Image from "next/image"; // Import Image for optimized images
import homeImg from "public/home.jpg"; // Import the image from the public folder
import Hero from "@/app/components/hero"; // Import the Hero component

export default function Home() {
  return (
    
/*
        <div>
          <Link href="/performance">Performance</Link> 
          <Link href="/reliability">Reliability</Link>
          <Link href="/scale">Scale</Link>
        </div>
        */
    <>
      <Hero
        imgData={homeImg}
        imgAlt="Car factory"
        title="Professional cloud hosting"
      />

      <div className="max-w-5xl mx-auto px-6 py-12">
       {/* <h2 className="text-3xl font-semibold text-center mb-8">Home page</h2>*/}
        {/*<div className="text-xl text-center">Buy our product</div>*/}
      </div>
    </>
  );
}