import React from 'react';
import './Cell.css';

const Cell = ({ row, col, items, isAgent, agentDir, isVisited, hasGold }) => {
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
    // Don't show gold if agent has picked it up
    if (item === 'gold' && hasGold) {
      return null;
    }

    switch (item) {
      case 'wumpus':
        return <div className="item wumpus">👹<div className="label">Wumpus</div></div>;
      case 'stench':
        return <div className="item stench">💨<div className="label">stench</div></div>;
      case 'pit':
        return <div className="item pit">🕳️<div className="label">PIT</div></div>;
      case 'breeze':
        return <div className="item breeze">🌬️<div className="label">Breeze</div></div>;
      case 'gold':
        return <div className="item gold">🏆<div className="label">GOLD</div></div>;
      default:
        return null;
    }
  };

  return (
    <div className={`cell ${!isVisited ? 'unexplored' : ''} ${isAgent ? 'agent-cell' : ''}`}>
      <div className="cell-content">
        {isAgent && (
          <div className="item agent">
            <div className="agent-icon">{getAgentIcon()}</div>
            <div className="label">Agent</div>
          </div>
        )}
        {isVisited && items.map((item, index) => (
          <React.Fragment key={index}>
            {renderItem(item)}
          </React.Fragment>
        ))}
        {!isVisited && !isAgent && (
          <div className="fog">?</div>
        )}
      </div>
      <div className="cell-coords">({col},{row})</div>
    </div>
  );
};

export default Cell;
