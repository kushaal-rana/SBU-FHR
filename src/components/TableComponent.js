import { MaterialReactTable } from "material-react-table";
import { CsvBuilder } from "filefy";

const TableComponent = (props) => {
  const columnsData = props?.data?.Columns?.map((column, index) => ({
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

  const rowsData = props?.data?.Rows?.map((row) => {
    return props?.data?.Columns.reduce((acc, column, index) => {
      acc[column] = row[index];
      return acc;
    }, {});
  });

  const columns = columnsData;
  const data = rowsData;
  console.log(columns, "ColumnssX");
  console.log(data, "Rows");

  return (
    <>
      <div className="table">
        <MaterialReactTable
          columns={columns}
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
