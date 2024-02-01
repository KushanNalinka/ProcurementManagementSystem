import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ViewOrders from '../components/ViewOrders';

describe('ViewOrders Component', () => {
  test('it should display the list of orders and generate a report', () => {
    // Mock the data returned from Firebase (assuming an array of orders)
    const mockOrders = [
      {
        sitename: 'Site 1',
        sitemanagerId: 'SM1234',
        dateoforder: '2023-10-01',
        datetobedelive: '2023-10-10',
        item: 'Item 1',
        quantity: 100,
        max: 200,
        min: 150,
        description: 'Description 1',
        approved: true,
        id: '1',
      },
      {
        sitename: 'Site 2',
        sitemanagerId: 'SM5678',
        dateoforder: '2023-10-05',
        datetobedelive: '2023-10-15',
        item: 'Item 2',
        quantity: 50,
        max: 120,
        min: 90,
        description: 'Description 2',
        approved: false,
        id: '2',
      },
    ];

    // Mock the Firebase functions that fetch data
    const mockGetMovieList = jest.fn(() => {
      // Set the movieList state with mock data
      ViewOrders.defaultProps.setMovieList(mockOrders);
    });

    render(<ViewOrders getMovieList={mockGetMovieList} />);

    // Check if the order list items are displayed
    expect(screen.getByText('Name of the Site: Site 1')).toBeInTheDocument();
    expect(screen.getByText('Site Manager Id: SM1234')).toBeInTheDocument();
    expect(screen.getByText('Date of the Order Placed: 2023-10-01')).toBeInTheDocument();
    expect(screen.getByText('Date of the Order Should be Received: 2023-10-10')).toBeInTheDocument();
    expect(screen.getByText('Items need: Item 1')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 100')).toBeInTheDocument();
    expect(screen.getByText('Max: 200')).toBeInTheDocument();
    expect(screen.getByText('Min: 150')).toBeInTheDocument();
    expect(screen.getByText('Approved: true')).toBeInTheDocument();
    expect(screen.getByText('Description of the order: Description 1')).toBeInTheDocument();

    expect(screen.getByText('Name of the Site: Site 2')).toBeInTheDocument();
    expect(screen.getByText('Site Manager Id: SM5678')).toBeInTheDocument();
    expect(screen.getByText('Date of the Order Placed: 2023-10-05')).toBeInTheDocument();
    expect(screen.getByText('Date of the Order Should be Received: 2023-10-15')).toBeInTheDocument();
    expect(screen.getByText('Items need: Item 2')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 50')).toBeInTheDocument();
    expect(screen.getByText('Max: 120')).toBeInTheDocument();
    expect(screen.getByText('Min: 90')).toBeInTheDocument();
    expect(screen.getByText('Approved: false')).toBeInTheDocument();
    expect(screen.getByText('Description of the order: Description 2')).toBeInTheDocument();

    // Click the "Generate Report" button
    fireEvent.click(screen.getByText('Generate Report'));

    // Check that the report was generated
    // You might need to assert what happens when the report is generated in your application, e.g., file download or message display
  });
});
