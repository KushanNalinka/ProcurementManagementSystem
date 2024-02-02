import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DevideOrders from '../components/DevideOrders';

test('it should submit the form with valid input', () => {
  render(<DevideOrders />);
  
  // Fill in the input fields with valid data
  fireEvent.change(screen.getByPlaceholderText('Site Id'), { target: { value: 'SITE1234' } });
  fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'Sample Location' } });
  fireEvent.change(screen.getByPlaceholderText('Order Id'), { target: { value: 'ORDERAB1234' } });
  fireEvent.change(screen.getByPlaceholderText('Total Amount'), { target: { value: '100' } });
  fireEvent.change(screen.getByPlaceholderText('Supplier Id'), { target: { value: 'SUP1234' } });
  fireEvent.change(screen.getByPlaceholderText('Supplier Name'), { target: { value: 'Sample Supplier' } });
  fireEvent.change(screen.getByPlaceholderText('Is approved'), { target: { value: 'true' } });

  // Submit the form
  fireEvent.click(screen.getByText('Place ORDER'));

  // Assert that the form was submitted successfully
  // You can assert whatever happens after the form is submitted, e.g., redirection or success message
});

test('it should display an error message with invalid input', () => {
  render(<DevideOrders />);
  
  // Fill in the input fields with invalid data
  fireEvent.change(screen.getByPlaceholderText('Site Id'), { target: { value: 'InvalidSiteId' } });
  fireEvent.change(screen.getByPlaceholderText('Order Id'), { target: { value: 'InvalidOrderId' } });
  fireEvent.change(screen.getByPlaceholderText('Supplier Id'), { target: { value: 'InvalidSupplierId' } });

  // Submit the form
  fireEvent.click(screen.getByText('Place ORDER'));

  // Assert that error messages are displayed
  expect(screen.getByText(/Site Id must be in the format/)).toBeInTheDocument();
  expect(screen.getByText(/Order Id must be in the format/)).toBeInTheDocument();
  expect(screen.getByText(/Supplier Id must be in the format/)).toBeInTheDocument();
});
