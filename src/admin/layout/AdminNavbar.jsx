import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth } from "../auth/authContext";

export default function AdminNavbar() {
  const { logout } = useAuth();

  return (
    <header className="admin-navbar">

      {/* LEFT ICONS */}
      <div className="admin-navbar-left">
        <button className="icon-btn" aria-label="Profil">
          <FiUser />
        </button>
        <button className="icon-btn" aria-label="Paramètres">
          <FiSettings />
        </button>
      </div>

      {/* TITLE */}
    

      {/* LOGOUT */}
      <button className="logout-btn navbar-logout" onClick={logout}>
        <FiLogOut />
        Déconnexion
      </button>

    </header>
  );
}