import React from 'react';
import 'chartkick/chart.js';
import { LineChart } from 'react-chartkick';
import PropTypes from 'prop-types';

import ContentCard from '../ContentCard';
import './styles.scss';

const TrafficGraphs = ({ graphData }) => {
  const mapToGraph = (data) => {
    const countsData = {};
    const uniquesData = {};

    for (const view of data) {
      const { timestamp, count, uniques } = view;
      countsData[timestamp] = count;
      uniquesData[timestamp] = uniques;
    }

    return [
      { name: 'Views', data: countsData },
      { name: 'Unique visitors', data: uniquesData },
    ];
  };

  return (
    <div>
      {graphData.map(({ name, data: { views, count, uniques } }) => (
        <details key={name} style={{ marginBottom: 25 }}>
          <summary>{name}</summary>
          <ContentCard>
            <h2 className="repo-name">{name}</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '50% 50%',
                marginBottom: '2rem',
              }}
            >
              <div className="view-container">
                <strong className="view-number">{count}</strong>
                <span className="view-text">views</span>
              </div>
              <div className="view-container">
                <strong className="view-number">{uniques}</strong>
                <span className="view-text">unique visitors</span>
              </div>
            </div>
            <LineChart
              colors={['#FC1A20', '#333333']}
              curve={false}
              legend="bottom"
              data={mapToGraph(views)}
            />
          </ContentCard>
        </details>
      ))}
    </div>
  );
};

TrafficGraphs.propTypes = {
  graphData: PropTypes.node.isRequired,
};

export default TrafficGraphs;
