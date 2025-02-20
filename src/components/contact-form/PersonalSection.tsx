
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface PersonalProps {
  onAddPersonal: (category: string, value: string) => void;
}

export const PersonalSection = ({ onAddPersonal }: PersonalProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personal Journey</h3>
      <div className="space-y-2">
        <Label>Dreams & Goals</Label>
        <Textarea
          placeholder="Add personal dreams (press Enter to add)"
          className="border-crm-border focus:border-crm-accent"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const target = e.target as HTMLTextAreaElement;
              onAddPersonal("dreams", target.value);
              target.value = "";
            }
          }}
        />
        <Label>Pain Points</Label>
        <Textarea
          placeholder="Add pain points (press Enter to add)"
          className="border-crm-border focus:border-crm-accent"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const target = e.target as HTMLTextAreaElement;
              onAddPersonal("painPoints", target.value);
              target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};
