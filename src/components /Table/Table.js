import React, { useEffect, useState } from "react";
import { useDebounce } from "../../customhooks/useDebounce";
import { tableHeaders } from "./Table.constants";
import styles from "./Table.module.scss";
import ShimmerTable from "../../shimmer/ShimmerTable";

const Table = ({ searchValue }) => {
  const [places, setPlaces] = useState([]);
  const [pageLimit, setPageLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const options = new Array(10).fill(1).map((_, index) => index + 1);
  const [loading, setLoading] = useState(false);

  const totalCount = places?.metadata?.totalCount || 0;

  const pagination = Math.floor(totalCount / pageLimit);
  const paginationNumber = new Array(pagination)
    .fill(1)
    .map((_, index) => index + 1);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=${pageLimit}&countryIds=IN&namePrefix=${searchValue}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key":
            "97496cdfc4mshaf56dec78eb9a14p14201fjsnf81f40700a3f",
        },
      }
    );
    const responseData = await response.json();
    setPlaces(responseData);
    setLoading(false);
  };
  const debouncedSearch = useDebounce(fetchData, 2000);
  useEffect(() => {
    // fetchData();
    debouncedSearch();
  }, [searchValue]);
  useEffect(() => {
    fetchData();
  }, [pageLimit]);

  return (
    <div>
      {loading ? (
        <ShimmerTable rowCount={pageLimit} columnCount={3} />
      ) : (
        <table className={styles.city_table}>
          <thead>
            {places.data &&
              tableHeaders.map((header) => {
                return <th className={styles.table_header}>{header}</th>;
              })}
          </thead>
          <tbody>
            {places.data &&
              places.data.map(({ name, country }, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{country}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <div className={styles.pagination}>
        <div>
          <label className={styles.label_field}>No. of item per page</label>
          <select
            value={pageLimit}
            onChange={(e) => setPageLimit(e.target.value)}
          >
            {options.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>

        <div>
          <label className={styles.label_field}>Page Number</label>
          <select
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
          >
            {paginationNumber.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Table;
