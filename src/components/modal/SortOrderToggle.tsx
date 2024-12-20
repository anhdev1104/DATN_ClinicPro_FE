import React, { useState } from 'react';
import { SwapVertIcon } from '../icons';

interface SortOrderToggleProps {
  onSort: (sortOrder: 'asc' | 'desc') => void;
}

const SortOrderToggle: React.FC<SortOrderToggleProps> = ({ onSort }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleToggleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    onSort(newOrder);
  };

  return (
    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800" onClick={handleToggleSort}>
      <SwapVertIcon className={sortOrder === 'asc'} />
      {sortOrder === 'asc'}
    </button>
  );
};

export default SortOrderToggle;
