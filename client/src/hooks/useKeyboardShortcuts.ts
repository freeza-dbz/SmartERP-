import { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';

const shortcuts: Record<string, string> = {
  'F1': 'dashboard',
  'F2': 'masters',
  'F3': 'transactions',
  'F4': 'inventory',
  'F5': 'accounting',
  'F6': 'banking',
  'F7': 'gst',
  'F8': 'sales',
  'F9': 'purchases',
  'Ctrl+c': 'customers',
  'Ctrl+s': 'suppliers',
  'Ctrl+l': 'ledgers',
  'Ctrl+i': 'stock-items',
  'Ctrl+r': 'receipts',
  'Ctrl+p': 'payments',
  'Ctrl+j': 'journals',
  'Ctrl+k': 'search',
};

export function useKeyboardShortcuts() {
  const { setCurrentPage, addToast } = useApp();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = [];

    if (event.ctrlKey || event.metaKey) {
      key.push('Ctrl');
    }
    if (event.altKey) {
      key.push('Alt');
    }
    if (event.shiftKey) {
      key.push('Shift');
    }

    const keyName = event.key === ' ' ? 'Space' : event.key;
    key.push(keyName);

    const shortcutKey = key.join('+');
    const page = shortcuts[shortcutKey];

    if (page) {
      if (page === 'search') {
        event.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.focus();
        }
        return;
      }

      event.preventDefault();
      setCurrentPage(page);
      addToast({
        type: 'info',
        title: 'Navigation',
        message: `Navigated to ${page.replace('-', ' ')}`,
      });
    }
  }, [setCurrentPage, addToast]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

interface ShortcutItem {
  keys: string;
  action: string;
}

export const shortcutList: ShortcutItem[] = [
  { keys: 'F1', action: 'Dashboard' },
  { keys: 'F2', action: 'Masters Menu' },
  { keys: 'F3', action: 'Transactions Menu' },
  { keys: 'F4', action: 'Inventory Menu' },
  { keys: 'F5', action: 'Accounting Menu' },
  { keys: 'F6', action: 'Banking Menu' },
  { keys: 'F7', action: 'GST Menu' },
  { keys: 'F8', action: 'Sales Vouchers' },
  { keys: 'F9', action: 'Purchase Vouchers' },
  { keys: 'Ctrl + C', action: 'New Customer' },
  { keys: 'Ctrl + S', action: 'New Supplier' },
  { keys: 'Ctrl + L', action: 'Ledgers' },
  { keys: 'Ctrl + I', action: 'Stock Items' },
  { keys: 'Ctrl + R', action: 'Receipts' },
  { keys: 'Ctrl + P', action: 'Payments' },
  { keys: 'Ctrl + J', action: 'Journal Entries' },
  { keys: 'Ctrl + K', action: 'Global Search' },
  { keys: 'Esc', action: 'Close Modal/Menu' },
];
