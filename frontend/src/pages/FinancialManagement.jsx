import React, { useEffect, useState } from "react";

const FinancialManagement = () => {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [report, setReport] = useState([]);

    useEffect(() => {
        const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(savedTransactions);
    }, []);

    const addTransaction = () => {
        const newTransaction = {
            id: Date.now(),
            amount: parseFloat(amount),
            description,
            date: new Date().toLocaleDateString(),
        };

        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        setAmount('');
        setDescription('');
    };

    const generateReport = () => {
        const monthlyReport = transactions.reduce((acc, transaction) => {
            const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month] += transaction.amount;
            return acc;
        }, {});

        setReport(monthlyReport);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">إدارة المالية</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">إضافة معاملة</h2>
                <input
                    type="number"
                    placeholder="المبلغ"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border border-gray-300 p-2 rounded mr-2"
                />
                <input
                    type="text"
                    placeholder="الوصف"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 p-2 rounded mr-2"
                />
                <button 
                    onClick={addTransaction} 
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    إضافة معاملة
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">التقرير الشهري</h2>
                <button 
                    onClick={generateReport} 
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-2"
                >
                    توليد التقرير
                </button>
                <ul className="list-disc pl-5">
                    {Object.entries(report).map(([month, total]) => (
                        <li key={month}>{month}: ${total.toFixed(2)}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">المعاملات</h2>
                <ul className="list-disc pl-5">
                    {transactions.map(transaction => (
                        <li key={transaction.id}>
                            {transaction.date}: {transaction.description} - ${transaction.amount.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FinancialManagement;
