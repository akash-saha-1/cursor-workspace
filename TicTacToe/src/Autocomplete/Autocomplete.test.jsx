// Autocomplete.test.jsx

// ── CORRECT IMPORTS ──────────────────────────────────────────────────
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Autocomplete from './Autocomplete';

const MOCK_USERS = [
  { id: 1, name: 'Leanne Graham', email: 'leanne@test.com' },
  { id: 2, name: 'Ervin Howell',  email: 'ervin@test.com'  },
];

beforeEach(() => cleanup());
afterEach(() => vi.restoreAllMocks());

describe('Autocomplete', () => {

  test('shows no dropdown when input is empty', () => {
    render(<Autocomplete />);
    // Dropdown list should NOT be in the document when query is empty
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('shows error state when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network fail'));
    const user = userEvent.setup();

    render(<Autocomplete />);
    await user.type(screen.getByRole('searchbox'), 'Le');

    // waitFor polls until DOM updates after debounce + fetch
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  test('shows empty state when no users match', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });
    const user = userEvent.setup();

    render(<Autocomplete />);
    await user.type(screen.getByRole('searchbox'), 'xyz');

    await waitFor(() => {
      expect(screen.getByText(/no results/i)).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  test('shows results when users match query', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(MOCK_USERS),
    });
    const user = userEvent.setup();

    render(<Autocomplete />);
    await user.type(screen.getByRole('searchbox'), 'Le');

    await waitFor(() => {
      // role=listbox is the dropdown ul
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      // Leanne Graham matches "Le"
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  test('Escape key closes the dropdown', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(MOCK_USERS),
    });
    const user = userEvent.setup();

    render(<Autocomplete />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Le');

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    }, { timeout: 1000 });

    // Press Escape — dropdown should close
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('selecting a result fills the input', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(MOCK_USERS),
    });
    const user = userEvent.setup();

    render(<Autocomplete />);
    await user.type(screen.getByRole('searchbox'), 'Le');

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    }, { timeout: 1000 });

    // mouseDown on the option to select it
    const option = screen.getByText('Leanne Graham');
    await user.pointer({ keys: '[MouseLeft>]', target: option });

    // Input should now show the selected name
    expect(screen.getByRole('searchbox')).toHaveValue('Leanne Graham');
  });

});