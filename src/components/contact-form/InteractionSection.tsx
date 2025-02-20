
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface InteractionProps {
  onAddUpdate: (content: string, followUp?: string) => void;
}

export const InteractionSection = ({ onAddUpdate }: InteractionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">New Interaction</h3>
      <div className="space-y-2">
        <Textarea
          placeholder="Add interaction details"
          className="border-crm-border focus:border-crm-accent mb-2"
          onKeyPress={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
              const target = e.target as HTMLTextAreaElement;
              onAddUpdate(target.value);
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
              onAddUpdate("", target.value);
              target.value = "";
            }
          }}
        />
        <p className="text-xs text-crm-muted">Press Shift+Enter to save</p>
      </div>
    </div>
  );
};
