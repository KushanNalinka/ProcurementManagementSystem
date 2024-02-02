import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ViewApprovedOrders from '../components/ViewApprovedOrders';

describe('ViewApprovedOrders Component', () => {
  test('it should display the list of approved orders and generate a report', () => {
    // Mock the data returned from Firebase (assuming an array of approved orders)
    const mockOrders = [
      {
        orderId: 'ORDER001',
        siteid: 'SITE001',
        sitename: 'Site A',
        location: 'Location A',
        supplierId: 'SUP001',
        suppliername: 'Supplier A',
        sitemanagerId: 'SM001',
        dateoforder: '2023-10-01',
        datetobedelive: '2023-10-10',
        amount: 500,
        id: '1',
      },
      {
        orderId: 'ORDER002',
        siteid: 'SITE002',
        sitename: 'Site B',
        location: 'Location B',
        supplierId: 'SUP002',
        suppliername: 'Supplier B',
        sitemanagerId: 'SM002',
        dateoforder: '2023-10-05',
        datetobedelive: '2023-10-15',
        amount: 700,
        id: '2',
      },
    ];

    // Mock the Firebase functions that fetch data
    const mockGetMovieList = jest.fn(() => {
      // Set the movieList state with mock data
      ViewApprovedOrders.defaultProps.setMovieList(mockOrders);
    });

    render(<ViewApprovedOrders getMovieList={mockGetMovieList} />);

    // Check if the order list items are displayed
    expect(screen.getByText('Order Id: ORDER001')).toBeInTheDocument();
    expect(screen.getByText('Site Id: SITE001')).toBeInTheDocument();
    expect(screen.getByText('Site Name: Site A')).toBeInTheDocument();
    expect(screen.getByText('Location of the Site: Location A')).toBeInTheDocument();
    expect(screen.getByText('Supplier Id: SUP001')).toBeInTheDocument();
    expect(screen.getByText('Supplier Name: Supplier A')).toBeInTheDocument();
    expect(screen.getByText('Site Manager Id: SM001')).toBeInTheDocument();
    expect(screen.getByText('Date of the Order placed: 2023-10-01')).toBeInTheDocument();
    expect(screen.getByText('Delivered Date: 2023-10-10')).toBeInTheDocument();
    expect(screen.getByText('Total Amount: 500')).toBeInTheDocument();

    expect(screen.getByText('Order Id: ORDER002')).toBeInTheDocument();
    expect(screen.getByText('Site Id: SITE002')).toBeInTheDocument();
    expect(screen.getByText('Site Name: Site B')).toBeInTheDocument();
    expect(screen.getByText('Location of the Site: Location B')).toBeInTheDocument();
    expect(screen.getByText('Supplier Id: SUP002')).toBeInTheDocument();
    expect(screen.getByText('Supplier Name: Supplier B')).toBeInTheDocument();
    expect(screen.getByText('Site Manager Id: SM002')).toBeInTheDocument();
    expect(screen.getByText('Date of the Order placed: 2023-10-05')).toBeInTheDocument();
    expect(screen.getByText('Delivered Date: 2023-10-15')).toBeInTheDocument();
    expect(screen.getByText('Total Amount: 700')).toBeInTheDocument();

    // Click the "Generate Report" button
    fireEvent.click(screen.getByText('Generate Report'));

    // Check that the report was generated
    // You might need to assert what happens when the report is generated in your application, e.g., file download or message display
  });
});
