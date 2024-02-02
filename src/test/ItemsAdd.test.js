import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemAdd from '../components/ItemAdd';
import { collection, getDocs } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getDocs: jest.fn(() => ({
    docs: [
      {
        id: '1',
        data: () => ({
          itemName: 'Item 1',
          supplierId: 'SUP001',
          unitPrice: 50,
          maxQuantitySup: 100,
          storagelocation: 'Location 1',
          offers: 'Offer 1',
          description: 'Description 1',
        }),
      },
    ],
  })),
}));

test('it renders and displays item details', async () => {
  const { getByText } = render(<ItemAdd />);
  
  // Validate that the item details are displayed
  expect(getByText('Name of Item: Item 1')).toBeInTheDocument();
  expect(getByText('Supplier Id  : SUP001')).toBeInTheDocument();
  expect(getByText('Unit Price  : 50')).toBeInTheDocument();
  expect(getByText('Maximum Quantity can be Supplied at Once  : 100')).toBeInTheDocument();
  expect(getByText('Storage Location  : Location 1')).toBeInTheDocument();
  expect(getByText('Offers : Offer 1')).toBeInTheDocument();
  expect(getByText('Description of Supplier by his own : Description 1')).toBeInTheDocument();

});

test('it allows searching for items', () => {
  const { getByPlaceholderText, getByText, getByRole } = render(<ItemAdd />);
  
  const searchInput = getByPlaceholderText('Search by  Item Name ');
  fireEvent.change(searchInput, { target: { value: 'Item 1' } });

  const searchButton = getByRole('button', { name: 'Search' });
  fireEvent.click(searchButton);

  // Validate that only matching item details are displayed
  expect(getByText('Name of Item: Item 1')).toBeInTheDocument();
  expect(queryByText('Name of Item: Item 2')).toBeNull(); 

});

test('it allows resetting the search', () => {
  const { getByPlaceholderText, getByText, getByRole } = render(<ItemAdd />);
  
  const searchInput = getByPlaceholderText('Search by  Item Name ');
  fireEvent.change(searchInput, { target: { value: 'Item 1' } });

  const resetButton = getByRole('button', { name: 'Reset' });
  fireEvent.click(resetButton);

  // Validate that all item details are displayed again
  expect(getByText('Name of Item: Item 1')).toBeInTheDocument();
  expect(getByText('Name of Item: Item 2')).toBeInTheDocument(); 

});