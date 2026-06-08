// AuthForm.test.jsx

// ── CORRECT IMPORTS ──────────────────────────────────────────────────
import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AuthForm from './AuthForm';

beforeEach(() => cleanup());

describe('AuthForm', () => {

  test('renders Step 1 with email input on mount', () => {
    render(<AuthForm />);
    // Step 1 heading visible
    expect(screen.getByRole('heading', { name: /step 1/i })).toBeInTheDocument();
    // Email input present and controlled (starts empty)
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
  });

  test('shows validation error when Continue clicked with empty email', () => {
    render(<AuthForm />);
    // Click continue without typing anything
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    // role=alert on the error span
    expect(screen.getByRole('alert')).toHaveTextContent(/email is required/i);
  });

  test('shows error for invalid email format', () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'notanemail' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
  });

  test('advances to Step 2 with valid email', () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    // Step 2 heading now visible
    expect(screen.getByRole('heading', { name: /step 2/i })).toBeInTheDocument();
  });

  test('email is preserved and displayed on Step 2', () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    // FRESHWORKS: Lifted state — email shown in Step 2
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  test('email persists in input when navigating back from Step 2', () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.click(screen.getByRole('button', { name: /back/i }));

    // Back on Step 1 — email input still has the value (lifted state works)
    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
  });

  test('shows password validation error when password is too short', () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123' }, // too short
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/6 characters/i);
  });

  test('shows success screen after valid form submission', () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Success screen shown
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

});