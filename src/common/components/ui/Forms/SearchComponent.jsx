import React, { useState, useRef, useEffect } from 'react';

import { InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

import TextField from '@/common/components/ui/Forms/TextField';

const SearchComponent = ({ methods, name }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleIconClick = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
  };

  const handleClickOutside = (event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <InputGroup ref={wrapperRef} className="d-flex align-items-center">
      <div className={`search-wrapper ${isExpanded ? 'expanded' : ''}`}>
        <TextField name={name} floatingLabel={false} placeholder="Search..." methods={methods}
          className="search-input rounded-0"
        />
      </div>
      <Button
        variant="outline-secondary"
        onClick={isExpanded ? null : handleIconClick}
        className="search-icon"
      >
        <FaSearch />
      </Button>

      <style jsx>{`
        .search-wrapper {
          overflow: hidden;
          display: inline-block;
          width: 0;
          transition: width 0.4s ease;
        }

        .search-wrapper.expanded {
          width: 200px;
        }

        .search-input {
          width: 100%;
        }
      `}</style>
    </InputGroup>
  );
};

export default SearchComponent;
