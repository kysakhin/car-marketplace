"use client";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Rock_Salt } from "next/font/google";
import Link from "next/link";

const rocksalt = Rock_Salt({ subsets: ["latin"], weight: ["400"] });

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="relative text-black lg:text-lg font-medium
              before:content-[''] before:absolute before:left-0 before:bottom-[-2px]
              before:w-0 before:h-[2px] before:bg-black before:transition-all
              before:duration-300 hover:before:w-full"
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="flex justify-between items-center px-6 py-4 h-16 border-b bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className={`text-2xl font-bold ${rocksalt.className}`}>
        Car Marketplace
      </Link>

      {/* Navigation Links */}
      <nav>
        <ul className="hidden md:flex gap-6">
          <li><NavLink href="/">Home</NavLink></li>
          <li><NavLink href="/search">Search</NavLink></li>
          <li><NavLink href="/about">About us</NavLink></li>
          <li><NavLink href="/contact">Contact us</NavLink></li>
        </ul>
      </nav>

      {/* Auth & Actions */}
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <Button>Submit a listing</Button>
            <UserButton />
          </>
        ) : (
          <div className="flex gap-2">
            <SignInButton><Button variant="outline">Sign In</Button></SignInButton>
            <SignUpButton><Button>Sign Up</Button></SignUpButton>
          </div>
        )}
      </div>
    </header>
  );
}
