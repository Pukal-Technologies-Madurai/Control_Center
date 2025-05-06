import { withDB } from '@/lib/dbMiddleware';
import { sentData, success, failed,servError } from '@/app/api/responses'
import { randomString } from '@/app/components/functions'
import dotenv from 'dotenv';
dotenv.config();
export const GET = withDB(async (req, pool) => {
    const result = await pool.request().query(`
       SELECT 
           u.*,
           db.*,
           am.*,
            ut.Profile_Name AS UserTypeGet,
            c.Company_Name AS CompanyGet
        FROM tbl_Users AS u
        LEFT JOIN tbl_UserType AS ut
        ON ut.Profile_Id = u.UserTypeId
        LEFT JOIN tbl_Company AS c
        ON c.Global_Comp_Id = u.Company_Id
        LEFT JOIN tbl_DatabaseMaster AS db
        ON db.Id= u.Database_Id
        LEFT JOIN tbl_AppMaster As am
        ON am.App_Id =u.App_Id
        WHERE u.UDel_Flag = 0
        ORDER BY u.Company_Id`
    );
    return sentData(result.recordset);
});

export const POST = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        const { Company_Id, Name, Password, UserTypeId, UserName, Database_Id } = body;
      
        const Autheticate_Id = randomString(50);

      
        const checkUserCounts = await pool.request()
            .input('Company_Id', Company_Id)
            .query(`
                SELECT No_of_Users AS numbercount 
                FROM [dbo].[tbl_DatabaseMaster] 
                WHERE Company_Id = @Company_Id;
            `);

       
        const checkUserCounts1 = await pool.request()
            .input('Company_Id', Company_Id)
            .query(`
                SELECT COUNT(*) AS numbercount1 
                FROM [dbo].[tbl_Users] 
                WHERE Company_Id = @Company_Id;
            `);

       
        const numbercount = checkUserCounts.recordset[0]?.numbercount || 0;
        const numbercount1 = checkUserCounts1.recordset[0]?.numbercount1 || 0;

  
        if (numbercount1 >= numbercount) {
            return failed('User count exceeded');
        }
    
        // Check if user already exists
        const checkUserExistsResult = await pool.request()
            .input('UserName', UserName)
            .input('Company_Id', Company_Id)
            .query(`
                SELECT COUNT(*) AS userCount 
                FROM [dbo].[tbl_Users] 
                WHERE UserName = @UserName AND Company_Id = @Company_Id;
            `);
    
        if (checkUserExistsResult.recordset[0]?.userCount > 0) {
            return failed('User already exists');
        }

        // Generate Global_User_ID
        const globalUserIdResult = await pool.request()
            .query(`
                SELECT ISNULL(MAX(Global_User_Id), 0) + 1 AS NewGlobalUserId 
                FROM [dbo].[tbl_Users];
            `);
        const Global_User_ID = globalUserIdResult.recordset[0]?.NewGlobalUserId || 1;

        const localUserIdResult = await pool.request()
            .input('Company_Id', Company_Id)
            .query(`
                SELECT ISNULL(MAX(Local_User_ID), 0) + 1 AS NewLocalUserId 
                FROM [dbo].[tbl_Users] 
                WHERE Company_Id = @Company_Id;
            `);
        const Local_User_ID = localUserIdResult.recordset[0]?.NewLocalUserId || 1;

        const result = await pool.request()
            .input('Global_User_Id', Global_User_ID)
            .input('Local_User_ID', Local_User_ID)
            .input('Company_Id', Company_Id)
            .input('Name', Name)
            .input('Password', Password)
            .input('UserTypeId', UserTypeId)
            .input('UserName', UserName)
            .input('Database_Id', Database_Id)
            .input('UDel_Flag', 0)
            .input('Autheticate_Id', Autheticate_Id)
            .input('Created', new Date())
            .query(`
                INSERT INTO [dbo].[tbl_Users] (
                    Global_User_Id, Local_User_ID, Company_Id, Name, Password, 
                    UserTypeId, UserName, Database_Id, UDel_Flag, Autheticate_Id, Created
                ) VALUES (
                    @Global_User_Id, @Local_User_ID, @Company_Id, @Name, @Password, 
                    @UserTypeId, @UserName, @Database_Id, @UDel_Flag, @Autheticate_Id, @Created
                );
            `);

        if (result.rowsAffected[0] > 0) {
            return success('User Added');
        } else {
            return failed('Failed to create user');
        }

    } catch (e) {
        console.error("Server Error:", e);
        return servError(e);
    }
});



export const PUT = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        const { Global_User_ID,Local_User_ID,Company_Id, Name, UserTypeId, UserName, Database_Id } = body;
      
        
        const result = await pool.request()
        .input('Global_User_Id', Global_User_ID)
        .input('Local_User_ID', Local_User_ID)
        .input('Company_Id', Company_Id)
        .input('Name', Name)
        .input('UserTypeId', UserTypeId)
        .input('UserName', UserName)
        .input('Database_Id', Database_Id)
        .input('UDel_Flag', 0)
        .input('Updated', new Date())
            .query(`
                UPDATE tbl_Users 
                SET
                    Company_Id = @Company_Id,
                      Database_Id=@Database_Id,
                    Name = @Name,
                    UserTypeId = @UserTypeId,
                    UserName = @UserName,
                    Updated = @Updated
                WHERE
                    Global_User_ID = @Global_User_ID`
            );

        if (result.rowsAffected[0] > 0) {
            return success('Changes saved');
        } else {
            return failed('Failed to save changes')
        }

    } catch (e) {
        return servError(e);
    }
});


export const DELETE = withDB(async (req, pool) => {
    try {
        const body = await req.json();
        if (!body) return failed('No data received');

        const { Global_User_ID } = body;
        const result = await pool.request()
        .input('Global_User_ID', Global_User_ID)
        .query('DELETE tbl_Users WHERE Global_User_ID=@Global_User_ID');
     
         if (result.rowsAffected[0] > 0) {
            return success(`Users deleted successfully`);
        } else {
            return failed(`No Users found`);
        }
    } catch (e) {
        return servError(e);
    }
});