"use client";

import { useState } from "react";
import { CreateAP } from "./components/CreateAp";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";

// async function getUserData(userId: string) {
//   const data = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     select: {
//       firstName: true,
//       lastName: true,
//       address: true,
//       email: true,
//     },
//   });

//   return data;
// }

export default function Home() {
  const [result, setResult] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const sendEmail = () => {
    setLoading(true);
    fetch('api/emails', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => setResult(data))
    .catch(error => setResult(error))
    .finally(() => setLoading(false))
  }
  // const session = await requireUser();
  // const data = await getUserData(session.user?.id as string);
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <CreateAP />

      <div className="p-4">
        <div className="my-4">
          {JSON.stringify(result)}
          {loading && <div className="my-4">Processing...</div>}

          <button onClick={sendEmail} className="bg-blue-500 rounded p-3">
            Send Email
          </button>
        </div>
      </div>
    </main>

    
  );
}
