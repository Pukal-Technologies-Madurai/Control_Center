import { withDB } from '@/lib/dbMiddleware';
import { sentData, success, failed, servError } from '@/app/api/responses';


const buildRoutesTree = (routes, parentId = null) => {
    return routes
        .filter(route => route.parent_id === parentId)
        .map(route => ({
            ...route,
            SubRoutes: buildRoutesTree(routes, route.id)
        }));
};



export const GET = withDB(async (req, pool) => {
    try {
        const menuData = await pool.request().query(`
            SELECT 
                m.*,
                COALESCE((
                    SELECT 
                        p.*
                    FROM
                        [dbo].[tbl_AppMenu] AS p
                    WHERE
                        p.id = m.parent_id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                ), '{}') AS ParantData
            FROM 
              [dbo].[tbl_AppMenu] AS m
        `);

      
        const result = menuData.recordset.map(data => ({
            ...data, 
            is_active: data.is_active ? 1 : 0, 
            ParantData: JSON.parse(data.ParantData || '{}') 
        }));

        if (result.length > 0) {
            const mainMenu = result.filter(menu => menu.menu_type === 1).sort((a, b) => a.display_order - b.display_order);
            const subMenu = result.filter(menu => menu.menu_type === 2).sort((a, b) => a.display_order - b.display_order);
            const childMenu = result.filter(menu => menu.menu_type === 3).sort((a, b) => a.display_order - b.display_order);
            const subRoutings = result
                .filter(menu => menu.menu_type === 0)
                .sort((a, b) => a.parent_id - b.parent_id);

            const menuStructure = mainMenu.map(main => ({
                ...main,
                SubMenu: subMenu
                    .filter(sub => sub.parent_id === main.id)
                    .map(sub => ({
                        ...sub,
                        ChildMenu: childMenu
                            .filter(child => child.parent_id === sub.id)
                            .map(child => ({
                                ...child,
                                SubRoutes: buildRoutesTree(subRoutings, child.id)
                            })),
                        SubRoutes: buildRoutesTree(subRoutings, sub.id)
                    })),
                SubRoutes: buildRoutesTree(subRoutings, main.id)
            }));

            return sentData(menuStructure);


        } else {
            return failed('Failed to get Data');
        }
    } catch (e) {
        return servError(e);
    }
});
