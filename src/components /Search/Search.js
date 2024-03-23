import React, { useEffect, useRef } from "react";
import styles from "./Search.module.scss";

const Search = ({searchValue,setSearchValue}) => {
  const searchRef = useRef();
  function handleKeyDown(event) {
    if (event.ctrlKey && event.key === "/") {
      searchRef.current.focus();
      event.preventDefault();
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return ()=>{
        document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <>
      <div className={styles.search_container}>
      <input
        type="text"
        className={styles.search_input}
        placeholder="Search places..."
        value={searchValue}
        onChange={(e)=>setSearchValue(e.target.value)}
        ref={searchRef}
      />
      <div className={styles.search_placeholder}>Ctrl+/</div>
    </div>
    </>
  );
};

export default Search;
