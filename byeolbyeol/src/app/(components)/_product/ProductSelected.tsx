'use client';

import { ISelectedOption } from '@/app/util/types';
import { IoClose } from 'react-icons/io5';

interface SelectedProps {
  index: number;
  selectedOption: ISelectedOption;
  setSelectedOptions: React.Dispatch<React.SetStateAction<ISelectedOption[]>>;
}

export default function ProductSelected({ index, selectedOption, setSelectedOptions }: SelectedProps) {
  const handleQuantityChange = (index: number, quantity: number) => {
    setSelectedOptions((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveOption = (optionName: string) => {
    setSelectedOptions((prev) => prev.filter((option) => option.name !== optionName));
  };

  return (
    <div className="w-full flex justify-between items-center my-3">
      <p className="mr-4 text-sm">{selectedOption.name}</p>
      <div className="flex items-center">
        <input
          type="number"
          value={selectedOption.quantity}
          onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
          min={1}
          className="w-16 border rounded px-2 py-1 text-sm"
        />
        <button onClick={() => handleRemoveOption(selectedOption.name)} className="ml-2 text-red-500 text-sm">
          <IoClose />
        </button>
      </div>
    </div>
  );
}
