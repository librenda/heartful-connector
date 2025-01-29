import { Contact } from "../types/contact";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { PenLine, Trash2 } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactCard = ({ contact, onEdit, onDelete }: ContactCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in bg-crm-surface border border-crm-border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-crm-text">
            {contact.firstName} {contact.lastName}
          </h3>
          <p className="text-crm-muted text-sm">{contact.role} at {contact.company}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(contact)}
            className="text-crm-muted hover:text-crm-text"
          >
            <PenLine className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(contact.id)}
            className="text-crm-muted hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {contact.icp?.painPoints && contact.icp.painPoints.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-crm-muted mb-2">Pain Points</p>
          <div className="flex flex-wrap gap-2">
            {contact.icp.painPoints.map((point, index) => (
              <Badge key={index} variant="secondary" className="bg-crm-hover text-crm-text">
                {point}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {contact.dreams?.personal && contact.dreams.personal.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-crm-muted mb-2">Personal Dreams</p>
          <div className="flex flex-wrap gap-2">
            {contact.dreams.personal.map((dream, index) => (
              <Badge key={index} variant="outline" className="border-crm-accent text-crm-text">
                {dream}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {contact.updates && contact.updates.length > 0 && (
        <div className="mt-6">
          <p className="text-xs text-crm-muted mb-2">Latest Update</p>
          <div className="text-sm text-crm-text">
            {contact.updates[0].content}
            <span className="text-crm-muted ml-2">
              {new Date(contact.updates[0].date).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};