// Use client-side rendering for the component
"use client"
import React, { useState, useEffect } from 'react';
import { Input } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

// Define interfaces for your data
interface Movie {
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
}

interface SearchResults {
  movies: Movie[];
  users: User[];
}

interface DropdownMenuProps {
  onCategoryChange: (category: 'Movies' | 'Users') => void;
}

const DropdownMenu = ({ onCategoryChange }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonName, setButtonName] = useState('Movies'); // Default to Movies

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleMenuClick = (name: 'Movies' | 'Users') => {
    setIsOpen(false);
    setButtonName(name);
    onCategoryChange(name);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-between"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {buttonName} <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="ml-2" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => handleMenuClick('Movies')}
          >
            Movies
          </button>
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => handleMenuClick('Users')}
          >
            Users
          </button>
        </div>
      )}
    </div>
  );
};

// Mock fetch function to simulate fetching data based on category
const fetchData = async (query: string, category: 'Movies' | 'Users'): Promise<SearchResults> => {
  const data = {
    Movies: {
      movies: [
        { id: 1, title: "Inception" },
        { id: 2, title: "Interstellar" },
      ],
      users: []
    },
    Users: {
      movies: [],
      users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ]
    }
  };

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data[category]);
    }, 500); // Simulate network delay
  });
};

// Type Guard to determine if an item is a Movie
function isMovie(item: Movie | User): item is Movie {
  return (item as Movie).title !== undefined;
}

// Utility function to sort search results based on match with the query
const sortItems = (items: any[], query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return items.sort((a, b) => {
    const nameA = (isMovie(a) ? a.title : a.name).toLowerCase();
    const nameB = (isMovie(b) ? b.title : b.name).toLowerCase();
    const startsWithA = nameA.startsWith(lowerCaseQuery);
    const startsWithB = nameB.startsWith(lowerCaseQuery);

    if (startsWithA && !startsWithB) {
      return -1;
    } else if (!startsWithA && startsWithB) {
      return 1;
    } else {
      return nameA.localeCompare(nameB);
    }
  });
};

interface ResultsDropdownProps {
  category: 'Movies' | 'Users';
  results: SearchResults;
  onSelect: (id: number) => void;
}

const ResultsDropdown = ({ category, results, onSelect }: ResultsDropdownProps) => {
  const items = category === 'Movies' ? results.movies : results.users;
  return (
    <div className={`absolute z-50 bg-white mt-1 p-2 rounded shadow-lg max-h-60 overflow-auto ${items.length ? 'block' : 'hidden'}`}>
      {items.map(item => (
        <div key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer text-black" onClick={() => onSelect(item.id)}>
          {isMovie(item) ? item.title : item.name}
        </div>
      ))}
    </div>
  );
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Movies' | 'Users'>('Movies');
  const [results, setResults] = useState<SearchResults>({ movies: [], users: [] });
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      fetchData(query, selectedCategory).then(res => {
        // Apply sorting to the fetched results before setting them
        const sortedMovies = sortItems(res.movies, query);
        const sortedUsers = sortItems(res.users, query);
        setResults({
          movies: sortedMovies,
          users: sortedUsers
        });
        setShowResults(true);
      });
    } else {
      setShowResults(false);
    }
  }, [query, selectedCategory]);

  const handleSelectResult = (id: number) => {
    console.log(`Selected ${selectedCategory.slice(0, -1)} ID:`, id);
    setShowResults(false);
    // Implement further actions upon selecting a result here
  };

  return (
    <div className='flex flex-row items-center p-5'>
        <DropdownMenu onCategoryChange={setSelectedCategory} />
        <div className='relative ml-4'> 
            <Input
              className='text-white border border-white'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results.movies.length > 0 || results.users.length > 0 ? setShowResults(true) : null}
              placeholder={`Search ${selectedCategory.toLowerCase()}...`}
            />
            {showResults && (
              <div className="absolute w-full z-10">
                <ResultsDropdown
                  category={selectedCategory}
                  results={results}
                  onSelect={handleSelectResult}
                />
              </div>
            )}
        </div>
    </div>
  );
};

export default SearchBar;
