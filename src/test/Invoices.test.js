import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Invoices from '../components/Invoices';

// Mock Firebase functions and objects as needed

describe('Invoices Component', () => {
  test('it should display the list of movies', () => {
    // Mock the data returned from Firebase (assuming an array of movies)
    const mockMovies = [
      {
        suppliername: 'Supplier 1',
        supplierId: 'SUP1234',
        amount: 100,
        accounts: '12345',
        bank: 'Bank 1',
        branch: 'Branch 1',
        id: '1',
      },
      {
        suppliername: 'Supplier 2',
        supplierId: 'SUP5678',
        amount: 200,
        accounts: '67890',
        bank: 'Bank 2',
        branch: 'Branch 2',
        id: '2',
      },
    ];

    // Mock the Firebase functions that fetch data
    const mockGetMovieList = jest.fn(() => {
      // Set the movieList state with mock data
      Invoices.defaultProps.setMovieList(mockMovies);
    });

    render(<Invoices getMovieList={mockGetMovieList} />);

    // Check if the movie list items are displayed
    expect(screen.getByText('Name of the Supplier: Supplier 1')).toBeInTheDocument();
    expect(screen.getByText('ID of the Supplier: SUP1234')).toBeInTheDocument();
    expect(screen.getByText('Amount: 100')).toBeInTheDocument();
    expect(screen.getByText('Account Number: 12345')).toBeInTheDocument();
    expect(screen.getByText('Bank of the Account: Bank 1')).toBeInTheDocument();
    expect(screen.getByText('Branch of the account: Branch 1')).toBeInTheDocument();

    expect(screen.getByText('Name of the Supplier: Supplier 2')).toBeInTheDocument();
    expect(screen.getByText('ID of the Supplier: SUP5678')).toBeInTheDocument();
    expect(screen.getByText('Amount: 200')).toBeInTheDocument();
    expect(screen.getByText('Account Number: 67890')).toBeInTheDocument();
    expect(screen.getByText('Bank of the Account: Bank 2')).toBeInTheDocument();
    expect(screen.getByText('Branch of the account: Branch 2')).toBeInTheDocument();
  });

  test('it should filter the list of movies based on search', () => {
    // Mock the data returned from Firebase
    const mockMovies = [
      {
        suppliername: 'Supplier 1',
        supplierId: 'SUP1234',
        amount: 100,
        accounts: '12345',
        bank: 'Bank 1',
        branch: 'Branch 1',
        id: '1',
      },
      {
        suppliername: 'Supplier 2',
        supplierId: 'SUP5678',
        amount: 200,
        accounts: '67890',
        bank: 'Bank 2',
        branch: 'Branch 2',
        id: '2',
      },
    ];

    // Mock the Firebase functions that fetch data
    const mockGetMovieList = jest.fn(() => {
      Invoices.defaultProps.setMovieList(mockMovies);
    });

    render(<Invoices getMovieList={mockGetMovieList} />);

    // Set the search query
    fireEvent.change(screen.getByPlaceholderText('Search by Site ID'), {
      target: { value: 'SUP1234' },
    });

    // Check if only the matching movie is displayed
    expect(screen.getByText('Name of the Supplier: Supplier 1')).toBeInTheDocument();
    expect(screen.getByText('ID of the Supplier: SUP1234')).toBeInTheDocument();
    expect(screen.getByText('Amount: 100')).toBeInTheDocument();
    expect(screen.getByText('Account Number: 12345')).toBeInTheDocument();
    expect(screen.getByText('Bank of the Account: Bank 1')).toBeInTheDocument();
    expect(screen.getByText('Branch of the account: Branch 1')).toBeInTheDocument();

    expect(screen.queryByText('Name of the Supplier: Supplier 2')).not.toBeInTheDocument();
    expect(screen.queryByText('ID of the Supplier: SUP5678')).not.toBeInTheDocument();
    expect(screen.queryByText('Amount: 200')).not.toBeInTheDocument();
    expect(screen.queryByText('Account Number: 67890')).not.toBeInTheDocument();
    expect(screen.queryByText('Bank of the Account: Bank 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Branch of the account: Branch 2')).not.toBeInTheDocument();
  });
});
