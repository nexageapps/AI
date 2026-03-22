import React from 'react';
import { evaluate } from '../logic';
import { Icon } from '../iconMap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
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

  const trueCount = rows.filter(r => r.result).length;
  const falseCount = rows.length - trueCount;

  return (
    <div className="truth-table-container">
      <div className="table-header-bar">
        <h3 className="table-title">Truth Table</h3>
        <div className="table-stats">
          <span className="stat stat-true"><FaCheckCircle /> {trueCount} true</span>
          <span className="stat stat-false"><FaTimesCircle /> {falseCount} false</span>
        </div>
      </div>
      <p className="table-hint">The highlighted row matches your current toggles above</p>
      <div className="table-scroll">
        <table className="truth-table" role="table">
          <thead>
            <tr>
              {props.map(p => (
                <th key={p}>
                  <Icon emoji={getPropEmoji(p)} className="th-icon" size="0.85rem" />
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
                  <td className={`result-col result-cell ${row.result ? 'val-true' : 'val-false'}`}>
                    <span className="result-icon-inline">
                      {row.result ? <FaCheckCircle /> : <FaTimesCircle />}
                    </span>
                    {row.result ? 'T' : 'F'}
                  </td>
                  {equivalent && (
                    <td className={`result-col equiv-col result-cell ${equivResult ? 'val-true' : 'val-false'}`}>
                      <span className="result-icon-inline">
                        {equivResult ? <FaCheckCircle /> : <FaTimesCircle />}
                      </span>
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
          <FaCheckCircle style={{ marginRight: 6 }} />
          Notice: both columns are identical — the expressions are logically equivalent.
        </p>
      )}
    </div>
  );
}

export default TruthTable;
