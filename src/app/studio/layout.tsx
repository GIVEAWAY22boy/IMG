import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-premium-bg text-premium-text md:flex font-sans">
      <Sidebar />
      <main className="flex-grow p-6 pb-28 md:p-12 bg-premium-bg w-full">
        {children}
      </main>
    </div>
  );
}
