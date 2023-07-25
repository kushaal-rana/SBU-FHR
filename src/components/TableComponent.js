const TableComponent = (props) => {
  const dataa = {
    table_name: "generate_querylog",
    rows_cols: [
      {
        id: 1,
        nlq: '"Retrieve the mother\'s prenatal delivery records for a specific person ID."',
        sql: "SELECT * FROM child_structured_data_2022.mother_prenatal_delivery WHERE mother_person_id = 'specific_person_id';",
        datetime: "2023-07-18T16:41:41.788698-05:00",
      },
      {
        id: 2,
        nlq: "Retrieve the mother's prenatal delivery records for a specific person ID.",
        sql: "SELECT * FROM child_structured_data_2022.mother_prenatal_delivery WHERE mother_person_id = 'specific_person_id';",
        datetime: "2023-07-18T21:36:33.370956-05:00",
      },
    ],
  };
  const data = props.data;
  console.log(data, "DATAAA");

  return (
    <div className="table-container">
      <h2>Table </h2>
      <div className="table-scrollable">
        <table className="table">
          <thead>
            <tr>
              <th>Table Name</th>
              <th>ID</th>
              <th>NLQ</th>
              <th>SQL</th>
              <th>DateTime</th>
            </tr>
          </thead>
          <tbody>
            {data?.rows_cols?.map((item) => (
              <tr key={item.id}>
                <td>{data.table_name}</td>
                <td>{item.id}</td>
                <td>{item.nlq}</td>
                <td>{item.sql}</td>
                <td>{item.datetime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
