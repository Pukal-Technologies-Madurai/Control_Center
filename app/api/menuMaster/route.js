import { withDB } from '@/lib/dbMiddleware';
import { sentData, success, failed, servError } from '@/app/api/responses';
export const dynamic = "force-dynamic";
import sql from 'mssql';
import { isEqualNumber } from '@/app/components/functions'
import dotenv from 'dotenv';
dotenv.config();


const buildRoutesTree = (routes, parentId = null) => {
    return routes
        .filter(route => route.parent_id === parentId)
        .map(route => ({
            ...route,
            SubRoutes: buildRoutesTree(routes, route.id)
        }));
};
// export const GET = withDB(async (req, pool) => {
//     try {
      
//         const result = await pool.request().query(`
//                       SELECT mm.*,am.App_Name,am.App_Type FROM tbl_MenuMaster mm
//                       LEFT JOIN tbl_AppMaster am ON am.App_Id= mm.App_Id`);
     
//         return sentData(result.recordset);
//     } catch (e) {
//         return servError(e);
//     }
// });

// export const POST = withDB(async (req, pool) => {
//     try {
//         const body = await req.json();
//         if (!body) return failed('No data received');
       
//         const {Database_Id,App_Id,MenuName,MenuType,Parent_Id,Display_Order,RoutingURL,IsActive } = body;

//         const getMaxData = await pool.request().query(`SELECT MAX(CAST(Id AS INT)) AS MaxId FROM tbl_MenuMaster`);

//         const getId = getMaxData.recordset[0]?.MaxId || 0;
       
//         const newId = getId + 1; 

//         const result = await pool.request()
//             .input('Id', sql.Int, newId)
//             .input('Database_Id', sql.Int, Database_Id)
//             .input('App_Id', sql.Int, App_Id)
//             .input('MenuName', sql.VarChar, MenuName)
//             .input('MenuType', sql.NVarChar, MenuType)
//             .input('Parent_Id', sql.Int, Parent_Id)
//             .input('Display_Order', sql.Int, Display_Order)
//             .input('RoutingURL', sql.NVarChar, RoutingURL)
//             .input('IsActive', sql.Int, IsActive)
//             .input('Created', new Date())
//             .query(`
//                 INSERT INTO tbl_MenuMaster (Id,Database_Id,App_Id,MenuName,MenuType,Parent_Id,Display_Order,RoutingURL,IsActive)
//                 VALUES (@Id,@Database_Id,@App_Id,@MenuName,@MenuType,@Parent_Id,@Display_Order,@RoutingURL,@IsActive);
//             `);

//         return result.rowsAffected[0] > 0 ? success('MenuMaster Added') : failed('Failed to MenuMaster');
//     } catch (e) {
//         return servError(e);
//     }
// });

// export const PUT = withDB(async (req, pool) => {
//     try {
//         const body = await req.json();
//         if (!body) return failed('No data received');

//         const {Database_Id,App_Id,MenuName,MenuType,Parent_Id,Display_Order,RoutingURL,IsActive } = body;

//         const result = await pool.request()
//        .input('Id', sql.Int, Id)
//            .input('Database_Id', sql.Int, Database_Id)
//            .input('App_Id', sql.Int, App_Id)
//            .input('MenuName', sql.VarChar, MenuName)
//             .input('MenuType', sql.NVarChar, MenuType)
//             .input('Parent_Id', sql.Int, Parent_Id)
//             .input('Display_Order', sql.Int, Display_Order)
//             .input('RoutingURL', sql.NVarChar, RoutingURL)
//             .input('IsActive', sql.Int, IsActive)         
//             .input('Modified', new Date())
//             .query(`
//                 UPDATE tbl_MenuMaster
//                 SET Database_Id=@Database_Id, App_Id = @App_Id,MenuName=@MenuName,MenuType=@MenuType,Parent_Id=@Parent_Id,Display_Order=@Display_Order,RoutingURL=@RoutingURL,IsActive=@IsActive
//                 WHERE Id = @Id;
//             `);

//         return result.rowsAffected[0] > 0 ? success('Changes saved') : failed('Failed to save changes');
//     } catch (e) {
//         return servError(e);
//     }
// });


// export const DELETE = withDB(async (req, pool) => {
//     try {
//         const body = await req.json();
//         if (!body) return failed('No data received');

//         const { Id } = body;
//         const result = await pool.request()
//         .input('Id', sql.Int, Id)
//         .query('DELETE tbl_MenuMaster WHERE Id=@Id');
     
//          if (result.rowsAffected[0] > 0) {
//             return success(`MenuMaster deleted successfully`);
//         } else {
//             return failed(`No MenuMaster found`);
//         }
//     } catch (e) {
//         return servError(e);
//     }
// });




export const POST = withDB(async (req, pool) => {
  try {
    const body = await req.json();
    if (!body) return failed('No data received');

    const { name, menu_type, parent_id, url, display_order } = body;

    const result = await pool.request()
      .input('name', name)
      .input('menu_type', menu_type)
      .input('parent_id', parent_id || null)
      .input('url', url)
      .input('display_order', display_order)
      .input('is_active', 1)
      .query(`
        INSERT INTO tbl_AppMenu (
          name, menu_type, parent_id, url, display_order, is_active
        ) VALUES (
          @name, @menu_type, @parent_id, @url, @display_order, @is_active
        );
      `);

    return result.rowsAffected[0] > 0
      ? success('New Menu Added')
      : failed('Failed to save, try again');
  } catch (e) {
    return servError(e);
  }
});

export const PUT = withDB(async (req, pool) => {
  try {
    const body = await req.json();
    if (!body) return failed('No data received');

    const { id, name, menu_type, parent_id, url, display_order, is_active } = body;
    const activeState = isEqualNumber(is_active, 1) || is_active === true;

    const result = await pool.request()
      .input('id', id)
      .input('name', name)
      .input('menu_type', menu_type)
      .input('parent_id', parent_id || null)
      .input('url', url)
      .input('display_order', display_order)
      .input('is_active', activeState ? 1 : 0)
      .query(`
        UPDATE tbl_AppMenu
        SET
          name = @name,
          menu_type = @menu_type,
          parent_id = @parent_id,
          url = @url,
          display_order = @display_order,
          is_active = @is_active
        WHERE id = @id
      `);

    return result.rowsAffected[0] > 0
      ? success('Changes Saved')
      : failed('Failed to save, try again');
  } catch (e) {
    return servError(e);
  }
});

export const GET = withDB(async (req, pool) => {
  try {
    const menuData = await pool.request().query(`
      SELECT 
        m.*,
        COALESCE((
          SELECT p.*
          FROM tbl_AppMenu AS p
          WHERE p.id = m.parent_id
          FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ), '{}') AS ParantData
      FROM tbl_AppMenu AS m
    `);

    const result = menuData.recordset.map(data => ({
      ...data,
      is_active: data.is_active ? 1 : 0,
      ParantData: JSON.parse(data.ParantData),
    }));

    if (result.length === 0) return failed('No menu data found');

    const mainMenu = result
      .filter(menu => isEqualNumber(menu.menu_type, 1))
      .sort((a, b) => a.display_order - b.display_order);

    const subMenu = result
      .filter(menu => isEqualNumber(menu.menu_type, 2))
      .sort((a, b) => a.display_order - b.display_order);

    const childMenu = result
      .filter(menu => isEqualNumber(menu.menu_type, 3))
      .sort((a, b) => a.display_order - b.display_order);

    const subRoutings = result
      .filter(menu => isEqualNumber(menu.menu_type, 0))
      .sort((a, b) => a.parent_id - b.parent_id);

    const menuStructure = mainMenu.map(main => ({
      ...main,
      SubMenu: subMenu
        .filter(sub => isEqualNumber(sub.parent_id, main.id))
        .map(sub => ({
          ...sub,
          ChildMenu: childMenu
            .filter(child => isEqualNumber(child.parent_id, sub.id))
            .map(child => ({
              ...child,
              SubRoutes: buildRoutesTree(subRoutings, child.id),
            })),
          SubRoutes: buildRoutesTree(subRoutings, sub.id),
        })),
      SubRoutes: buildRoutesTree(subRoutings, main.id),
    }));

    return sentData(menuStructure);
  } catch (e) {
    return servError(e);
  }
});
