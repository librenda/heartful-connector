
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  
  // Professional context (deemphasized)
  professionalContext?: {
    company?: string;
    role?: string;
  };
  
  // Personal journey
  journey?: {
    dreams?: string[];
    values?: string[];
    interests?: string[];
    aspirations?: string[];
  };
  
  // Important contexts
  preferences?: {
    dietary?: string[];
    cultural?: string[];
    communication?: string[];
    general?: string[];
  };
  
  // Meaningful dates
  significantDates?: {
    birthday?: string;
    anniversary?: string;
    customDates?: Array<{
      date: string;
      description: string;
    }>;
  };
  
  // Relationship notes
  relationshipNotes?: {
    meetingContext?: string;
    sharedExperiences?: string[];
    mutualConnections?: string[];
    interests?: string[];
  };
  
  // Updates and interaction history
  updates: {
    date: string;
    content: string;
    type: "meeting" | "call" | "email" | "note" | "other";
    followUp?: string;
    sentiment?: "positive" | "neutral" | "needs-attention";
  }[];
  
  createdAt: string;
  updatedAt: string;
}
