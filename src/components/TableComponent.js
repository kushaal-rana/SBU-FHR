import { CsvBuilder } from "filefy";

import { MaterialReactTable } from "material-react-table";

const TableComponent = (props) => {
  const columnNames = Object?.keys(props.data.Data);
  console.log(columnNames, "hello");
  const columnsData = columnNames?.map((column, index) => ({
    accessorKey: column,
    header: column,
    size: 250,
    Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
  }));

  const DownloadAllRows = () => {
    new CsvBuilder("fhrData.csv")
      .setColumns(columns.map((col) => col.header))
      .addRows(
        data.map((rowData) => columns.map((col) => rowData[col.accessorKey]))
      )
      .exportFile();
  };

  // Extract individual arrays from the data object
  const date_time = props?.data?.Data.date_time;
  const mother_encounter_id = props?.data?.Data.mother_encounter_id;
  const mother_person_id = props?.data?.Data.mother_person_id;
  const note = props?.data?.Data.note;
  const note_title = props?.data?.Data.note_title;

  // Create an array of objects
  const rowsData = date_time?.map((date, index) => ({
    date_time: date,
    mother_encounter_id: mother_encounter_id[index],
    mother_person_id: mother_person_id[index],
    note: note[index],
    note_title: note_title[index],
  }));

  debugger;
  console.log(rowsData, "Rows");

  const columns = columnsData;
  const data = rowsData;

  return (
    <>
      <div className="table">
        <MaterialReactTable
          columns={columnsData}
          data={data}
          enablePinning
          enableRowNumbers
          enableRowVirtualization
          muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
        />
      </div>
      <button className="download-btn" onClick={DownloadAllRows}>
        Download as CSV
      </button>
    </>
  );
};

export default TableComponent;
