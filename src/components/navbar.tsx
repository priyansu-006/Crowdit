'use client';

import Link from 'next/link';
import { AccountMenu } from '@/components/account-menu';
import { MobileNav } from '@/components/mobile-nav';
import { WalletButton } from '@/components/wallet-button';
import { useWallet } from '@/hooks/use-wallet';

export function Navbar(): JSX.Element {
  const { session } = useWallet();
  const navLinkClassName =
    'inline-flex items-center justify-center border-l border-ink/10 px-4 py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white';

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white">
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4 px-4 py-0 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 py-4">
            <span className="inline-flex h-11 w-11 items-center justify-center border border-ink/10 bg-ink font-display text-xl text-white">
              C
            </span>
            <div>
            <Link href="/" className="font-display text-3xl font-bold text-ink">
              Crowdit
            </Link>
            </div>
          </div>
          <nav className="hidden items-center border border-ink/10 md:flex">
            <Link href="/campaigns" className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white">
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
