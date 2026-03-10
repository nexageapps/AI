import React from 'react';
import Cell from './Cell';
import './WumpusGrid.css';

const WumpusGrid = ({ worldState, agentPos, agentDir, visitedCells, hasGold }) => {
  const renderGrid = () => {
    const grid = [];
    for (let row = 4; row >= 1; row--) {
      const rowCells = [];
      for (let col = 1; col <= 4; col++) {
        const cellKey = Object.keys(worldState).find(
          key => worldState[key].row === row && worldState[key].col === col
        );
        const cellData = worldState[cellKey];
        const isAgent = agentPos.row === row && agentPos.col === col;
        const isVisited = visitedCells.has(`${row}-${col}`);
        
        rowCells.push(
          <Cell
            key={`${row}-${col}`}
            row={row}
            col={col}
            items={cellData?.items || []}
            isAgent={isAgent}
            agentDir={agentDir}
            isVisited={isVisited}
            hasGold={hasGold}
          />
        );
      }
      grid.push(
        <div key={row} className="grid-row">
          {rowCells}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="wumpus-grid">
      {renderGrid()}
    </div>
  );
};

export default WumpusGrid;
