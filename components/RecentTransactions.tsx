import React from 'react'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './uiComponents'
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'

const RecentTransactions = ({ accounts, transactions = [], appwriteItemId, page = 1 }: RecentTransactionsProps) => {
    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2>Recent Transactions</h2>
                <Link href={`/transaction-history/?id=${appwriteItemId}`} className='view-all-btn'>
                    View All
                </Link>
            </header>

            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className='recent-transactions-tablist'>
                    {accounts?.map((account: Account) => (
                        <TabsTrigger key={account.id} value={account.appwriteItemId}>
                            <BankTabItem key={account.id} account={account} appwriteItemId={appwriteItemId} />
                        </TabsTrigger>
                    ))},
                </TabsList>
                {accounts?.map((account: Account) => (
                    <TabsContent key={account.id} value={account.appwriteItemId}>
                        <BankInfo account={account} appwriteItemId={appwriteItemId} type='full' />
                        <TransactionsTable transactions={transactions} />
                    </TabsContent>
                ))}
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>

        </section>
    )
}

export default RecentTransactions