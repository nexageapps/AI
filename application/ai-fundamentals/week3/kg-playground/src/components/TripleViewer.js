import React from 'react';
import './TripleViewer.css';

/**
 * TripleViewer – displays extracted RDF triples in a table.
 * Props:
 *   triples  – array of { subject, predicate, object }
 *   conflicts – array of conflict strings
 */
export default function TripleViewer({ triples, conflicts }) {
  return (
    <div className="triple-viewer-card">
      <h2 className="section-title">RDF Triples</h2>

      {triples.length === 0 ? (
        <p className="empty-msg">No triples yet. Enter some text above and click Generate.</p>
      ) : (
        <>
          <table className="triple-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Predicate</th>
                <th>Object</th>
              </tr>
            </thead>
            <tbody>
              {triples.map((t, i) => (
                <tr key={i}>
                  <td className="subject">{t.subject}</td>
                  <td className="predicate">{t.predicate}</td>
                  <td className="object">{t.object}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="triple-count">{triples.length} triple{triples.length !== 1 ? 's' : ''} extracted</p>
        </>
      )}

      {/* Conflict warnings */}
      {conflicts.length > 0 && (
        <div className="conflicts">
          {conflicts.map((c, i) => (
            <div key={i} className="conflict-item">{c}</div>
          ))}
        </div>
      )}
    </div>
  );
}
