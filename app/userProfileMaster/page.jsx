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


export default function CompanyTable() {
  const [company, setCompany] = useState([]);
  const [error, setError] = useState(null);
  const [dialog, setDialog] = useState(false)
  const [screen, setScreen] = useState(false);
  const initialState = {
    Profile_Id: '',
    Profile_Name: ''
  }
  const [dialogDelete, setDialogDelete] = useState(false)

  const [reload, setReload] = useState(false)
  const [inputValue, setInputValue] = useState(initialState);
  const [filterInput, setFilterInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [dialogBox, setDialogBox] = useState(false)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/userProfile");
        const data = await response.json();

        if (data.success) {
          setCompany(data.data);
        } else {
          setError(data.message || "Failed to fetch App data.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [reload]);

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch("/api/userProfile", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Profile_Id: inputValue.Profile_Id }),
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







  const saveUserType = async () => {
    try {
      const response = await fetch("/api/userProfile", {
        method: inputValue.Profile_Id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValue),
      });

      const data = await response.json();

      if (data.success) {
        setScreen(false);
        setCompany(prev => [...prev, inputValue]);
        setDialogBox(false)
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



  return (

    <Fragment>

      <Card>
        <div className="px-3 py-2 fw-bold d-flex align-items-center justify-content-between border-bottom">
          User Profile Master
          <div className="text-end">
            <Button
              onClick={() => {
                setDialogBox(true);
                setInputValue({ Profile_Id: '', Profile_Name: "" });
              }}
              className="rounded-5 px-3 py-1 fa-13 shadow"
            >
              Add
            </Button>
          </div>
        </div>

        <CardContent>
          <div className="d-flex justify-content-end">
            <div className="pb-2">
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
                Field_Name: "Profile_Id",
                length: 1,
                Fied_Data: "string",
                ColumnHeader: "ID",
              },
              {
                isVisible: 1,
                Field_Name: "Profile_Name",
                length: 1,
                Fied_Data: "string",
                ColumnHeader: "Profile_Name",
              },
              {
                isVisible: 1,
                isCustomCell: true,
                Cell: ({ row }) => (
                  <>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => {
                       
                          setInputValue({
                            Profile_Id: row.Profile_Id,
                            Profile_Name: row.Profile_Name
                          });
                          setDialogBox(true);
                        }}
                      >
                        <Edit sx={{ fontSize: "18px" }} />
                      </IconButton>
                    </Tooltip>
                   
                    <Tooltip title="Delete Version">
                      <IconButton
                        onClick={() => {
                          setDialogDelete(true);
                          setInputValue(prev => ({
                            ...prev,
                            Profile_Name: row.Profile_Name,
                            Profile_Id: row.Profile_Id,
                          }));
                        }}
                      >
                        <Delete sx={{ fontSize: "18px", color: "red" }} />
                      </IconButton>
                    </Tooltip>
                  </>
                ),
                ColumnHeader: "Action",
              },
            ]}
            tableMaxHeight={700}
          />
        </CardContent>
      </Card>

      <Dialog
        open={dialogBox}
        onClose={() => setDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{inputValue.Profile_Id ? "Update Type" : "Create Type"}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              saveUserType();
            }}
          >
            <div className="row p-3">
              <div className=" p-2">
                <label>User Type</label>
                <input
                  className="cus-inpt"
                  value={inputValue.Profile_Name}
                  required
                  minLength={1}
                  onChange={e => setInputValue({ ...inputValue, Profile_Name: e.target.value })}
                />
              </div>

            </div>

            <DialogActions>
              <Button className="btn-light" onClick={() => setDialogBox(false)}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {inputValue.Profile_Id ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>


      <Dialog
        open={dialogDelete}
        onClose={() => setDialogDelete(false)}
        fullWidth maxWidth='sm'
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <b className="text-muted">
            Do you want to Delete Type <span className="blue-text">{inputValue.Profile_Name}</span>?
          </b>
        </DialogContent>
        <DialogActions>
          <Button
            className=" btn-light"
            onClick={() => {
              setDialogDelete(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>

    </Fragment>
  )
}


