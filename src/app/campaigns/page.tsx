'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AppModePanel } from '@/components/app-mode-panel';
import { CampaignGrid } from '@/components/campaign-grid';
import { useWallet } from '@/hooks/use-wallet';
import type { CampaignStatus } from '@/types';

const filters: Array<{ label: string; value: 'all' | CampaignStatus }> = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Funded', value: 'funded' },
  { label: 'Ended', value: 'ended' },
];

export default function CampaignsPage(): JSX.Element {
  const [filter, setFilter] = useState<'all' | CampaignStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'deadline' | 'raised' | 'goal' | 'backers'>('deadline');
  const { session } = useWallet();

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-dark rounded-[34px] p-6 sm:p-8">
          <p className="eyebrow text-violet-200">Campaign index</p>
          <h1 className="mt-3 font-display text-5xl leading-none text-white">Browse every Crowdit project</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
            Scan live progress, read the brief, and jump into support without losing sight of goal, timing, or outcome.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {session ? (
              <Link
                href="/create"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-violet hover:text-white"
              >
                Create Campaign
              </Link>
            ) : (
              <span className="rounded-full border border-violet/25 bg-violet/12 px-4 py-2 text-sm font-semibold text-violet-100">
                Connect a wallet to create a campaign
              </span>
            )}
          </div>
        </div>
        <div className="glass-panel rounded-[34px] p-6 sm:p-8">
          <p className="eyebrow text-smoke">View controls</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === item.value
                    ? 'bg-violet text-white'
                    : 'border border-ink/10 bg-white text-ink hover:border-violet/45 hover:text-violet'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="glass-panel rounded-[34px] p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Search campaigns</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, description, or creator"
              className="mt-2 min-h-11 w-full rounded-[22px] border border-ink/10 bg-white px-4 py-3 text-base outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">Sort by</span>
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as 'deadline' | 'raised' | 'goal' | 'backers')
              }
              className="mt-2 min-h-11 w-full rounded-[22px] border border-ink/10 bg-white px-4 py-3 text-base outline-none"
            >
              <option value="deadline">Nearest deadline</option>
              <option value="raised">Most raised</option>
              <option value="goal">Highest goal</option>
              <option value="backers">Most backers</option>
            </select>
          </label>
        </div>
      </section>
      <AppModePanel />
      <CampaignGrid filter={filter} searchTerm={searchTerm} sortBy={sortBy} />
    </div>
  );
}
