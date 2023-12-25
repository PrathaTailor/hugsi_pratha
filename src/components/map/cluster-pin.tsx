import React from 'react';
import { featureCollection } from '@turf/helpers';

interface Props {
  clusterProps: {
    cluster: any;
    supercluster: any
  };
  setBoundaries(boundares: any): void;
}

/**
 * Cluster Pin component
 * @param clusterProps - location
 * @param setBoundaries - function that set boundaries
 */
const ClusterPin: React.FC<Props> = ({ clusterProps, setBoundaries }) => {
  return (
    <div
      className="ClusterPin"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        const clusterChildren = clusterProps.supercluster.getChildren(
          clusterProps.cluster.id
        );
        setBoundaries(featureCollection(clusterChildren));
      }}
    >
      <i
        className="fas fa-map-marker-alt"
        style={{
          color: '#6D8C1B',
        }}
      />
      <span
        style={{
          color: '#6D8C1B',
          position: 'relative',
          bottom: '5px',
          fontWeight: 'bold',
          fontFamily: 'husqvarna',
        }}
      >
        {clusterProps.cluster.properties.point_count}
      </span>
    </div>
  );
};

export default ClusterPin;