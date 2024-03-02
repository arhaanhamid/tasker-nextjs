import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Loading from "../loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Tasker - Task Manager Homepage",
    template: "%s | Tasker App",
  },
  description: "Next.js Tasker web app to manager tasks",
};

export default function RootLayout({ children, session }) {
  return (
    <div className="container">
      <Sidebar />

      <div className={`${inter.className} content`}>
        <SessionProvider session={session}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </SessionProvider>
        <Footer />
      </div>
    </div>
  );
}
