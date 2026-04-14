import React from "react";
import Link from "next/dist/client/link";

export default function Footer() {
  return (
    <footer className="py-4 container border-t mt-20">
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        Copyright ©
        <Link href="https://www.linkedin.com/in/toufiqcse36/" className="ml-1 text-primary">
          Md. Toufiqul Islam
        </Link>
      </p>
    </footer>
  );
}
