import React from 'react';
import { evaluate } from '../logic';
import './TruthTable.css';

function TruthTable({ truthTable, expression, assignment, formulaStr, equivalent, equivalentFormula, propositions }) {
  const { props, rows } = truthTable;

  const isCurrentRow = (row) => {
    return props.every(p => (assignment[p] || false) === row.assignment[p]);
  };

  const getPropEmoji = (name) => {
    const p = propositions?.find(pr => pr.name === name);
    return p?.emoji || '';
  };

  return (
    <div className="truth-table-container">
      <h3 className="table-title">Truth Table</h3>
      <p className="table-hint">The highlighted row matches your current toggles above</p>
      <div className="table-scroll">
        <table className="truth-table" role="table">
          <thead>
            <tr>
              {props.map(p => (
                <th key={p}>
                  <span className="th-emoji">{getPropEmoji(p)}</span>
                  <span>{p}</span>
                </th>
              ))}
              <th className="result-col">
                <span className="th-result">{formulaStr}</span>
              </th>
              {equivalent && (
                <th className="result-col equiv-col">
                  <span className="th-result">{equivalentFormula}</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const highlighted = isCurrentRow(row);
              const equivResult = equivalent ? evaluate(equivalent, row.assignment) : null;
              return (
                <tr key={i} className={highlighted ? 'highlighted' : ''}>
                  {props.map(p => (
                    <td key={p} className={row.assignment[p] ? 'val-true' : 'val-false'}>
                      {row.assignment[p] ? 'T' : 'F'}
                    </td>
                  ))}
                  <td className={`result-col ${row.result ? 'val-true' : 'val-false'}`}>
                    {row.result ? 'T' : 'F'}
                  </td>
                  {equivalent && (
                    <td className={`result-col equiv-col ${equivResult ? 'val-true' : 'val-false'}`}>
                      {equivResult ? 'T' : 'F'}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {equivalent && (
        <p className="equiv-note">
          Notice: both columns are identical — the expressions are logically equivalent.
        </p>
      )}
    </div>
  );
}

export default TruthTable;
