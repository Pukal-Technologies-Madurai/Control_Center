import React, { useRef, useState, useEffect } from 'react';
import { isMobile } from "react-device-detect";


import { Navnew, Alert, NavLink, Link } from '.';
import { userService } from 'services';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

export { Homecontainer };

function Homecontainer({ props, children }) {
    const [user, setUser] = useState(null);
    const countvalue = useSelector(state => state.countvalue);
    const close = useSelector(state => state.close);
    const navRef = useRef(null);
    const dispatch = useDispatch()
    const userdata = props?.userdata;


    useEffect(() => {
        if (isMobile) {
            onToggleClick();
        }

        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    const onToggleClick = (e) => {
        // navRef.current.classList.toggle("sidebar-collapse");
        // setClose(!close);
        //    console.log("onToggleClick");
        dispatch({
            type: 'MASS',
            close: !close,
        });
    }


    // only show nav when logged in
    //if (!user) return null;

    return (
        <>

            <div className={close ? "sidebar-open sidebar-mini" : "sidebar-close sidebar-mini  sidebar-collapse"} style={{ height: "auto" }} ref={navRef}>
                <div className="wrapper">

                    <Navnew />




                    <div className="content-wrapper">

                      

                        {/*   Main content */}
                        <section className="content"  >

                            <div className="container-fluid">
                                <Alert />
                                {children}

                            </div>
                        </section>


                        {/*   Main content */}

                    </div>







                    <footer className="main-footer">
                        <strong>Copyright &copy; 2023 <a href="https://#/">HSI AUTO</a>.</strong>

                        <div className="float-right d-none d-sm-inline-block">
                            All rights reserved.
                        </div>
                    </footer>
                </div>




            </div>
        </>
    );
}