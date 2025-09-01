import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from './App';

describe('App', () => {
  test('should display countdown information', () => {
    render(<App />);
    
    // Verify countdown elements are present (get first instance if multiple)
    const countdownElements = screen.getAllByText('Countdown to May 15, 2026');
    expect(countdownElements[0]).toBeInTheDocument();
    
    const totalTimeElements = screen.getAllByText('Total Time Remaining:');
    expect(totalTimeElements[0]).toBeInTheDocument();
    
    const workTimeElements = screen.getAllByText('Work Time Remaining:');
    expect(workTimeElements[0]).toBeInTheDocument();
  });

  test('should display time in DDD:HH:MM:SS format', () => {
    render(<App />);
    
    // Verify that time values are displayed in the correct format
    const totalTimeElements = screen.getAllByText(/Total Time Remaining:/);
    const totalTimeElement = totalTimeElements[0].nextElementSibling;
    const workTimeElements = screen.getAllByText(/Work Time Remaining:/);
    const workTimeElement = workTimeElements[0].nextElementSibling;
    
    expect(totalTimeElement).toBeInTheDocument();
    expect(workTimeElement).toBeInTheDocument();
    
    // Check that the time format matches DDD:HH:MM:SS
    const totalTimeText = totalTimeElement?.textContent;
    const workTimeText = workTimeElement?.textContent;
    
    expect(totalTimeText).toMatch(/\d{3}:\d{2}:\d{2}:\d{2}/);
    expect(workTimeText).toMatch(/\d{3}:\d{2}:\d{2}:\d{2}/);
  });

  test('should display Pacific Time information', () => {
    render(<App />);
    
    // Verify Pacific Time information is displayed (get first instance if multiple)
    const pacificTimeElements = screen.getAllByText(/Updates every second • Pacific Time/);
    expect(pacificTimeElements[0]).toBeInTheDocument();
  });
});
