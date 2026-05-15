import { useEffect, useState } from "react";
import "./contacts.css";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

useEffect(() => {
  fetch(`/api/admin/contacts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    },
  })
    .then(res => res.json())
    .then(setContacts);
}, []);

  return (
    <div className="contacts">
      <h2>Messages reçus</h2>

      {contacts.map(c => (
        <div className="contact-card" key={c._id}>
          <div className="contact-head">
            <strong>{c.nom}</strong>
            <span>{new Date(c.createdAt).toLocaleString()}</span>
          </div>
          <p><b>Email :</b> {c.email}</p>
          <p><b>Objet :</b> {c.objet}</p>
          <div className="message">{c.message}</div>
        </div>
      ))}
    </div>
  );
}
