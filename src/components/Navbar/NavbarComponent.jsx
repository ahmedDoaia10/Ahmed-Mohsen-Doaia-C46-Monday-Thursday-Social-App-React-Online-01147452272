import React, { useContext, useState } from "react";
import logo from "../../assets/auth/instagram-brands-solid-full.png";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Skeleton,
} from "@heroui/react";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiMessageFill } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { BiSolidBellRing } from "react-icons/bi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router";
import { TbMessageCircle } from "react-icons/tb";
import { LuUser } from "react-icons/lu";

const navItems = [
  {
    id: "feed",
    label: "Feed",
    icon: <GoHome className="text-xl" />,
    path: "/",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <LuUser className="text-xl" />,
    path: "/profile",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <TbMessageCircle className="text-xl" />,
    path: "/notifications",
  },
];

export default function NavbarComponent() {
  const { token, setToken, profileData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); 
  const [loading, setLoading] = useState(false);

 
 const active = navItems.find(item => item.path === location.pathname)?.id || null;

  function handleLogout() {
    localStorage.removeItem("User token");
    setToken(null);
  }

  function handleNavClick(item) {
    if (item.id === "feed") {
      setLoading(true);
      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 800);
    } else {
      navigate(item.path);
    }
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Navbar maxWidth="xl">
        <NavbarBrand as={Link} href="/">
          <img src={logo} alt="" className="w-8 rounded" />
          <p className="font-extrabold text-[20px] text-inherit pl-2">Social App</p>
        </NavbarBrand>

        <NavbarContent justify="center">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "oklch(98.4% .003 247.858)",
              borderRadius: "16px",
              padding: "6px 10px",
              border: "1px solid oklch(92.9% .013 255.508)",
            }}
          >
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    border: "none",
                    background: isActive ? "#ffffff" : "transparent",
                    boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
                    color: isActive ? "#1877f2" : "#45556c",
                    fontWeight: 800,
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {item.id === "feed" && loading ? (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid #d0d7e3",
                        borderTop: "2px solid #1877f2",
                        borderRadius: "50%",
                        animation: "spin 0.4s linear infinite",
                      }}
                    />
                  ) : (
                    item.icon
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "6px 14px 6px 6px",
                  borderRadius: "50px",
                  border: "1.5px solid #e2e5ea",
                  backgroundColor: "oklch(98.4% .003 247.858)",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(96.8% .007 247.896)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "oklch(98.4% .003 247.858)")}
              >
                {profileData?.photo ? (
                  <Avatar color="secondary" name={profileData?.name} size="sm" src={profileData?.photo} />
                ) : (
                  <Skeleton className="flex rounded-full w-8 h-8" />
                )}

                <span style={{ fontWeight: 600, fontSize: "14px", color: "#1c1e21", whiteSpace: "nowrap" }}>
                  {profileData?.name ?? <Skeleton className="w-20 h-4 rounded" />}
                </span>

                <RxHamburgerMenu style={{ fontSize: "18px", color: "#4a4f5a" }} />
              </button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile-info" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{profileData?.email}</p>
              </DropdownItem>

              <DropdownItem key="profile" startContent={<LuUser className="text-xl text-gray-500" />} onClick={() => navigate("/profile")}>
                Profile
              </DropdownItem>

              <DropdownItem key="settings" startContent={<IoSettingsOutline className="text-xl text-gray-500" />} onClick={() => navigate("/settings")}>
                Settings
              </DropdownItem>

              <DropdownItem key="logout" color="danger" startContent={<IoSettingsOutline className="text-xl" style={{ opacity: 0 }} />} onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
}