'use client';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import AsyncSelect from 'react-select/async';
import { appFirestore } from '@/firebase/config';
import { useRouter } from 'next/navigation';

export default function Search({ setIsSearching }: { setIsSearching: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [searchWord, setSearchWord] = useState('');
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const productQuery = collection(appFirestore, 'product');
        const querySnapshot = await getDocs(productQuery);

        const allTags = new Set<string>();
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          if (productData.tag && Array.isArray(productData.tag)) {
            productData.tag.forEach((tag: string) => allTags.add(tag));
          }
        });

        setTags(Array.from(allTags));
      } catch {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    fetchTags();
  }, []);

  const loadOptions = async (inputValue: string) => {
    if (!inputValue) return [];
    const filteredTags = Array.from(tags).filter((tag) => tag.toLowerCase().includes(inputValue.toLowerCase()));

    return filteredTags.map((tag) => ({
      label: tag,
      value: tag,
    }));
  };

  const handleSearchWordClick = (tag: string | undefined) => {
    if (!tag) return;
    setIsSearching(false);
    router.push(`/search?word=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="mt-2 w-96 h-24 absolute right-20 top-full z-50">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        className="w-full text-sm outline-none"
        placeholder="제품명, 업체명을 입력해주세요"
        value={{ label: searchWord, value: searchWord }}
        onChange={(selectedOption) => handleSearchWordClick(selectedOption?.value)}
        inputValue={searchWord}
        onInputChange={(value) => setSearchWord(value)}
        isClearable
      />
    </div>
  );
}
