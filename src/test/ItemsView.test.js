import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemsView from '../components/ItemsView';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getDocs: jest.fn(() => ({
    docs: [
      {
        id: 'item1',
        data: () => ({
          itemName: 'Item 1',
          itemId: 'ITEM001',
          category: 'Category 1',
          supplierId: 'SUP001',
          unitPrice: 50,
          maxQuantitySup: 100,
          storagelocation: 'Location 1',
          offers: 'Offer 1',
          companydescription: 'Description 1',
        }),
      },
    ],
  })),
  deleteDoc: jest.fn(),
}));

test('it renders and displays item details', async () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<ItemsView />);
  
  // Validate that the item details are displayed
  expect(getByText('Name of Item: Item 1')).toBeInTheDocument();
  expect(getByText('Item Id: ITEM001')).toBeInTheDocument();
  expect(getByText('Item Category: Category 1')).toBeInTheDocument();
  expect(getByText('Supplier Id: SUP001')).toBeInTheDocument();
  expect(getByText('Unit Price: RS. 50')).toBeInTheDocument();
  expect(getByText('Maximum Quantity can be Supplied at Once: 100')).toBeInTheDocument();
  expect(getByText('Storage Location: Location 1 Area.')).toBeInTheDocument();
  expect(getByText('Offers: Offeing Offer 1 % Discounts when buying large stuffs')).toBeInTheDocument();
  expect(getByText('Description of Item by Company about the product: Description 1')).toBeInTheDocument();

});

test('it allows deleting items', async () => {
  const { getByText } = render(<ItemsView />);
  const deleteButton = getByText('DELETE ITEM');

  // Click the delete button
  fireEvent.click(deleteButton);

  // Validate that the delete function is called with the correct item ID
  expect(deleteDoc).toHaveBeenCalledWith(expect.any(Object), 'item1');

});