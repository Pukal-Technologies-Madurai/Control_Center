import { withDB } from '@/lib/dbMiddleware';
import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';
export const POST = withDB(async (req, pool) => {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    try {
      const query = `
          SELECT
            u.UserTypeId,
            u.Global_User_ID AS UserId,
            u.UserName,
            u.Password,
            u.Name,
            u.Autheticate_Id,
            u.Company_id,
            c.Company_Name
          FROM tbl_Users AS u
         
          LEFT JOIN tbl_Company AS c ON c.Global_Comp_Id = u.Company_Id
           WHERE LOWER(u.UserName) = LOWER(@UserName) 
            AND u.Password = @Password  AND UDel_Flag = 0`;

      // Create a new request from the pool
      const loginReq = pool.request();
      loginReq.input("UserName", sql.VarChar, username.trim());
      loginReq.input('Password', sql.NVarChar, password);
      const loginResult = await loginReq.query(query);



      const userInfo = loginResult.recordset[0];

      const storedHashedPassword = userInfo.Password;

      if (password !== storedHashedPassword) {
        return failed(' username or password');
      }

      const ssid = `${Math.floor(100000 + Math.random() * 900000)}${new Date().toISOString()}`;


      try {
        const sessionSP = new sql.Request()

          .input("Id", sql.Int, 0)
          .input("UserId", sql.Int, userInfo.UserId)
          .input("SessionId", sql.VarChar, ssid)
          .input("LogStatus", sql.Int, 1)
          .input("APP_Type", sql.Int, 1)
        // .execute("UserLogSP");
        // await sessionSP;
      } catch (err) {
        console.error("Error while creating login session: ", err);

        return NextResponse.json(
          { success: false, message: "Failed to create session" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
          data: {
            user: userInfo,
            sessionInfo: {
              InTime: new Date(),
              SessionId: ssid,
              UserId: userInfo.UserId,
            },
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Database error:", error.message);
      throw error;
    }
  } catch (error) {

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "Unexpected server error" },
      { status: 500 }
    );
  }
});