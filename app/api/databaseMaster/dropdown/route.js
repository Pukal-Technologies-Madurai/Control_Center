import { withDB } from '@/lib/dbMiddleware';
import { sentData, servError } from '@/app/api/responses';
import sql from 'mssql';

export const dynamic = "force-dynamic";

export const GET = withDB(async (req, pool) => {
    try {
       
        const result = await pool.request().query('SELECT Id, DatabaseName FROM tbl_DatabaseMaster');

        const dropdownData = result.recordset.map(company => ({
            value: company.Id,
            label: company.DatabaseName
        }));

        return sentData(dropdownData);
    } catch (e) {
        return servError(e);
    }
});
