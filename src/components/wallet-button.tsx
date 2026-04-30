'use client';

import { ToastMessage } from '@/components/toast-message';
import { useWallet } from '@/hooks/use-wallet';

export function WalletButton(): JSX.Element {
  const {
    session,
    lastWalletId,
    connectWallet,
    disconnectWallet,
    isConnecting,
    connectionLabel,
    errorMessage,
    clearWalletError,
  } = useWallet();

  if (session) {
    return (
      <>
        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-violet/25 bg-violet/12 px-4 py-2 text-sm font-semibold text-violet md:flex">
            Freighter connected
          </div>
          <button
            type="button"
            onClick={disconnectWallet}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-violet/50 hover:bg-white/10"
          >
            Disconnect
          </button>
        </div>
        {errorMessage ? (
          <ToastMessage
            variant="error"
            title="Wallet error"
            message={errorMessage}
            onDismiss={clearWalletError}
          />
        ) : null}
      </>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={async () => {
          clearWalletError();
          try {
            await connectWallet();
          } catch {
            return;
          }
        }}
        disabled={isConnecting}
        className="rounded-full bg-violet px-5 py-3 text-sm font-semibold text-white transition hover:bg-violetDeep"
      >
        {isConnecting ? 'Connecting to Freighter...' : 'Connect Freighter'}
      </button>
      {lastWalletId === 'freighter' ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
          Freighter ready
        </p>
      ) : null}
      {errorMessage ? (
        <ToastMessage
          variant="error"
          title="Wallet error"
          message={errorMessage}
          onDismiss={clearWalletError}
        />
      ) : null}
    </div>
  );
}
