import { User } from "@supabase/supabase-js";
import { Profile } from "../types/auth";
import { create } from "zustand";
import { INITIAL_PROFILE } from "../constants/auth-constant";

type AuthState = {
  user: User | null;
  profile: Profile | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: INITIAL_PROFILE,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
}));
