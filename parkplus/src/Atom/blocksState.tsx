// blockstate.tsx
import { atom, selector } from 'recoil';
import { numberofBlocks } from './numberofBlocks';

export interface BlockObject {
  id: number;
  parked: boolean;
  parked_at: null | string;
  Car_no: null | string;
}

export const initializeblockState = selector<BlockObject[]>({
  key: 'initializeParkingState',
  get: ({ get }) => {
    const spaces = get(numberofBlocks);
    return Array.from({ length: spaces }, (_, index) => ({
      id: index + 1,
      parked: false,
      parked_at: null,
      Car_no: null,
    }));
  },
});

export const blocksState = atom<BlockObject[]>({
  key: 'blocksState',
  default: initializeblockState,
});

// Define a selector that depends on numberofBlocks
export const blocksStateUpdater = selector<BlockObject[]>({
  key: 'blocksStateUpdater',
  get: ({ get }) => get(initializeblockState), // Get the value of initializeblockState
  set: ({ set }, newValue) => set(blocksState, newValue), // Set the new value to blocksState
});

// Now you need to subscribe to blocksStateUpdater to ensure it gets updated whenever numberofBlocks changes
