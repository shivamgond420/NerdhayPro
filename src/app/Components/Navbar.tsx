"use client";

import React, { useEffect } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import { MenuSquare, PalmtreeIcon, TreesIcon } from "lucide-react";
import { ModeToggle } from "./Togglemode";
import { Badge } from "@/components/ui/badge";
import { menuItems } from "./lefttab";
import { usePathname } from "next/navigation";
import { cartDataSelector } from "../Featuers/Treecart/TreeSliec";
import { useSelector } from "react-redux";
import ConnectionStatus from "../lib/Connection";
import Image from "next/image";

const Navbar = () => {
  const cartItem = useSelector(cartDataSelector);
  const route = usePathname();

  if (route === "/Auth/Login") {
    return (
      <>
        <div className=""></div>
      </>
    );
  }
  if (route === "/Auth/Signup") {
    return (
      <>
        <div className=""></div>
      </>
    );
  }
  if (route === "/Auth/Resend") {
    return (
      <>
        <div className=""></div>
      </>
    );
  }
  return (
    <nav className="max-w-screen-2xl px-3 md:px-8 font-semibold flex items-center  justify-between py-3  md:py-4 border-b mb-2">
      <ConnectionStatus />
      <Link href={"/"}>
        <div className="flex space-x-2 text-sm md:text-lg">
          <span>
            <Image
              height={300}
              width={400}
              alt="https://i.postimg.cc/cHCpYFRM/plant2.png"
              src="https://i.postimg.cc/cHCpYFRM/plant2.png"
              className="w-10 h-8 "
            />
          </span>
          <div className="text-container">
            <span className="letter">Y</span>
            <span className="letter">p</span>
            <span className="letter">l</span>
            <span className="letter">a</span>
            <span className="letter">n</span>
            <span className="letter">t</span>
          </div>
        </div>
      </Link>
      <div className="flex space-x-32 items-center justify-center ">
        <div className=" hidden md:inline  ">
          <div className="justify-center items-center space-x-10 flex ">
            <span className="">About</span>

            <Link className="flex space-x-2" href="/Tree/Cart">
              <span className="relative">
                <Badge className="absolute bottom-4">{cartItem?.length}</Badge>
                <TreesIcon />
              </span>
              <span className="">Cart</span>
            </Link>
          </div>
        </div>
        <div className="space-x-1 flex">
          <ModeToggle />
          <NavigationMenu>
            <NavigationMenuItem className="md:hidden pl-8">
              <NavigationMenuTrigger>
                <MenuSquare />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className=" p-4 grid gap-4 ">
                  {menuItems.map((component) => (
                    <Link
                      className="text-sm"
                      key={component.id}
                      href={component.path}
                    >
                      <div className="flex space-x-1 items-center">
                        <span>{component.icon}</span>
                        <span>{component.label}</span>
                      </div>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
