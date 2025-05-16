"use client";

import { JSX, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarItem {
  icon: JSX.Element;
  label: string;
  href: string;
  active?: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" className={cn(
        "transition-colors duration-200",
        "text-indigo-600"
      )}>
        <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor" />
      </svg>
    ),
    label: "Workflows",
    href: "/workflow",
    active: true,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" className={cn(
        "transition-colors duration-200",
        "text-gray-400 group-hover:text-indigo-500"
      )}>
        <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2z" fill="currentColor"/>
      </svg>
    ),
    label: "Documents",
    href: "/documents",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" className={cn(
        "transition-colors duration-200",
        "text-gray-400 group-hover:text-indigo-500"
      )}>
        <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" fill="currentColor"/>
      </svg>
    ),
    label: "Settings",
    href: "/settings",
  },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseLeave = () => {
    if (!isDropdownOpen) {
      setIsExpanded(false);
    }
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen bg-gray-900 border-r border-gray-800 transition-all duration-300 ease-in-out z-50 flex flex-col font-sans",
        isExpanded ? "w-64" : "w-16",
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo Section */}
      <div className="px-4 py-5 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center min-w-[32px] h-8",
            "bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg shadow-lg shadow-indigo-500/20"
          )}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          {isExpanded && (
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              GPflow
            </span>
          )}
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center py-4">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            asChild
            className={cn(
              "w-[calc(100%-16px)] flex items-center px-2 py-6 mb-2 justify-start mx-2 group",
              "hover:bg-gray-800/50 rounded-lg transition-colors",
              item.active && "bg-gray-800"
            )}
          >
            <Link href={item.href}>
              <div className={cn(
                "min-w-[32px] h-8 rounded-lg flex items-center justify-center transition-colors",
                item.active ? "bg-indigo-500/20" : "bg-gray-800 group-hover:bg-gray-700"
              )}>
                {item.icon}
              </div>
              <span
                className={cn(
                  "ml-3 font-medium tracking-wide whitespace-nowrap transition-all duration-300",
                  isExpanded ? "opacity-100" : "opacity-0",
                  item.active ? "text-indigo-400" : "text-gray-400 group-hover:text-gray-300"
                )}
              >
                {item.label}
              </span>
            </Link>
          </Button>
        ))}
      </div>

      {/* Profile Section */}
      <div className="px-2 py-4 border-t border-gray-800">
        <DropdownMenu 
          open={isDropdownOpen} 
          onOpenChange={(open) => {
            setIsDropdownOpen(open);
            if (!open) {
              setIsExpanded(false);
            }
          }}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full relative flex items-center gap-3 px-2 h-12",
                !isExpanded && "justify-center",
                "hover:bg-gray-800/50 transition-colors"
              )}
            >
              <Avatar className="h-8 w-8 shrink-0 ring-2 ring-indigo-500/20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {isExpanded && (
                <span className="text-sm font-medium tracking-wide truncate text-gray-300">John Doe</span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="top"
            className="w-56 font-sans bg-gray-900 border border-gray-800"
            sideOffset={12}
          >
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 text-gray-300">
              <span className="flex items-center tracking-wide">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 text-gray-300">
              <span className="flex items-center tracking-wide">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-gray-800">
              <span className="flex items-center tracking-wide">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}