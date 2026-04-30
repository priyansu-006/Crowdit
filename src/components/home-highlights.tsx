'use client';

import Link from 'next/link';
import { useCampaigns } from '@/hooks/use-campaigns';
import { formatXlm, getCampaignStatus } from '@/lib/format';

export function HomeHighlights(): JSX.Element {
  const campaignsQuery = useCampaigns();

  if (campaignsQuery.isLoading) {
    return (
      <section className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="shimmer h-36 rounded-[30px] bg-white/75" />
        ))}
      </section>
    );
  }

  const campaigns = campaignsQuery.data ?? [];
  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  const activeCount = campaigns.filter((campaign) => getCampaignStatus(campaign) === 'active').length;
  const supporterCount = campaigns.reduce((sum, campaign) => sum + campaign.backers.length, 0);

  return (
    <section className="grid gap-4 md:grid-cols-[1fr_1fr_1.15fr]">
      <article className="glass-panel rounded-[30px] p-6">
        <p className="eyebrow text-smoke">Raised so far</p>
        <p className="mt-3 font-display text-4xl text-ink">{formatXlm(totalRaised)}</p>
        <p className="mt-2 text-sm text-smoke">Tracked across every campaign currently visible in Crowdit.</p>
      </article>
      <article className="glass-panel rounded-[30px] p-6">
        <p className="eyebrow text-smoke">Live campaigns</p>
        <p className="mt-3 font-display text-4xl text-ink">{activeCount}</p>
        <p className="mt-2 text-sm text-smoke">Actively raising with countdowns, progress, and refund-safe rules.</p>
      </article>
      <article className="surface-dark rounded-[30px] p-6">
        <p className="eyebrow text-violet-200">Supporter momentum</p>
        <p className="mt-3 font-display text-4xl text-white">{supporterCount}</p>
        <p className="mt-2 text-sm text-white/70">
          Backers are building public traction campaign by campaign.
        </p>
        <Link
          href="/campaigns"
          className="mt-5 inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:border-violet/50 hover:bg-white/12"
        >
          Explore activity
        </Link>
      </article>
    </section>
  );
}
