
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface BasicInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInfoSection = ({
  firstName,
  lastName,
  email,
  phone,
  onChange,
}: BasicInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Basic Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={onChange}
            className="border-crm-border focus:border-crm-accent"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={onChange}
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
          value={email}
          onChange={onChange}
          className="border-crm-border focus:border-crm-accent"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={onChange}
          className="border-crm-border focus:border-crm-accent"
        />
      </div>
    </div>
  );
};
