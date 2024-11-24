'use client';

import { ISelectedOption } from '@/app/util/types';
import { IoMdArrowDropdown } from 'react-icons/io';
import ProductSelected from './ProductSelected';

interface OptionsProps {
  options: Array<string>;
  selectedOptions: ISelectedOption[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<ISelectedOption[]>>;
}

export default function ProductOptions({ options, selectedOptions, setSelectedOptions }: OptionsProps) {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue && !selectedOptions.some((option) => option.name === selectedValue)) {
      setSelectedOptions((prev) => [...prev, { name: selectedValue, quantity: 1 }]);
    }

    event.target.value = '';
  };

  return (
    <div className="w-[500px]">
      <div className="relative w-full my-5">
        <select
          className="w-full outline-none text-sm border py-2.5 px-3 rounded cursor-pointer"
          onChange={handleOptionChange}
        >
          <option value="">옵션 선택</option>
          {options?.map((item, key) => (
            <option key={key} value={item}>
              {item}
            </option>
          ))}
        </select>
        <IoMdArrowDropdown className="absolute right-3 top-3 text-xl pointer-events-none" />
      </div>

      {selectedOptions.length > 0 && (
        <div className="mt-4">
          {selectedOptions.map((selectedOption, index) => (
            <ProductSelected
              index={index}
              selectedOption={selectedOption}
              setSelectedOptions={setSelectedOptions}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
