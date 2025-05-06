
"use client"
import { useState, useEffect } from "react";
import FilterableTable from "../components/filterableTable2"
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent, TextField, Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
const UserManagement = () => {


    const initalValue = {
        DatabaseName: "",
        Database_Id: "",
        App_Id: "",
        App_Name: "",
        Global_User_ID: "",
        Local_User_ID: "",
        Company_Id: "",
        Name: "",
        UserName: "",
        CompanyGet: "",
        UserTypeId: '',
        UserType: "",
        Password: ""
    }

    const [inputValue, setInputValue] = useState(initalValue)
    const [companies, setCompanies] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [dialogBox, setDialogBox] = useState(false)
    const [database, setDatabase] = useState([])
    const [dropAppDown, setAppDropDown] = useState([])
    const [userType, setUserType] = useState([])
    const [screen, setScreen] = useState(false)
    const [reload, setReload] = useState(false)
    const[dialogDelete,setDialogDelete]=useState(false)
    useEffect(() => {
        fetch("/api/company/dropdown")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setCompanies(data.data);
                } else {
                    console.error("API response for companies is not an array:", data);
                    setCompanies([]);
                }
            })
            .catch((err) => {
                console.error(" Error fetching companies:", err);
                setCompanies([]);
            });
    }, []);


    useEffect(() => {
        const fetchAppDropdown = async () => {
            try {
                setReload(true);
                const response = await fetch("/api/appMaster/dropdown");

                if (!response.ok) throw new Error("API response not OK");

                const data = await response.json();

                setAppDropDown(data?.data || []);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchAppDropdown();
    }, [companies, reload]);

    useEffect(() => {
        fetch("/api/userProfile/dropdown")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setUserType(data.data);
                } else {
                    console.error("API response for Database is not an array:", data);
                    setUserType([]);
                }
            })
            .catch((err) => {
                console.error(" Error fetching companies:", err);
                setUserType([]);
            });

    }, []);

    useEffect(() => {
        fetch("/api/databaseMaster/dropdown")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setDatabase(data.data);
                } else {
                    console.error("API response for Database is not an array:", data);
                    setDatabase([]);
                }
            })
            .catch((err) => {
                console.error(" Error fetching companies:", err);
                setDatabase([]);
            });
    }, []);



    const handleCompanyChange = async (e) => {
        const companyId = e.target.value;
        setSelectedCompany(companyId);

        try {
            const response = await fetch(`/api/users/listing?companyId=${companyId}`);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();

            if (!data || !Array.isArray(data.data)) {
                console.error("Invalid API response:", data);
                throw new Error("Invalid API response: Expected an array");
            }

            setUsers(data.data);
        } catch (err) {
            console.error(" Fetch error:", err);
            setUsers([]);
        }
    };




    const handleUsersAdd = async () => {
        try {
            const response = await fetch("/api/users", {
                method: inputValue.Global_User_ID ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...inputValue }),
            });

            const data = await response.json();

            if (data.success) {
                setScreen(false);
                // setCompanies(prev => [...prev, inputValue]);
                setDialogBox(false)
                toast.success(data.message);

                setReload(!reload);

                setTimeout(() => {
                    window.location.reload();
                }, 2000); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting company:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    const handleDeleteConfirm = async () => {
        try {
          const response = await fetch("/api/users", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Global_User_ID: inputValue.Global_User_ID }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            setReload(!reload);
            // setDialogDelete(prev => !prev);
            setDialogDelete(false)
            setTimeout(() => {
                window.location.reload();
            }, 500); 
            setInputValue(initalValue);
            toast.success(data.message);
    
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Error deleting company:", error);
          toast.error("An error occurred. Please try again later.");
        }
      };

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center mt-4">
                    <label className="me-2">Select Company:</label>
                    <select className="form-select w-auto" value={selectedCompany} onChange={handleCompanyChange}>
                        <option value="" disabled>Select a company</option>
                        {companies.length > 0 ? (
                            companies.map((company, index) => (
                                <option key={index} value={company.value}>
                                    {company.label}
                                </option>
                            ))
                        ) : (
                            <option disabled>Loading...</option>
                        )}
                    </select>
                </div>
                <div className="d-flex justify-content-start">
                <Button
    onClick={() => {
        setDialogBox(true);
        setInputValue({
            Database_Name: "",
            Database_Id: "",
            App_Id: "",
            App_Name: "",
            Global_User_ID: "",
            Local_User_ID: "",
            Company_Id: "",
            Name: "",
            UserName: "",
            CompanyGet: "",
            UserTypeId: "",
            UserType: ""
        });
    }}
    className=" bg-primary justify-content-center" 
>
    Add
</Button>
</div>
            </div>


            <Dialog open={dialogBox} onClose={() => setDialogBox(false)} fullWidth maxWidth="sm">
                <DialogTitle>
                    {inputValue.Global_User_ID ? "EDIT" : "CREATE"} Users
                </DialogTitle>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUsersAdd();
                    }}
                >
                    <DialogContent>
                    <label>Database</label>
<select
    value={inputValue.Database_Id ?? ""}
    className="cus-inpt"
    onChange={e => setInputValue({ ...inputValue, Database_Id: e.target.value })}
>
    <option value="" disabled>Select Database</option>
    {database?.length > 0 ? (
        database.map((o, i) => (
            <option key={i} value={o.value}>
                {o.label}
            </option>
        ))
    ) : (
        <option disabled>Loading...</option>
    )}
</select>
<label>Company</label>
<select
    value={inputValue.Company_Id ?? ""}
    className="cus-inpt"
    onChange={e => setInputValue({ ...inputValue, Company_Id: e.target.value })}
>
    <option value="" disabled>Select Company</option>
    {companies?.length > 0 ? (
        companies.map((o, i) => (
            <option key={i} value={o.value}>
                {o.label}
            </option>
        ))
    ) : (
        <option disabled>Loading...</option>
    )}
</select>





                        <label>App</label>

                        <select
                            value={inputValue.App_Id ?? ""}
                            className="cus-inpt"
                            onChange={e => setInputValue({ ...inputValue, App_Id: e.target.value })}
                        >
                            <option value="" disabled>Select App</option>
                            {dropAppDown?.length > 0 ? (
                                dropAppDown.map((o, i) => (
                                    <option key={i} value={o.value}>
                                        {o.label}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )}
                        </select>

                        <label> Name</label>
                        <TextField
                            label="Name"
                            value={inputValue.Name ?? ""}
                            onChange={(e) =>
                                setInputValue({ ...inputValue, Name: e.target.value })
                            }
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
                        <label>UserType</label>

                        <select
                            value={inputValue.UserType  ??""}
                            className="cus-inpt"
                            onChange={e => setInputValue({ ...inputValue, UserTypeId: e.target.value })}
                        >
                            <option value="" disabled>Select User Type</option>
                            {userType?.length > 0 ? (
                                userType.map((o, i) => (
                                    <option key={i} value={o.value}>
                                        {o.label}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )}
                        </select>
                        <label>User Name</label>
                        <TextField
                            label="User Name"
                            value={inputValue.UserName ?? ""}
                            onChange={(e) =>
                                setInputValue({ ...inputValue, UserName: e.target.value })
                            }
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />

                        {(!inputValue?.Global_User_ID || inputValue.Global_User_ID === '') && (
                            <>
                                <label>Password</label>
                                <TextField
                                    label="Password"
                                    value={inputValue.Password ?? ""}
                                    onChange={(e) =>
                                        setInputValue({ ...inputValue, Password: e.target.value })
                                    }
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                />
                            </>
                        )}


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogBox(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Save
                        </Button>
                    </DialogActions>
                </form>
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

            <FilterableTable
                dataArray={users.length > 0 ? users : []}
                columns={[
                    {
                        isVisible: 1,
                        Field_Name: "Global_User_ID",
                        length: 1,
                        Fied_Data: "string",
                        ColumnHeader: "Global_User_ID",
                    },
                    {
                        isVisible: 1,
                        Field_Name: "Local_User_ID",
                        length: 1,
                        Fied_Data: "string",
                        ColumnHeader: "Local_User_ID",
                    },
                    
                    {
                        isVisible: 1,
                        Field_Name: "UserType",
                        length: 1,
                        Fied_Data: "string",
                        ColumnHeader: "UserType",
                    },
                    {
                        isVisible: 1,
                        Field_Name: "Company_Id",
                        length: 1,
                        Fied_Data: "string",
                        ColumnHeader: "Company_Id",
                    },
                    {
                        isVisible: 1,
                        Field_Name: "Name",
                        length: 1,
                        Fied_Data: "string",
                        ColumnHeader: "Name",
                    },
                    {
                        isVisible: 1,
                        Field_Name: "CompanyGet",
                        length: 1,
                        Fied_Data: "string",
                        ColumnHeader: "CompanyGet",
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
                                                Database_Name: row.DatabaseGet,
                                                Database_Id: row.Database_Id,
                                                App_Id: row.App_Id,
                                                App_Name: row.AppName,
                                                Global_User_ID: row.Global_User_ID,
                                                Local_User_ID: row.Local_User_ID,
                                                Company_Id: row.Company_Id,
                                                Name: row.Name,
                                                UserName: row.UserName,
                                                CompanyGet: row.CompanyGet,
                                                UserTypeId: row.UserTypeId,
                                                UserType: row.UserTypeId


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
                                                Database_Name: row.Database_Name,
                                                Database_Id: row.Database_Id,
                                                App_Id: row.App_Id,
                                                App_Name: row.App_Name,
                                                Global_User_ID: row.Global_User_ID,
                                                Local_User_ID: row.Local_User_ID,
                                                Company_Id: row.Company_Id,
                                                Name: row.Name,
                                                UserName: row.UserName,
                                                CompanyGet: row.CompanyGet,
                                                UserTypeId: row.UserTypeId,
                                                UserType: row.UserType
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
        </div>


    );
};

export default UserManagement;
