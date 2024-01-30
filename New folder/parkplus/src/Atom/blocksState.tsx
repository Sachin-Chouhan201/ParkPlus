import { atom, selector, useRecoilState } from 'recoil';
import { numberofBlocks } from './numberofBlocks';
import { useEffect } from 'react';

export interface BlockObject {
  id: number;
  parked: boolean;
  parked_at: null | string;
  Car_no: null | string;
}

const LOCAL_STORAGE_KEY = 'blocksState';

// Initialize state from local storage or use the default selector

const initializeblockState = selector<BlockObject[]>({
  key: 'initializeParkingState',
  get: ({ get }) => {
    const spaces = get(numberofBlocks);
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);

    try {
      // Use optional chaining to check if storedState is undefined
      return storedState ? JSON.parse(storedState) : Array.from({ length: spaces }, (_, index) => ({
        id: index + 1,
        parked: false,
        parked_at: null,
        fare: 0,
        Car_no: null,
      }));
    } catch (error) {
      console.error('Error parsing JSON from local storage:', error);
      // If there's an error parsing JSON, return a default state
      return Array.from({ length: spaces }, (_, index) => ({
        id: index + 1,
        parked: false,
        parked_at: null,
        fare: 0,
        Car_no: null,
      }));
    }
  },
});

// Atom for blocksState
export const blocksState = atom<BlockObject[]>({
  key: 'blocksState',
  default: initializeblockState,
});

// Hook to manage the state and persist to local storage
export const usePersistentBlocksState = () => {
  const [blocks, setBlocks] = useRecoilState(blocksState);

  // Update local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blocks));
  }, [blocks]);

  return { blocks, setBlocks };
};

