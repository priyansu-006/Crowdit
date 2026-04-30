'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { useBalance } from '@/hooks/use-balance';
import { useRewardBalance } from '@/hooks/use-reward-balance';
import { useWallet } from '@/hooks/use-wallet';
import { formatRelativeUpdate, formatXlm, truncateAddress } from '@/lib/format';

export function AccountMenu(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { session, disconnectWallet } = useWallet();
  const balanceQuery = useBalance(session?.address ?? null);
  const rewardBalanceQuery = useRewardBalance(session?.address ?? null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!session?.address) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-violet/45 hover:bg-white/10"
        aria-expanded={isOpen}
        aria-label="Open account menu"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet text-white">
          <User size={16} />
        </span>
        <span>{truncateAddress(session.address)}</span>
        <ChevronDown size={16} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen ? (
        <div className="surface-dark absolute right-0 top-[calc(100%+0.75rem)] z-50 w-80 rounded-[28px] p-4 backdrop-blur-lg">
          <div className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              Freighter connected
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-white">{session.address}</p>
          </div>

          <div className="mt-3 grid gap-3">
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                Wallet balance
              </p>
              <p className="mt-2 font-display text-2xl text-white">
                {balanceQuery.isLoading ? 'Loading...' : formatXlm(balanceQuery.data ?? 0)}
              </p>
              <p className="mt-2 text-xs text-white/55">
                Last updated: {formatRelativeUpdate(balanceQuery.dataUpdatedAt)}
              </p>
            </div>

            <div className="rounded-[24px] border border-violet/25 bg-violet/10 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-200/80">
                BLR rewards
              </p>
              <p className="mt-2 font-display text-2xl text-white">
                {rewardBalanceQuery.isLoading
                  ? 'Loading...'
                  : `${(rewardBalanceQuery.data ?? 0).toFixed(2)} BLR`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              disconnectWallet();
              setIsOpen(false);
            }}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white transition hover:border-violet/45"
          >
            <LogOut size={16} />
            Disconnect
          </button>
        </div>
      ) : null}
    </div>
  );
}
