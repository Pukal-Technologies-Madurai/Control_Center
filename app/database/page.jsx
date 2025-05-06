


"use client"

import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, TextField } from "@mui/material";
import { Add, Edit,Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import FilterableTable from "../components/filterableTable2";
import { isEqualNumber } from '../../app/components/functions'

const initialValue = {
    Id: 0,
    Company_Id: 0,
    Company_Name: '',
    App_Id: 0,
    App_Name: '',
    DatabaseName: '',
    Server_Ip: '',
    No_of_Users: '',
    DatabaseSpace: '',
    ServerSize: '',
    Server_Url: ''
}


const Database = () => {
    const [inputValues, setInputValues] = useState(initialValue);
    const [reload, setReload] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const [dialog, setDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dropDown, setDropDown] = useState([])
    const [dropAppDown, setAppDropDown] = useState([])
    const[dialogDelete,setDialogDelete]=useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/databaseMaster");
                const data = await response.json();

                if (data.success) {
                    setMenuData(data.data);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                
                toast.error("Failed to load menu data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [reload]);

    useEffect(() => {
        const fetchDropdown = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/company/dropdown");

                if (!response.ok) throw new Error("API response not OK");

                const data = await response.json();

                setDropDown(data?.data || []);
            } catch (error) {
                toast.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchDropdown();
    }, []);

    useEffect(() => {
        const fetchAppDropdown = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/appMaster/dropdown");

                if (!response.ok) throw new Error("API response not OK");

                const data = await response.json();

                setAppDropDown(data?.data || []);
            } catch (error) {
                toast.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchAppDropdown();
    }, []);

    const handleDatabaseAdd = async () => {
        try {

            const method = inputValues?.Id ? 'PUT' : 'POST';
            const response = await fetch('/api/databaseMaster', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...inputValues }),
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setReload(prev => !prev);
                setDialog(false);
                setInputValues(initialValue);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } 
    };

    const handleDeleteConfirm = async () => {
        try {
          const response = await fetch("/api/databaseMaster", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Id: inputValues?.Id }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            setReload(!reload);
            // setDialog(prev => !prev);
            setDialogDelete(false)
            setInputValues(initialValue);
            toast.success(data.message);
    
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Error deleting Database:", error);
          toast.error("An error occurred. Please try again later.");
        }
      };
    

    return (
        <>
            {loading ? (
                <div className="text-center p-4">Loading Database Details...</div>
            ) : (
                <>
                    <div className="d-flex justify-content-end pb-2 mt-3">
                        <Button
                            onClick={() => setDialog(true)}
                            variant="outlined"
                            startIcon={<Add />}
                        >
                            ADD
                        </Button>
                    </div>

                    <FilterableTable
                        dataArray={menuData}
                        columns={[
                            {
                                isVisible: 1,
                                Field_Name: 'Company_Name',
                                Fied_Data: 'string',
                                ColumnHeader: 'Company_Name',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'App_Name',
                                Fied_Data: 'string',
                                ColumnHeader: 'App_Name',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'Server_Url',
                                Fied_Data: 'string',
                                ColumnHeader: 'Server_Url',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'DatabaseName',
                                Fied_Data: 'string',
                                ColumnHeader: 'DatabaseName',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'Server_Ip',
                                Fied_Data: 'string',
                                ColumnHeader: 'Server_Ip',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'No_of_Users',
                                Fied_Data: 'string',
                                ColumnHeader: 'No_of_Users',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'DatabaseSpace',
                                Fied_Data: 'string',
                                ColumnHeader: 'DatabaseSpace',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'ServerSize',
                                Fied_Data: 'string',
                                ColumnHeader: 'ServerSize',
                            },

                            {
                                isVisible: 1,
                                isCustomCell: true,
                                Cell: ({ row }) => (
                                    <>
                                        <Tooltip title='Edit Menu'>
                                            <IconButton
                                                size="small"
                                                className="p-1"
                                                onClick={() => {

                                                    setInputValues(pre => ({
                                                        ...pre,
                                                        Id: row?.Id ?? '',
                                                        Company_Id: row?.Company_Id ?? '',
                                                        Company_Name: row?.Company_Name ?? '',
                                                        App_Id: row?.App_Id ?? '',
                                                        App_Name: row?.App_Name ?? '',
                                                        DatabaseName: row?.DatabaseName ?? '',
                                                        Server_Ip: row?.Server_Ip ?? '',
                                                        No_of_Users: row?.No_of_Users ?? '',
                                                        DatabaseSpace: row?.DatabaseSpace ?? '',
                                                        ServerSize: row?.ServerSize ?? '',
                                                        Server_Url: row?.Server_Url ?? ''
                                                    }));

                                                    setDialog(true);
                                                }}
                                            >
                                                <Edit sx={{ fontSize: '18px' }} />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() => {
                                                    setDialogDelete(true);
                                                    setInputValues(row);
                                                }}
                                            >
                                                <Delete sx={{ fontSize: "18px", color: "red" }} />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                    
                                ),
                                ColumnHeader: 'Action',
                            }
                        ]}
                        tableMaxHeight={700}
                        isExpendable={true}
                    />
                </>
            )}

            <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>
                    {inputValues.Id ? "EDIT" : "CREATE"} DATABASE
                </DialogTitle>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleDatabaseAdd();
                    }}
                >
                    <DialogContent>
                        <label>Company</label>
                        <select
                            value={inputValues.Company_Id}
                            className="cus-inpt"
                            onChange={e => setInputValues({ ...inputValues, Company_Id: e.target.value })}
                        >
                            <option value="0" disabled>Select Company</option>
                            {dropDown?.length > 0 ? (
                                dropDown.map((o, i) => (
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
                            value={inputValues.App_Id}
                            className="cus-inpt"
                            onChange={e => setInputValues({ ...inputValues, App_Id: e.target.value })}
                        >
                            <option value="0" disabled>Select App</option>
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
                        <label>Server URL</label>
                        <TextField
                            label="Database Name"
                            value={inputValues.Server_Url ?? ""}
                            onChange={(e) =>
                                setInputValues({ ...inputValues, Server_Url: e.target.value })
                            }
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
                        <label>DatabaseName</label>
                        <TextField
                            label="Database Name"
                            value={inputValues.DatabaseName ?? ""}
                            onChange={(e) =>
                                setInputValues({ ...inputValues, DatabaseName: e.target.value })
                            }
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
                        <label>Server_Ip</label>
                        <TextField
                            label="Server_Ip"
                            value={inputValues.Server_Ip ?? ""}
                            onChange={(e) =>
                                setInputValues({ ...inputValues, Server_Ip: e.target.value })
                            }
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
                        <label>No_of_Users</label>
                        <TextField
                            label="No_of_Users"
                            value={inputValues.No_of_Users ?? ""}
                            onChange={(e) =>
                                setInputValues({ ...inputValues, No_of_Users: e.target.value })
                            }
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
                        <label>DatabaseSpace</label>
                        <TextField
                            label="DatabaseSpace"
                            value={inputValues.DatabaseSpace ?? ""}
                            onChange={(e) =>
                                setInputValues({ ...inputValues, DatabaseSpace: e.target.value })
                            }
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
                        <label>ServerSize</label>
                        <TextField
                            label="ServerSize"
                            value={inputValues.ServerSize ?? ""}
                            onChange={(e) =>
                                setInputValues({ ...inputValues, ServerSize: e.target.value })
                            }
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialog(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
         
         
         
            <Dialog
        open={dialogDelete}
        onClose={() => setDialogDelete(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <b className="text-muted">
            Do you want to delete the app <span className="blue-text">{initialValue?.App_Name}</span>?
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


        </>
    );
};

export default Database;