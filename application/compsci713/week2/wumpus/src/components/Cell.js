import React from 'react';
import './Cell.css';

const Cell = ({ row, col, items, isAgent, agentDir, isVisited, hasGold, showAll }) => {
  const renderItem = (item) => {
    if (item === 'gold' && hasGold) {
      return null;
    }

    switch (item) {
      case 'wumpus':
        return <div className="item wumpus">👹</div>;
      case 'stench':
        return <div className="item stench">💨</div>;
      case 'pit':
        return <div className="item pit">🕳️</div>;
      case 'breeze':
        return <div className="item breeze">🌬️</div>;
      case 'gold':
        return <div className="item gold">🏆</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`cell ${!isVisited && !showAll ? 'unexplored' : ''} ${isAgent ? 'agent-cell' : ''}`}>
      <div className={`cell-content ${isAgent || ((isVisited || showAll) && items.length === 1) ? 'single-item' : ''}`}>
        {isAgent && (
          <div className="item agent">
            <div className="agent-icon">👤</div>
            <div className="agent-direction">{
              agentDir === 'up' ? '↑' :
              agentDir === 'down' ? '↓' :
              agentDir === 'left' ? '←' : '→'
            }</div>
          </div>
        )}
        {(isVisited || showAll) && items.map((item, index) => (
          <React.Fragment key={index}>
            {renderItem(item)}
          </React.Fragment>
        ))}
        {!isVisited && !isAgent && !showAll && (
          <div className="fog">?</div>
        )}
      </div>
      <div className="cell-coords">({col},{row})</div>
    </div>
  );
};

export default Cell;
