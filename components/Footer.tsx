/*
File name: Footer.tsx
Author: Eunice Mendez
Date: November 21, 2026

Overview: This file shows the footer at the bottom of every page.
Inputs: It doesn't take any props. The company details are written in the file.
Processing: It arranges the company name and address on one side and the phone and email on the other using Tailwind. On a phone the
two parts stack, and on a bigger screen they are side by side.
Output: It shows the company name, address, phone, email and the copyright. The footer has the id contact, so the Contact link in
the navbar jumps to it.
*/

const Footer = () => {
  return (
    <footer id="contact" className="bg-neutral-800 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm md:flex-row md:justify-between">
        <div className="space-y-1">
          {/* company name and address */}
          <p className="text-lg font-bold text-red-600">
            Internet Movies Rental Company
          </p>
          <p>1301 16 Avenue NW, Calgary, T2M 0L4</p>
        </div>
        {/* contact details */}
        <address className="space-y-1 not-italic">
          <p>Phone: (403) 111-2222</p>
          <p>Email: movierentalcompany@imr.com</p>
        </address>
      </div>
    </footer>
  );
};

export default Footer;
