"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import FilterableTable from "../components/filterableTable2";

import { ExpandMore, ExpandLess } from "@mui/icons-material";

const fetchDatabaseDetails = async (DB1, DB2) => {
  try {
    const response = await fetch("/api/databaseCompare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ DB1, DB2 }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      return errorText;
    }

    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message || "An error occurred");
    setData(null);
  }
};

const DatabaseCompare = () => {
  const [DB1, setDB1] = useState("");
  const [DB2, setDB2] = useState("");
  const [data, setData] = useState(null);
  const [databases, setDatabases] = useState([]);
  const [expandedDb1, setExpandedDb1] = useState(false);
  const [expandedDb2, setExpandedDb2] = useState(false);
  const [expandedTableDb1, setExpandedTableDb1] = useState(null);
  const [expandedTableDb2, setExpandedTableDb2] = useState(null);
  const [showDb1Tables, setShowDb1Tables] = useState(false);
  const [showDb2Tables, setShowDb2Tables] = useState(false);

  const [expandedDb1Procedure, setExpandedDb1Procedure] = useState(false);
  const [expandedDb2Procedure, setExpandedDb2Procedure] = useState(false);
  const [showDb1Procedure, setshowDb1Procedure] = useState(false);
  const [showDb2Procedure, setshowDb2Procedure] = useState(false);

  const [expandedDb1Function, setExpandedDb1Function] = useState(false);
  const [expandedDb2Function, setExpandedDb2Function] = useState(false);
  const [showDb1Function, setshowDb1Function] = useState(false);
  const [showDb2Function, setshowDb2Function] = useState(false);

  const [expandedDb1View, setExpandedDb1View] = useState(false);
  const [expandedDb2View, setExpandedDb2View] = useState(false);
  const [showDb1View, setshowDb1View] = useState(false);
  const [showDb2View, setshowDb2View] = useState(false);

  const toggleDb1ViewDetails = () => {
    setExpandedDb1View(!expandedDb1View);
    setshowDb1View(!showDb1View);

    if (!expandedDb1View) {
      setExpandedDb1Function(false);
      setshowDb1Function(false);
      setExpandedDb1Procedure(false);
      setshowDb1Procedure(false);
      setExpandedDb1(false);
      setShowDb1Tables(false);
    }
  };

  const toggleDb2ViewDetails = () => {
    setExpandedDb2View(!expandedDb2View);
    setshowDb2View(!showDb2View);
    if (!expandedDb2View) {
      setExpandedDb2Function(false);
      setshowDb2Function(false);
      setExpandedDb2Procedure(false);
      setshowDb2Procedure(false);
      setExpandedDb2(false);
      setShowDb2Tables(false);
    }
  };

  const toggleDb1FunctionDetails = () => {
    setExpandedDb1Function(!expandedDb1Function);
    setshowDb1Function(!showDb1Function);

    if (!expandedDb1Function) {
      setExpandedDb1View(false);
      setshowDb1View(false);
      setExpandedDb1Procedure(false);
      setshowDb1Procedure(false);
      setExpandedDb1(false);
      setShowDb1Tables(false);
    }
  };

  const toggleDb2FunctionDetails = () => {
    setExpandedDb2Function(!expandedDb2Function);
    setshowDb2Function(!showDb2Function);

    if (!expandedDb2Function) {
      setExpandedDb2View(false);
      setshowDb2View(false);
      setExpandedDb2Procedure(false);
      setshowDb2Procedure(false);
      setExpandedDb2(false);
      setShowDb2Tables(false);
    }
  };

  const toggleDb1ProcedureDetails = () => {
    setExpandedDb1Procedure(!expandedDb1Procedure);
    setshowDb1Procedure(!showDb1Procedure);

    if (!expandedDb1Procedure) {
      setExpandedDb1View(false);
      setshowDb1View(false);
      setExpandedDb1Function(false);
      setshowDb1Function(false);
      setExpandedDb1(false);
      setShowDb1Tables(false);
    }
  };

  const toggleDb2ProcedureDetails = () => {
    setExpandedDb2Procedure(!expandedDb2Procedure);
    setshowDb2Procedure(!showDb2Procedure);

    if (!expandedDb2Procedure) {
      setExpandedDb2View(false);
      setshowDb2View(false);
      setExpandedDb2Function(false);
      setshowDb2Function(false);
      setExpandedDb2(false);
      setShowDb2Tables(false);
    }
  };

  const toggleDb1Details = () => {
    setExpandedDb1(!expandedDb1);
    setShowDb1Tables(!showDb1Tables);
    if (!expandedDb1) {
      setExpandedDb1View(false);
      setshowDb1View(false);
      setExpandedDb1Function(false);
      setshowDb1Function(false);
      setExpandedDb1Procedure(false);
      setshowDb1Procedure(false);
    }
  };

  const toggleDb2Details = () => {
    setExpandedDb2(!expandedDb2);
    setShowDb2Tables(!showDb2Tables);
    if (!expandedDb2) {
      setExpandedDb2View(false);
      setshowDb2View(false);
      setExpandedDb2Function(false);
      setshowDb2Function(false);
      setExpandedDb2Procedure(false);
      setshowDb2Procedure(false);
    }
  };

  useEffect(() => {
    const getDatabases = async () => {
      try {
        const response = await fetch("/api/databaseMaster/dropdown");
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setDatabases(data.data);
        } else {
          setDatabases([]);
        }
      } catch (err) {
        setDatabases([]);
      }
    };

    getDatabases();
  }, []);

  const handleSubmit = async () => {
    if (!DB1 || !DB2) {
      toast.error("Please select both databases.");
      return;
    }

    // loadingOn();

    const result = await fetchDatabaseDetails(DB1, DB2);

    if (result) {
      setData(result);
    }

    // loadingOff();
  };

  const [expandedDb1Tables, setExpandedDb1Tables] = useState({});
  const toggleTableDb1 = (tableName) => {
    setExpandedDb1Tables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  const [expandedDb2Tables, setExpandedDb2Tables] = useState({});

  const toggleTableDb2 = (tableName) => {
    setExpandedDb2Tables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  
  const [expandedDb1Procedures, setExpandedDb1Procedures] = useState({});
  const toggleProcedureDb1 = (procedure_name) => {
    setExpandedDb1Procedures(prevState => ({
      ...prevState,
      [procedure_name]: !prevState[procedure_name],
    }));
  };

  const [expandedDb2Procedures, setExpandedDb2Procedures] = useState({});
  const toggleProcedureDb2 = (procedureName) => {
    setExpandedDb2Procedures(prevState => ({
      ...prevState,
      [procedureName]: !prevState[procedureName] 
    }));
  };
  
  const [expandedDb1Functions, setExpandedDb1Functions] = useState({});

  const toggleFunctionDb1 = (functionName) => {
    setExpandedDb1Functions((prevState) => ({
      ...prevState,
      [functionName]: !prevState[functionName], 
    }));
  };



  const [expandedDb2Functions, setExpandedDb2Functions] = useState({});
  const toggleFunctionDb2 = (functionName) => {
    setExpandedDb2Functions((prevState) => ({
      ...prevState,
      [functionName]: !prevState[functionName], 
    }));
  };

  const [expandedDb1Views, setExpandedDb1Views] = useState({});

  const toggleViewDb1 = (viewName) => {
    setExpandedDb1Views((prevState) => ({
      ...prevState,
      [viewName]: !prevState[viewName],
    }));
  };


  const [expandedDb2Views, setExpandedDb2Views] = useState({});

  const toggleViewDb2 = (viewName) => {
    setExpandedDb2Views((prevState) => ({
      ...prevState,
      [viewName]: !prevState[viewName],
    }));
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center mt-4">
          <FormControl style={{ width: "250px" }} className="me-3 mx-2">
            <InputLabel>Select Database 1</InputLabel>
            <Select
              value={DB1}
              onChange={(e) => setDB1(e.target.value)}
              label="Select Database 1"
            >
              <MenuItem value="" disabled>
                Select Database
              </MenuItem>
              {databases.length > 0 ? (
                databases.map((database, index) => (
                  <MenuItem key={index} value={database.value}>
                    {database.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading...</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl style={{ width: "250px" }} className="ms-3" fullWidth>
            <InputLabel>Select Database 2</InputLabel>
            <Select
              value={DB2}
              onChange={(e) => setDB2(e.target.value)}
              label="Select Database 2"
            >
              <MenuItem value="" disabled>
                Select Database
              </MenuItem>
              {databases.length > 0 ? (
                databases.map((database, index) => (
                  <MenuItem key={index} value={database.value}>
                    {database.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading...</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>

        <Button
          onClick={handleSubmit}
          className="bg-primary justify-content-center mr-5"
        >
          Get Details
        </Button>
      </div>

      <div className="row ml-2 mr-2">
        <div className="col-lg-6 p-1">
          <h5>Database - {String(DB1)}</h5>
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Tables</th>
                <th>Views</th>
                <th>Functions</th>
                <th>Procedures</th>
              </tr>
            </thead>
            <tbody>
              {data && data.db1?.counts ? (
                <>
                  <tr>
                    <td
                      onClick={toggleDb1Details}
                      style={{ cursor: "pointer" }}
                    >
                      {data.db1.counts.tables}
                      {showDb1Tables ? <ExpandLess /> : <ExpandMore />}
                    </td>
                    <td
                      onClick={toggleDb1ViewDetails}
                      style={{ cursor: "pointer" }}
                    >
                      {data.db1.counts.views}
                      {showDb1View ? <ExpandLess /> : <ExpandMore />}
                    </td>
                    <td
                      onClick={toggleDb1FunctionDetails}
                      style={{ cursor: "pointer" }}
                    >
                      {data.db1.counts.functions}
                      {showDb1Function ? <ExpandLess /> : <ExpandMore />}
                    </td>
                    <td
                      onClick={toggleDb1ProcedureDetails}
                      style={{ cursor: "pointer" }}
                    >
                      {data.db1.counts.procedures}
                      {showDb1Procedure ? <ExpandLess /> : <ExpandMore />}
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted">
                    No data available
                  </td>
                </tr>
              )}
              <>
                <>
                  {expandedDb1 && data.db1.tables && (
                    <tr>
                      <td colSpan={4}>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Table Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.db1.tables.length > 0 ? (
                              data.db1.tables.map((table, index) => {
                                const isExpanded =
                                  expandedDb1Tables[table.table_name];
                                return [
                                  <tr
                                    key={`row-${index}`}
                                    onClick={() =>
                                      toggleTableDb1(table.table_name)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    <td>{index + 1}</td>
                                    <td>{table.table_name}</td>
                                  </tr>,

                                  isExpanded && (
                                    <tr key={`expand-${index}`}>
                                      <td colSpan={2}>
                                        <table className="table table-sm table-striped mb-0">
                                          <thead>
                                            <tr>
                                              <th>#</th>
                                              <th>Column Name</th>
                                              <th>Data Type</th>
                                              <th>Nullable</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {table.columns.map(
                                              (col, colIndex) => (
                                                <tr key={colIndex}>
                                                  <td>{colIndex + 1}</td>
                                                  <td>{col.column_name}</td>
                                                  <td>
                                                    {col.data_type}
                                                    {col.type_details
                                                      ? `(${col.type_details})`
                                                      : ""}
                                                  </td>
                                                  <td>
                                                    {col.is_nullable
                                                      ? "Yes"
                                                      : "No"}
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  ),
                                ];
                              })
                            ) : (
                              <tr>
                                <td colSpan={2} className="text-center">
                                  No data
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
                {expandedDb1Procedure && data.db1.procedures && (
  <tr>
    <td colSpan={4}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Procedure Name</th>
          </tr>
        </thead>
        <tbody>
          {data.db1.procedures.length > 0 ? (
            data.db1.procedures.map((proc, index) => {
              const isExpanded = expandedDb1Procedures[proc.procedure_name]; 
              return [
                <tr
                  key={`proc-row-${index}`}
                  onClick={() => toggleProcedureDb1(proc.procedure_name)} 
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{proc.procedure_name}</td>
                </tr>,

         
                isExpanded && (
                  <tr key={`expand-proc-${index}`}>
                    <td colSpan={2}>
                      <table className="table table-sm table-striped mb-0">
                      
                        <tbody>
                          {proc.columns &&
                            proc.columns.map((col, colIndex) => (
                              <tr key={`col-${col.column_name}`}>
                                <td>{colIndex + 1}</td>
                                <td>{col.param_name}</td>
                                <td>
                                  {col.data_type}
                                  {col.type_details ? `(${col.type_details})` : ''}
                                </td>
                                <td>{col.is_nullable ? 'Yes' : 'No'}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ),

                // Expanded parameters for the procedure (if available)
                isExpanded && proc.parameters && proc.parameters.length > 0 && (
                  <tr key={`expand-params-${index}`}>
                    <td colSpan={2}>
                      <table className="table table-sm table-striped mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Parameter Name</th>
                            <th>Data Type</th>
                            <th>Is Output</th>
                          </tr>
                        </thead>
                        <tbody>
                          {proc.parameters.map((param, paramIndex) => (
                            <tr key={`param-${param.parameter_name}-${paramIndex}`}>
                              <td>{paramIndex + 1}</td>
                              <td>{param.param_name}</td>
                              <td>{param.data_type}</td>
                              <td>{param.is_output ? 'Yes' : 'No'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ),
              ];
            })
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </td>
  </tr>
)}




              </>
              <>
              {expandedDb1Function && data.db1.functions && (
  <tr>
    <td colSpan={4}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Function Name</th>
          </tr>
        </thead>
        <tbody>
          {data.db1.functions.length > 0 ? (
            data.db1.functions.map((func, index) => {
              const isExpanded = expandedDb1Functions[func.function_name]; 
              return [
                <tr
                  key={`func-row-${index}`}
                  onClick={() => toggleFunctionDb1(func.function_name)} 
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{func.function_name}</td>
                </tr>,

                isExpanded && func.columns && func.columns.length > 0 && (
                  <tr key={`expand-func-${index}`}>
                    <td colSpan={2}>
                      <table className="table table-sm table-striped mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Column Name</th>
                            <th>Data Type</th>
                          
                            <th>Nullable</th>
                          </tr>
                        </thead>
                        <tbody>
                          {func.columns.map((col, colIndex) => (
                            <tr key={`col-${col.column_name}`}>
                              <td>{colIndex + 1}</td>
                              <td>{col.column_name}</td>
                              <td>
                                {col.data_type} -
                                {col.type_details ? `(${col.type_details})` : ''}
                              </td>
                              <td>{col.is_nullable ? 'Yes' : 'No'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ),

                // Expanded parameters for the function (if available)
                isExpanded && func.parameters && func.parameters.length > 0 && (
                  <tr key={`expand-params-${index}`}>
                    <td colSpan={2}>
                      <table className="table table-sm table-striped mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Parameter Name</th>
                            <th>Data Type</th>
                            <th>Is Output</th>
                          </tr>
                        </thead>
                        <tbody>
                          {func.parameters.map((param, paramIndex) => (
                            <tr key={`param-${param.parameter_name}-${paramIndex}`}>
                              <td>{paramIndex + 1}</td>
                              <td>{param.param_name}</td>
                              <td>{param.data_type}</td>
                              <td>{param.is_output ? 'Yes' : 'No'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ),
              ];
            })
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </td>
  </tr>
)}

              </>
              <>
              {expandedDb1View && (
  <tr>
    <td colSpan={4}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>View Name</th>
          </tr>
        </thead>
        <tbody>
          {data.db1.views && data.db1.views.length > 0 ? (
            data.db1.views.map((view, index) => {
              const isExpanded = expandedDb1Views[view.view_name]; // Check if the view is expanded
              return [
                // View Row
                <tr
                  key={`view-row-${index}`}
                  onClick={() => toggleViewDb1(view.view_name)} // Toggle on click
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{view.view_name}</td>
                </tr>,

                // Expanded View Columns (if available)
                isExpanded && view.columns && view.columns.length > 0 && (
                  <tr key={`expand-view-${index}`}>
                    <td colSpan={2}>
                      <table className="table table-sm table-striped mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Column Name</th>
                            <th>Data Type</th>
                            <th>Nullable</th>
                          </tr>
                        </thead>
                        <tbody>
                          {view.columns.map((col, colIndex) => (
                            <tr key={`col-${col.column_name}`}>
                              <td>{colIndex + 1}</td>
                              <td>{col.column_name}</td>
                              <td>
                                {col.data_type}
                                {col.type_details ? `(${col.type_details})` : ''}
                              </td>
                              <td>{col.is_nullable ? 'Yes' : 'No'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ),
              ];
            })
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </td>
  </tr>
)}

              </>
            </tbody>
          </table>
        </div>

        <div className="col-lg-6 p-1">
          <h5>Database - {String(DB2)}</h5>
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Tables</th>
                <th>Views</th>
                <th>Functions</th>
                <th>Procedures</th>
              </tr>
            </thead>
            <tbody>
              {data && data.db2?.counts ? (
                <>
                  <tr>
                    <td
                      onClick={toggleDb2Details}
                      style={{ cursor: "pointer" }}
                    >
                      {data.db2.counts.tables}
                      {showDb2Tables ? <ExpandLess /> : <ExpandMore />}
                    </td>
                    <td
                      onClick={toggleDb2ViewDetails}
                      style={{ cursor: "pointer" }}
                    >
                      {data.db2.counts.views}
                      {showDb2View ? <ExpandLess /> : <ExpandMore />}
                    </td>
                    <td
                      onClick={toggleDb2FunctionDetails}
                      style={{ cursor: "pointer" }}
                    >
                      {data.db2.counts.functions}
                      {showDb2Function ? <ExpandLess /> : <ExpandMore />}
                    </td>

                    <td
                      onClick={toggleDb2ProcedureDetails}
                      style={{ cursor: "pointer" }}
                    >
                      {data.db2.counts.procedures}
                      {showDb2Procedure ? <ExpandLess /> : <ExpandMore />}
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted">
                    No data available
                  </td>
                </tr>
              )}

              <>
                {expandedDb2 && data.db2.tables && (
                  <tr>
                    <td colSpan={4}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Table Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.db2.tables.length > 0 ? (
                            data.db2.tables.map((table, index) => {
                              const isExpanded =
                                expandedDb2Tables[table.table_name];
                              return [
                                <tr
                                  key={`row-${index}`}
                                  onClick={() =>
                                    toggleTableDb2(table.table_name)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <td>{index + 1}</td>
                                  <td>{table.table_name}</td>
                                </tr>,

                                isExpanded && (
                                  <tr key={`expand-${index}`}>
                                    <td colSpan={2}>
                                      <table className="table table-sm table-striped mb-0">
                                        <thead>
                                          <tr>
                                            <th>#</th>
                                            <th>Column Name</th>
                                            <th>Data Type</th>
                                            <th>Nullable</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {table.columns.map(
                                            (col, colIndex) => (
                                              <tr key={colIndex}>
                                                <td>{colIndex + 1}</td>
                                                <td>{col.column_name}</td>
                                                <td>
                                                  {col.data_type}
                                                  {col.type_details
                                                    ? `(${col.type_details})`
                                                    : ""}
                                                </td>
                                                <td>
                                                  {col.is_nullable
                                                    ? "Yes"
                                                    : "No"}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                ),
                              ];
                            })
                          ) : (
                            <tr>
                              <td colSpan={2} className="text-center">
                                No data
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </>
              <>
              {expandedDb2Procedure && data.db2.procedures && (
  <tr>
    <td colSpan={4}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Procedure Name</th>
          </tr>
        </thead>
        <tbody>
          {data.db2.procedures.length > 0 ? (
            data.db2.procedures.map((proc, index) => {
              const isExpanded = expandedDb2Procedures[proc.procedure_name]; 
              return [
                <tr
                  key={`proc-row-${index}`}
                  onClick={() => toggleProcedureDb2(proc.procedure_name)} 
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{proc.procedure_name}</td>
                </tr>,

         
                isExpanded && (
                  <tr key={`expand-proc-${index}`}>
                    <td colSpan={2}>
                      <table className="table table-sm table-striped mb-0">
                      
                        <tbody>
                          {proc.columns &&
                            proc.columns.map((col, colIndex) => (
                              <tr key={`col-${col.column_name}`}>
                                <td>{colIndex + 1}</td>
                                <td>{col.parameter_name}</td>
                                <td>
                                  {col.data_type}
                                  {col.type_details ? `(${col.type_details})` : ''}
                                </td>
                                <td>{col.is_nullable ? 'Yes' : 'No'}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ),

                isExpanded && proc.parameters && proc.parameters.length > 0 && (
                  <tr key={`expand-params-${index}`}>
                    <td colSpan={2}>
                      <table className="table table-sm table-striped mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Parameter Name</th>
                            <th>Data Type</th>
                            <th>Is Output</th>
                          </tr>
                        </thead>
                        <tbody>
                          {proc.parameters.map((param, paramIndex) => (
                            <tr key={`param-${param.parameter_name}-${paramIndex}`}>
                              <td>{paramIndex + 1}</td>
                              <td>{param.param_name}</td>
                              <td>{param.data_type}</td>
                              <td>{param.is_output ? 'Yes' : 'No'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ),
              ];
            })
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </td>
  </tr>
)}

              </>

              <>
              {expandedDb2Function && data.db2.functions && (
  <tr>
    <td colSpan={4}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Function Name</th>
          </tr>
        </thead>
        <tbody>
          {data.db2.functions.length > 0 ? (
            data.db2.functions.map((func, index) => {
              const isExpanded = expandedDb2Functions[func.function_name]; 
              return [
                <tr
                  key={`func-row-${index}`}
                  onClick={() => toggleFunctionDb2(func.function_name)} 
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{func.function_name}</td>
                </tr>,

                isExpanded && func.columns && func.columns.length > 0 && (
                  <tr key={`expand-func-${index}`}>
                    <td colSpan={2}>
                      <table className="table table-sm table-striped mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Column Name</th>
                            <th>Data Type</th>
                          
                            <th>Nullable</th>
                          </tr>
                        </thead>
                        <tbody>
                          {func.columns.map((col, colIndex) => (
                            <tr key={`col-${col.column_name}`}>
                              <td>{colIndex + 1}</td>
                              <td>{col.column_name}</td>
                              <td>
                                {col.data_type} -
                                {col.type_details ? `(${col.type_details})` : ''}
                              </td>
                              <td>{col.is_nullable ? 'Yes' : 'No'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ),

             
                isExpanded && func.parameters && func.parameters.length > 0 && (
                  <tr key={`expand-params-${index}`}>
                    <td colSpan={2}>
                      <table className="table table-sm table-striped mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Parameter Name</th>
                            <th>Data Type</th>
                            <th>Is Output</th>
                          </tr>
                        </thead>
                        <tbody>
                          {func.parameters.map((param, paramIndex) => (
                            <tr key={`param-${param.parameter_name}-${paramIndex}`}>
                              <td>{paramIndex + 1}</td>
                              <td>{param.param_name}</td>
                              <td>{param.data_type}</td>
                              <td>{param.is_output ? 'Yes' : 'No'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ),
              ];
            })
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </td>
  </tr>
)}
              </>
              {expandedDb2View && (
  <tr>
    <td colSpan={4}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>View Name</th>
          </tr>
        </thead>
        <tbody>
          {data.db2.views && data.db2.views.length > 0 ? (
            data.db2.views.map((view, index) => {
              const isExpanded = expandedDb2Views[view.view_name]; 
              return [
                
                <tr
                  key={`view-row-${index}`}
                  onClick={() => toggleViewDb2(view.view_name)} 
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{view.view_name}</td>
                </tr>,

                // Expanded View Columns (if available)
                isExpanded && view.columns && view.columns.length > 0 && (
                  <tr key={`expand-view-${index}`}>
                    <td colSpan={2}>
                      <table className="table table-sm table-striped mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Column Name</th>
                            <th>Data Type</th>
                            <th>Nullable</th>
                          </tr>
                        </thead>
                        <tbody>
                          {view.columns.map((col, colIndex) => (
                            <tr key={`col-${col.column_name}`}>
                              <td>{colIndex + 1}</td>
                              <td>{col.column_name}</td>
                              <td>
                                {col.data_type}
                                {col.type_details ? `(${col.type_details})` : ''}
                              </td>
                              <td>{col.is_nullable ? 'Yes' : 'No'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ),
              ];
            })
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </td>
  </tr>
)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DatabaseCompare;
