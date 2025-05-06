



"use client";
import { useState, useEffect, Fragment } from "react";
import FilterableTable from "../components/filterableTable2"
import CreateIcon from '@mui/icons-material/Create';
import DataTable from 'react-data-table-component'
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent,Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Button, ToastContainer } from "react-bootstrap";
import  {toast}  from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  
const tableStyle = {
  headRow: {
    style: {
      backgroundColor: "#343a40",
      color: "#ffffff",
      fontWeight: "bold",
    },
    className:"table table-bordered table-striped"
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
    Global_Comp_Id: '',
    Company_Code: '',
    Company_Name: '',
    Address: '',
    Company_Incharge: '',
    Mobile_No:''
  }

  const[reload,setReload]=useState(false)
  const [inputValue, setInputValue] = useState(initialState);
  const [filterInput, setFilterInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const switchScreen = () => {
    setInputValue(initialState);
    setScreen(pre => !pre);
  };

  const editRow = (company) => {
    const { Global_Comp_Id, Company_Code, Company_Name, Address, Company_Incharge,Mobile_No } = company;

    setInputValue(pre => ({ ...pre, Global_Comp_Id, Company_Code, Company_Name, Address, Company_Incharge,Mobile_No }));
    setScreen(true);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/company");
        const data = await response.json();

        if (data.success) {
          setCompany(data.data);
        } else {
          setError(data.message || "Failed to fetch company data.");
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
      const response = await fetch("/api/company", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Global_Comp_Id: inputValue.Global_Comp_Id }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setReload(!reload); 
        setDialog(prev => !prev);
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
  
 

  const saveUser = async () => {
    try {
      const response = await fetch("/api/company", {
        method: inputValue.Global_Comp_Id ? "PUT" : "POST",
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
      console.error("Error saving company:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  
  useEffect(() => {
    if (filterInput) {
      setFilteredData(
        company.filter(c => 
          c.Company_Name.toLowerCase().includes(filterInput.toLowerCase()) ||
          c.Company_Code.toLowerCase().includes(filterInput.toLowerCase()) ||
          c.Mobile_No.toLowerCase().includes(filterInput.toLowerCase()) 
        )
      );
    } else {
      setFilteredData(company);
    }
  }, [filterInput, company]);

  
  return (
   
    <Fragment>
      <div>

        <ToastContainer/>
      </div>
      <Card>
        <div className="px-3 py-2 fw-bold d-flex align-items-center justify-content-between border-bottom">
          Company Master
          <div className="text-end">
            <Button
              onClick={switchScreen}
              className="rounded-5 px-3 py-1 fa-13 shadow"
            >
              {!screen ? "Add Company" : "Back"}
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
      Field_Name: 'Company_Code',
      Fied_Data: 'string',
      ColumnHeader: 'Company_Code',
  },
  {
    isVisible: 1,
    Field_Name: 'Company_Name',
    Fied_Data: 'string',
    ColumnHeader: 'Company_Name',
},
{
  isVisible: 1,
  Field_Name: 'Company_Incharge',
  Fied_Data: 'string',
  ColumnHeader: 'Company_Incharge',
},
{
  isVisible: 1,
  Field_Name: 'Mobile_No',
  Fied_Data: 'string',
  ColumnHeader: 'Mobile_No',
},
{
  isVisible: 1,
  isCustomCell: true,
  Cell: ({ row }) => (
      <>
          <Tooltip title='Edit Menu'>
          <IconButton onClick={() => editRow(row)} size="small">
        <Edit className="fa-in" />
      </IconButton>
      <IconButton
        onClick={() => {
          const { Global_Comp_Id, Local_Comp_Id, Company_Name, DB_Name, Web_Api } = row;
          setInputValue(pre => ({ ...pre, Global_Comp_Id, Local_Comp_Id, Company_Name, DB_Name, Web_Api }));
          setDialog(true);
        }}
        size="small"
      >
        <Delete className="fa-in del-red" />
      </IconButton>
          </Tooltip>
       
        
      </>
      
  ),
  ColumnHeader: 'Action',
}

]}
  direction="auto"
  fixedHeader
  fixedHeaderScrollHeight="63dvh"
  highlightOnHover
  pagination
  responsive
  striped
  subHeaderAlign="right"
  subHeaderWrap
  customStyles={tableStyle}
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
                    <label>Company_Code</label>
                    <input
                      className="cus-inpt"
                      value={inputValue.Company_Code}
                      required
                      minLength={3}
                      onChange={e =>
                        setInputValue({ ...inputValue, Company_Code: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 p-2">
                    <label>Company_Name</label>
                    <input
                      className="cus-inpt"
                      value={inputValue.Company_Name}
                      required
                      minLength={3}
                      onChange={e =>
                        setInputValue({ ...inputValue, Company_Name: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 p-2">
                    <label>Address</label>
                    <input
                      className="cus-inpt"
                      value={inputValue.Address}
                      required
                      minLength={3}
                      onChange={e =>
                        setInputValue({ ...inputValue, Address: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 p-2">
                    <label>Company_Incharge</label>
                    <input
                      className="cus-inpt"
                      value={inputValue.Company_Incharge}
                      required
                      minLength={3}
                      onChange={e =>
                        setInputValue({ ...inputValue, Company_Incharge: e.target.value })
                      }
                    />
                  </div>



                  <div className="col-lg-4 col-md-6 p-2">
                    <label>Mobile_No</label>
                    <input
                      className="cus-inpt"
                      type={"number"}
                      required
                      value={inputValue.Mobile_No}
                      maxLength={10}
                      onChange={(e) =>
                        setInputValue({ ...inputValue, Mobile_No: e.target.value })
                      }
                    />
                  </div>
                
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
                    {inputValue.Global_Comp_Id ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        fullWidth maxWidth='sm'
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <b className="text-muted">
            Do you want to Delete the Company <span className="blue-text">{inputValue.Company_Name}</span>?
          </b>
        </DialogContent>
        <DialogActions>
          <Button
            className=" btn-light"
            onClick={() => {
              setDialog(false);
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





