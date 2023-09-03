import { atom } from "recoil";

// Define a Recoil atom for authentication state
export const authState = atom({
  key: "authState",      // Unique key for identifying this atom
  default: {             // Default initial value for the atom
    token: null,         // Initialize token as null
    username: null,      // Initialize username as null
  },
});