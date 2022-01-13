import React from 'react';
import PropTypes from 'prop-types';
import { LineChart } from 'react-chartkick';
import { ExpansionList, ExpansionPanel } from '@react-md/expansion-panel';
import { usePanels } from 'react-md';

import 'chartkick/chart.js';
import './styles.scss';
import ContentCard from '../ContentCard';

const TrafficGraphs = ({ graphData }) => {
  const [panels] = usePanels({
    idPrefix: 'simple-panels',
    count: graphData.length,
    defaultExpandedIndex: 0,
  });

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
    <ExpansionList>
      {graphData.map(({ name, data: { views, count, uniques } }, index) => (
        <ExpansionPanel
          {...panels[index]}
          header={name}
          key={name}
          style={{ marginBottom: 25 }}
        >
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
        </ExpansionPanel>
      ))}
    </ExpansionList>
  );
};

TrafficGraphs.propTypes = {
  graphData: PropTypes.node.isRequired,
};

export default TrafficGraphs;
