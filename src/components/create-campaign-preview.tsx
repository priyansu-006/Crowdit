import { appMode } from '@/lib/env';
import { formatDeadline, formatXlm } from '@/lib/format';
import type { CampaignFormValues } from '@/types';

export function CreateCampaignPreview({
  values,
}: {
  values: CampaignFormValues;
}): JSX.Element {
  const isReady =
    values.title.trim().length > 0 &&
    values.description.trim().length > 0 &&
    values.goal > 0 &&
    values.deadline.length > 0;

  return (
    <aside className="surface-dark rounded-[34px] p-8">
      <p className="eyebrow text-violet-200">Preview</p>
      <h2 className="mt-3 font-display text-4xl text-white">
        {values.title.trim() || 'Your campaign title'}
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/70">
        {values.description.trim() ||
          'Describe what you are funding, why it matters, and what backers are helping unlock.'}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
          <p className="text-sm text-white/45">Goal</p>
          <p className="mt-2 font-display text-2xl text-white">
            {values.goal > 0 ? formatXlm(values.goal) : '0.00 XLM'}
          </p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
          <p className="text-sm text-white/45">Deadline</p>
          <p className="mt-2 font-semibold text-white">
            {values.deadline ? formatDeadline(values.deadline) : 'Choose a date'}
          </p>
        </div>
      </div>
      <div className="mt-6 rounded-[24px] border border-white/10 bg-white/6 p-5">
        <p className="text-sm font-semibold text-white">Launch checklist</p>
        <div className="mt-3 space-y-2 text-sm text-white/68">
          <p>{values.title.trim() ? 'Ready' : 'Missing'}: Clear campaign title</p>
          <p>{values.description.trim() ? 'Ready' : 'Missing'}: Full project story</p>
          <p>{values.goal > 0 ? 'Ready' : 'Missing'}: Goal amount in XLM</p>
          <p>{values.deadline ? 'Ready' : 'Missing'}: Future deadline</p>
        </div>
      </div>
      <div className="mt-6 rounded-[24px] border border-violet/20 bg-violet/10 p-4 text-sm text-violet-100">
        Launch mode: {appMode}. Until a live contract id is configured, create/back/claim/refund flows use demo transaction state.
      </div>
      {!isReady ? (
        <p className="mt-4 text-sm text-white/55">
          Fill in every field to make this preview fully representative of the published campaign.
        </p>
      ) : null}
    </aside>
  );
}
