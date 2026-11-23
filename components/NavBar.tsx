/*
File name: NavBar.tsx
Author: Eunice Mendez
Date: November 21, 2026

Overview: This file shows the navbar at the top of every page.
Inputs: It doesn't take any props, and it doesn't check who is logged in because the navbar is static.
Processing: It arranges the logo and two links in a row using Tailwind. On a phone the items stack, and on a bigger screen they are in
one row. The Contact link is a plain anchor that jumps to the footer, which has the id contact.
Output: It shows the IMR logo, a Movies link to the home page and a Contact link to the footer.
*/

import Link from "next/link";

const NavBar = () => {
  return (
    <header className="bg-neutral-800 text-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between"
      >
        <Link href="/" className="text-2xl font-bold text-red-600">
          IMR
        </Link>

        {/* links to the movies list and the contact info */}
        <div className="flex flex-wrap gap-6 text-sm font-medium">
          <Link href="/" className="hover:underline">
            Movies
          </Link>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
