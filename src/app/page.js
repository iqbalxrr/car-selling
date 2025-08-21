
"use client";

import HeroSection from "@/components/Hero";
import { useSession } from "next-auth/react";


export default function Home() {

  const {data: session} = useSession();
  return (
    <div className="">
      <HeroSection/>
      <h1>Welcome to the Car Selling App</h1>
      {session?.user && <p>Hello, {session.user.email}</p>}
    </div>
  );
}
