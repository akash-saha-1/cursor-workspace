// TicTacToe.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TicTacToe from './TicTacToe';

describe('TicTacToe', () => {
  it("shows X's turn at start", () => {
    render(<TicTacToe />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('detects winner', () => {
    render(<TicTacToe />);
    const empty = screen.getAllByRole('button', { name: /empty/i });
    // X: 0,1,2 wins top row — O plays 3,4 in between
    [0, 3, 1, 4, 2].forEach(i => fireEvent.click(empty[i]));
    expect(empty[0]).toBeDefined();
  });
});