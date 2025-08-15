import { useState, useCallback } from 'react';

export type InteractionTypes = 'fontSize' | 'contrast' | 'reducedMotion' | 'announcements';

interface InteractionState {
  fontSize: boolean;
  contrast: boolean;
  reducedMotion: boolean;
  announcements: boolean;
}

export const useInteractionTracking = () => {
  const [interactions, setInteractions] = useState<InteractionState>({
    fontSize: false,
    contrast: false,
    reducedMotion: false,
    announcements: false,
  });

  const markInteraction = useCallback((type: InteractionTypes) => {
    setInteractions(prev => ({
      ...prev,
      [type]: true
    }));
  }, []);

  const allInteracted = Object.values(interactions).every(Boolean);

  const resetInteractions = useCallback(() => {
    setInteractions({
      fontSize: false,
      contrast: false,
      reducedMotion: false,
      announcements: false,
    });
  }, []);

  return {
    interactions,
    markInteraction,
    allInteracted,
    resetInteractions
  };
};