
// "use client"

// import { useEffect, useState } from "react";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, Tooltip } from "@mui/material";
// import { Add, Edit } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import FilterableTable from "../components/filterableTable2";
// import { isEqualNumber } from "../components/functions";
// const initialValue = {
//     id: '',
//     database_Id:'',
//     database_Name:'',
//     app_Id:'',
//     app_Name:'',
//     name: '',
//     menu_type: 1,
//     parent_id: '',
//     url: '',
//     display_order: 1,
//     is_active: 1,
//     parantDetails: {},
// }

// const MenuManagement = ({ loadingOn, loadingOff }) => {
//     const [inputValues, setInputValues] = useState(initialValue);
//     const [reload, setReload] = useState(false);
//     const [menuData, setMenuData] = useState([]);
//     const [dialog, setDialog] = useState(false);
//     const [dropAppDown, setAppDropDown] = useState([])
//     const[database,setDatabase]=useState([])


//     // useEffect(() => {
//     //     fetch({
//     //         address: `/api/menuMaster`,
//     //     }).then(data => {
//     //         if (data.success) {
//     //             setMenuData(data.data);
//     //         }
//     //     }).catch(e => console.error(e))
//     // }, [reload]);

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             setLoading(true);
//     //             const response = await fetch("/api/menuMaster");
//     //             const data = await response.json();

//     //             if (data.success) {
//     //                 setMenuData(data.data);
//     //             } else {
//     //                 toast.error(data.message);
//     //             }
//     //         } catch (error) {
                
//     //             toast.error("Failed to load menu data");
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };
//     //     fetchData();
//     // }, [reload]);


//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch("/api/menuMaster");
//             const data = await response.json();
    
//             if (data.success) {
//               setMenuData(data.data);
//             } else {
//               setError(data.message || "Failed to fetch App data.");
//             }
//           } catch (error) {
//             setError("Something went wrong. Please try again.");
            
//           }
//         };
    
//         fetchData();
//       }, [reload]);







//     useEffect(() => {
//         const fetchAppDropdown = async () => {
//             try {
//                 setReload(true);
//                 const response = await fetch("/api/appMaster/dropdown");

//                 if (!response.ok) throw new Error("API response not OK");

//                 const data = await response.json();

//                 setAppDropDown(data?.data || []);
//             } catch (error) {
//                 console.error("Fetch error:", error);
//             }
//         };

//         fetchAppDropdown();
//     }, [reload]);
//     useEffect(() => {
//         fetch("/api/databaseMaster/dropdown")
//             .then((res) => res.json())
//             .then((data) => {
//                 if (Array.isArray(data.data)) {
//                     setDatabase(data.data);
//                 } else {
                 
//                     setDatabase([]);
//                 }
//             })
//             .catch((err) => {
              
//                 setDatabase([]);
//             });
//     }, [reload]);

//     const DisplaySubRoutings = ({ dataSource }) => (
//         <FilterableTable
//             dataArray={dataSource?.SubRoutes ?? []}
//             title='Sub Routes'
//             columns={[
//                 {
//                     isVisible: 1,
//                     Field_Name: 'name',
//                     Fied_Data: 'string',
//                     ColumnHeader: 'Menu',
//                 },
//                 {
//                     isVisible: 1,
//                     Field_Name: 'url',
//                     Fied_Data: 'string',
//                     ColumnHeader: 'Address',
//                 },
//                 {
//                     isVisible: 1,
//                     isCustomCell: true,
//                     Cell: ({ row }) => (
//                         <Tooltip title='Add SubRouting'>
//                             <span>
//                                 <Button
//                                     size="small"
//                                     className="bg-light"
//                                     onClick={() => {
//                                         setInputValues(pre => ({
//                                             ...pre,
//                                             menu_type: 0,
//                                             parent_id: row.id,
//                                             parantDetails: row,
//                                             url: (row?.url ?? '') + '/'
//                                         }));
//                                         setDialog(true);
//                                     }}
//                                     startIcon={<Add sx={{ fontSize: '18px' }} />}
//                                 >
//                                     {row?.SubRoutes?.length ?? 0}
//                                 </Button>
//                             </span>
//                         </Tooltip>
//                     ),
//                     ColumnHeader: 'Sub Routings',
//                 },
//                 {
//                     isVisible: 1,
//                     Field_Name: 'display_order',
//                     Fied_Data: 'number',
//                     ColumnHeader: 'Order',
//                 },
//                 {
//                     isVisible: 1,
//                     isCustomCell: true,
//                     Cell: ({ row }) => (
//                         (row?.is_active, 1) ? (
//                             <span className="px-3 py-1 rounded-3 text-white bg-success">Active</span>
//                         ) : (
//                             <span className="px-3 py-1 rounded-3 text-white bg-danger">In-Active</span>
//                         )
//                     ),
//                     ColumnHeader: 'Status',
//                 },
//                 {
//                     isVisible: 1,
//                     isCustomCell: true,
//                     Cell: ({ row }) => (
//                         <>
//                             <Tooltip title='Edit Menu'>
//                                 <IconButton
//                                     size="small"
//                                     className="p-1"
//                                     onClick={() => {
//                                         setInputValues(pre => ({
//                                             ...pre,
//                                             id: row?.Id,
//                                             database_Id:row?.Database_Id ?? '',
//                                             app_Id :row?.App_Id ?? '',
//                                             name: row?.Menu_Name ?? '',
//                                             menu_type: 0,
//                                             parent_id: row?.Parent_id ?? '',
//                                             url: row?.RoutingURL ?? '',
//                                             display_order: row?.Display_Order ?? '',
//                                             is_active: row?.IsActive ?? '',
//                                         }));
//                                         setDialog(true);
//                                     }}
//                                 >
//                                     <Edit sx={{ fontSize: '18px' }} />
//                                 </IconButton>
//                             </Tooltip>
//                         </>
//                     ),
//                     ColumnHeader: 'Action',
//                 }
//             ]}
//             tableMaxHeight={700}
//             isExpendable={true}
//             expandableComp={({ row }) => (row?.SubRoutes?.length > 0) && <DisplaySubRoutings dataSource={row} />}
//         />
//     )

//     const DisplayChildMenu = ({ row }) => {

//         return (
//             <>
//                 {row?.ChildMenu?.length > 0 && (
//                     <FilterableTable
//                         dataArray={row?.ChildMenu ?? []}
//                         title='Child Menus'
//                         columns={[
//                             {
//                                 isVisible: 1,
//                                 Field_Name: 'name',
//                                 Fied_Data: 'string',
//                                 ColumnHeader: 'Child Menu',
//                             },
//                             {
//                                 isVisible: 1,
//                                 Field_Name: 'url',
//                                 Fied_Data: 'string',
//                                 ColumnHeader: 'Address',
//                             },
//                             {
//                                 isVisible: 1,
//                                 isCustomCell: true,
//                                 Cell: ({ row }) => (
//                                     <Tooltip title='Add SubRouting'>
//                                         <span>
//                                             <Button
//                                                 size="small"
//                                                 className="bg-light"
//                                                 onClick={() => {
//                                                     setInputValues(pre => ({
//                                                         ...pre,
//                                                         menu_type: 0,
//                                                         parent_id: row.id,
//                                                         parantDetails: row,
//                                                         url: (row?.ParantData?.url ? (row?.ParantData?.url + '/') : '') + (row?.url ?? '') + '/'
//                                                     }));
//                                                     setDialog(true);
//                                                 }}
//                                                 startIcon={<Add sx={{ fontSize: '18px' }} />}
//                                             >
//                                                 {row?.SubRoutes?.length ?? 0}
//                                             </Button>
//                                         </span>
//                                     </Tooltip>
//                                 ),
//                                 ColumnHeader: 'Sub Routings',
//                             },
//                             {
//                                 isVisible: 1,
//                                 Field_Name: 'display_order',
//                                 Fied_Data: 'number',
//                                 ColumnHeader: 'Order',
//                             },
//                             {
//                                 isVisible: 1,
//                                 isCustomCell: true,
//                                 Cell: ({ row }) => (
//                                     (row?.is_active, 1) ? (
//                                         <span className="px-3 py-1 rounded-3 text-white bg-success">Active</span>
//                                     ) : (
//                                         <span className="px-3 py-1 rounded-3 text-white bg-danger">In-Active</span>
//                                     )
//                                 ),
//                                 ColumnHeader: 'Status',
//                             },
//                             {
//                                 isVisible: 1,
//                                 isCustomCell: true,
//                                 Cell: ({ row }) => (
//                                     <>
//                                         <Tooltip title='Edit Menu'>
//                                             <IconButton
//                                                 size="small"
//                                                 className="p-1"
//                                                 onClick={() => {
//                                                     setInputValues(pre => ({
//                                                         ...pre,
//                                                         id: row?.id,
//                                                         database_Id:row?.database_Id ?? '',
//                                                         app_Id :row?.app_Id ?? '',
//                                                         name: row?.name ?? '',
//                                                         menu_type: 3,
//                                                         parent_id: row?.parent_id ?? '',
//                                                         url: row?.url ?? '',
//                                                         display_order: row?.display_order ?? '',
//                                                         is_active: row?.is_active ?? '',
//                                                     }));
//                                                     setDialog(true);
//                                                 }}
//                                             >
//                                                 <Edit sx={{ fontSize: '18px' }} />
//                                             </IconButton>
//                                         </Tooltip>

//                                     </>
//                                 ),
//                                 ColumnHeader: 'Action',
//                             }
//                         ]}
//                     />
//                 )}

//                 {row.SubRoutes.length > 0 && (
//                     <>
//                         <br />
//                         <DisplaySubRoutings dataSource={row} />
//                     </>
//                 )}
//             </>
//         )
//     }

//     const DisplaySubMenu = ({ row }) => {

//         return (
//             <>
//                 {row.SubMenu.length > 0 && (
//                     <FilterableTable
//                         dataArray={row?.SubMenu ?? []}
//                         title='Sub Menus'
//                         columns={[
//                             {
//                                 isVisible: 1,
//                                 Field_Name: 'name',
//                                 Fied_Data: 'string',
//                                 ColumnHeader: 'Sub Menu',
//                             },
//                             {
//                                 isVisible: 1,
//                                 Field_Name: 'url',
//                                 Fied_Data: 'string',
//                                 ColumnHeader: 'Address',
//                             },

//                             {
//                                 isVisible: 1,
//                                 isCustomCell: true,
//                                 Cell: ({ row }) => (
//                                     <Tooltip title='Add Child-Menu'>
//                                         <span>
//                                             <Button
//                                                 size="small"
//                                                 className="bg-light"
//                                                 onClick={() => {
//                                                     setInputValues(pre => ({
//                                                         ...pre,
//                                                         menu_type: 3,
//                                                         parent_id: row.id,
//                                                         parantDetails: row,
//                                                         url: (row?.ParantData?.url ? (row?.ParantData?.url + '/') : '') + (row?.url ?? '') + '/'
//                                                     }));
//                                                     setDialog(true);
//                                                 }}
//                                                 startIcon={<Add sx={{ fontSize: '18px' }} />}
//                                             >
//                                                 {row?.ChildMenu?.length ?? 0}
//                                             </Button>
//                                         </span>
//                                     </Tooltip>
//                                 ),
//                                 ColumnHeader: 'Child Menu',
//                             },
//                             {
//                                 isVisible: 1,
//                                 isCustomCell: true,
//                                 Cell: ({ row }) => (
//                                     <Tooltip title='Add SubRouting'>
//                                         <span>
//                                             <Button
//                                                 size="small"
//                                                 className="bg-light"
//                                                 onClick={() => {
//                                                     setInputValues(pre => ({
//                                                         ...pre,
//                                                         menu_type: 0,
//                                                         parent_id: row.id,
//                                                         parantDetails: row,
//                                                         url: (row?.ParantData?.url ? (row?.ParantData?.url + '/') : '') + (row?.url ?? '') + '/'
//                                                     }));
//                                                     setDialog(true);
//                                                 }}
//                                                 startIcon={<Add sx={{ fontSize: '18px' }} />}
//                                             >
//                                                 {row?.SubRoutes?.length ?? 0}
//                                             </Button>
//                                         </span>
//                                     </Tooltip>
//                                 ),
//                                 ColumnHeader: 'Sub Routings',
//                             },
//                             {
//                                 isVisible: 1,
//                                 Field_Name: 'display_order',
//                                 Fied_Data: 'number',
//                                 ColumnHeader: 'Order',
//                             },
//                             {
//                                 isVisible: 1,
//                                 isCustomCell: true,
//                                 Cell: ({ row }) => (
//                                     (row?.is_active, 1) ? (
//                                         <span className="px-3 py-1 rounded-3 text-white bg-success">Active</span>
//                                     ) : (
//                                         <span className="px-3 py-1 rounded-3 text-white bg-danger">In-Active</span>
//                                     )
//                                 ),
//                                 ColumnHeader: 'Status',
//                             },
//                             {
//                                 isVisible: 1,
//                                 isCustomCell: true,
//                                 Cell: ({ row }) => (
//                                     <>
//                                         <Tooltip title='Edit Menu'>
//                                             <IconButton
//                                                 size="small"
//                                                 className="p-1"
//                                                 onClick={() => {
//                                                     setInputValues(pre => ({
//                                                         ...pre,
//                                                         id: row?.id,
//                                                         database_Id:row?.database_Id ?? '',
//                                                         app_Id:row?.app_Id ?? '',
//                                                         name: row?.name ?? '',
//                                                         menu_type: 2,
//                                                         parent_id: row?.parent_id ?? '',
//                                                         url: row?.url ?? '',
//                                                         display_order: row?.display_order ?? '',
//                                                         is_active: row?.is_active ?? '',
//                                                     }));
//                                                     setDialog(true);
//                                                 }}
//                                             >
//                                                 <Edit sx={{ fontSize: '18px' }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                     </>
//                                 ),
//                                 ColumnHeader: 'Action',
//                             }
//                         ]}
//                         tableMaxHeight={700}
//                         isExpendable={true}
//                         expandableComp={({ row }) => (row?.ChildMenu?.length > 0 || row?.SubRoutes?.length > 0) && <DisplayChildMenu row={row} />}
//                     />
//                 )}

//                 {row.SubRoutes.length > 0 && (
//                     <>
//                         <br />
//                         <DisplaySubRoutings dataSource={row} />
//                     </>
//                 )}
//             </>
//         )
//     }

//     const closeDialog = () => {
//         setDialog(false);
//         setInputValues(initialValue);
//     }

//     const saveData = async() => {
//         if (loadingOn) {
//             loadingOn();
//         }
//         try{
//             const response = await fetch('/api/menuMaster', {
//                 method:inputValues?.id ? 'PUT' :'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({  
//                     Id:inputValues.id ?? '',
//                     Database_Id:Number(inputValues?.database_Id) ?? '',
                    
//                     App_Id:Number(inputValues?.app_Id)?? '',
//                     MenuName: inputValues?.name ?? '',
//                     Parent_Id: inputValues?.parent_id ?? '',
//                     RoutingURL: inputValues?.url ?? '',
//                     Display_Order: inputValues?.display_order ?? '',
//                     IsActive: inputValues?.is_active ?? '', }),
//             })
//             const data = await response.json();
          
//                 if (data.success) {
//                     toast.success(data.message);
//                     closeDialog();
//                     setReload(pre => !pre);
//                 } else {
//                     toast.error(data.message);
//                 }
        

        
//         }
//         catch (error) {
//             toast.error("An error occurred. Please try again later.");
//           }
//           finally{
//             if (loadingOff) {
//                 loadingOff();
//             }
//           }
        
      
//     }

//     return (
//         <>

//             <div className="d-flex justify-content-end pb-2 mt-3 mb-2">
//                 <Button
//                     onClick={() => {
//                         setDialog(true);
//                         setInputValues(initialValue);
//                     }}
//                     variant="outlined"
//                     startIcon={<Add />}
//                 >
//                     New Menu
//                 </Button>
//             </div>

// <FilterableTable
//                 title="Main Menu"
//                 ButtonArea={
//                     <Button
//                         onClick={() => {
//                             setDialog(true);
//                             setInputValues(initialValue);
//                         }}
//                         variant="outlined"
//                         startIcon={<Add />}
//                     >
//                         New Menu
//                     </Button>
//                 }
//                 dataArray={menuData}
//                 columns={[
//                     {
//                         isVisible: 1,
//                         Field_Name: 'MenuName',
//                         Fied_Data: 'string',
//                         ColumnHeader: 'Main Menu',
//                     },
//                     {
//                         isVisible: 1,
//                         Field_Name: 'RoutingURL',
//                         Fied_Data: 'string',
//                         ColumnHeader: 'Address',
//                     },
//                     // {
//                     //     isVisible: 1,
//                     //     isCustomCell: true,
//                     //     Cell: ({ row }) => (
//                     //         <Tooltip title='Add Sub-Menu'>
//                     //             <span>
//                     //                 <Button
//                     //                     size="small"
//                     //                     className="bg-light"
//                     //                     onClick={() => {
//                     //                         setInputValues(pre => ({
//                     //                             ...pre,
//                     //                             menu_type: 2,
//                     //                             parent_id: row.id,
//                     //                             parantDetails: row,
//                     //                             url: (row?.url ?? '') + '/'
//                     //                         }));
//                     //                         setDialog(true);
//                     //                     }}
//                     //                     startIcon={<Add sx={{ fontSize: '18px' }} />}
//                     //                 >
//                     //                     {row?.SubMenu?.length ?? 0}
//                     //                 </Button>
//                     //             </span>
//                     //         </Tooltip>
//                     //     ),
//                     //     ColumnHeader: 'Sub Menu',
//                     //     align: 'center'
//                     // },
//                     // {
//                     //     isVisible: 1,
//                     //     isCustomCell: true,
//                     //     Cell: ({ row }) => (
//                     //         <Tooltip title='Add SubRouting'>
//                     //             <span>
//                     //                 <Button
//                     //                     size="small"
//                     //                     className="bg-light"
//                     //                     onClick={() => {
//                     //                         setInputValues(pre => ({
//                     //                             ...pre,
//                     //                             menu_type: 0,
//                     //                             parent_id: row.id,
//                     //                             parantDetails: row,
//                     //                             url: (row?.url ?? '') + '/'
//                     //                         }));
//                     //                         setDialog(true);
//                     //                     }}
//                     //                     startIcon={<Add sx={{ fontSize: '18px' }} />}
//                     //                 >
//                     //                     {row?.SubRoutes?.length ?? 0}
//                     //                 </Button>
//                     //             </span>
//                     //         </Tooltip>
//                     //     ),
//                     //     ColumnHeader: 'Sub Routings',
//                     //     align: 'center'
//                     // },
//                     {
//                         isVisible: 1,
//                         Field_Name: 'Display_Order',
//                         Fied_Data: 'number',
//                         ColumnHeader: 'Order',
//                     },
//                     {
//                         isVisible: 1,
//                         isCustomCell: true,
//                         Cell: ({ row }) => (
//                             isEqualNumber(row?.IsActive, 1) ? (
//                                 <span className="px-3 py-1 rounded-3 text-white bg-success">Active</span>
//                             ) : (
//                                 <span className="px-3 py-1 rounded-3 text-white bg-danger">Disabled</span>
//                             )
//                         ),
//                         ColumnHeader: 'Status',
//                     },
//                     {
//                         isVisible: 1,
//                         isCustomCell: true,
//                         Cell: ({ row }) => (
//                             <>
//                                 <Tooltip title='Edit Menu'>
//                                     <IconButton
//                                         size="small"
//                                         className="p-1"
//                                         onClick={() => {
//                                             setInputValues(pre => ({
//                                                 ...pre,
//                                                 id: row?.Id,
//                                                 name: row?.name ?? '',
//                                                 menu_type: 1,
//                                                 parent_id: row?.parent_id ?? '',
//                                                 url: row?.url ?? '',
//                                                 display_order: row?.display_order ?? '',
//                                                 is_active: row?.IsActive ?? '',
//                                             }));
//                                             setDialog(true);
//                                         }}
//                                     >
//                                         <Edit sx={{ fontSize: '18px' }} />
//                                     </IconButton>
//                                 </Tooltip>


//                             </>
//                         ),
//                         ColumnHeader: 'Action',
//                     }
//                 ]}
//                 tableMaxHeight={700}
//                 isExpendable={true}
//                 // expandableComp={({ row }) => (row?.SubMenu?.length > 0 || row?.SubRoutes?.length > 0) && <DisplaySubMenu row={row} />}
//             />


//             <Dialog
//                 open={dialog}
//                 onClose={closeDialog}
//                 maxWidth='sm' fullWidth
//             >
//                 {JSON.stringify(inputValues)}
//                 <DialogTitle>
//                     {inputValues.id ? 'Modify ' : 'Add '}
//                     {(() => {
//                         switch (inputValues.menu_type) {
//                             case 0:
//                                 return 'SUB ROUTING'
//                             case 1:
//                                 return 'MAIN MENU'
//                             case 2:
//                                 return 'SUB MENU'
//                             case 3:
//                                 return 'CHILD MENU'
//                             default:
//                                 return ''
//                         }
//                     })()}
//                 </DialogTitle>
//                 <form onSubmit={e => {
//                     e.preventDefault();
//                     saveData();
//                 }}>
//                     <DialogContent>
                     
//                         <div className="row">
//                             {((inputValues.parantDetails) && inputValues.parantDetails.name) && (
//                                 <div className="col-lg-12 p-2">
//                                     <label>Parant Name </label>
//                                     <input
//                                         className="cus-inpt"
//                                         value={inputValues?.parantDetails?.name}
//                                         disabled
//                                     />
//                                 </div>
//                             )}
//                             <div className="col-lg-6 p-2">
//                                 <label>Name</label>
//                                 <input
//                                     className="cus-inpt"
//                                     value={inputValues.name}
//                                     onChange={e => setInputValues(pre => ({ ...pre, name: e.target.value }))}
//                                     required
//                                     minLength={3}
//                                     maxLength={20}
//                                 />
//                             </div>
//                             <div className="col-lg-6 p-2">
//                                 <label>Order No</label>
//                                 <input
//                                     className="cus-inpt"
//                                     value={inputValues.display_order}
//                                     onChange={e => setInputValues(pre => ({ ...pre, display_order: e.target.value }))}
//                                 />
//                             </div>
//                             <div className="col-lg-12 p-2">
//                                 <label>URL (Link)</label>
//                                 <input
//                                     className="cus-inpt"
//                                     value={inputValues.url}
//                                     onChange={e => setInputValues(pre => ({ ...pre, url: e.target.value }))}
//                                 />
//                             </div>
//                             <div className="col-lg-12 p-2">
//                             <label>Database</label>
//                         <select
//                             value={inputValues.database_Id ?? ""}
//                             className="cus-inpt"
//                             onChange={e => setInputValues({ ...inputValues, database_Id: e.target.value })}
//                         >
//                             <option value="" disabled>Select Database</option>
//                             {database?.length > 0 ? (
//                                 database.map((o, i) => (
//                                     <option key={i} value={o.value}>
//                                         {o.label}
//                                     </option>
//                                 ))
//                             ) : (
//                                 <option disabled>Loading...</option>
//                             )}
//                         </select>

//                             </div>
//                            <label>App</label>
//                            <div className="col-lg-12 p-2">
//                         <select
//                               value={inputValues.app_Id ?? ""}
//                             className="cus-inpt"
//                             onChange={e => setInputValues({ ...inputValues, app_Id: e.target.value })}
//                         >
//                             <option value="0" disabled>Select App</option>
//                             {dropAppDown?.length > 0 ? (
//                                 dropAppDown.map((o, i) => (
//                                     <option key={i} value={o.value}>
//                                         {o.label}
//                                     </option>
//                                 ))
//                             ) : (
//                                 <option disabled>Loading...</option>
//                             )}
//                         </select>
//                         </div>
//                             {inputValues.id && (
//                                 <div className="col-lg-6 p-2">
//                                     <label>Is Active</label>
//                                     <select
//                                         className="cus-inpt"
//                                         value={inputValues.is_active}
//                                         onChange={e => setInputValues(pre => ({ ...pre, is_active: e.target.value }))}
//                                     >
//                                         <option value='' disabled>select</option>
//                                         <option value='1'>Active</option>
//                                         <option value='0'>In-Active</option>
//                                     </select>
//                                 </div>
//                             )}
//                         </div>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button
//                             type="button"
//                             onClick={closeDialog}
//                         >
//                             cancel
//                         </Button>
//                         <Button
//                             type="submit"
//                             variant="outlined"
//                         >
//                             save
//                         </Button>
//                     </DialogActions>
//                 </form>

//             </Dialog>

//         </>
//     )
// }


// export default MenuManagement








"use client"

import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, Tooltip } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import FilterableTable from "../components/filterableTable2"; // ✅ match casing

import { isEqualNumber,isValidObject } from "../components/functions";

const initialValue = {
    id: '',
    name: '',
    menu_type: 1,
    parent_id: '',
    url: '',
    display_order: 1,
    is_active: 1,
    parantDetails: {},
}

const MenuManagement = () => {
    const [inputValues, setInputValues] = useState(initialValue);
    const [reload, setReload] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("/api/menuMaster");
            const data = await response.json();
    
            if (data.success) {
              setMenuData(data.data);
            } else {
              setError(data.message || "Failed to fetch App data.");
            }
          } catch (error) {
            setError("Something went wrong. Please try again.");
            
          }
        };
    
        fetchData();
      }, [reload]);

    const DisplaySubRoutings = ({ dataSource }) => (
        <FilterableTable
            dataArray={dataSource?.SubRoutes ?? []}
            title='Sub Routes'
            columns={[
                {
                    isVisible: 1,
                    Field_Name: 'name',
                    Fied_Data: 'string',
                    ColumnHeader: 'Menu',
                },
                {
                    isVisible: 1,
                    Field_Name: 'url',
                    Fied_Data: 'string',
                    ColumnHeader: 'Address',
                },
                {
                    isVisible: 1,
                    isCustomCell: true,
                    Cell: ({ row }) => (
                        <Tooltip title='Add SubRouting'>
                            <span>
                                <Button
                                    size="small"
                                    className="bg-light"
                                    onClick={() => {
                                        setInputValues(pre => ({
                                            ...pre,
                                            menu_type: 0,
                                            parent_id: row.id,
                                            parantDetails: row,
                                            url: (row?.url ?? '') + '/'
                                        }));
                                        setDialog(true);
                                    }}
                                    startIcon={<Add sx={{ fontSize: '18px' }} />}
                                >
                                    {row?.SubRoutes?.length ?? 0}
                                </Button>
                            </span>
                        </Tooltip>
                    ),
                    ColumnHeader: 'Sub Routings',
                },
                {
                    isVisible: 1,
                    Field_Name: 'display_order',
                    Fied_Data: 'number',
                    ColumnHeader: 'Order',
                },
                {
                    isVisible: 1,
                    isCustomCell: true,
                    Cell: ({ row }) => (
                        isEqualNumber(row?.is_active, 1) ? (
                            <span className="px-3 py-1 rounded-3 text-white bg-success">Active</span>
                        ) : (
                            <span className="px-3 py-1 rounded-3 text-white bg-danger">Disabled</span>
                        )
                    ),
                    ColumnHeader: 'Status',
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
                                            id: row?.id,
                                            name: row?.name ?? '',
                                            menu_type: 0,
                                            parent_id: row?.parent_id ?? '',
                                            url: row?.url ?? '',
                                            display_order: row?.display_order ?? '',
                                            is_active: row?.is_active ?? '',
                                        }));
                                        setDialog(true);
                                    }}
                                >
                                    <Edit sx={{ fontSize: '18px' }} />
                                </IconButton>
                            </Tooltip>
                        </>
                    ),
                    ColumnHeader: 'Action',
                }
            ]}
            tableMaxHeight={700}
            isExpendable={true}
            expandableComp={({ row }) => (row?.SubRoutes?.length > 0) && <DisplaySubRoutings dataSource={row} />}
        />
    )

    const DisplayChildMenu = ({ row }) => {

        return (
            <>
                {row?.ChildMenu?.length > 0 && (
                    <FilterableTable
                        dataArray={row?.ChildMenu ?? []}
                        title='Child Menus'
                        columns={[
                            {
                                isVisible: 1,
                                Field_Name: 'name',
                                Fied_Data: 'string',
                                ColumnHeader: 'Child Menu',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'url',
                                Fied_Data: 'string',
                                ColumnHeader: 'Address',
                            },
                            {
                                isVisible: 1,
                                isCustomCell: true,
                                Cell: ({ row }) => (
                                    <Tooltip title='Add SubRouting'>
                                        <span>
                                            <Button
                                                size="small"
                                                className="bg-light"
                                                onClick={() => {
                                                    setInputValues(pre => ({
                                                        ...pre,
                                                        menu_type: 0,
                                                        parent_id: row.id,
                                                        parantDetails: row,
                                                        url: (row?.ParantData?.url ? (row?.ParantData?.url + '/') : '') + (row?.url ?? '') + '/'
                                                    }));
                                                    setDialog(true);
                                                }}
                                                startIcon={<Add sx={{ fontSize: '18px' }} />}
                                            >
                                                {row?.SubRoutes?.length ?? 0}
                                            </Button>
                                        </span>
                                    </Tooltip>
                                ),
                                ColumnHeader: 'Sub Routings',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'display_order',
                                Fied_Data: 'number',
                                ColumnHeader: 'Order',
                            },
                            {
                                isVisible: 1,
                                isCustomCell: true,
                                Cell: ({ row }) => (
                                    isEqualNumber(row?.is_active, 1) ? (
                                        <span className="px-3 py-1 rounded-3 text-white bg-success">Active</span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-3 text-white bg-danger">Disabled</span>
                                    )
                                ),
                                ColumnHeader: 'Status',
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
                                                        id: row?.id,
                                                        name: row?.name ?? '',
                                                        menu_type: 3,
                                                        parent_id: row?.parent_id ?? '',
                                                        url: row?.url ?? '',
                                                        display_order: row?.display_order ?? '',
                                                        is_active: row?.is_active ?? '',
                                                    }));
                                                    setDialog(true);
                                                }}
                                            >
                                                <Edit sx={{ fontSize: '18px' }} />
                                            </IconButton>
                                        </Tooltip>

                                    </>
                                ),
                                ColumnHeader: 'Action',
                            }
                        ]}
                        tableMaxHeight={700}
                        isExpendable={true}
                        expandableComp={({ row }) => row?.SubRoutes?.length > 0 && <DisplaySubRoutings dataSource={row} />}
                    />
                )}

                {row.SubRoutes.length > 0 && (
                    <>
                        <br />
                        <DisplaySubRoutings dataSource={row} />
                    </>
                )}
            </>
        )
    }

    const DisplaySubMenu = ({ row }) => {

        return (
            <>
                {row.SubMenu.length > 0 && (
                    <FilterableTable
                        dataArray={row?.SubMenu ?? []}
                        title='Sub Menus'
                        columns={[
                            {
                                isVisible: 1,
                                Field_Name: 'name',
                                Fied_Data: 'string',
                                ColumnHeader: 'Sub Menu',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'url',
                                Fied_Data: 'string',
                                ColumnHeader: 'Address',
                            },

                            {
                                isVisible: 1,
                                isCustomCell: true,
                                Cell: ({ row }) => (
                                    <Tooltip title='Add Child-Menu'>
                                        <span>
                                            <Button
                                                size="small"
                                                className="bg-light"
                                                onClick={() => {
                                                    setInputValues(pre => ({
                                                        ...pre,
                                                        menu_type: 3,
                                                        parent_id: row.id,
                                                        parantDetails: row,
                                                        url: (row?.ParantData?.url ? (row?.ParantData?.url + '/') : '') + (row?.url ?? '') + '/'
                                                    }));
                                                    setDialog(true);
                                                }}
                                                startIcon={<Add sx={{ fontSize: '18px' }} />}
                                            >
                                                {row?.ChildMenu?.length ?? 0}
                                            </Button>
                                        </span>
                                    </Tooltip>
                                ),
                                ColumnHeader: 'Child Menu',
                            },
                            {
                                isVisible: 1,
                                isCustomCell: true,
                                Cell: ({ row }) => (
                                    <Tooltip title='Add SubRouting'>
                                        <span>
                                            <Button
                                                size="small"
                                                className="bg-light"
                                                onClick={() => {
                                                    setInputValues(pre => ({
                                                        ...pre,
                                                        menu_type: 0,
                                                        parent_id: row.id,
                                                        parantDetails: row,
                                                        url: (row?.ParantData?.url ? (row?.ParantData?.url + '/') : '') + (row?.url ?? '') + '/'
                                                    }));
                                                    setDialog(true);
                                                }}
                                                startIcon={<Add sx={{ fontSize: '18px' }} />}
                                            >
                                                {row?.SubRoutes?.length ?? 0}
                                            </Button>
                                        </span>
                                    </Tooltip>
                                ),
                                ColumnHeader: 'Sub Routings',
                            },
                            {
                                isVisible: 1,
                                Field_Name: 'display_order',
                                Fied_Data: 'number',
                                ColumnHeader: 'Order',
                            },
                            {
                                isVisible: 1,
                                isCustomCell: true,
                                Cell: ({ row }) => (
                                    isEqualNumber(row?.is_active, 1) ? (
                                        <span className="px-3 py-1 rounded-3 text-white bg-success">Active</span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-3 text-white bg-danger">Disabled</span>
                                    )
                                ),
                                ColumnHeader: 'Status',
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
                                                        id: row?.id,
                                                        name: row?.name ?? '',
                                                        menu_type: 2,
                                                        parent_id: row?.parent_id ?? '',
                                                        url: row?.url ?? '',
                                                        display_order: row?.display_order ?? '',
                                                        is_active: row?.is_active ?? '',
                                                    }));
                                                    setDialog(true);
                                                }}
                                            >
                                                <Edit sx={{ fontSize: '18px' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                ),
                                ColumnHeader: 'Action',
                            }
                        ]}
                        tableMaxHeight={700}
                        isExpendable={true}
                        expandableComp={({ row }) => (row?.ChildMenu?.length > 0 || row?.SubRoutes?.length > 0) && <DisplayChildMenu row={row} />}
                    />
                )}

                {row.SubRoutes.length > 0 && (
                    <>
                        <br />
                        <DisplaySubRoutings dataSource={row} />
                    </>
                )}
            </>
        )
    }

    const closeDialog = () => {
        setDialog(false);
        setInputValues(initialValue);
    }

    const saveData = () => {
     
        fetchLink({
            address: '/api/menuMaster',
            method: inputValues.id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            bodyData: inputValues
        }).then(data => {
            if (data.success) {
                toast.success(data.message);
                closeDialog();
                setReload(pre => !pre);
            } else {
                toast.error(data.message);
            }
        }).catch(e => console.error(e))
    }

    return (
        <>



 <FilterableTable
                title="Main Menu"
                ButtonArea={
                    <Button
                        onClick={() => {
                            setDialog(true);
                            setInputValues(initialValue);
                        }}
                        variant="outlined"
                        startIcon={<Add />}
                    >
                      NEW MENU
                    </Button>
                }
                dataArray={menuData}
                columns={[
                    {
                        isVisible: 1,
                        Field_Name: 'name',
                        Fied_Data: 'string',
                        ColumnHeader: 'Main Menu',
                    },
                    {
                        isVisible: 1,
                        Field_Name: 'url',
                        Fied_Data: 'string',
                        ColumnHeader: 'Address',
                    },
                    {
                        isVisible: 1,
                        isCustomCell: true,
                        Cell: ({ row }) => (
                            <Tooltip title='Add Sub-Menu'>
                                <span>
                                    <Button
                                        size="small"
                                        className="bg-light"
                                        onClick={() => {
                                            setInputValues(pre => ({
                                                ...pre,
                                                menu_type: 2,
                                                parent_id: row.id,
                                                parantDetails: row,
                                                url: (row?.url ?? '') + '/'
                                            }));
                                            setDialog(true);
                                        }}
                                        startIcon={<Add sx={{ fontSize: '18px' }} />}
                                    >
                                        {row?.SubMenu?.length ?? 0}
                                    </Button>
                                </span>
                            </Tooltip>
                        ),
                        ColumnHeader: 'Sub Menu',
                        align: 'center'
                    },
                    {
                        isVisible: 1,
                        isCustomCell: true,
                        Cell: ({ row }) => (
                            <Tooltip title='Add SubRouting'>
                                <span>
                                    <Button
                                        size="small"
                                        className="bg-light"
                                        onClick={() => {
                                            setInputValues(pre => ({
                                                ...pre,
                                                menu_type: 0,
                                                parent_id: row.id,
                                                parantDetails: row,
                                                url: (row?.url ?? '') + '/'
                                            }));
                                            setDialog(true);
                                        }}
                                        startIcon={<Add sx={{ fontSize: '18px' }} />}
                                    >
                                        {row?.SubRoutes?.length ?? 0}
                                    </Button>
                                </span>
                            </Tooltip>
                        ),
                        ColumnHeader: 'Sub Routings',
                        align: 'center'
                    },
                    {
                        isVisible: 1,
                        Field_Name: 'display_order',
                        Fied_Data: 'number',
                        ColumnHeader: 'Order',
                    },
                    {
                        isVisible: 1,
                        isCustomCell: true,
                        Cell: ({ row }) => (
                            isEqualNumber(row?.is_active, 1) ? (
                                <span className="px-3 py-1 rounded-3 text-white bg-success">Active</span>
                            ) : (
                                <span className="px-3 py-1 rounded-3 text-white bg-danger">Disabled</span>
                            )
                        ),
                        ColumnHeader: 'Status',
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
                                                id: row?.id,
                                                name: row?.name ?? '',
                                                menu_type: 1,
                                                parent_id: row?.parent_id ?? '',
                                                url: row?.url ?? '',
                                                display_order: row?.display_order ?? '',
                                                is_active: row?.is_active ?? '',
                                            }));
                                            setDialog(true);
                                        }}
                                    >
                                        <Edit sx={{ fontSize: '18px' }} />
                                    </IconButton>
                                </Tooltip>


                            </>
                        ),
                        ColumnHeader: 'Action',
                    }
                ]}
                tableMaxHeight={700}
                isExpendable={true}
                expandableComp={({ row }) => (row?.SubMenu?.length > 0 || row?.SubRoutes?.length > 0) && <DisplaySubMenu row={row} />}
            /> 


            <Dialog
                open={dialog}
                onClose={closeDialog}
                maxWidth='sm' fullWidth
            >
                <DialogTitle>
                    {inputValues.id ? 'Modify ' : 'Add '}
                    {(() => {
                        switch (inputValues.menu_type) {
                            case 0:
                                return 'SUB ROUTING'
                            case 1:
                                return 'MAIN MENU'
                            case 2:
                                return 'SUB MENU'
                            case 3:
                                return 'CHILD MENU'
                            default:
                                return ''
                        }
                    })()}
                </DialogTitle>

                <form onSubmit={e => {
                    e.preventDefault();
                    saveData();
                }}>
                    <DialogContent>
                        <div className="row">
                            {(isValidObject(inputValues.parantDetails) && inputValues.parantDetails.name) && (
                                <div className="col-lg-12 p-2">
                                    <label>Parant Name </label>
                                    <input
                                        className="cus-inpt"
                                        value={inputValues?.parantDetails?.name}
                                        disabled
                                    />
                                </div>
                            )}
                            <div className="col-lg-6 p-2">
                                <label>Name </label>
                                <input
                                    className="cus-inpt"
                                    value={inputValues.name}
                                    onChange={e => setInputValues(pre => ({ ...pre, name: e.target.value }))}
                                    required
                                    minLength={3}
                                    maxLength={20}
                                />
                            </div>
                            <div className="col-lg-6 p-2">
                                <label>Order No</label>
                                <input
                                    className="cus-inpt"
                                    value={inputValues.display_order}
                                    onChange={e => setInputValues(pre => ({ ...pre, display_order: e.target.value }))}
                                />
                            </div>
                            <div className="col-lg-12 p-2">
                                <label>URL (Link)</label>
                                <input
                                    className="cus-inpt"
                                    value={inputValues.url}
                                    onChange={e => setInputValues(pre => ({ ...pre, url: e.target.value }))}
                                />
                            </div>

                            {inputValues.id && (
                                <div className="col-lg-6 p-2">
                                    <label>Is Active</label>
                                    <select
                                        className="cus-inpt"
                                        value={inputValues.is_active}
                                        onChange={e => setInputValues(pre => ({ ...pre, is_active: e.target.value }))}
                                    >
                                        <option value='' disabled>select</option>
                                        <option value='1'>Active</option>
                                        <option value='0'>Disable</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="button"
                            onClick={closeDialog}
                        >
                            cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="outlined"
                        >
                            save
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>

        </>
    )
}


export default MenuManagement