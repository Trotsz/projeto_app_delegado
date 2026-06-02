import { create } from 'zustand';

interface ConfigState {
  isOffline: boolean;
  setOffline: (offline: boolean) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  isOffline: false,
  setOffline: (offline) => set({ isOffline: offline }),
}));
