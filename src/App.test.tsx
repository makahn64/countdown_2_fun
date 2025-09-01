import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
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

  it('should display numerical values for days', () => {
    render(<App />);
    
    // Verify that numerical values are displayed (they should be positive numbers)
    const totalDaysElement = screen.getByText(/Total Days Remaining:/).nextElementSibling;
    const workDaysElement = screen.getByText(/Work Days Remaining:/).nextElementSibling;
    
    expect(totalDaysElement).toBeInTheDocument();
    expect(workDaysElement).toBeInTheDocument();
    
    // Verify they contain numbers
    expect(totalDaysElement?.textContent).toMatch(/\d+/);
    expect(workDaysElement?.textContent).toMatch(/\d+/);
  });

  it('should have dark slate background', () => {
    render(<App />);
    
    // Verify the main container has the slate background class
    const mainContainer = screen.getByText('Countdown to May 15, 2026').closest('.bg-slate-950');
    expect(mainContainer).toBeInTheDocument();
  });
});
