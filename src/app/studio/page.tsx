import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function AdminDashboard() {
  const { data: images } = await supabase.from('images').select('id');
  const { data: orders } = await supabase.from('orders').select('id, total_amount, status, created_at').order('created_at', { ascending: false });
  
  const totalImages = images?.length || 0;
  const totalOrders = orders?.length || 0;
  
  const totalRevenue = orders?.reduce((acc, order) => {
    return acc + Number(order.total_amount);
  }, 0) || 0;

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="font-serif text-4xl text-premium-text mb-10">Studio Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-premium-surface border border-premium-border/60 rounded-xl p-8 shadow-sm">
          <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-premium-text/40 mb-2">Total Revenue</h3>
          <p className="font-serif text-5xl text-premium-orange">${totalRevenue.toFixed(2)}</p>
        </div>
        
        <div className="bg-premium-surface border border-premium-border/60 rounded-xl p-8 shadow-sm">
          <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-premium-text/40 mb-2">Total Masterpieces</h3>
          <p className="font-serif text-5xl text-premium-text">{totalImages}</p>
        </div>
        
        <div className="bg-premium-surface border border-premium-border/60 rounded-xl p-8 shadow-sm">
          <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-premium-text/40 mb-2">Lifetime Sales</h3>
          <p className="font-serif text-5xl text-premium-text">{totalOrders}</p>
        </div>
      </div>

      <h3 className="font-serif text-2xl text-premium-text mb-6">Recent Transactions</h3>
      <div className="bg-premium-surface border border-premium-border/60 rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm text-premium-text/70 min-w-[500px]">
          <thead className="bg-premium-bg border-b border-premium-border/60 text-xs uppercase tracking-widest text-premium-text/40">
            <tr>
              <th className="p-6 font-normal">Order ID</th>
              <th className="p-6 font-normal">Date</th>
              <th className="p-6 font-normal">Amount</th>
              <th className="p-6 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.slice(0, 5).map((order) => {
                const statusClass = order.status === 'paid' 
                  ? "bg-green-500/10 text-green-600 border border-green-500/20" 
                  : "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20";
                  
                return (
                  <tr key={order.id} className="border-b border-premium-border/20 hover:bg-premium-bg transition-colors">
                    <td className="p-6 font-mono text-premium-text/50">{order.id.substring(0, 8)}...</td>
                    <td className="p-6">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="p-6 text-premium-orange font-medium">${Number(order.total_amount).toFixed(2)}</td>
                    <td className="p-6">
                      <span className={"px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold " + statusClass}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center text-premium-text/40 italic">
                  No purchases found in the vault yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
