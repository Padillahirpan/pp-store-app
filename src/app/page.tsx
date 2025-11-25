import Image from "next/image";
import { DarkmodeToggle } from "../components/commons/darkmode-toggle";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-muted flex flex-col justify-center items-center h-screen space-y-4">
      <h1 className="text-4xl font-semibold">Hello Jajajng</h1>
      <Link href="/admin">
        <Button className="bg-rose-400 text-white">Access Dashboard</Button>
      </Link>
    </div>
  );
}
