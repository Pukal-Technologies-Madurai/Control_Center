"use client";
import { useState, useEffect, Fragment } from "react";
import FilterableTable from "../components/filterableTable2"
import CreateIcon from '@mui/icons-material/Create';
import DataTable from 'react-data-table-component'
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent, TextField } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Button, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UTCDateWithTime } from '../components/functions'
import { Add } from "@mui/icons-material";
import { isEqualNumber } from "../components/functions"
import { Tooltip } from "@mui/material";

const tableStyle = {
  headRow: {
    style: {
      backgroundColor: "#343a40",
      color: "#ffffff",
      fontWeight: "bold",
    },
    className: "table table-bordered table-striped"
  },
  rows: {
    style: {
      "&:nth-of-type(odd)": {
        backgroundColor: "white",
      },
      "&:nth-of-type(even)": {
        backgroundColor: "#8AC7DB",
      },
    },
  },
};


export default function CompanyTable() {
  const [company, setCompany] = useState([]);
  const [error, setError] = useState(null);
  const [dialog, setDialog] = useState(false)
  const [screen, setScreen] = useState(false);
  const initialState = {
    App_Name: '',
    App_Type: '',
    Version_No: '',
    Version_Date: '',
    Description: '',
  }
  const [dialogDelete, setDialogDelete] = useState(false)

  const [inputValueVersion, setInputValueVersion] = useState({
    App_Id: '',
    Version_No: "",
    Version_Date: "",
    Description: "",
  });
  const [reload, setReload] = useState(false)
  const [inputValue, setInputValue] = useState(initialState);
  const [filterInput, setFilterInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [dialogBox, setDialogBox] = useState(false)
  const switchScreen = () => {
    setInputValue(initialState);
    setScreen(pre => !pre);
  };
 const [deleteSubDialig,setDeleteSubDialog]=useState(false)
  const editRow = (company) => {
    const { App_Name, App_Type, Version_No, Version_Date, Description } = company;

    setInputValue(pre => ({ ...pre, App_Name, App_Type, Version_No, Version_Date, Description }));
    setScreen(true);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/appMaster");
        const data = await response.json();

        if (data.success) {
          setCompany(data.data);
        } else {
          setError(data.message || "Failed to fetch App data.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      
      }
    };

    fetchData();
  }, [reload]);

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch("/api/appMaster", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ App_Id: inputValueVersion.App_Id }),
      });

      const data = await response.json();

      if (data.success) {
        setReload(!reload);
        setDialog(prev => !prev);
        setDialogDelete(false)
        setInputValue(initialState);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };



  const handleDeleteSubdialogConfirm = async () => {
    try {
      const response = await fetch("/api/appMaster/version", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Id: inputValueVersion.Id,App_Id:inputValueVersion.App_Id }),
      });

      const data = await response.json();

      if (data.success) {
        setReload(!reload);
        setDialog(prev => !prev);
        setDeleteSubDialog(false)
        setInputValueVersion(initialState);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred. Please try again later.");
    }
  };



  // handlesubRoutingUpdate=async()=>{
  //   try {
  //     const response = await fetch("/api/appMaster/version", {
  //       method: inputValueVersion.Id ? "PUT" : "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(inputValueVersion),
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       setScreen(false);
  //       setCompany(prev => [...prev, inputValueVersion]);
  //       toast.success(data.message);
  //       setReload(!reload)
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting company:", error);
  //     toast.error("An error occurred. Please try again later.");
  //   }
  // }

  const DisplaySubRoutings = ({ dataSource }) => {
    return (
      <div className="p-3 border-top">
        <FilterableTable
          dataArray={dataSource?.ParantData || []}
          columns={[
            {
              isVisible: 1,
              Field_Name: 'App_Id',
              length: 1,
              Fied_Data: 'string',
              ColumnHeader: 'App_Id',
            },
            {
              isVisible: 1,
              Field_Name: 'Version_No',
              length: 1,
              Fied_Data: 'string',
              ColumnHeader: 'Version_No',
            },

            {
              isVisible: 1,
              Field_Name: 'Version_Date',
              length: 1,
              Fied_Data: 'string',
              ColumnHeader: 'Version_Date',
            },
            {
              isVisible: 1,
              Field_Name: 'Description',
              length: 1,
              Fied_Data: 'string',
              ColumnHeader: 'Description',
            },

         
            {
              isVisible: 1,
              isCustomCell: true,
              Cell: ({ row }) => (
                <>
                  <Tooltip title='Edit'>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setInputValueVersion({
                          Id:row.Id,
                          App_Id: row.App_Id,
                          Version_No: row.Version_No,
                          Version_Date: row.Version_Date,
                          Description: row.Description
                        });
                        // setDialog(true);
                        setDialogBox(true)
                        // editRow(row)
                      }}
                    >
                      <Edit sx={{ fontSize: '18px' }} />
                    </IconButton>
                  </Tooltip>
                
                  <Tooltip title="Delete Version">
                    <IconButton
                      onClick={() => {
                        setDeleteSubDialog(true);
                        setInputValueVersion(prev => ({
                          ...prev,
                          Id:row.Id,
                          App_Id: row.App_Id,
                          App_Name: row.App_Name 
                        }));
                      }}
                    >
                      <Delete sx={{ fontSize: '18px', color: 'red' }} />
                    </IconButton>
                  </Tooltip>

                </>
              ),
              ColumnHeader: 'Action',
            }
          ]}
          tableMaxHeight={300}
        />
      </div>
    );
  };




  const saveUser = async () => {
    try {
      const response = await fetch("/api/appMaster", {
        method: inputValue.App_Id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValue),
      });

      const data = await response.json();

      if (data.success) {
        setScreen(false);
        setCompany(prev => [...prev, inputValue]);
        toast.success(data.message);
        setReload(!reload)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };


  useEffect(() => {
    if (!company || company.length === 0) return;
  
    const filtered = company.filter(company =>
      (company.App_Name || "").toLowerCase().includes(filterInput?.toLowerCase() || "")
      
    );
  
    setFilteredData(filtered);
  }, [filterInput, company]);
  
  const handleversionAdd = async () => {

    try {
      const response = await fetch("/api/appMaster/version", {
        method: inputValueVersion.Id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValueVersion),
      });
      const data = await response.json();

      if (data.success) {
        setScreen(false);
        setCompany(prev => [...prev, inputValueVersion]);
        toast.success(data.message);
        setReload(!reload)
        setInputValueVersion({})
      } else {
        toast.error(data.message);
      }
    } catch (error) {
    
      toast.error("An error occurred. Please try again later.");
    }
    setDialogBox(false);

  }

  return (

    <Fragment>
      <div>

        <ToastContainer />
      </div>
      <Card>
        <div className="px-3 py-2 fw-bold d-flex align-items-center justify-content-between border-bottom">
          APP MASTER
          <div className="text-end">
            <Button
              onClick={switchScreen}
              className="rounded-5 px-3 py-1 fa-13 shadow"
            >
              {!screen ? "Add" : "Back"}
            </Button>
          </div>
        </div>

        <CardContent>


          {!screen ? (
            <>
              <div className="d-flex justify-content-end">
                <div className=" pb-2">
                  <input
                    value={filterInput}
                    className="cus-inpt w-auto"
                    placeholder="Search"
                    onChange={e => setFilterInput(e.target.value)}
                  />
                </div>
              </div>
         
              <FilterableTable
               dataArray={filterInput ? (filteredData.length > 0 ? filteredData : []) : company}
                columns={[

                  {
                    isVisible: 1,
                    Field_Name: 'App_Id',
                    Fied_Data: 'string',
                    ColumnHeader: 'App_Id',
                  },
                  {
                    isVisible: 1,
                    Field_Name: 'App_Name',
                    length: 1,
                    Fied_Data: 'string',
                    ColumnHeader: 'App_Name',
                  },
                  // {
                  //   isVisible: 1,
                  //   Field_Name: 'App_Type',
                  //   length: 1,
                  //   Fied_Data: 'string',
                  //   ColumnHeader: 'App_Type',
                  // },

                  {
                    isVisible: 1,
                    Field_Name: 'App_Type_Name',
                    length: 1,
                    Fied_Data: 'string',
                    ColumnHeader: 'App_Type_Name',
                  },
                  {
                    isVisible: 1,
                    isCustomCell: true,
                    Cell: ({ row }) => (
                      <>
                        <Tooltip title='Edit'>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setInputValue({
                                App_Id: row.App_Id,
                                App_Name: row.App_Name,
                                App_Type: row.App_Type
                              });
                              setDialog(true);
                              editRow(row)
                            }}
                          >
                            <Edit sx={{ fontSize: '18px' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Version">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setInputValueVersion(prev => ({
                                ...prev,
                                App_Id: row.App_Id,
                                Id:row.Id
                              }));
                              setDialogBox(true)
                            }}
                          >
                            <Add sx={{ fontSize: '18px', color: 'green' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Version">
                          <IconButton
                            onClick={() => {
                              setDialogDelete(true);
                              setInputValueVersion(prev => ({
                                ...prev,
                                App_Id: row.App_Id,
                                App_Name: row.App_Name 
                              }));
                            }}
                          >
                            <Delete sx={{ fontSize: '18px', color: 'red' }} />
                          </IconButton>
                        </Tooltip>

                      </>
                    ),
                    ColumnHeader: 'Action',
                  }
                ]}
                tableMaxHeight={700}
                isExpendable={true}
                expandableComp={({ row }) => (
                  row.ParantData && row.ParantData.length > 0 &&
                  <DisplaySubRoutings dataSource={row} />
                )}
              />
            </>
          ) : (
            <>
              <form onSubmit={e => {
                e.preventDefault();
                saveUser();
              }}>
                <div className="row p-3">

                  <div className="col-lg-4 col-md-6 p-2">
                    <label>App Name</label>
                    <input
                      className="cus-inpt"
                      value={inputValue.App_Name}
                      required
                      minLength={3}
                      onChange={e =>
                        setInputValue({ ...inputValue, App_Name: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 p-2">
                    <label>App Type</label>
                    <select
                      className="cus-inpt"
                      value={inputValue.App_Type}
                      required
                      onChange={e => setInputValue({ ...inputValue, App_Type: (e.target.value) })}
                    >
                      <option value="">Select App Type</option>
                      <option value="1">Website</option>
                      <option value="2">Mobile</option>
                      <option value="3">Tab Application</option>
                    </select>
                  </div>


                  {!inputValue.App_Id && (
                    <>
                      <div className="col-lg-4 col-md-6 p-2">
                        <label>Version No</label>
                        <input
                          className="cus-inpt"
                          value={inputValue.Version_No}
                          required
                          minLength={3}
                          onChange={e =>
                            setInputValue({ ...inputValue, Version_No: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-lg-4 col-md-6 p-2">
                        <label>Version Date</label>
                        <input
                          className="cus-inpt"
                          value={inputValue.Version_Date ?? ""}
                          required
                          type="date"
                          onChange={e =>
                            setInputValue({ ...inputValue, Version_Date: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-lg-4 col-md-6 p-2">
                        <label>Description</label>
                        <input
                          className="cus-inpt"
                          required
                          value={inputValue.Description}
                          maxLength={10}
                          onChange={e =>
                            setInputValue({ ...inputValue, Description: e.target.value })
                          }
                        />
                      </div>

                    </>
                  )}


                </div>
                <div className="pe-3 d-flex justify-content-end">
                  <Button
                    className="rounded-5 px-4 mx-1 btn-light bg-white"
                    onClick={switchScreen}
                    type='button'
                  >
                    cancel
                  </Button>
                  <Button
                    className="rounded-5 px-4 shadow mx-1"
                    type='submit'
                  >
                    {inputValue.App_Id ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={dialogDelete}
        onClose={() => setDialogDelete(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <b className="text-muted">
            Do you want to delete the app <span className="blue-text">{inputValueVersion?.App_Name}</span>?
          </b>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-light"
            onClick={() => setDialogDelete(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={dialogBox}
        onClose={() => setDialogBox(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">App Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Version No"
            value={inputValueVersion.Version_No ?? ""}
            onChange={(e) =>
              setInputValueVersion({ ...inputValueVersion, Version_No: e.target.value })
            }
            fullWidth
            margin="dense"
            variant="outlined"
          />


          <TextField
            label="Version Date"
            type="date"
            value={inputValueVersion.Version_Date ?? ""}
            onChange={(e) =>
              setInputValueVersion({ ...inputValueVersion, Version_Date: e.target.value })
            }
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Description"
            value={inputValueVersion.Description ?? ""}
            onChange={(e) =>
              setInputValueVersion({ ...inputValueVersion, Description: e.target.value })
            }
            fullWidth
            margin="dense"
            variant="outlined"
            multiline
            rows={3}
          />
        </DialogContent>

        <DialogActions>
          <Button className="btn-light" onClick={() => setDialogBox(false)}>
            Cancel
          </Button>
          <Button onClick={handleversionAdd} color="primary">
          {inputValueVersion.Id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    
    
      <Dialog
        open={deleteSubDialig}
        onClose={() => setDeleteSubDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <b className="text-muted">
            Do you want to delete the app <span className="blue-text">{inputValueVersion?.App_Name}</span>?
          </b>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-light"
            onClick={() => setDeleteSubDialog(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteSubdialogConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}


