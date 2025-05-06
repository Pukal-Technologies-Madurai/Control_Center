import { withDB } from '@/lib/dbMiddleware';
import { resp } from '@/app/api/responses';

export const GET = withDB(async (req, pool) => {
    try {

        const company = (await pool.request().query(
            `SELECT COUNT(*) AS count FROM tbl_Company WHERE Del_Flag !=1`
        )).recordset[0].count;

  
        const users = (await pool.request().query(`
            SELECT COUNT(*) AS count 
            FROM tbl_Users
            WHERE UDel_Flag = 0;`
        )).recordset[0].count;

   
        const userType = (await pool.request().query(`
            SELECT COUNT(*) AS count 
            FROM tbl_UserType`
        )).recordset[0].count;


        const dbSizeQuery = await pool.request().query(`
            SELECT 
                SUM(size * 8 / 1024) AS total_db_size_mb 
            FROM sys.master_files 
            WHERE type = 0; -- 0 = Data files, 1 = Log files
        `);
        const totalDBSize = dbSizeQuery.recordset[0].total_db_size_mb || 0;
           
        const serverSpaceQuery = await pool.request().query(`
            SELECT 
                SUM(size * 8 / 1024) AS total_server_space_mb
            FROM sys.master_files;
        `);
        const totalServerSpace = serverSpaceQuery.recordset[0].total_server_space_mb || 0;

  
        return resp.sentData([{
            company, 
            users, 
            userType, 
            totalDBSize: `${totalDBSize} MB`, 
            totalServerSpace: `${totalServerSpace} MB`
        }]);
    } catch (e) {
        return resp.servError(e);
    }
});
