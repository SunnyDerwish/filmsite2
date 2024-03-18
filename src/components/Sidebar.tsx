"use client"
import classNames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { faHome, faNewspaper, faUserFriends, faVideo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  { id: 1, label: "Home", icon: faHome, link: "/" },
  { id: 2, label: "Manage Posts", icon: faNewspaper, link: "/posts" },
  { id: 3, label: "Manage Users", icon: faUserFriends, link: "/users" },
  { id: 4, label: "Manage Tutorials", icon: faVideo, link: "/tutorials" },
];

const Sidebar = () => {
  const activeMenuId = 1; // For demonstration, assuming the first item is active. Adjust as needed.

  const wrapperClasses = "fixed top-0 left-0 h-screen w-80 px-4 pt-8 pb-4 bg-light flex justify-between flex-col";

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenuId === menu.id,
      }
    );
  };

  return (
    <div
      className={wrapperClasses}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center pl-1 gap-4">
          <FontAwesomeIcon icon={faHome} />
          <span className="mt-2 text-lg font-medium text-text">
            Logo
          </span>
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map((menu) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes} key={menu.id}>
                <a className="flex py-4 px-3 items-center w-full h-full" onClick={() => alert('Routing disabled')}>
                  <div style={{ width: "2.5rem" }}>
                    <FontAwesomeIcon icon={menu.icon} />
                  </div>
                  <span className="text-md font-medium text-text-light">
                    {menu.label}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className={getNavItemClasses({}) + " px-3 py-4"}>
        <div style={{ width: "2.5rem" }}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </div>
        <span className="text-md font-medium text-text-light">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
