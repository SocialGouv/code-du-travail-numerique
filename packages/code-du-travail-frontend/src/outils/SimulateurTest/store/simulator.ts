import create, { SetState } from "zustand";

type LocalState = {
  step: number;
};

export const useSimulatorStore = create((set: SetState<LocalState>) => ({
  onNext: () => {
    // ajouter ici du process d'event ou autre
    set((state) => ({ step: state.step + 1 }));
  },
  onPrev: () => set((state) => ({ step: state.step - 1 })),
  step: 0,
}));
