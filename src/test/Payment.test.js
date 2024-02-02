import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Payment from '../components/Payment';

describe('Payment Component', () => {
  test('it should render the Payment component and submit the form with valid input', () => {
    // Render the Payment component
    render(<Payment />);

    // Fill in the input fields with valid data
    fireEvent.change(screen.getByPlaceholderText('Paying Amount'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('Account Number (e.g., 1234-5678-9012)'), { target: { value: '1234-5678-9012' } });
    fireEvent.select(screen.getByDisplayValue('BOC'));
    fireEvent.change(screen.getByPlaceholderText('Branch'), { target: { value: 'Sample Branch' } });

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    // Assert that the form was submitted successfully
    // You can check for any actions or state changes after the form submission
  });

  test('it should display error messages with invalid input', () => {
    // Render the Payment component
    render(<Payment />);

    // Fill in the input fields with invalid data
    fireEvent.change(screen.getByPlaceholderText('Paying Amount'), { target: { value: 'invalid_amount' } });
    fireEvent.change(screen.getByPlaceholderText('Account Number (e.g., 1234-5678-9012)'), { target: { value: 'invalid_account_number' } });
    fireEvent.select(screen.getByDisplayValue('BOC')); // Ensure a bank is selected
    fireEvent.change(screen.getByPlaceholderText('Branch'), { target: { value: '' } }); // Empty branch input

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    // Assert that error messages are displayed
    expect(screen.getByText('Amount is required.')).toBeInTheDocument();
    expect(screen.getByText('Invalid account number format (e.g., 1234-5678-9012).')).toBeInTheDocument();
    expect(screen.getByText('This field is required.')).toBeInTheDocument();
  });
});
