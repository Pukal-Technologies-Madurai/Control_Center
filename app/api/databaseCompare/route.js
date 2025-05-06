// import { withDB } from '@/lib/dbMiddleware';
// import { sentData, servError,dataFound } from '@/app/api/responses';
// import sql from 'mssql';

// export const dynamic = "force-dynamic";

// export const POST = withDB(async (req, pool) => {
//     try {
//         const body = await req.json();
//         const { DB1, DB2 } = body;

//         if (!DB1 || !DB2) {
//             return servError("One or both database IDs are invalid.");
//         }

//         // Get database names
//         const dbNamesQuery = await pool.request()
//             .input('DB1', sql.NVarChar, DB1)
//             .input('DB2', sql.NVarChar, DB2)
//             .query(`
//                 SELECT 
//                     (SELECT DatabaseName FROM tbl_DatabaseMaster WHERE Id = @DB1) AS db1Name,
//                     (SELECT DatabaseName FROM tbl_DatabaseMaster WHERE Id = @DB2) AS db2Name
//             `);

//         const db1Name = dbNamesQuery.recordset[0]?.db1Name;
//         const db2Name = dbNamesQuery.recordset[0]?.db2Name;

//         if (!db1Name || !db2Name) {
//             return servError("Database names not found for one or both DBs.");
//         }

//         // const getDbMetadata = async (dbName) => {
//         //     const result = await pool.request().query(`
//         //         SELECT 
//         //             (SELECT COUNT(*) FROM [${dbName}].sys.tables) AS tables,
//         //             (SELECT COUNT(*) FROM [${dbName}].sys.views) AS views,
//         //             (SELECT COUNT(*) FROM [${dbName}].sys.objects WHERE type IN ('FN', 'TF', 'IF')) AS functions,
//         //             (SELECT COUNT(*) FROM [${dbName}].sys.procedures) AS procedures
               
         

//         //     `);
//         //     return result.recordset[0];
//         // };



//         const getDbMetadata = async (dbName) => {
//             try {
//                 const safeDbName = dbName.replace(/[^a-zA-Z0-9_]/g, ''); // Basic sanitization
        
//                 const request = pool.request();
        
//                 // Get counts
//                 const countsResult = await request.query(`
//                     SELECT 
//                         (SELECT COUNT(*) FROM [${safeDbName}].sys.tables) AS tables,
//                         (SELECT COUNT(*) FROM [${safeDbName}].sys.views) AS views,
//                         (SELECT COUNT(*) FROM [${safeDbName}].sys.objects WHERE type IN ('FN', 'TF', 'IF')) AS functions,
//                         (SELECT COUNT(*) FROM [${safeDbName}].sys.procedures) AS procedures
//                 `);
        
//                 // Get tables
//                 const tablesResult = await request.query(`
//                     SELECT TABLE_NAME 
//                     FROM [${safeDbName}].INFORMATION_SCHEMA.TABLES 
//                     WHERE TABLE_TYPE = 'BASE TABLE'
//                 `);
        
//                 const tables = [];
//                 for (const { TABLE_NAME } of tablesResult.recordset) {
//                     const columnsResult = await request.query(`
//                         SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH 
//                         FROM [${safeDbName}].INFORMATION_SCHEMA.COLUMNS 
//                         WHERE TABLE_NAME = '${TABLE_NAME}'
//                     `);
        
//                     const columns = columnsResult.recordset.map(col => ({
//                         column_name: col.COLUMN_NAME,
//                         data_type: col.DATA_TYPE,
//                         is_nullable: col.IS_NULLABLE === 'YES',
//                         type_details: col.CHARACTER_MAXIMUM_LENGTH ?? null
//                     }));
        
//                     tables.push({ table_name: TABLE_NAME, columns });
//                 }
        
//                 // Get views
//                 const viewsResult = await request.query(`
//                     SELECT TABLE_NAME AS view_name 
//                     FROM [${safeDbName}].INFORMATION_SCHEMA.VIEWS
//                 `);
        
//                 const views = [];
//                 for (const { view_name } of viewsResult.recordset) {
//                     const columnsResult = await request.query(`
//                         SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH 
//                         FROM [${safeDbName}].INFORMATION_SCHEMA.COLUMNS 
//                         WHERE TABLE_NAME = '${view_name}'
//                     `);
        
//                     const columns = columnsResult.recordset.map(col => ({
//                         column_name: col.COLUMN_NAME,
//                         data_type: col.DATA_TYPE,
//                         is_nullable: col.IS_NULLABLE === 'YES',
//                         type_details: col.CHARACTER_MAXIMUM_LENGTH ?? null
//                     }));
        
//                     views.push({ view_name, columns });
//                 }
        
//                 // Get functions
//                 const functionsResult = await request.query(`
//                     SELECT o.name AS function_name, p.name AS param_name, t.name AS data_type, p.is_output
//                     FROM [${safeDbName}].sys.objects o
//                     INNER JOIN [${safeDbName}].sys.parameters p ON o.object_id = p.object_id
//                     INNER JOIN [${safeDbName}].sys.types t ON p.system_type_id = t.system_type_id AND t.user_type_id = t.system_type_id
//                     WHERE o.type IN ('FN', 'TF', 'IF')
//                 `);
        
//                 const functionMap = {};
//                 for (const row of functionsResult.recordset) {
//                     if (!functionMap[row.function_name]) {
//                         functionMap[row.function_name] = [];
//                     }
//                     functionMap[row.function_name].push({
//                         column_name: row.param_name,
//                         data_type: row.data_type,
//                         is_nullable: false,
//                         is_output: row.is_output === true
//                     });
//                 }
        
//                 const functions = Object.entries(functionMap).map(([function_name, columns]) => ({
//                     function_name,
//                     columns
//                 }));
        
//                 // Get procedures
//                 const proceduresResult = await request.query(`
//                     SELECT o.name AS procedure_name, p.name AS param_name, t.name AS data_type, p.is_output
//                     FROM [${safeDbName}].sys.objects o
//                     INNER JOIN [${safeDbName}].sys.parameters p ON o.object_id = p.object_id
//                     INNER JOIN [${safeDbName}].sys.types t ON p.system_type_id = t.system_type_id AND t.user_type_id = t.system_type_id
//                     WHERE o.type = 'P'
//                 `);
        
//                 const procedureMap = {};
//                 for (const row of proceduresResult.recordset) {
//                     if (!procedureMap[row.procedure_name]) {
//                         procedureMap[row.procedure_name] = [];
//                     }
//                     procedureMap[row.procedure_name].push({
//                         column_name: row.param_name,
//                         data_type: row.data_type,
//                         is_nullable: false,
//                         is_output: row.is_output === true
//                     });
//                 }
        
//                 const procedures = Object.entries(procedureMap).map(([procedure_name, columns]) => ({
//                     procedure_name,
//                     columns
//                 }));
        
//                 return {
//                     tables: countsResult.recordset[0].tables,
//                     views: countsResult.recordset[0].views,
//                     procedures: countsResult.recordset[0].procedures,
//                     functions: countsResult.recordset[0].functions,
//                     tableList: tables,
//                     viewList: views,
//                     functionList: functions,
//                     procedureList: procedures
//                 };
//             } catch (error) {
//                 console.error('Error fetching database metadata:', error);
//                 throw error;
//             }
//         };
        
        
//         const [db1Details, db2Details] = await Promise.all([
//             getDbMetadata(db1Name),
//             getDbMetadata(db2Name)
//         ]);

//         const result = {
//             db1: {
//                 counts:{
//                     name: db1Name,
//                     tables: db1Details.tables,
//                     views: db1Details.views,
//                     procedures: db1Details.procedures,
//                     functions: db1Details.functions
//                 },
//                 tables: db1Details.tableList,
//                 views: db1Details.viewList,
//                 functions: db1Details.functionList,
//                 procedures:db1Details.procedureList
//             },
//             db2: {
//                 counts:{
//                     name: db2Name,
//                     tables: db2Details.tables,
//                     views: db2Details.views,
//                     procedures: db2Details.procedures,
//                     functions: db2Details.functions
//                 },
//                 tables: db2Details.tableList,
//                 views: db2Details.viewList,
//                 functions: db2Details.functionList,
//                 procedures:db2Details.procedureList
//             }
//         };
//         console.log("result",result)
//         return dataFound(result);

//     } catch (e) {
//         console.error("Error occurred:", e);
//         return servError(e.message);
//     }
// });




import { withDB } from '@/lib/dbMiddleware';
import { sentData, servError, dataFound } from '@/app/api/responses';
import sql from 'mssql';
import dynamic from 'next/dynamic'
 

// export const dynamic = "force-dynamic";

export const POST = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        const { DB1, DB2 } = body;

        if (!DB1 || !DB2) {
            return servError("One or both database IDs are invalid.");
        }

        // Get database names from master table
        const dbNamesQuery = await pool.request()
            .input('DB1', sql.NVarChar, DB1)
            .input('DB2', sql.NVarChar, DB2)
            .query(`
                SELECT 
                    (SELECT DatabaseName FROM tbl_DatabaseMaster WHERE Id = @DB1) AS db1Name,
                    (SELECT DatabaseName FROM tbl_DatabaseMaster WHERE Id = @DB2) AS db2Name
            `);

        const db1Name = dbNamesQuery.recordset[0]?.db1Name;
        const db2Name = dbNamesQuery.recordset[0]?.db2Name;

        if (!db1Name || !db2Name) {
            return servError("Database names not found for one or both DBs.");
        }

        const getDbMetadata = async (dbName) => {
            try {
                const safeDbName = dbName.replace(/[^a-zA-Z0-9_]/g, '');

                const request = pool.request();

                // Get counts
                const countsResult = await request.query(`
                    SELECT 
                        (SELECT COUNT(*) FROM [${safeDbName}].sys.tables) AS tables,
                        (SELECT COUNT(*) FROM [${safeDbName}].sys.views) AS views,
                        (SELECT COUNT(*) FROM [${safeDbName}].sys.objects WHERE type IN ('FN', 'TF', 'IF')) AS functions,
                        (SELECT COUNT(*) FROM [${safeDbName}].sys.procedures) AS procedures
                `);

                // Get tables and columns
                const tablesResult = await request.query(`
                    SELECT TABLE_NAME 
                    FROM [${safeDbName}].INFORMATION_SCHEMA.TABLES 
                    WHERE TABLE_TYPE = 'BASE TABLE'
                `);

                const tables = [];
                for (const { TABLE_NAME } of tablesResult.recordset) {
                    const columnsResult = await request.query(`
                        SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH 
                        FROM [${safeDbName}].INFORMATION_SCHEMA.COLUMNS 
                        WHERE TABLE_NAME = '${TABLE_NAME}'
                    `);

                    const columns = columnsResult.recordset.map(col => ({
                        column_name: col.COLUMN_NAME,
                        data_type: col.DATA_TYPE,
                        is_nullable: col.IS_NULLABLE === 'YES',
                        type_details: col.CHARACTER_MAXIMUM_LENGTH ?? null
                    }));

                    tables.push({ table_name: TABLE_NAME, columns });
                }

                // Get views and columns
                const viewsResult = await request.query(`
                    SELECT TABLE_NAME AS view_name 
                    FROM [${safeDbName}].INFORMATION_SCHEMA.VIEWS
                `);

                const views = [];
                for (const { view_name } of viewsResult.recordset) {
                    const columnsResult = await request.query(`
                        SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH 
                        FROM [${safeDbName}].INFORMATION_SCHEMA.COLUMNS 
                        WHERE TABLE_NAME = '${view_name}'
                    `);

                    const columns = columnsResult.recordset.map(col => ({
                        column_name: col.COLUMN_NAME,
                        data_type: col.DATA_TYPE,
                        is_nullable: col.IS_NULLABLE === 'YES',
                        type_details: col.CHARACTER_MAXIMUM_LENGTH ?? null
                    }));

                    views.push({ view_name, columns });
                }

                // Get functions and parameters
                const functionsResult = await request.query(`
                    SELECT o.name AS function_name, p.name AS param_name, t.name AS data_type, p.is_output
                    FROM [${safeDbName}].sys.objects o
                    INNER JOIN [${safeDbName}].sys.parameters p ON o.object_id = p.object_id
                    INNER JOIN [${safeDbName}].sys.types t ON p.system_type_id = t.system_type_id AND t.user_type_id = t.system_type_id
                    WHERE o.type IN ('FN', 'TF', 'IF')
                `);

                const functionMap = {};
                for (const func of functionsResult.recordset) {
                    if (!functionMap[func.function_name]) {
                        functionMap[func.function_name] = [];
                    }
                    functionMap[func.function_name].push({
                        param_name: func.param_name,
                        data_type: func.data_type,
                        is_output: func.is_output
                    });
                }

                const functions = Object.entries(functionMap).map(([function_name, parameters]) => ({
                    function_name,
                    parameters
                }));

                // Get procedures and parameters
                const proceduresResult = await request.query(`
                    SELECT o.name AS procedure_name, p.name AS param_name, t.name AS data_type, p.is_output
                    FROM [${safeDbName}].sys.objects o
                    INNER JOIN [${safeDbName}].sys.parameters p ON o.object_id = p.object_id
                    INNER JOIN [${safeDbName}].sys.types t ON p.system_type_id = t.system_type_id AND t.user_type_id = t.system_type_id
                    WHERE o.type = 'P'
                `);

                const procedureMap = {};
                for (const proc of proceduresResult.recordset) {
                    if (!procedureMap[proc.procedure_name]) {
                        procedureMap[proc.procedure_name] = [];
                    }
                    procedureMap[proc.procedure_name].push({
                        param_name: proc.param_name,
                        data_type: proc.data_type,
                        is_output: proc.is_output
                    });
                }

                const procedures = Object.entries(procedureMap).map(([procedure_name, parameters]) => ({
                    procedure_name,
                    parameters
                }));

                return {
                    counts: countsResult.recordset[0],
                    tables,
                    views,
                    functions,
                    procedures
                };
            } catch (err) {
                console.error(`Error fetching metadata for DB: ${dbName}`, err);
                throw err;
            }
        };

        // Fetch metadata for both databases
        const [db1Metadata, db2Metadata] = await Promise.all([
            getDbMetadata(db1Name),
            getDbMetadata(db2Name)
        ]);

        // Return result
        return dataFound({
            db1: {
                name: db1Name,
                counts:db1Metadata.counts,
                tables:db1Metadata.tables,
                views:db1Metadata.views,
                functions:db1Metadata.functions,
                procedures:db1Metadata.procedures

                // metadata: db1Metadata
            },
            db2: {
                name: db2Name,
                counts:db2Metadata.counts,
                tables:db2Metadata.tables,
                views:db2Metadata.views,
                functions:db2Metadata.functions,
                procedures:db2Metadata.procedures
            }
        });

    } catch (error) {
        console.error("Error in database comparison API:", error);
        return servError("Internal server error.");
    }
});
