import { withDB } from '@/lib/dbMiddleware';
import { sentData, success, failed, servError } from '@/app/api/responses';

export const dynamic = "force-dynamic";
import sql from 'mssql';

export const GET = withDB(async (req, pool) => {
    try {

        const result = await pool.request().query(`SELECT dm.*,c.Company_Name,am.App_Name FROM tbl_DatabaseMaster dm
                     left join tbl_Company c ON c.Global_Comp_Id=dm.Company_Id
                     left join tbl_AppMaster am ON am.App_Id=dm.App_Id`)

        return sentData(result.recordset);
    } catch (e) {
        return servError(e);
    }
});

export const POST = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const { Company_Id, App_Id,Server_Url, DatabaseName, Server_Ip, No_of_Users,DatabaseSpace,ServerSize } = body;
  
        const getMaxData = await pool.request().query(`SELECT MAX(CAST(Id AS INT)) AS MaxId FROM tbl_DatabaseMaster`);
        const getId = getMaxData.recordset[0]?.MaxId || 0;
        const newId = getId + 1;

        const result = await pool.request()
            .input('Id', sql.BigInt, newId)
            .input('Company_Id', sql.Int, Company_Id)
            .input('App_Id', sql.Int, App_Id)
            .input('Server_Url', sql.VarChar, Server_Url)
            .input('DatabaseName', sql.VarChar, DatabaseName)
            .input('Server_Ip', sql.VarChar, Server_Ip)          
            .input('No_of_Users', sql.VarChar, No_of_Users)
            .input('DatabaseSpace', sql.VarChar, DatabaseSpace)
            .input('ServerSize', sql.VarChar, ServerSize)
            .input('Created',sql.DateTime, new Date())
            .query(`
                INSERT INTO tbl_DatabaseMaster (Id,Company_Id, App_Id,Server_Url, DatabaseName, Server_Ip,No_of_Users,DatabaseSpace,ServerSize)
                VALUES (@Id,@Company_Id, @App_Id,@Server_Url, @DatabaseName, @Server_Ip, @No_of_Users,@DatabaseSpace,@ServerSize);
            `);

        return result.rowsAffected[0] > 0 ? success('DatabaseDetails Added') : failed('Failed to create DatabaseDetails');
    } catch (e) {
        return servError(e);
    }
});

export const PUT = withDB(async (req, pool) => {
    try {
        const body = await req.json();
     

        if (!body) return failed('No data received');

        const { Id, Company_Id, App_Id,Server_Url, DatabaseName, Server_Ip, No_of_Users, DatabaseSpace, ServerSize } = body;
  
        const result = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Company_Id', sql.Int, Company_Id)
            .input('App_Id', sql.Int, App_Id)
            .input('Server_Url', sql.VarChar, Server_Url)
            .input('DatabaseName', sql.VarChar, DatabaseName)
            .input('Server_Ip', sql.VarChar, Server_Ip)
            .input('No_of_Users', sql.Int, No_of_Users)
            .input('DatabaseSpace', sql.VarChar, DatabaseSpace)
            .input('ServerSize', sql.VarChar, ServerSize)
            .input('updated', sql.DateTime, new Date())
            .query(`
                UPDATE tbl_DatabaseMaster
                SET Company_Id = @Company_Id, 
                    App_Id = @App_Id, 
                    Server_Url = @Server_Url, 
                    DatabaseName = @DatabaseName, 
                    Server_Ip = @Server_Ip,
                    No_of_Users = @No_of_Users,
                    DatabaseSpace = @DatabaseSpace,
                    ServerSize = @ServerSize
                WHERE Id = @Id;
            `);

        return result?.rowsAffected?.[0] > 0 ? success('Changes saved') : failed('Failed to save changes');
    } catch (e) {
        console.error("Database Error:", e);
        return servError(e);
    }
});


export const DELETE = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const { Id } = body;
        const result = await pool.request()
            .input('Id', sql.Int, Id)
            .query('Delete tbl_DatabaseMaster WHERE Id=@Id');

        if (result.rowsAffected[0] > 0) {
            return success(`Database Master  deleted successfully`);
        } else {
            return failed(`No Database found}`);
        }
    } catch (e) {
        return servError(e);
    }
});