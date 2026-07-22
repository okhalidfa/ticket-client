import { requireRole } from '@/lib/core/session';
import { getTransactions } from '@/lib/api/users';

export default async function TransactionHistoryPage() {
    const user = await requireRole('user');
    const transactions = (await getTransactions(user.email)) || [];

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Transaction History</h1>
            <div className="card overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                        <tr>
                            <th className="px-5 py-4">Transaction ID</th>
                            <th className="px-5 py-4">Ticket Title</th>
                            <th className="px-5 py-4">Amount</th>
                            <th className="px-5 py-4">Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                                <td className="px-5 py-4 font-mono text-xs">{transaction.transactionId}</td>
                                <td className="px-5 py-4">{transaction.ticketTitle}</td>
                                <td className="px-5 py-4 font-semibold">${transaction.amount}</td>
                                <td className="px-5 py-4">{new Date(transaction.paymentDate).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {transactions.length === 0 && (
                    <p className="p-8 text-center text-slate-500">No transactions yet.</p>
                )}
            </div>
        </div>
    );
}
