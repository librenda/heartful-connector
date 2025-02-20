
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface PreferencesProps {
  onAddPreference: (category: string, value: string) => void;
}

export const PreferencesSection = ({ onAddPreference }: PreferencesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personal Preferences</h3>
      <div className="space-y-2">
        <Textarea
          placeholder="Add dietary preferences (press Enter to add)"
          className="border-crm-border focus:border-crm-accent mb-2"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const target = e.target as HTMLTextAreaElement;
              onAddPreference("dietary", target.value);
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
              onAddPreference("cultural", target.value);
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
              onAddPreference("general", target.value);
              target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};
