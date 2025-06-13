import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { Header } from '../Header';

describe('Header Component', () => {
  it('renders the app title correctly', () => {
    render(<Header />);
    expect(screen.getByText('erestó APP')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<Header />);
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
  });

  it('renders notification icons', () => {
    render(<Header />);
    expect(screen.getAllByLabelText(/notifications/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/mails/i)[0]).toBeInTheDocument();
  });

  it('opens profile menu when profile icon is clicked', async () => {
    render(<Header />);
    
    // Find the profile button
    const profileButton = screen.getAllByLabelText(/account of current user/i)[0];
    
    // Click the profile button
    fireEvent.click(profileButton);
    
    // Wait for the menu to appear and then verify menu items
    await waitFor(() => {
      // Find the menu (there will only be one menu role element when it's open)
      const menu = screen.getByRole('menu');
      
      // Check if menu items are visible within the menu
      expect(within(menu).getByText('Profile')).toBeVisible();
      expect(within(menu).getByText('My account')).toBeVisible();
    });
  });

  it('opens mobile menu when mobile menu icon is clicked', async () => {
    // Mock window.matchMedia for responsive testing
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('max-width'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<Header />);
    
    // Find the mobile menu button
    const mobileMenuButton = screen.getByLabelText('show more');
    
    // Click the mobile menu button
    fireEvent.click(mobileMenuButton);
    
    // Wait for the menu to appear and then verify menu items
    await waitFor(() => {
      // Find the menu
      const mobileMenu = screen.getByRole('menu');
      
      // Check if mobile menu items are visible
      const menuItems = within(mobileMenu).getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);
      
      // Look for specific text within the menu
      expect(screen.getByText('Messages')).toBeVisible();
      expect(screen.getByText('Notifications')).toBeVisible();
      expect(screen.getAllByText('Profile').length).toBeGreaterThan(0);
    });
  });
});

