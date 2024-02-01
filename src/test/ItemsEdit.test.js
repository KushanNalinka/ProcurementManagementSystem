import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemEdit from '../components/ItemEdit';
import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getDoc: jest.fn(() => ({
    exists: true,
    data: () => ({
      itemName: 'Item 1',
      supplierId: 'SUP001',
      unitPrice: 50,
      maxQuantitySup: 100,
      storagelocation: 'Location 1',
      offers: 'Offer 1',
      description: 'Description 1',
    }),
  })),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

test('it renders and displays item details', async () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<ItemEdit />);
  
  // Validate that the item details are displayed
  expect(getByText('Name of the Item: Item 1')).toBeInTheDocument();
  expect(getByText('Name of the Supplier: SUP001')).toBeInTheDocument();
  expect(getByText('Unit Price of the Item: 50')).toBeInTheDocument();
  expect(getByText('Maximum Quantity that can be Supplied: 100')).toBeInTheDocument();
  expect(getByText('Storage Location: Location 1')).toBeInTheDocument();
  expect(getByText('Discounts from the Supplier : Offer 1')).toBeInTheDocument();
  expect(getByLabelText('Generate Item Id')).toBeInTheDocument();

});

test('it allows submitting changes', async () => {
  const { getByLabelText, getByText, getByRole } = render(<ItemEdit />);
  const submitButton = getByText('Submit');

  // Change input values
  fireEvent.change(getByLabelText('Generate Item Id'), { target: { value: 'ITEMKN1234' } });
  fireEvent.change(getByLabelText('Category'), { target: { value: 'Civil Construction' } });
  fireEvent.change(getByLabelText('Company Description of Product'), { target: { value: 'New Description' } });

  // Click the submit button
  fireEvent.click(submitButton);

  // Validate that the data is updated
  expect(addDoc).toHaveBeenCalledWith(expect.any(Object), {
    supplierId: 'SUP001',
    itemName: 'Item 1',
    maxQuantitySup: 100,
    offers: 'Offer 1',
    storagelocation: 'Location 1',
    unitPrice: 50,
    itemId: 'ITEMKN1234',
    category: 'Civil Construction',
    companydescription: 'New Description',
  });

});