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
        const headers = [
          "First Name",
          "Last Name",
          "Email",
          "Phone",
          "Company",
          "Role",
          "Created At",
          "Updated At",
        ];
        
        const csvContent = [
          headers.join(","),
          ...contacts.map((contact) =>
            [
              contact.firstName,
              contact.lastName,
              contact.email,
              contact.phone || "",
              contact.company || "",
              contact.role || "",
              new Date(contact.createdAt).toLocaleDateString(),
              new Date(contact.updatedAt).toLocaleDateString(),
            ].join(",")
          ),
        ].join("\n");
        
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `contacts_${new Date().toISOString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    }),
    {
      name: "contacts-storage",
    }
  )
);