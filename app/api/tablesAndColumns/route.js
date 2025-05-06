import { withDB } from '@/lib/dbMiddleware';
import { success, dataFound, noData, failed, servError, invalidInput, sentData, resp } from '@/app/api/responses';
import { checkIsNumber } from '@/app/components/functions';

const getDB = async (CompanyId, pool) => {
    try {

        if (!checkIsNumber(CompanyId)) {
            console.error('CompanyId is required');
            return { success: false, error: 'CompanyId is required' };
        }

        const companyDB = await pool.request()
            .input('Global_Comp_Id', CompanyId)
            .query(`
                    SELECT DB_Name
                    FROM tbl_Company
                    WHERE Global_Comp_Id = @Global_Comp_Id;`
            )

        const companyResult = companyDB.recordset;

        if (companyResult.length === 0) {
            console.error('Company data not found');
            return { success: false, error: 'Company data not found' };
        }

        const DBName = companyResult[0]?.DB_Name;

        const checkIsDBExist = await pool.request()
            .input('DBName', DBName)
            .query(`
                    SELECT CASE 
                    WHEN EXISTS (SELECT name FROM sys.databases WHERE name = @DBName) 
                    THEN 1 ELSE 0 END AS DatabaseExists`
            )

        const verifyDB = Number(checkIsDBExist.recordset[0]?.DatabaseExists) === 1;

        if (!verifyDB) {
            console.error('Company Database not found');
            return { success: false, error: 'Company Database not found' };
        }

        return { success: true, error: '', DBName: DBName };
    } catch (e) {
        console.error(e);
        return { success: false, error: e };
    }
}

export const GET = withDB(async (req, pool) => {
    try {
        const CompanyId = req.nextUrl.searchParams.get("CompanyId");

        if (!checkIsNumber(CompanyId)) return invalidInput('CompanyId is required')

        const companyDB = await getDB(CompanyId, pool);

        if (!companyDB.success) return failed(companyDB.error);

        const getTables = await pool.request()
        .input('dbname', companyDB.DBName)
        .query(`
            DECLARE @SQL NVARCHAR(MAX);
            SET @SQL = 'USE ' + QUOTENAME(@dbname) + ';
            SELECT name AS tableName FROM sys.tables;';
            EXEC sp_executesql @SQL;
        `);

        const result = getTables.recordset;

        return sentData(result)

    } catch (e) {
        servError(e)
    }
})