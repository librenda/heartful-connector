
import { useState } from "react";
import { Contact } from "../types/contact";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { X } from "lucide-react";
import { BasicInfoSection } from "./contact-form/BasicInfoSection";
import { ProfessionalSection } from "./contact-form/ProfessionalSection";
import { InteractionSection } from "./contact-form/InteractionSection";
import { PreferencesSection } from "./contact-form/PreferencesSection";
import { PersonalSection } from "./contact-form/PersonalSection";

interface ContactFormProps {
  initialData?: Partial<Contact>;
  onSubmit: (data: Omit<Contact, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export const ContactForm = ({ initialData, onSubmit, onCancel }: ContactFormProps) => {
  const [formData, setFormData] = useState<Partial<Contact>>(
    initialData || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      professionalContext: {
        company: "",
        role: "",
      },
      journey: {
        dreams: [],
        values: [],
        interests: [],
        aspirations: [],
      },
      preferences: {
        dietary: [],
        cultural: [],
        general: [],
      },
      updates: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Contact, "id" | "createdAt" | "updatedAt">);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPreference = (category: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: [...(prev.preferences?.[category] || []), value],
      },
    }));
  };

  const handleAddPersonal = (category: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      journey: {
        ...prev.journey,
        [category]: [...(prev.journey?.[category] || []), value],
      },
    }));
  };

  const handleAddUpdate = (content: string, followUp?: string) => {
    setFormData((prev) => ({
      ...prev,
      updates: [
        {
          date: new Date().toISOString(),
          content,
          type: "note",
          followUp,
          sentiment: "neutral",
        },
        ...(prev.updates || []),
      ],
    }));
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto bg-crm-surface border border-crm-border animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-crm-text">
            {initialData ? "Edit Contact" : "New Contact"}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-crm-muted hover:text-crm-text"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <BasicInfoSection
          firstName={formData.firstName || ""}
          lastName={formData.lastName || ""}
          email={formData.email || ""}
          phone={formData.phone}
          onChange={handleChange}
        />

        <ProfessionalSection
          company={formData.professionalContext?.company}
          role={formData.professionalContext?.role}
          onChange={handleChange}
        />

        <InteractionSection onAddUpdate={handleAddUpdate} />
        
        <PreferencesSection onAddPreference={handleAddPreference} />
        
        <PersonalSection onAddPersonal={handleAddPersonal} />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-crm-border hover:bg-crm-hover"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-crm-accent hover:bg-crm-accent/90 text-white"
          >
            {initialData ? "Update" : "Create"} Contact
          </Button>
        </div>
      </form>
    </Card>
  );
};
