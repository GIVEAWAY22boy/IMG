import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function TransactionsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ? parseInt(resolvedParams.page, 10) : 1;
  const limit = 25;
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  // Fetch count and data
  const { data: orders, error, count } = await supabaseAdmin
    .from("orders")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) {
    return (
      <div>
        <h2 className="font-serif text-3xl text-premium-text mb-8">Transactions</h2>
        <p className="text-red-500">Failed to load transactions.</p>
      </div>
    );
  }

  const totalPages = count ? Math.ceil(count / limit) : 1;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-premium-text mb-2">All Transactions</h1>
        <p className="text-premium-text/60 font-light">A complete ledger of every sale and its status.</p>
      </div>

      <div className="bg-premium-surface border border-premium-border/60 rounded-lg overflow-x-auto shadow-sm mb-6">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-premium-border/60 bg-premium-orange/5">
              <th className="p-6 text-xs uppercase tracking-widest text-premium-text/50 font-bold">Order ID</th>
              <th className="p-6 text-xs uppercase tracking-widest text-premium-text/50 font-bold">Date</th>
              <th className="p-6 text-xs uppercase tracking-widest text-premium-text/50 font-bold">Customer Email</th>
              <th className="p-6 text-xs uppercase tracking-widest text-premium-text/50 font-bold">Amount (USD)</th>
              <th className="p-6 text-xs uppercase tracking-widest text-premium-text/50 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-premium-border/30 hover:bg-premium-text/5 transition-colors">
                  <td className="p-6 text-sm font-mono text-premium-text/80">{order.session_id}</td>
                  <td className="p-6 text-sm text-premium-text/80">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-6 text-sm text-premium-text/60 truncate max-w-[150px]">
                    {order.customer_email || 'N/A'}
                  </td>
                  <td className="p-6 text-sm font-medium text-premium-orange">
                    ${order.total_amount.toFixed(2)}
                  </td>
                  <td className="p-6">
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                      order.status === 'paid' ? 'bg-green-500/10 text-green-500' : 
                      order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-12 text-center text-premium-text/50 italic">
                  No transactions found on this page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-premium-surface border border-premium-border/60 p-4 rounded-lg">
          <a
            href={page > 1 ? `/studio/transactions?page=${page - 1}` : '#'}
            className={`px-4 py-2 rounded uppercase tracking-widest text-xs font-bold ${page > 1 ? 'bg-premium-text text-white hover:bg-premium-orange' : 'bg-premium-text/10 text-premium-text/30 cursor-not-allowed'} transition-colors`}
          >
            Previous
          </a>
          <span className="text-sm font-medium text-premium-text/70">
            Page {page} of {totalPages}
          </span>
          <a
            href={page < totalPages ? `/studio/transactions?page=${page + 1}` : '#'}
            className={`px-4 py-2 rounded uppercase tracking-widest text-xs font-bold ${page < totalPages ? 'bg-premium-text text-white hover:bg-premium-orange' : 'bg-premium-text/10 text-premium-text/30 cursor-not-allowed'} transition-colors`}
          >
            Next
          </a>
        </div>
      )}
    </div>
  );
}
