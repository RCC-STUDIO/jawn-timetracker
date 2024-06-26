"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

//Styles Variables
const buttonStyle =
  "bg-blue-950 hover:bg-blue-700 hover:text-blue-950 text-white p-5 w-full text-center";
const imageStyles = "w-10 h-10 m-auto rounded-full";

export default function NavBar() {
  const { status, data: session } = useSession();

  return (
    status === "authenticated" && (
      <nav className="flex flex-row text-xl text-white w-full items-center text-center fixed bottom-0">
        <div className={buttonStyle}>
          <a href="/calendar">
            <Image
              className={imageStyles}
              src="\images\schedule.svg"
              alt="Calendar"
              width={50}
              height={50}
            />
          </a>
        </div>
        <div className={buttonStyle}>
          <a href="/">
            <Image
              className={imageStyles}
              src="\images\home.svg"
              alt="Home"
              width={50}
              height={50}
            />
          </a>
        </div>
        <div className={buttonStyle}>
          <a href="/profile">
            {session?.user?.image && (
              <Image
              className={imageStyles}
                src={session.user.image}
                alt="User Profile Image"
                width={50}
                height={50}
              />
            )}
          </a>
        </div>
      </nav>
    )
  );
}
