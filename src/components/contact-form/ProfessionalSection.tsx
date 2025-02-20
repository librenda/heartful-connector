
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ProfessionalProps {
  company?: string;
  role?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfessionalSection = ({
  company,
  role,
  onChange,
}: ProfessionalProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Professional Context</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={company}
            onChange={onChange}
            className="border-crm-border focus:border-crm-accent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            value={role}
            onChange={onChange}
            className="border-crm-border focus:border-crm-accent"
          />
        </div>
      </div>
    </div>
  );
};
