import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ViewAccounts from '../components/ViewAccounts';

describe('ViewAccounts Component', () => {
  test('it should display the list of accounts and generate a report', () => {
    // Mock the data returned from Firebase (assuming an array of accounts)
    const mockAccounts = [
      {
        suppliername: 'Supplier A',
        supplierId: 'SUP001',
        contactnumber: '123-456-7890',
        approved: true,
        orderId: 'ORDER001',
        sitename: 'Site A',
        location: 'Location A',
        sitemanagerId: 'SM001',
        amount: 500,
        date: '2023-10-01',
        description: 'Description of Supplier A',
        id: '1',
      },
      {
        suppliername: 'Supplier B',
        supplierId: 'SUP002',
        contactnumber: '987-654-3210',
        approved: false,
        orderId: 'ORDER002',
        sitename: 'Site B',
        location: 'Location B',
        sitemanagerId: 'SM002',
        amount: 700,
        date: '2023-10-05',
        description: 'Description of Supplier B',
        id: '2',
      },
    ];

    // Mock the Firebase functions that fetch data
    const mockGetMovieList = jest.fn(() => {
      // Set the movieList state with mock data
      ViewAccounts.defaultProps.setMovieList(mockAccounts);
    });

    render(<ViewAccounts getMovieList={mockGetMovieList} />);

    // Check if the account list items are displayed
    expect(screen.getByText('Name of the Supplier: Supplier A')).toBeInTheDocument();
    expect(screen.getByText('ID of the Supplier: SUP001')).toBeInTheDocument();
    expect(screen.getByText('Contact Number: 123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('Payment done: true')).toBeInTheDocument();
    expect(screen.getByText('Order Id: ORDER001')).toBeInTheDocument();
    expect(screen.getByText('Name of the site: Site A')).toBeInTheDocument();
    expect(screen.getByText('Location of the site: Location A')).toBeInTheDocument();
    expect(screen.getByText('Site manager Id: SM001')).toBeInTheDocument();
    expect(screen.getByText('Amount to be paid: 500')).toBeInTheDocument();
    expect(screen.getByText('Date of the Delivered: 2023-10-01')).toBeInTheDocument();
    expect(screen.getByText('Description of Supplier by his own: Description of Supplier A')).toBeInTheDocument();

    expect(screen.getByText('Name of the Supplier: Supplier B')).toBeInTheDocument();
    expect(screen.getByText('ID of the Supplier: SUP002')).toBeInTheDocument();
    expect(screen.getByText('Contact Number: 987-654-3210')).toBeInTheDocument();
    expect(screen.getByText('Payment done: false')).toBeInTheDocument();
    expect(screen.getByText('Order Id: ORDER002')).toBeInTheDocument();
    expect(screen.getByText('Name of the site: Site B')).toBeInTheDocument();
    expect(screen.getByText('Location of the site: Location B')).toBeInTheDocument();
    expect(screen.getByText('Site manager Id: SM002')).toBeInTheDocument();
    expect(screen.getByText('Amount to be paid: 700')).toBeInTheDocument();
    expect(screen.getByText('Date of the Delivered: 2023-10-05')).toBeInTheDocument();
    expect(screen.getByText('Description of Supplier by his own: Description of Supplier B')).toBeInTheDocument();

    // Click the "Generate Report" button
    fireEvent.click(screen.getByText('Generate Report'));

    // Check that the report was generated
    // You might need to assert what happens when the report is generated in your application, e.g., file download or message display
  });
});
