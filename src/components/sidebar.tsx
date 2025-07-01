
import { Logo } from "../icons/logo";
import { Logo2 } from "../icons/logo2";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./sidebarItem";
import {  FaYoutube, FaTwitter,  } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  ytClick: boolean;
  setYtClick: React.Dispatch<React.SetStateAction<boolean>>;
  twClick: boolean;
  setTwClick: React.Dispatch<React.SetStateAction<boolean>>;
  docClick: boolean;
  setDocClick: React.Dispatch<React.SetStateAction<boolean>>;
} 

export function Sidebar( { ytClick, setYtClick, twClick, setTwClick, docClick, setDocClick }: SidebarProps) {

  return (
    <div className="fixed top-72 left-4">
    <div className="  h-auto w-16 rounded-3xl bg-gradient-to-b from-purple-600 to-purple-900/70
         shadow-lg border radius-15 border-purple-300/30 flex flex-col items-center py-6 gap-2 z-50"
         style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
         >
      <span className="">
      <SidebarItem icon={<Logo />} text="All" onClick={()=>{
        setYtClick(false);
        setTwClick(false);
        setDocClick(false);
      }} />
      </span>
      <SidebarItem icon={<FaYoutube />} text="YouTube" onClick={()=>{
        setYtClick(true);
        setTwClick(false);
        setDocClick(false);
        
      }} />
      <span className="mt-2 mb-2">
      <SidebarItem icon={<FaTwitter />} text="Twitter" onClick={()=>{
        setTwClick(true);
        setYtClick(false);
        setDocClick(false);
      }} />
      </span>
      <SidebarItem icon={<IoLinkSharp />} text="Docs"
      onClick={()=>{
        setDocClick(true);
        setTwClick(false);
        setYtClick(false);
      }} />
    </div>
    </div>
  );
}
