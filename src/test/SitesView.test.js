import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SitesView from '../components/SitesView';
import { collection, getDocs } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getDocs: jest.fn(() => ({
    docs: [
      {
        id: '1',
        data: () => ({
          siteid: 'SITE0001',
          sitename: 'Mahaweli Construction',
          location: 'Polonnaruwa',
          cost: 1200,
          siteheadid: 'SITE0001',
          startdate: '2000',
          enddate: '2022',
          description: 'A construction project of world bank',
        }),
      },
    ],
  })),
}));

test('it renders and displays site details', async () => {
  const { getByText } = render(<SitesView />);
  
  // Validate that the site details are displayed
  expect(getByText('Site Id : SITE0001')).toBeInTheDocument();
  expect(getByText('Site Name : Mahaweli Construction')).toBeInTheDocument();
  expect(getByText('Site Location : Polonnaruwa')).toBeInTheDocument();
  expect(getByText('Total Cost Estimated: 1200')).toBeInTheDocument();
  expect(getByText('Site Manager Id : SITE0001')).toBeInTheDocument();
  expect(getByText('Site Start Date: 2000')).toBeInTheDocument();
  expect(getByText('Site End Date : 2022')).toBeInTheDocument();
  expect(getByText('Description : A construction project of world bank')).toBeInTheDocument();

});

test('it allows searching for sites', () => {
  const { getByPlaceholderText, getByText, getByRole } = render(<SitesView />);
  
  const searchInput = getByPlaceholderText('Search by Site ID');
  fireEvent.change(searchInput, { target: { value: 'SITE0001' } });

  const searchButton = getByRole('button', { name: 'Search' });
  fireEvent.click(searchButton);

  // Validate that only matching site details are displayed
  expect(getByText('Site Id : SITE0001')).toBeInTheDocument();
  expect(queryByText('Site Id : 002')).toBeNull(); 


});

test('it allows resetting the search', () => {
  const { getByPlaceholderText, getByText, getByRole } = render(<SitesView />);
  
  const searchInput = getByPlaceholderText('Search by Site ID');
  fireEvent.change(searchInput, { target: { value: 'SITE0001' } });

  const resetButton = getByRole('button', { name: 'Reset' });
  fireEvent.click(resetButton);

  // Validate that all site details are displayed again
  expect(getByText('Site Id : SITE0001')).toBeInTheDocument();
  expect(getByText('Site Id : SITE0002')).toBeInTheDocument(); 

});