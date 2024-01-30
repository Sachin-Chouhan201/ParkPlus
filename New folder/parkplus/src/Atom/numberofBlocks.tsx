import { atom, useRecoilState } from 'recoil';

const LOCAL_STORAGE_KEY = 'numberofBlocks';

export const numberofBlocks = atom<number>({
  key: 'numberofBlocks',
  default: 0,
  // () => {
  //   const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   return storedValue ? parseInt(storedValue, 10) : 0;
  // },
});

// Hook to manage the state and persist to local storage
export const usePersistentNumberofBlocks = () => {
  const [numberOfBlocks, setNumberOfBlocks] = useRecoilState(numberofBlocks);

  // Update local storage whenever the state changes
  const setPersistentNumberofBlocks = (newValue: number | ((currVal: number) => number)) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, newValue.toString());
    setNumberOfBlocks(newValue);
  };

  return [numberOfBlocks, setPersistentNumberofBlocks];
};
