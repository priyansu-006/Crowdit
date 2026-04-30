import Link from 'next/link';

const supportedWallets = ['Freighter'];
const liveStats = [
  { label: 'Settlement rail', value: 'Stellar testnet' },
  { label: 'Support pace', value: 'Wallet-first' },
  { label: 'Creator mode', value: 'Crowd-funded' },
];

export function Hero(): JSX.Element {
  return (
    <section className="fade-in grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="surface-dark relative overflow-hidden rounded-[38px] px-6 py-12 sm:px-10 lg:px-12 lg:py-14">
        <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/10" />
        <div className="absolute bottom-[-2rem] right-[-1rem] h-44 w-44 rounded-full bg-violet/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="eyebrow text-violet-200">Broadcast support in public</p>
          <h1 className="mt-5 font-display text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Turn live ideas into campaigns people can back in seconds.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            Crowdit puts campaigns, wallet intent, and post-deadline outcomes on one sharp surface so supporters can move with confidence and creators can build visible momentum.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/campaigns"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-violet hover:text-white"
            >
              Open Campaign Index
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:border-violet/55 hover:bg-white/10"
            >
              Start a Funding Drop
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="eyebrow text-white/42">Wallet lane</span>
            {supportedWallets.map((wallet) => (
              <span
                key={wallet}
                className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm font-semibold text-white/78"
              >
                {wallet}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="glass-panel rounded-[34px] p-6 sm:p-7">
          <p className="eyebrow text-smoke">Signal stack</p>
          <div className="mt-5 space-y-4">
            {liveStats.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 border-b border-ink/8 pb-4 last:border-b-0 last:pb-0"
              >
                <p className="text-sm text-smoke">{item.label}</p>
                <p className="text-right font-semibold text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="panel-inset rounded-[34px] p-6 sm:p-7">
          <p className="eyebrow text-violet/80">How it moves</p>
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-sm font-semibold text-ink">1. Launch the brief</p>
              <p className="mt-1 text-sm leading-6 text-smoke">
                Define the story, target, and deadline in a campaign page that reads like a live brief.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">2. Capture support</p>
              <p className="mt-1 text-sm leading-6 text-smoke">
                Backers connect Freighter, confirm XLM, and see progress update without guesswork.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">3. Resolve cleanly</p>
              <p className="mt-1 text-sm leading-6 text-smoke">
                Claim and refund paths stay visible so campaign outcomes remain legible after the deadline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
