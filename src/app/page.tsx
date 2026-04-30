import dynamic from 'next/dynamic';
import { CampaignSkeleton } from '@/components/campaign-skeleton';
import { Hero } from '@/components/hero';
import { HomeHighlights } from '@/components/home-highlights';
import { RecentActivity } from '@/components/recent-activity';

const CampaignGrid = dynamic(
  () => import('@/components/campaign-grid').then((mod) => mod.CampaignGrid),
  {
    loading: () => (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <CampaignSkeleton key={index} />
        ))}
      </div>
    ),
  },
);

export default function HomePage(): JSX.Element {
  return (
    <div className="space-y-10">
      <Hero />
      <HomeHighlights />
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-smoke">Featured campaigns</p>
            <h2 className="mt-2 font-display text-4xl text-ink">Momentum worth backing</h2>
          </div>
        </div>
        <CampaignGrid featured />
      </section>
      <RecentActivity />
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-dark rounded-[34px] p-8">
          <p className="eyebrow text-violet-200">Built for clarity</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white">
            Campaigns stay readable before, during, and after the funding window.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">
            Crowdit keeps the live state, wallet flow, and final outcome visible instead of burying key actions behind ambiguity.
          </p>
        </div>
        <div className="glass-panel rounded-[34px] p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-display text-2xl text-ink">Transparent progress</h3>
            <p className="mt-2 text-sm leading-7 text-smoke">
              Every campaign shows clear goals, backer counts, and deadline-sensitive status.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-ink">Wallet-native flows</h3>
            <p className="mt-2 text-sm leading-7 text-smoke">
              Supporters connect a Stellar wallet, confirm intent, and get transaction feedback instantly.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-ink">Refund-safe outcomes</h3>
            <p className="mt-2 text-sm leading-7 text-smoke">
              Campaigns are designed around clear claim and refund paths once deadlines are reached.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#top"
            className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-violet/45 hover:text-violet"
          >
            Back to top
          </a>
        </div>
        </div>
      </section>
    </div>
  );
}
