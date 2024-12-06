'use client';

import '@/app/globals.css';

import { ISelectedOption } from '@/app/util/types';
import { IoClose } from 'react-icons/io5';

interface SelectedProps {
  index: number;
  selectedOption: ISelectedOption;
  setSelectedOptions: React.Dispatch<React.SetStateAction<ISelectedOption[]>>;
}

export default function ProductSelected({ index, selectedOption, setSelectedOptions }: SelectedProps) {
  const handleQuantityChange = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveOption(selectedOption.option);
      return;
    }

    setSelectedOptions((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveOption = (optionName: string) => {
    setSelectedOptions((prev) => prev.filter((option) => option.option !== optionName));
  };

  return (
    <div className="w-full flex justify-between items-center my-3">
      <div className="flex">
        <p className="max-w-80 text-sm truncate">{selectedOption.option}</p>
        <button className="ml-2 text-red-500 text-sm" onClick={() => handleRemoveOption(selectedOption.option)}>
          <IoClose />
        </button>
      </div>

      <div className="flex items-center">
        <button
          className="w-7 h-7 font-extrabold border bg-gray-200"
          value="-"
          onClick={() => handleQuantityChange(index, selectedOption.quantity - 1)}
        >
          -
        </button>
        <input
          className="w-10 h-7 border rounded px-2 py-1 font-extrabold text-sm text-center"
          type="number"
          value={selectedOption.quantity}
          onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
          min={1}
        />
        <button
          className="w-7 h-7 font-extrabold border bg-gray-200"
          value="+"
          onClick={() => handleQuantityChange(index, selectedOption.quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
