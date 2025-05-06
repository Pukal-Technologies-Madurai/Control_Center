import { withDB } from '@/lib/dbMiddleware';
import { sentData, success, failed, servError } from '@/app/api/responses';

export const dynamic = "force-dynamic";
import sql from 'mssql';



export const POST = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const { App_Id, Version_No, Version_Date, Description } = body;

        const getMaxData = await pool.request().query(`SELECT MAX(Id) AS MaxId FROM tbl_AppDetails`);
        const getId = getMaxData.recordset[0]?.MaxId || 0;
        const newId = getId + 1;

        const currentDate = new Date()

    
            const result1 = await pool.request()
                .input('Id', sql.BigInt, newId)
                .input('App_Id', sql.BigInt, App_Id)
                .input('VersionNo', sql.VarChar, Version_No)
                .input('Version_Date', sql.DateTime, new Date(Version_Date))
                .input('Description', sql.VarChar, Description || '') 
                .input('Created', sql.DateTime, currentDate) 
                .query(`
                    INSERT INTO tbl_AppDetails (App_Id, Version_No, Version_Date, Description, Created)
                    VALUES (@App_Id, @VersionNo, @Version_Date, @Description, @Created);
                `);

       

        return result1.rowsAffected[0] > 0 
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

        const {Id,Version_No,Version_Date,Description, App_Id} = body;
        const currentDate = new Date()
        const result = await pool.request()
             .input('Id',sql.Int,Id)
            .input('Version_No', sql.VarChar, Version_No)
            .input('Version_Date',sql.DateTime, Version_Date)
            .input('Description',sql.VarChar,Description)
            .input('modified',sql.Date,currentDate)
            .input('App_Id',sql.Int,App_Id)
            .query(`
                UPDATE tbl_AppDetails
                SET
                  Version_No=@Version_No,
                      Version_Date=@Version_Date,
                       Description=@Description,
                           modified=@modified
                WHERE App_Id = @App_Id AND Id =@Id;
            `);

        return result.rowsAffected[0] > 0 ? success('Changes saved') : failed('Failed to save changes');
    } catch (e) {
        return servError(e);
    }
});


export const DELETE = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body || !body.Id || !body.App_Id) return failed('No data received or App_Id missing');

        const { App_Id,Id } = body;
        const result = await pool.request()
            .input('App_Id', sql.Int, App_Id)
            .input('Id', sql.Int, Id)
            .query('DELETE FROM tbl_AppDetails WHERE App_Id = @App_Id AND Id=@Id');
            
        if (result.rowsAffected[0] > 0 ) {
            return success(`App deleted successfully`);
        } else {
            return failed(`No company found with ID ${App_Id}`);
        }
    } catch (e) {
        return servError(e);
    }
});
