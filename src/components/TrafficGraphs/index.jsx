import React from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

import ContentPaper from '../ContentPaper';
import './styles.scss';

ReactChartkick.addAdapter(Chart);

const mapToGraph = data => {
  const countsData = {};
  const uniquesData = {};

  // eslint-disable-next-line no-restricted-syntax
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

const TrafficGraphs = ({ graphData }) => (
  <div>
    {graphData.map(data => (
      <ContentPaper key={data.name} style={{ marginBottom: 25 }}>
        <h2 className="repo-name">{data.name}</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            marginBottom: '2rem',
          }}
        >
          <div className="view-container">
            <strong className="view-number">{data.count}</strong>
            <span className="view-text">views</span>
          </div>
          <div className="view-container">
            <strong className="view-number">{data.uniques}</strong>
            <span className="view-text">unique visitors</span>
          </div>
        </div>
        <LineChart
          colors={['#FC1A20', '#333333']}
          curve={false}
          legend="bottom"
          data={mapToGraph(data.views)}
        />
      </ContentPaper>
    ))}
  </div>
);

TrafficGraphs.propTypes = {
  graphData: PropTypes.node.isRequired,
};

export default TrafficGraphs;
