import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WalletButton } from '@/components/wallet-button';
import { WalletProvider } from '@/hooks/use-wallet';

describe('WalletButton', () => {
  it('connects and disconnects through freighter', async () => {
    const user = userEvent.setup();
    Object.assign(window, { __CROWDIT_TEST_WALLET__: true });

    render(
      <WalletProvider>
        <WalletButton />
      </WalletProvider>,
    );

    await user.click(screen.getByRole('button', { name: /connect freighter/i }));

    expect(screen.getByText(/freighter connected/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /disconnect/i }));

    expect(screen.getByRole('button', { name: /connect freighter/i })).toBeInTheDocument();
  });
});
