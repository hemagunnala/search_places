import React from 'react';
import styles from './ShimmerTable.module.scss';

const ShimmerTable = ({ rowCount, columnCount }) => {
  const rows = Array.from({ length: rowCount }, (_, i) => i);
  const columns = Array.from({ length: columnCount }, (_, i) => i);

  return (
    <div className={styles.shimmerTable}>
      <div className={styles.tableHead}>
        {columns.map((column) => (
          <div key={column} className={styles.shimmerHeader} />
        ))}
      </div>
      <div className={styles.tableBody}>
        {rows.map((row) => (
          <div key={row} className={styles.shimmerRow}>
            {columns.map((column) => (
              <div key={`${row}-${column}`} className={styles.shimmerCell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerTable;