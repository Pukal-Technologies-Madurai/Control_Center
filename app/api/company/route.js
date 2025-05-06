import { withDB } from '@/lib/dbMiddleware';
import { sentData, success, failed, servError } from '@/app/api/responses';

export const dynamic = "force-dynamic";
import sql from 'mssql';

export const GET = withDB(async (req, pool) => {
    try {

        const result = await pool.request().query('SELECT * FROM tbl_Company where Del_Flag !=1');

        return sentData(result.recordset);
    } catch (e) {
        return servError(e);
    }
});

export const POST = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const { Company_Code, Company_Name, Address, Company_Incharge, Mobile_No } = body;

        const getMaxData = await pool.request().query(`SELECT MAX(Global_Comp_Id) AS MaxId FROM tbl_Company`);
        const getId = getMaxData.recordset[0]?.MaxId || 0;
        const newId = getId + 1;

        const result = await pool.request()
            .input('Global_Comp_Id', sql.BigInt, newId)
            .input('Company_Code', sql.VarChar, Company_Code)
            .input('Company_Name', sql.VarChar, Company_Name)
            .input('Address', sql.VarChar, Address)
            .input('Company_Incharge', sql.VarChar, Company_Incharge)
            .input('Mobile_No', sql.VarChar, Mobile_No)
            .input('Del_Flag', sql.Int, 0)
            .query(`
                INSERT INTO tbl_Company (Global_Comp_Id,Company_Code, Company_Name, Address, Company_Incharge,Mobile_No,Del_Flag)
                VALUES (@Global_Comp_Id,@Company_Code, @Company_Name, @Address, @Company_Incharge, @Mobile_No,@Del_Flag);
            `);

        return result.rowsAffected[0] > 0 ? success('Company Added') : failed('Failed to create company');
    } catch (e) {
        return servError(e);
    }
});

export const PUT = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const { Company_Code, Company_Name, Address, Company_Incharge, Global_Comp_Id, Mobile_No } = body;

        const result = await pool.request()
            .input('Global_Comp_Id', sql.Int, Global_Comp_Id)
            .input('Company_Code', sql.VarChar, Company_Code)
            .input('Company_Name', sql.VarChar, Company_Name)
            .input('Address', sql.VarChar, Address)
            .input('Company_Incharge', sql.VarChar, Company_Incharge)
            .input('Mobile_No', sql.VarChar, Mobile_No)
            .input('updated', sql.DateTime, new Date())
            .query(`
                UPDATE tbl_Company
                SET Company_Code = @Company_Code, 
                    Company_Name = @Company_Name, 
                    Address = @Address, 
                    Company_Incharge = @Company_Incharge,
                     Mobile_No = @Mobile_No,
                     updated=@updated
                WHERE Global_Comp_Id = @Global_Comp_Id;
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

        const { Global_Comp_Id } = body;
        const result = await pool.request()
            .input('Global_Comp_Id', sql.Int, Global_Comp_Id)
            .query('UPDATE tbl_Company set Del_Flag=1 WHERE Global_Comp_Id=@Global_Comp_Id');

        if (result.rowsAffected[0] > 0) {
            return success(`Company with ID ${Global_Comp_Id} deleted successfully`);
        } else {
            return failed(`No company found with ID ${Global_Comp_Id}`);
        }
    } catch (e) {
        return servError(e);
    }
});