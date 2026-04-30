'use client';

import Link from 'next/link';
import { AccountMenu } from '@/components/account-menu';
import { MobileNav } from '@/components/mobile-nav';
import { WalletButton } from '@/components/wallet-button';
import { useWallet } from '@/hooks/use-wallet';

export function Navbar(): JSX.Element {
  const { session } = useWallet();
  const navLinkClassName =
    'inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/78 transition hover:border-violet/50 hover:bg-white/10 hover:text-white';

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-graphite/88 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/8 font-display text-xl text-white">
              C
            </span>
            <div>
            <Link href="/" className="font-display text-3xl font-bold text-white">
              Crowdit
            </Link>
            <p className="hidden text-xs uppercase tracking-[0.32em] text-white/45 sm:block">
              Live creator finance
            </p>
            </div>
          </div>
          <nav className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            <Link href="/campaigns" className={navLinkClassName}>
              Campaigns
            </Link>
            <Link href="/create" className={navLinkClassName}>
              Create
            </Link>
            {session ? (
              <Link href="/dashboard" className={navLinkClassName}>
                Dashboard
              </Link>
            ) : null}
          </nav>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {session ? <AccountMenu /> : <WalletButton />}
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
