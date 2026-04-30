'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BalancePill } from '@/components/balance-pill';
import { WalletButton } from '@/components/wallet-button';
import { useRewardBalance } from '@/hooks/use-reward-balance';
import { useWallet } from '@/hooks/use-wallet';

export function MobileNav(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useWallet();
  const rewardBalanceQuery = useRewardBalance(session?.address ?? null);
  const navLinkClassName =
    'rounded-[22px] border border-white/10 bg-white/6 px-4 py-3 text-left text-sm font-semibold text-white/82 transition hover:border-violet/45 hover:bg-white/10';

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-violet/45"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
          />
          <div className="surface-dark fixed inset-x-4 top-20 z-40 rounded-[30px] p-4">
            <nav className="flex flex-col gap-3">
              <Link href="/campaigns" className={navLinkClassName} onClick={() => setIsOpen(false)}>
                Campaigns
              </Link>
              <Link href="/create" className={navLinkClassName} onClick={() => setIsOpen(false)}>
                Create Campaign
              </Link>
              {session ? (
                <Link href="/dashboard" className={navLinkClassName} onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              ) : null}
            </nav>
            {session?.address ? (
              <div className="mt-4 space-y-3">
                <BalancePill address={session.address} />
                <div className="rounded-[24px] border border-violet/25 bg-white/6 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-200/80">
                    Reward balance
                  </p>
                  <p className="mt-2 font-display text-xl text-white">
                    {(rewardBalanceQuery.data ?? 0).toFixed(2)} BLR
                  </p>
                </div>
              </div>
            ) : null}
            <div className="mt-4">
              <WalletButton />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
