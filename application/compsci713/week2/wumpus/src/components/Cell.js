import React from 'react';
import './Cell.css';

const Cell = ({ row, col, items, isAgent, agentDir, isVisited, hasGold, showAll }) => {
  const getAgentIcon = () => {
    switch (agentDir) {
      case 'right':
        return '→';
      case 'up':
        return '↑';
      case 'left':
        return '←';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

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
      <div className="cell-content">
        {isAgent && (
          <div className="item agent">
            <div className="agent-icon">{getAgentIcon()}</div>
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
