import { withDB } from '@/lib/dbMiddleware';
import { sentData, success, failed, servError } from '@/app/api/responses';

export const dynamic = "force-dynamic";
import sql from 'mssql';

export const GET = withDB(async (req, pool) => {
    try {
      
        const result = await pool.request().query(`
                      SELECT mm.*,am.App_Name,am.App_Type FROM tbl_MenuMaster mm
                      LEFT JOIN tbl_AppMaster am ON am.App_Id= mm.App_Id`);
     
        return sentData(result.recordset);
    } catch (e) {
        return servError(e);
    }
});

export const POST = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');
       
        const {Database_Id,App_Id,MenuName,Parent_Id,Display_Order,RoutingURL,IsActive } = body;

        const getMaxData = await pool.request().query(`SELECT MAX(CAST(Id AS INT)) AS MaxId FROM tbl_MenuMaster`);

        const getId = getMaxData.recordset[0]?.MaxId || 0;
       
        const newId = getId + 1; 

        const result = await pool.request()
            .input('Id', sql.Int, newId)
            .input('Database_Id', sql.Int, Database_Id)
            .input('App_Id', sql.Int, App_Id)
            .input('MenuName', sql.VarChar, MenuName)
            .input('MenuType', sql.Int, 1)
            .input('Parent_Id', sql.Int, Parent_Id)
            .input('Display_Order', sql.Int, Display_Order)
            .input('RoutingURL', sql.NVarChar, RoutingURL)
            .input('IsActive', sql.Int, IsActive)
            .input('Created', new Date())
            .query(`
                INSERT INTO tbl_MenuMaster (Id,Database_Id,App_Id,MenuName,MenuType,Parent_Id,Display_Order,RoutingURL,IsActive)
                VALUES (@Id,@Database_Id,@App_Id,@MenuName,@MenuType,@Parent_Id,@Display_Order,@RoutingURL,@IsActive);
            `);

        return result.rowsAffected[0] > 0 ? success('MenuMaster Added') : failed('Failed to MenuMaster');
    } catch (e) {
        return servError(e);
    }
});

export const PUT = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const {Id,Database_Id,App_Id,MenuName,MenuType,Parent_Id,Display_Order,RoutingURL,IsActive } = body;

        const result = await pool.request()
            .input('Id', sql.Int, Id)
           .input('Database_Id', sql.Int, Database_Id)
           .input('App_Id', sql.Int, App_Id)
           .input('MenuName', sql.VarChar, MenuName)
            .input('MenuType', sql.NVarChar, MenuType)
            .input('Parent_Id', sql.Int, Parent_Id)
            .input('Display_Order', sql.Int, Display_Order)
            .input('RoutingURL', sql.NVarChar, RoutingURL)
            .input('IsActive', sql.Int, IsActive)         
            .input('Modified', new Date())
            .query(`
                UPDATE tbl_MenuMaster
                SET Database_Id=@Database_Id, App_Id = @App_Id,MenuName=@MenuName,MenuType=@MenuType,Parent_Id=@Parent_Id,Display_Order=@Display_Order,RoutingURL=@RoutingURL,IsActive=@IsActive
                WHERE Id = @Id;
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

        const { Id } = body;
        const result = await pool.request()
        .input('Id', sql.Int, Id)
        .query('DELETE tbl_MenuMaster WHERE Id=@Id');
     
         if (result.rowsAffected[0] > 0) {
            return success(`MenuMaster deleted successfully`);
        } else {
            return failed(`No MenuMaster found`);
        }
    } catch (e) {
        return servError(e);
    }
});