import { withDB } from '@/lib/dbMiddleware';
import { sentData, success, failed, servError } from '@/app/api/responses';

export const dynamic = "force-dynamic";
import sql from 'mssql';

export const GET = withDB(async (req, pool) => {
    try {
        const menuData = await pool.request().query(`
           SELECT 
    p.*,
    t.App_Type AS App_Type_Name,
    COALESCE((
        SELECT 
         m.*
        FROM
            [dbo].[tbl_AppDetails] AS m
        WHERE
            p.App_Id = m.App_Id
        FOR JSON PATH
    ), '[]') AS ParantData
FROM 
    [dbo].[tbl_AppMaster] AS p
LEFT JOIN 
    [dbo].[tbl_AppType] AS t ON p.App_Type = t.Id

        `);

   
        const formattedData = menuData.recordset.map((row) => ({
            ...row,
            ParantData: JSON.parse(row.ParantData),
        }));

        return sentData(formattedData);
    } catch (e) {
        return servError(e);
    }
});


export const POST = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const { App_Name, App_Type, Version_No, Version_Date, Description } = body;

        const getMaxData = await pool.request().query(`SELECT MAX(App_Id) AS MaxId FROM tbl_AppMaster`);
        const getId = getMaxData.recordset[0]?.MaxId || 0;
        const newId = getId + 1;

        const currentDate = new Date()

        const result = await pool.request()
            .input('App_Id', sql.BigInt, newId)
            .input('App_Name', sql.VarChar, App_Name)
            .input('App_Type', sql.VarChar, App_Type)
            .input('created', sql.DateTime, currentDate) 
            .query(`
                INSERT INTO tbl_AppMaster (App_Id, App_Name, App_Type, created)
                VALUES (@App_Id, @App_Name, @App_Type, @created);
            `);

        if (Version_No && Version_Date) {
            const result1 = await pool.request()
                .input('App_Id', sql.BigInt, newId)
                .input('VersionNo', sql.VarChar, Version_No)
                .input('Version_Date', sql.DateTime, new Date(Version_Date))
                .input('Description', sql.VarChar, Description || '') 
                .input('Created', sql.DateTime, currentDate) 
                .query(`
                    INSERT INTO tbl_AppDetails (App_Id, Version_No, Version_Date, Description, Created)
                    VALUES (@App_Id, @VersionNo, @Version_Date, @Description, @Created);
                `);

            return (result.rowsAffected[0] > 0 && result1.rowsAffected[0] > 0)
                ? success('App Details Added')
                : failed('Failed to create App Details');
        }

        return result.rowsAffected[0] > 0 
            ? success('App Master Added (without version details)') 
            : failed('Failed to create App Master');
        
    } catch (e) {
        return servError(e);
    }
});


export const PUT = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const {App_Id,App_Name, App_Type} = body;

        const result = await pool.request()
           
            .input('App_Name', sql.VarChar, App_Name)
            .input('App_Type', sql.Int, App_Type)
            .input('modified',sql.DateTime,new Date())
            .input('App_Id',sql.Int,App_Id)
            .query(`
                UPDATE tbl_AppMaster
                SET
                  App_Name=@App_Name,
                      App_Type=@App_Type,
                           modified=@modified
                WHERE App_Id = @App_Id;
            `);

        return result.rowsAffected[0] > 0 ? success('Changes saved') : failed('Failed to save changes');
    } catch (e) {
        return servError(e);
    }
});


export const DELETE = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body || !body.App_Id) return failed('No data received or App_Id missing');

        const { App_Id } = body;
        const result = await pool.request()
            .input('App_Id', sql.Int, App_Id)
            .query('DELETE FROM tbl_AppMaster WHERE App_Id = @App_Id');

             const result1 = await pool.request()
           .input('App_Id', sql.Int, App_Id)
           .query('DELETE FROM tbl_AppDetails WHERE App_Id = @App_Id');

        if (result.rowsAffected[0] > 0 || result1.rowsAffected[0]>0) {
            return success(`App deleted successfully`);
        } else {
            return failed(`No company found with ID ${App_Id}`);
        }
    } catch (e) {
        return servError(e);
    }
});
