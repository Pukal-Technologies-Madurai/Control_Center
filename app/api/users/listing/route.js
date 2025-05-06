import { withDB } from '@/lib/dbMiddleware';
import { sentData, success, failed, dataFound } from '@/app/api/responses';
import { randomString } from '@/app/components/functions';

export const GET = withDB(async (req, pool) => {
    try {
        const { searchParams } = new URL(req.url);
        const companyId = searchParams.get("companyId");

        if (!companyId) {
          
            return failed("CompanyId Not Found");
        }

      

        const result = await pool
            .request()
            .input("companyId", companyId)
                .query(`
             SELECT DISTINCT
    u.Global_User_ID,
    u.Local_User_ID,
    u.Company_Id,
    u.Name,
    u.UserName,
    u.Created,
    c.Company_Name AS CompanyGet,
    u.UserTypeId AS UserTypeId,
    ut.Profile_Name AS UserType,

      d.Id as Database_Id,
    d.DatabaseName AS Database_Name,
    a.App_Id as App_Id,
    a.App_Name AS App_Name,
    at.App_Type AS App_Type 

FROM 
    tbl_Users AS u
LEFT JOIN 
    tbl_Company AS c ON c.Global_Comp_Id = u.Company_Id
LEFT JOIN 
    tbl_UserType AS ut ON ut.Profile_Id = u.UserTypeId
LEFT JOIN 
    tbl_DatabaseMaster AS d ON d.Id = u.Database_Id  -- Correct join on Database_Id
LEFT JOIN 
    tbl_AppMaster AS a ON a.App_Id = d.App_Id  -- Join AppMaster to get App details
LEFT JOIN 
    tbl_AppType AS at ON at.Id = a.App_Type  -- Join AppType to get App Type details

           WHERE u.Company_Id = @companyId
           ORDER BY u.Company_Id
            `);

     
        return dataFound(result.recordset || []);
    } catch (e) {
        console.error("API Error:", e);
        return failed("Error", e);
    }
});
