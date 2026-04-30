'use client';

import Link from 'next/link';
import { CampaignCollection } from '@/components/campaign-collection';
import { ConnectedOverview } from '@/components/connected-overview';
import { EmptyState } from '@/components/empty-state';
import { useRewardBalance, useRewardMetadata } from '@/hooks/use-reward-balance';
import { useUserCampaigns } from '@/hooks/use-user-campaigns';
import { useWallet } from '@/hooks/use-wallet';

export default function DashboardPage(): JSX.Element {
  const { session } = useWallet();
  const { created, backed, claimable, refundable } = useUserCampaigns();
  const rewardBalanceQuery = useRewardBalance(session?.address ?? null);
  const rewardMetadataQuery = useRewardMetadata();

  if (!session?.address) {
    return (
      <EmptyState
        eyebrow="Dashboard"
        title="Connect a wallet to unlock your Crowdit dashboard."
        description="Once connected, you will be able to review campaigns you launched, projects you backed, and any actions waiting on your account."
        ctaLabel="Browse Campaigns"
        ctaHref="/campaigns"
      />
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="surface-dark rounded-[34px] p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-violet-200">Dashboard</p>
            <h1 className="mt-2 font-display text-5xl leading-none text-white">Manage your Crowdit activity</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
              Review created campaigns, backed projects, and any claim or refund actions that are ready.
            </p>
          </div>
          <Link
            href="/create"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-violet hover:text-white"
          >
            Launch Campaign
          </Link>
        </div>
      </section>

      <ConnectedOverview />

      <section className="glass-panel rounded-[34px] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-violet/80">Rewards</p>
            <h2 className="mt-2 font-display text-3xl text-ink">Your CRD balance</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-smoke">
              Every 1 XLM backed earns 10 CRD through an on-chain inter-contract mint.
            </p>
          </div>
          <div className="panel-inset rounded-[28px] px-6 py-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet/70">
              {rewardMetadataQuery.data?.symbol ?? 'CRD'} earned
            </p>
            <p className="mt-2 font-display text-4xl text-ink">
              {(rewardBalanceQuery.data ?? 0).toFixed(2)}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-panel rounded-[30px] p-6">
          <p className="eyebrow text-smoke">Claim queue</p>
          <p className="mt-3 font-display text-4xl text-ink">{claimable.length}</p>
          <p className="mt-2 text-sm text-smoke">
            Creator campaigns that reached goal and deadline without being claimed yet.
          </p>
        </div>
        <div className="glass-panel rounded-[30px] p-6">
          <p className="eyebrow text-smoke">Refund queue</p>
          <p className="mt-3 font-display text-4xl text-ink">{refundable.length}</p>
          <p className="mt-2 text-sm text-smoke">
            Backed campaigns that missed their goal and may now be eligible for refund actions.
          </p>
        </div>
      </div>

      <CampaignCollection
        eyebrow="Created"
        title="Campaigns you launched"
        description="Keep an eye on funding progress, countdowns, and post-deadline outcomes."
        campaigns={created}
        emptyTitle="You have not launched a campaign yet."
        emptyDescription="Create your first campaign to start collecting support and track progress here."
        emptyCtaLabel="Create Campaign"
        emptyCtaHref="/create"
      />

      <CampaignCollection
        eyebrow="Backed"
        title="Campaigns you supported"
        description="Review projects you backed and check whether any post-deadline actions are available."
        campaigns={backed}
        emptyTitle="You have not backed a campaign yet."
        emptyDescription="Browse active campaigns to support creators and see your backed projects here."
        emptyCtaLabel="Browse Campaigns"
        emptyCtaHref="/campaigns"
      />
    </div>
  );
}
