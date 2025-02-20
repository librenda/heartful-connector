
import { useState } from "react";
import { Contact } from "../types/contact";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { X } from "lucide-react";

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
      company: "",
      role: "",
      physicalFeatures: {},
      accessories: {},
      dreams: {
        personal: [],
        professional: [],
      },
      personalDetails: {
        interests: [],
      },
      preferences: {
        dietary: [],
        cultural: [],
        general: [],
      },
      icp: {
        painPoints: [],
        goals: [],
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

  const handleArrayInput = (
    category: "dreams" | "icp" | "preferences",
    subCategory: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: [...(prev[category]?.[subCategory] || []), value],
      },
    }));
  };

  const handleUpdateInput = (content: string, followUp?: string) => {
    setFormData((prev) => ({
      ...prev,
      updates: [
        {
          date: new Date().toISOString(),
          content,
          type: "note",
          followUp,
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

        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border-crm-border focus:border-crm-accent"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border-crm-border focus:border-crm-accent"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border-crm-border focus:border-crm-accent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="border-crm-border focus:border-crm-accent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border-crm-border focus:border-crm-accent"
            />
          </div>
        </div>

        {/* Interaction & Follow-up */}
        <div className="space-y-4">
          <Label>New Interaction</Label>
          <div className="space-y-2">
            <Textarea
              placeholder="Add interaction details"
              className="border-crm-border focus:border-crm-accent mb-2"
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  e.preventDefault();
                  const target = e.target as HTMLTextAreaElement;
                  handleUpdateInput(target.value);
                  target.value = "";
                }
              }}
            />
            <Textarea
              placeholder="Add follow-up notes (optional)"
              className="border-crm-border focus:border-crm-accent"
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  e.preventDefault();
                  const target = e.target as HTMLTextAreaElement;
                  const lastUpdate = formData.updates?.[0];
                  if (lastUpdate) {
                    handleUpdateInput(lastUpdate.content, target.value);
                    target.value = "";
                  }
                }
              }}
            />
            <p className="text-xs text-crm-muted">Press Shift+Enter to save</p>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <Label>Personal Preferences</Label>
          <Textarea
            placeholder="Add dietary preferences (press Enter to add)"
            className="border-crm-border focus:border-crm-accent mb-2"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                handleArrayInput("preferences", "dietary", target.value);
                target.value = "";
              }
            }}
          />
          <Textarea
            placeholder="Add cultural preferences (press Enter to add)"
            className="border-crm-border focus:border-crm-accent mb-2"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                handleArrayInput("preferences", "cultural", target.value);
                target.value = "";
              }
            }}
          />
          <Textarea
            placeholder="Add general notes/preferences (press Enter to add)"
            className="border-crm-border focus:border-crm-accent"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                handleArrayInput("preferences", "general", target.value);
                target.value = "";
              }
            }}
          />
        </div>

        {/* Dreams & Goals */}
        <div className="space-y-4">
          <Label>Dreams & Goals</Label>
          <Textarea
            placeholder="Add personal dreams (press Enter to add)"
            className="border-crm-border focus:border-crm-accent"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                handleArrayInput("dreams", "personal", target.value);
                target.value = "";
              }
            }}
          />
        </div>

        {/* Pain Points */}
        <div className="space-y-4">
          <Label>Pain Points</Label>
          <Textarea
            placeholder="Add pain points (press Enter to add)"
            className="border-crm-border focus:border-crm-accent"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                handleArrayInput("icp", "painPoints", target.value);
                target.value = "";
              }
            }}
          />
        </div>

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
