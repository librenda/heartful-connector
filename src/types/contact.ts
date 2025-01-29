export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  
  // Physical features
  physicalFeatures?: {
    height?: string;
    build?: string;
    hairColor?: string;
    eyeColor?: string;
    distinguishingFeatures?: string;
  };
  
  // Personal items and accessories
  accessories?: {
    jewelry?: string[];
    clothing?: string;
    gadgets?: string[];
    other?: string[];
  };
  
  // Dreams and aspirations
  dreams?: {
    personal?: string[];
    professional?: string[];
    shortTerm?: string[];
    longTerm?: string[];
  };
  
  // Personal details
  personalDetails?: {
    birthday?: string;
    interests?: string[];
    values?: string[];
    familyStatus?: string;
    education?: string;
  };
  
  // ICP (Ideal Customer Profile) data
  icp?: {
    painPoints?: string[];
    goals?: string[];
    budget?: string;
    decisionMaking?: string;
    timeline?: string;
  };
  
  // Updates and interaction history
  updates: {
    date: string;
    content: string;
    type: "meeting" | "call" | "email" | "note" | "other";
  }[];
  
  createdAt: string;
  updatedAt: string;
}