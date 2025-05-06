import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NavLink, Link } from '.';
import { userService } from 'services';
import { useDispatch, useSelector } from 'react-redux'
import getConfig from 'next/config'
import { masterService } from 'services/master.Service';
import Image from 'next/image';
const { publicRuntimeConfig } = getConfig();

export { Navnew };

function Navnew() {
    const { pathname } = useRouter();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch()
    const [firstName, setFirstname] = useState(publicRuntimeConfig.getUser);
    const [designation_id, setdesignationID] = useState(publicRuntimeConfig.getUser);
    const [role_id, setrole_id] = useState(publicRuntimeConfig.getUser);
    const [designationName, setdesignationName] = useState(publicRuntimeConfig.getUser);
    const [uType, setuType] = useState(publicRuntimeConfig.getUser);



    const uid = useSelector(state => state.uid);
    const roleid = useSelector(state => state.roleid);
    const rolename = useSelector(state => state.rolename);
    const users_type_id = useSelector(state => state.users_type_id);
    const utype = useSelector(state => state.utype);


    useEffect(() => {

        const subscription = userService.user.subscribe(x => {
            // console.log('x-----:', x)
            if (x != null) {
                setUser(x),
                    setFirstname(x.name)
                setdesignationID(x.designation_id)
                setrole_id(x.roleid)
                // console.log("roleId:...", x.roleid)
                setdesignationName(x.designation)
                setuType(x.utype);

                dispatch({
                    type: 'USERDATA',
                    roleid: x.roleid,
                    rolename: x.rolename,
                    users_type_id: x.users_type_id,
                    utype: x.utype,
                    uid: x.id,
                    userValue: x
                });

            }

        });



        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    const navRef = useRef(null);
    //  const [close, setClose] = useState(true);
    const close = useSelector(state => state.close);


    const onToggleClick = (e) => {
        // navRef.current.classList.toggle("sidebar-collapse");
        // setClose(!close);
        // console.log("onToggleClick");
        dispatch({
            type: 'MASS',
            close: !close,
        });
    }

    const userDetails = masterService.userValue;
    // console.log("userDetails:", userDetails);
    if (!userDetails) {
        // userService.logout();
    };


    // only show nav when logged in
    if (!user) return null;


    return (
        <>

            <nav className="main-header navbar navbar-expand navbar-white  ">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" onClick={onToggleClick} role="button"><i className="fas fa-bars"></i></a>
                    </li>

                    {/* <li className="nav-item d-none d-sm-inline-block">
                        <Link href="/employees/myprofile" className="nav-link">My Profile </Link>
                    </li> */}

                </ul>
                <ul className="navbar-nav ml-auto">
                    {/* <li className="nav-item">  <a className="nav-link" data-widget="fullscreen1" onClick={logout} role="button"> <i className="fas fa-sign-out-alt  fa-lg dark-clr"></i>     </a>      </li> */}
                    <div style={{ position: "relative" }}>
                        <div className='clsx-profile-container ' data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="/img_avatar.png" alt="profile" />
                            <div className='clsx-profile-items'>
                                <h6 className='m-0 dropdown-toggle' >{user.name.charAt(0).toUpperCase() + user.name.slice(1,)}</h6>
                                <p className='m-0'>{user.designation.charAt(0).toUpperCase() + user.designation.slice(1,)}</p>
                            </div>
                        </div>
                        <ul className="dropdown-menu clsx-custom-dropdown-menu">
                            <li>
                                <Link className="dropdown-item" href="/profile">
                                    <i className='fas fa-user mr-2'></i>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" href="/changepassword">
                                    <i className="fas fa-unlock-alt mr-2"></i>
                                    Change Password
                                </Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <Link className="dropdown-item" href="/account/login" onClick={logout}>
                                    <i className="fas fa-sign-out-alt mr-2"></i>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </ul >
            </nav >



            <aside className="main-sidebar sidebar-dark-primary elevation-1">

                <a className="brand-link" onClick={onToggleClick}>

                    <img src="/v1.png" alt="V2 Logo" className="brand-image img-circle1 elevation-0" />
                    <span className="brand-text font-weight-light"><img src="/Hsiauto.png" alt="Vsquare Logo" style={{ maxHeight: "27px", width: "150px" }} /></span>
                    {/* <span className="brand-text font-weight-light">HSI AUTOMOBILES</span> */}
                </a>


                <div className="sidebar">

                    <div className="user-panel mt-36 pb-36 mb-36 d-flex">
                        <div className="image mt-2">

                            <img src="/avatar3.png" className="img-circle elevation-0" alt="User Image" />
                        </div>
                        <div className="info">
                            {firstName && <a href="#" className="d-block">{user.name.charAt(0).toUpperCase() + user.name.slice(1).substring(0, 20)}</a>}
                            <a href="#" className="d-block text-xs">{user.designation}</a>
                        </div>


                    </div>


                    <nav className="mt-2">

                        {user.displaytype == 3 &&
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                <li className={`nav-item `} >
                                    <Link href="/" className={`nav-link ${pathname === '/' ? "active" : ""}`} >
                                        <i className="nav-icon fas fa-home   fa-fw "></i>
                                        <p>Dashboard</p>
                                    </Link>
                                </li>

                                {/* <li className={`nav-item `} >
                                    <Link href="/profile" className={`nav-link ${pathname === '/profile' ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-user-circle"></i>
                                        <p>Profile</p>
                                    </Link>
                                </li> */}

                                <li className={`nav-item `} >
                                    <Link href="/usermaster" className={`nav-link ${pathname.includes('/usermaster') ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-user fa-fw "></i>
                                        <p>User Master</p>
                                    </Link>
                                </li>

                                <li className={`nav-item `} >
                                    <Link href="/linemaster" className={`nav-link ${pathname.includes('/linemaster') ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-traffic-light  fa-fw "></i>
                                        <p>Line Master</p>
                                    </Link>
                                </li>

                                <li className={`nav-item `} >
                                    <Link href="/suppliermaster" className={`nav-link ${pathname.includes('/suppliermaster') ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-child"></i>
                                        <p>Supplier Master</p>
                                    </Link>
                                </li>


                                <li className={`nav-item `} >
                                    <Link href="/mothermaster" className={`nav-link ${pathname.includes('/mothermaster') ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-box-open"></i>
                                        <p>Mother Master</p>
                                    </Link>
                                </li>
                                <li className={`nav-item `} >
                                    <Link href="/childmaster" className={`nav-link ${pathname.includes('/childmaster') ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-network-wired"></i>
                                        <p>Part Master</p>
                                    </Link>
                                </li>

                                {/* <li className={`nav-item `} >
                                <Link href="/process" className={`nav-link ${pathname === '/proccess' ? "active" : ""}`}>
                                    <i className="nav-icon fas fa-database"></i>
                                    <p>Proccess</p>
                                </Link>
                            </li> */}


                                <li className={`nav-item `} >
                                    <Link href="/processone" className={`nav-link ${pathname === '/processone' ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-database"></i>
                                        <p>Proccess [1D]</p>
                                    </Link>
                                </li>

                                {/* <li className={`nav-item `} >
                                    <Link href="/proccesstest" className={`nav-link ${pathname === '/proccesstest' ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-database"></i>
                                        <p>Proccess test [2D]</p>
                                    </Link>
                                </li> */}

                                <li className={`nav-item `} >
                                    <Link href="/dispatch" className={`nav-link ${pathname.includes('/dispatch') ? "active" : ""}`}>
                                        <i className="fas fa-truck-loading nav-icon"></i>
                                        <p>Dispatch</p>
                                    </Link>
                                </li>

                                <li className={`nav-item `} >
                                    <Link href="/reports" className={`nav-link ${pathname.includes('/reports') ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-regular fa-file"></i>
                                        <p>Reports</p>
                                    </Link>
                                </li>

                                {/* <li className={`nav-item `} >
                                    <Link href="/recentproduction" className={`nav-link ${pathname === '/recentproduction' ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-solid fa-wrench"></i>
                                        <p>Recent Production</p>
                                    </Link>
                                </li> */}

                                <li className="nav-item">
                                    <a onClick={logout} className="nav-link">
                                        <i className="nav-icon fas fa-sign-out-alt   fa-fw "></i>
                                        <p>Logout</p>
                                    </a>
                                </li>

                            </ul>}

                        {user.displaytype == 1 &&
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                <li className={`nav-item `} >
                                    <Link href="/" className={`nav-link ${pathname == "/" ? "active" : ""}`} >
                                        <i className="nav-icon fas fa-home   fa-fw "></i>
                                        <p>Dashboard</p>
                                    </Link>
                                </li>

                                {/* <li className={`nav-item `} >
                                    <Link href="/profile" className={`nav-link ${pathname.includes("/profile") ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-user-circle"></i>
                                        <p>Profile</p>
                                    </Link>
                                </li> */}

                                <li className={`nav-item `} >
                                    <Link href="/childmaster" className={`nav-link ${pathname.includes("/childmaster") ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-network-wired"></i>
                                        <p>Part Master</p>
                                    </Link>
                                </li>

                                <li className={`nav-item `} >
                                    <Link href="/processnew" className={`nav-link ${pathname.includes("/processnew") ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-database"></i>
                                        <p>Proccess [1D]</p>
                                    </Link>
                                </li>

                                <li className={`nav-item `} >
                                    <Link href="/reports?section=production" className={`nav-link ${pathname.includes("/reports") ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-regular fa-file"></i>
                                        <p>Reports</p>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <a onClick={logout} className="nav-link">
                                        <i className="nav-icon fas fa-sign-out-alt   fa-fw "></i>
                                        <p>Logout</p>
                                    </a>
                                </li>

                            </ul>}


                        {user.displaytype == 2 &&
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


                                <li className={`nav-item `} >
                                    <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`} >
                                        <i className="nav-icon fas fa-home   fa-fw "></i>
                                        <p>Dashboard</p>
                                    </Link>
                                </li>

                                {/* <li className={`nav-item `} >
                                    <Link href="/profile" className={`nav-link ${pathname.includes("/profile") ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-user-circle"></i>
                                        <p>Profile</p>
                                    </Link>
                                </li> */}

                                <li className={`nav-item `} >
                                    <Link href="/childmaster" className={`nav-link ${pathname.includes("/childmaster") ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-network-wired"></i>
                                        <p>Part Master</p>
                                    </Link>
                                </li>

                                <li className={`nav-item `} >
                                    <Link href="/dispatch" className={`nav-link ${pathname.includes("/dispatch") ? "active" : ""}`}>
                                        <i className="fas fa-truck-loading nav-icon"></i>
                                        <p>Dispatch</p>
                                    </Link>
                                </li>

                                <li className={`nav-item `} >
                                    <Link href="/reports?section=dispacth" className={`nav-link ${pathname.includes("/reports") ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-regular fa-file"></i>
                                        <p>Reports</p>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <a onClick={logout} className="nav-link">
                                        <i className="nav-icon fas fa-sign-out-alt   fa-fw "></i>
                                        <p>Logout</p>
                                    </a>
                                </li>


                            </ul>}


                        {user.displaytype == 4 &&
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                <li className={`nav-item `} >
                                    <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`} >
                                        <i className="nav-icon fas fa-home   fa-fw "></i>
                                        <p>Dashboard</p>
                                    </Link>
                                </li>

                                {/* <li className={`nav-item `} >
                                    <Link href="/profile" className={`nav-link ${pathname.includes("/profile") ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-user-circle"></i>
                                        <p>Profile</p>
                                    </Link>
                                </li> */}

                                <li className={`nav-item `} >
                                    <Link href="/dispatch" className={`nav-link ${pathname.includes("/dispatch") ? "active" : ""}`}>
                                        <i className="fas fa-truck-loading nav-icon"></i>
                                        <p>Dispatch</p>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <a onClick={logout} className="nav-link">
                                        <i className="nav-icon fas fa-sign-out-alt   fa-fw "></i>
                                        <p>Logout</p>
                                    </a>
                                </li>


                            </ul>}


                        {user.displaytype == 5 &&
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


                                <li className={`nav-item `} >
                                    <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`} >
                                        <i className="nav-icon fas fa-home   fa-fw "></i>
                                        <p>Dashboard</p>
                                    </Link>
                                </li>

                                {/* <li className={`nav-item `} >
                                    <Link href="/profile" className={`nav-link ${pathname.includes("/profile") ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-user-circle"></i>
                                        <p>Profile</p>
                                    </Link>
                                </li> */}

                                <li className={`nav-item `} >
                                    <Link href="/processnew" className={`nav-link ${pathname.includes("/processnew") ? "active" : ""}`}>
                                        <i className="nav-icon fas fa-database"></i>
                                        <p>Proccess [1D]</p>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <a onClick={logout} className="nav-link">
                                        <i className="nav-icon fas fa-sign-out-alt   fa-fw "></i>
                                        <p>Logout</p>
                                    </a>
                                </li>


                            </ul>}

                    </nav>

                </div>

            </aside>


        </>
    );
}