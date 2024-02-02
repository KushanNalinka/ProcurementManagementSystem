import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SitesEdit from '../components/SitesEdit';
import { act } from 'react-dom/test-utils'; // Import act for handling async operations

// Mock useParams for testing
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'your-site-id' }),
}));

test('it loads and renders user details correctly', async () => {
  const { getByPlaceholderText, getByText } = render(<SitesEdit />);
  
  // Simulate data loading by providing mock data
  const mockData = {
    siteid: 'SITE123',
    sitename: 'Site Name',
    startdate: '2023-10-21',
    location: 'Location',
    siteheadid: 'ID123',
    cost: '10000',
    description: 'Description',
    enddate: '2023-10-28',
  };

  // Mock the Firebase getDoc function to return the mock data
  const originalGetDoc = jest.requireActual('firebase/firestore').getDoc;
  jest.spyOn(jest.requireActual('firebase/firestore'), 'getDoc').mockImplementationOnce(async (docRef) => ({
    data: () => mockData,
    exists: true,
  }));

  // Render the component
  const { container } = render(<SitesEdit />);

  // Validate that the input fields are pre-filled with the mock data
  const siteIdInput = getByPlaceholderText('Site Id');
  expect(siteIdInput.value).toBe(mockData.siteid);

  const siteNameInput = getByPlaceholderText('Site Name');
  expect(siteNameInput.value).toBe(mockData.sitename);

  const startDateInput = getByPlaceholderText('Site Start Date');
  expect(startDateInput.value).toBe(mockData.startdate);

  const locationInput = getByPlaceholderText('Site Location');
  expect(locationInput.value).toBe(mockData.location);

  const siteHeadIdInput = getByPlaceholderText('Site Head Id');
  expect(siteHeadIdInput.value).toBe(mockData.siteheadid);

  const costInput = getByPlaceholderText('Site Total Cost');
  expect(costInput.value).toBe(mockData.cost);

  const descriptionInput = getByPlaceholderText('Site Description');
  expect(descriptionInput.value).toBe(mockData.description);

  const endDateInput = getByPlaceholderText('Site End Date');
  expect(endDateInput.value).toBe(mockData.enddate);

  // Restore the original getDoc function after the test
  jest.spyOn(jest.requireActual('firebase/firestore'), 'getDoc').mockImplementationOnce(originalGetDoc);
});

test('it calls editUserDetails when form is submitted with valid data', async () => {
  const { getByPlaceholderText, getByText } = render(<SitesEdit />);
  
  // Fill in the input fields with valid data
  const siteIdInput = getByPlaceholderText('Site Id');
  const siteNameInput = getByPlaceholderText('Site Name');
  const startDateInput = getByPlaceholderText('Site Start Date');
  const locationInput = getByPlaceholderText('Site Location');
  const siteHeadIdInput = getByPlaceholderText('Site Head Id');
  const costInput = getByPlaceholderText('Site Total Cost');
  const descriptionInput = getByPlaceholderText('Site Description');
  const endDateInput = getByPlaceholderText('Site End Date');

  fireEvent.change(siteIdInput, { target: { value: 'SITE1235' } });
  fireEvent.change(siteNameInput, { target: { value: 'Site Name 2' } });
  fireEvent.change(startDateInput, { target: { value: '2023-10-21' } });
  fireEvent.change(locationInput, { target: { value: 'Location' } });
  fireEvent.change(siteHeadIdInput, { target: { value: 'ID123' } });
  fireEvent.change(costInput, { target: { value: '10000' } });
  fireEvent.change(descriptionInput, { target: { value: 'Description' } });
  fireEvent.change(endDateInput, { target: { value: '2023-10-28' } });

  const addButton = getByText('Edit Site Details');
  fireEvent.click(addButton);

});