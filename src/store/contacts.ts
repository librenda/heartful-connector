
import { create } from 'zustand';
import { Contact } from '../types/contact';
import { persist } from 'zustand/middleware';

interface ContactsState {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, "id" | "createdAt" | "updatedAt">) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  exportContacts: () => void;
}

export const useContactsStore = create<ContactsState>()(
  persist(
    (set, get) => ({
      contacts: [],
      
      addContact: (contactData) => {
        const contact: Contact = {
          ...contactData,
          id: crypto.randomUUID(),
          updates: contactData.updates || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          contacts: [contact, ...state.contacts],
        }));
      },
      
      updateContact: (id, updatedData) => {
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === id
              ? {
                  ...contact,
                  ...updatedData,
                  updatedAt: new Date().toISOString(),
                }
              : contact
          ),
        }));
      },
      
      deleteContact: (id) => {
        set((state) => ({
          contacts: state.contacts.filter((contact) => contact.id !== id),
        }));
      },
      
      exportContacts: () => {
        const contacts = get().contacts;
        
        // Helper function to flatten nested objects
        const flattenObject = (obj: any, prefix = ''): Record<string, string> => {
          return Object.keys(obj).reduce((acc, k) => {
            const pre = prefix.length ? prefix + '.' : '';
            if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
              Object.assign(acc, flattenObject(obj[k], pre + k));
            } else if (Array.isArray(obj[k])) {
              acc[pre + k] = obj[k].join('; ');
            } else if (obj[k] !== undefined && obj[k] !== null) {
              acc[pre + k] = obj[k].toString();
            }
            return acc;
          }, {} as Record<string, string>);
        };
        
        // Get all possible headers from all contacts
        const allHeaders = new Set<string>();
        contacts.forEach(contact => {
          Object.keys(flattenObject(contact)).forEach(header => {
            allHeaders.add(header);
          });
        });
        
        // Create CSV content
        const headers = Array.from(allHeaders);
        const csvContent = [
          headers.join(','),
          ...contacts.map(contact => {
            const flatContact = flattenObject(contact);
            return headers.map(header => {
              const value = flatContact[header] || '';
              // Escape commas and quotes in values
              return `"${value.replace(/"/g, '""')}"`;
            }).join(',');
          }),
        ].join('\n');
        
        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `contacts_${new Date().toISOString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    }),
    {
      name: 'contacts-storage',
    }
  )
);
