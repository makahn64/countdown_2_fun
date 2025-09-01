import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    // Mock timers for testing
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not display Hello World text', () => {
    render(<App />);
    
    // Verify Hello World is not present
    expect(screen.queryByText('Hello World')).not.toBeInTheDocument();
  });

  it('should display countdown information', () => {
    render(<App />);
    
    // Verify countdown elements are present
    expect(screen.getByText('Countdown to May 15, 2026')).toBeInTheDocument();
    expect(screen.getByText('Total Days Remaining:')).toBeInTheDocument();
    expect(screen.getByText('Work Days Remaining:')).toBeInTheDocument();
    expect(screen.getByText(/Excludes weekends, US federal holidays, and 20 vacation days/)).toBeInTheDocument();
  });

  it('should display numerical values with decimal places', () => {
    render(<App />);
    
    // Verify that numerical values are displayed with decimal places
    const totalDaysElement = screen.getByText(/Total Days Remaining:/).nextElementSibling;
    const workDaysElement = screen.getByText(/Work Days Remaining:/).nextElementSibling;
    
    expect(totalDaysElement).toBeInTheDocument();
    expect(workDaysElement).toBeInTheDocument();
    
    // Verify they contain numbers with decimal places
    expect(totalDaysElement?.textContent).toMatch(/\d+\.\d{2}/);
    expect(workDaysElement?.textContent).toMatch(/\d+\.\d{2}/);
  });

  it('should display Pacific Time information', () => {
    render(<App />);
    
    // Verify Pacific Time information is displayed
    expect(screen.getByText(/Updates every second • Pacific Time/)).toBeInTheDocument();
  });
});
