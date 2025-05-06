import { withDB } from '@/lib/dbMiddleware';
import { sentData, servError } from '@/app/api/responses';
import sql from 'mssql';

export const dynamic = "force-dynamic";

export const GET = withDB(async (req, pool) => {
    try {
       
        const result = await pool.request().query('SELECT Global_Comp_Id, Company_Name FROM tbl_Company WHERE Del_Flag != 1');

        const dropdownData = result.recordset.map(company => ({
            value: company.Global_Comp_Id,
            label: company.Company_Name
        }));

        return sentData(dropdownData);
    } catch (e) {
        return servError(e);
    }
});
