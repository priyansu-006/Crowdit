'use client';

import { useBalance } from '@/hooks/use-balance';
import { formatXlm } from '@/lib/format';
import { LoadingSpinner } from '@/components/loading-spinner';
import { CachedAt } from '@/components/cached-at';

export function BalancePill({
  address,
}: {
  address: string | null;
}): JSX.Element | null {
  const balanceQuery = useBalance(address);

  if (!address) {
    return null;
  }

  if (balanceQuery.isLoading) {
    return (
      <div className="rounded-full border border-white/60 bg-white/80 px-4 py-3">
        <LoadingSpinner label="Fetching balance..." size="sm" />
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-white/70 bg-white/80 px-4 py-3 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/45">Wallet balance</p>
      <p className="mt-2 font-display text-xl text-ink">
        {formatXlm(balanceQuery.data ?? 0)}
      </p>
      <div className="mt-2">
        <CachedAt updatedAt={balanceQuery.dataUpdatedAt} />
      </div>
    </div>
  );
}
