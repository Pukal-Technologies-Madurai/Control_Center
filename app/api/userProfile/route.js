import { withDB } from '@/lib/dbMiddleware';
import { sentData, success, failed, servError } from '@/app/api/responses';

export const dynamic = "force-dynamic";
import sql from 'mssql';

export const GET = withDB(async (req, pool) => {
    try {
      
        const result = await pool.request().query('SELECT * FROM tbl_UserType');
     
        return sentData(result.recordset);
    } catch (e) {
        return servError(e);
    }
});

export const POST = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const {Profile_Name } = body;

        const getMaxData = await pool.request().query(`SELECT MAX(CAST(Profile_Id AS INT)) AS MaxId FROM tbl_UserType`);

        const getId = getMaxData.recordset[0]?.MaxId || 0;
       
        const newId = getId + 1; 

        const result = await pool.request()
            .input('Profile_Id', sql.Int, newId)
            .input('Profile_Name', sql.VarChar, Profile_Name)
            .query(`
                INSERT INTO tbl_UserType (Profile_Id,Profile_Name)
                VALUES (@Profile_Id,@Profile_Name);
            `);

        return result.rowsAffected[0] > 0 ? success('UserType Added') : failed('Failed to User Type');
    } catch (e) {
        return servError(e);
    }
});

export const PUT = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const { Profile_Id, Profile_Name } = body;

        const result = await pool.request()
            .input('Profile_Id', sql.Int, Profile_Id)
            .input('Profile_Name', sql.VarChar, Profile_Name)
            .query(`
                UPDATE tbl_UserType
                SET Profile_Name = @Profile_Name
                WHERE Profile_Id = @Profile_Id;
            `);

        return result.rowsAffected[0] > 0 ? success('Changes saved') : failed('Failed to save changes');
    } catch (e) {
        return servError(e);
    }
});


export const DELETE = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const { Profile_Id } = body;
        const result = await pool.request()
        .input('Profile_Id', sql.Int, Profile_Id)
        .query('DELETE tbl_UserType WHERE Profile_Id=@Profile_Id');
     
         if (result.rowsAffected[0] > 0) {
            return success(`UserType deleted successfully`);
        } else {
            return failed(`No UserType found`);
        }
    } catch (e) {
        return servError(e);
    }
});