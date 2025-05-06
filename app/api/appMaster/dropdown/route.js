import { withDB } from '@/lib/dbMiddleware';
import { sentData, servError } from '@/app/api/responses';
import sql from 'mssql';

export const dynamic = "force-dynamic";

export const GET = withDB(async (req, pool) => {
    try {
       
        const result = await pool.request().query('SELECT App_Id, App_Name FROM tbl_AppMaster ');

        const dropdownData = result.recordset.map(master => ({
            value: master.App_Id,
            label: master.App_Name
        }));

        return sentData(dropdownData);
    } catch (e) {
        return servError(e);
    }
});
