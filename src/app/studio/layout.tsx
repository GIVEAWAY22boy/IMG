import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-premium-bg text-premium-text flex flex-col md:flex-row font-sans">
      <Sidebar />
      <main className="flex-grow p-8 md:p-12 overflow-y-auto bg-premium-bg">
        {children}
      </main>
    </div>
  );
}
