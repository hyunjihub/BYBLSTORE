'use client';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { IoSearch } from 'react-icons/io5';
import { appFirestore } from '@/firebase/config';
import { useRouter } from 'next/navigation';

export default function Search({ setIsSearching }: { setIsSearching: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [searchWord, setSearchWord] = useState('');
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState(false);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsSearching(false);
      handleSearchWordClick(searchWord.trim());
    }
  };

  const handleSearchClick = () => {
    setIsSearching(false);
    if (searchWord.trim()) {
      router.push(`/search?word=${encodeURIComponent(searchWord.trim())}`);
    }
  };

  const handleSearchWordClick = (tag: string) => {
    setIsSearching(false);
    router.push(`/search?word=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="mt-2 w-96 h-24 absolute right-20 top-full z-50">
      <div className="relative">
        <input
          list="searchWords"
          className="w-full border border-gray-400 text-sm px-3 py-2 outline-none"
          placeholder="제품명, 업체명을 입력해주세요"
          value={searchWord || ''}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocus(true)}
        />
        {isFocus && (
          <datalist id="searchWords" className="absolute bg-white w-full border max-h-40 overflow-y-scroll">
            {tags.map((tag, index) => (
              <option key={index} onClick={() => handleSearchWordClick(tag)} value={tag}>
                {tag}
              </option>
            ))}
          </datalist>
        )}
      </div>
      <IoSearch className="absolute right-5 top-2 text-xl" onClick={handleSearchClick} />
    </div>
  );
}
