import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      <img
        src="/assets/Jetacomlogo2.png"
        alt="Jetacom"
        className="admin-logo"
      />

      <nav className="admin-nav">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/contacts">Contacts</NavLink>
        <NavLink to="/admin/newsletter">Abonnés à l’infolettre</NavLink>
      </nav>

    </aside>
  );
}