import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SitesAdd from '../components/SitesAdd';

test('it renders the form fields and buttons', () => {
  const { getByPlaceholderText, getByText } = render(<SitesAdd />);
  
  const siteIdInput = getByPlaceholderText('Site Id');
  const siteNameInput = getByPlaceholderText('Site Name');
  const startDateInput = getByPlaceholderText('Site Start Date');
  const locationInput = getByPlaceholderText('Site Location');
  const siteHeadIdInput = getByPlaceholderText('Site Head Id');
  const costInput = getByPlaceholderText('Site Total Cost');
  const descriptionInput = getByPlaceholderText('Site Description');
  const endDateInput = getByPlaceholderText('Site End Date');
  const addButton = getByText('ADD SITE');
  const goBackButton = getByText('GO BACK');

  expect(siteIdInput).toBeInTheDocument();
  expect(siteNameInput).toBeInTheDocument();
  expect(startDateInput).toBeInTheDocument();
  expect(locationInput).toBeInTheDocument();
  expect(siteHeadIdInput).toBeInTheDocument();
  expect(costInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(endDateInput).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
  expect(goBackButton).toBeInTheDocument();
});

test('it validates the form fields correctly', async () => {
  const { getByPlaceholderText, getByText } = render(<SitesAdd />);
  
  const addButton = getByText('ADD SITE');
  fireEvent.click(addButton);

  const errorMessage = getByText('Site ID and Name are required fields.');
  expect(errorMessage).toBeInTheDocument();

});

test('it calls editUserDetails when form is submitted with valid data', async () => {
  const { getByPlaceholderText, getByText } = render(<SitesAdd />);
  
  const siteIdInput = getByPlaceholderText('Site Id');
  const siteNameInput = getByPlaceholderText('Site Name');
  const startDateInput = getByPlaceholderText('Site Start Date');
  const locationInput = getByPlaceholderText('Site Location');
  const siteHeadIdInput = getByPlaceholderText('Site Head Id');
  const costInput = getByPlaceholderText('Site Total Cost');
  const descriptionInput = getByPlaceholderText('Site Description');
  const endDateInput = getByPlaceholderText('Site End Date');

  fireEvent.change(siteIdInput, { target: { value: 'SITE1234' } });
  fireEvent.change(siteNameInput, { target: { value: 'Site Name' } });
  fireEvent.change(startDateInput, { target: { value: '2023-10-21' } });
  fireEvent.change(locationInput, { target: { value: 'Location' } });
  fireEvent.change(siteHeadIdInput, { target: { value: 'ID123' } });
  fireEvent.change(costInput, { target: { value: '10000' } });
  fireEvent.change(descriptionInput, { target: { value: 'Description' } });
  fireEvent.change(endDateInput, { target: { value: '2023-10-28' } });

  const addButton = getByText('ADD SITE');
  fireEvent.click(addButton);

});