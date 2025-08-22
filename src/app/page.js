


import HeroSection from "@/components/Hero";
import { useSession } from "next-auth/react";
import ProductsPage from "./products/page";


export default function Home() {

 
  return (
    <div className="">
      <HeroSection/>
       <ProductsPage/>
    </div>
  );
}
