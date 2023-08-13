import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-between px-6 py-6">
        <h4>Welcome to Drizzle with nest.js</h4>
        <UserButton afterSignOutUrl='/' />
      </header>
    </main>
  );
}
