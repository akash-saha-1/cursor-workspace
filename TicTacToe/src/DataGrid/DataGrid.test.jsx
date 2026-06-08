// DataGrid.test.jsx

// ── CORRECT IMPORTS ──────────────────────────────────────────────────
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DataGrid from './DataGrid';

// Helper — builds mock user array of given length
function makeMockUsers(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@test.com`,
  }));
}

beforeEach(() => cleanup());
afterEach(() => vi.restoreAllMocks());

describe('DataGrid', () => {

  test('shows loading spinner initially', () => {
    // Mock fetch that never resolves — stays in loading
    vi.spyOn(global, 'fetch').mockImplementation(
      () => new Promise(() => {})
    );
    render(<DataGrid />);
    // role=status on the loading div
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network down'));
    render(<DataGrid />);
    // waitFor polls until the DOM updates
    await waitFor(() => {
      // role=alert on the error div
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/network down/i)).toBeInTheDocument();
    });
  });

  test('shows empty state when API returns empty array', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });
    render(<DataGrid />);
    await waitFor(() => {
      expect(screen.getByText(/no data found/i)).toBeInTheDocument();
    });
  });

  test('renders table rows on success', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(makeMockUsers(5)),
    });
    render(<DataGrid />);
    await waitFor(() => {
      // table should be in the document
      expect(screen.getByRole('table')).toBeInTheDocument();
      // 5 data rows rendered
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(6); // 1 header row + 5 data rows
    });
  });

  test('Prev button is disabled on first page', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(makeMockUsers(10)),
    });
    render(<DataGrid />);
    await waitFor(() => {
      expect(screen.getByLabelText('Previous page')).toBeDisabled();
    });
  });

  test('Next button is disabled on last page', async () => {
    // Only 3 users — fits in 1 page (PAGE_SIZE = 5), so Next is disabled
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(makeMockUsers(3)),
    });
    render(<DataGrid />);
    await waitFor(() => {
      expect(screen.getByLabelText('Next page')).toBeDisabled();
    });
  });

  test('clicking Next shows next page of data', async () => {
    const user = userEvent.setup();
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(makeMockUsers(10)),
    });
    render(<DataGrid />);
    await waitFor(() => screen.getByRole('table'));

    await user.click(screen.getByLabelText('Next page'));

    expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();
  });

});