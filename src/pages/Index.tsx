import { useState } from "react";
import { useContactsStore } from "../store/contacts";
import { ContactCard } from "../components/ContactCard";
import { ContactForm } from "../components/ContactForm";
import { Button } from "../components/ui/button";
import { Contact } from "../types/contact";
import { Download, Plus, Search } from "lucide-react";
import { Input } from "../components/ui/input";

const Index = () => {
  const { contacts, addContact, updateContact, deleteContact, exportContacts } =
    useContactsStore();
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (data: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
    if (editingContact) {
      updateContact(editingContact.id, data);
    } else {
      addContact(data);
    }
    setShowForm(false);
    setEditingContact(null);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-crm-text">Contacts</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => exportContacts()}
              variant="outline"
              className="border-crm-border hover:bg-crm-hover"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-crm-accent hover:bg-crm-accent/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-crm-muted h-4 w-4" />
            <Input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-crm-border focus:border-crm-accent"
            />
          </div>
        </div>

        {showForm ? (
          <ContactForm
            initialData={editingContact || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={handleEdit}
                onDelete={deleteContact}
              />
            ))}
            {filteredContacts.length === 0 && (
              <div className="col-span-full text-center py-12 text-crm-muted">
                No contacts found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;