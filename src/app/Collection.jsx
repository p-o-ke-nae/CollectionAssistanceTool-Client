import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import CustomButton from '../../pokenae.WebComponent/src/components/CustomButton';
import { useMemo, useRef } from 'react';
import CustomTable from '../../pokenae.WebComponent/src/components/CustomTable';

const Collection = ({ showInfo, showWarning, showConfirm }) => { 
  const tableRef = useRef(null);
  const columns = useMemo(() => [
    { header: 'Picture', name: 'profilePicture', visible: true, editable: false, type: 'image', width: '100px', showHeader: true },
    { header: 'Name', name: 'name', visible: true, editable: true, type: 'text', width: '200px', showHeader: true },
    { header: 'Email', name: 'email', visible: true, editable: false, type: 'email', width: '300px', showHeader: true },
    { header: 'Message', name: 'message', visible: false, editable: false, type: 'text', width: '300px', showHeader: true },
    { header: 'Yes/No', name: 'yesno', visible: true, editable: true, type: 'boolean', width: '100px', showHeader: true },
    { header: 'Age', name: 'age', visible: true, editable: true, type: 'number', width: '100px', settings: { min: 0, max: 120, step: 1 }, showHeader: true },
    
  ], []);

  
  const data = useMemo(() => {
    const records = [];
    for (let i = 1; i <= 1025; i++) {
      records.push({
        name: `Name ${i}`,
        email: `email${i}@example.com`,
        message: `Message Message ${i}`,
        yesno: i % 2 === 0 ? 'Yes' : 'No',
        age: Math.floor(Math.random() * 120),
        profilePicture: i === 1025 ? 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/a8425293b6269e527d85c0d7a3c7c9c2.png' : `https://ozaroom.com/images/PokemonHomeIcon/PokemonHomeIcon_${i}.png`,
      });
    }
    return records;
  }, []);

  const handleExportData = () => {
    if (tableRef.current) {
      const tableData = tableRef.current.getTableData();
      console.log(exportTableDataAsJson(tableData));
    }
  };

  const handleDataChange = (newData) => {
    setTableData([...newData]);
  };

  const handleRowClick = (row, prevRow, nextRow) => {
    setModalData({ row, prevRow, nextRow });
  };

  const closeModal = () => {
    setModalData(null);
  };

  const handlePrevRow = () => {
    if (modalData && modalData.prevRow) {
      const { row, prevRow, nextRow } = tableRef.current.getRowWithNeighbors(modalData.prevRow, tableRef.current.getCurrentData);
      setModalData({ row, prevRow, nextRow });
    }
  };

  const handleNextRow = () => {
    if (modalData && modalData.nextRow) {
      const { row, prevRow, nextRow } = tableRef.current.getRowWithNeighbors(modalData.nextRow, tableRef.current.getCurrentData);
      setModalData({ row, prevRow, nextRow });
    }
  };

  const tableSettings = {
    fixedColumns: 1,
    allowRowAddition: true,
    sortableColumns: ['name', 'email', 'age'],
    recordsPerPageOptions: [5, 10, 15, 20, 500],
  };

  
  return (
    <div className={styles.page}>
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        <CustomButton onClick={() => { showInfo("デプロイしましたdevテストtesttestmasternodeaaaprivatekeynode.jsaa", 1); }}>test</CustomButton>
        <CustomButton onClick={() => { showInfo("ポート開放！", 1); }}>test</CustomButton>
        <CustomButton onClick={() => { showWarning("ポート変更"); }}>test</CustomButton>

        <CustomTable ref={tableRef} columns={columns} data={data} rowsPerPage={10} showConfirm={showConfirm} tableSettings={ tableSettings} onDataChange={handleDataChange} onRowClick={handleRowClick} /> {/* カスタムテーブルを追加 */}
        <CustomButton onClick={handleExportData}>Export Data</CustomButton> {/* テーブルデータをJSON形式でエクスポート */}
          
        </main>
        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
  );
}

export default Collection;