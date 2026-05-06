import React, { useEffect, useState } from "react";
import "./newsletter.css";

export default function Newsletter() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
  `${process.env.REACT_APP_API_URL}/api/newsletter`,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

        if (!response.ok) {
          throw new Error("Impossible de charger les emails");
        }

        const data = await response.json();
        setEmails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) return <p className="admin-loading">Chargement...</p>;
  if (error) return <p className="admin-error">{error}</p>;

  return (
    <div className="newsletter-admin">
      <h2>📧 Abonnés à la infolettre</h2>

      {emails.length === 0 ? (
        <p>Aucun email inscrit</p>
      ) : (
        <table className="newsletter-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Date d’inscription</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item) => (
              <tr key={item._id}>
                <td>{item.email}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}