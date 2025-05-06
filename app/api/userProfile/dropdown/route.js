import { withDB } from '@/lib/dbMiddleware';
import { sentData, servError } from '@/app/api/responses';
import sql from 'mssql';

export const dynamic = "force-dynamic";

export const GET = withDB(async (req, pool) => {
    try {
       
        const result = await pool.request().query('SELECT profile_Id as Id, Profile_Name as Name FROM tbl_UserType');

        const dropdownData = result.recordset.map(type => ({
            value: type.Id,
            label: type.Name
        }));

        return sentData(dropdownData);
    } catch (e) {
        return servError(e);
    }
});
