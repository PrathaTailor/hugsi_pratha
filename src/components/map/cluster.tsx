// https://github.com/uber/react-map-gl/issues/507
import React, { Children, PureComponent, createElement } from 'react';
import Supercluster, { ClusterFeature, PointFeature } from 'supercluster';
import { point } from '@turf/helpers';
import { Marker } from 'react-map-gl';

const childrenKeys = children =>
  Children.toArray(children).map(child => child.key);

const shallowCompareChildren = (prevChildren, newChildren) => {
  if (Children.count(prevChildren) !== Children.count(newChildren)) {
    return false;
  }
  const prevKeys = childrenKeys(prevChildren);
  const newKeys = new Set(childrenKeys(newChildren));
  return (
    prevKeys.length === newKeys.size && prevKeys.every(key => newKeys.has(key))
  );
};

interface Props {
  /** Mapbox map object */
  map: any;
  /** Minimum zoom level at which clusters are generated */
  minZoom?: number;
  /** Maximum zoom level at which clusters are generated */
  maxZoom?: number;
  /** Cluster radius, in pixels */
  radius?: number;
  /** (Tiles) Tile extent. Radius is calculated relative to this value */
  extent?: number;
  /** Size of the KD-tree leaf node. Affects performance */
  nodeSize?: number;
  /** Markers as children */
  children: React.ReactNode;
  /** ReactDOM element to use as a marker */
  element(clusterProps): any;
  /**
   * Callback that is called with the Supercluster instance as an argument
   * after componentDidMount
   */
  innerRef?(): void;
}

interface State {
  clusters: (ClusterFeature<any> | PointFeature<any>)[];
}

/**
 * Class component Cluster
 * @author Johan Gustafsson
 */
class Cluster extends PureComponent<Props, State> {
  static defaultProps = {
    minZoom: 0,
    maxZoom: 16,
    radius: 40,
    extent: 512,
    nodeSize: 64,
  };

  state = {
    clusters: [],
  };

  superCluster: Supercluster;

  componentDidMount() {
    this.createCluster(this.props);
    this.recalculate();

    this.props.map.on('moveend', this.recalculate);
  }

  componentWillReceiveProps(newProps) {
    const shouldUpdate =
      newProps.minZoom !== this.props.minZoom ||
      newProps.maxZoom !== this.props.maxZoom ||
      newProps.radius !== this.props.radius ||
      newProps.extent !== this.props.extent ||
      newProps.nodeSize !== this.props.nodeSize ||
      !shallowCompareChildren(this.props.children, newProps.children);

    if (shouldUpdate) {
      this.createCluster(newProps);
      this.recalculate();
    }
  }

  createCluster = props => {
    const {
      minZoom,
      maxZoom,
      radius,
      extent,
      nodeSize,
      children,
      innerRef,
    } = props;

    this.superCluster = null;
    delete this.superCluster;

    this.superCluster = new Supercluster({
      minZoom,
      maxZoom,
      radius,
      extent,
      nodeSize,
    });

    const points = Children.map(children, child => {
      return child
        ? point([child.props.longitude, child.props.latitude], child)
        : null;
    });

    this.superCluster.load(points);
    if (innerRef) innerRef(this.superCluster);
  }

  recalculate = () => {
    const zoom = this.props.map.getZoom();
    const bounds = this.props.map.getBounds().toArray();
    const bbox = bounds[0].concat(bounds[1]);

    const clusters = this.superCluster.getClusters(bbox, Math.floor(zoom));
    this.setState(() => ({ clusters }));
  }

  render() {
    return this.state.clusters.map(cluster => {
      if (cluster.properties.cluster) {
        const [longitude, latitude] = cluster.geometry.coordinates;
        return createElement(Marker, {
          longitude,
          latitude,
          // TODO size
          offsetLeft: -28 / 2,
          offsetTop: -28,

          // @ts-ignore
          children: createElement(this.props.element, {
            cluster,
            superCluster: this.superCluster,
          }),
          key: `cluster-${cluster.properties.cluster_id}`,
        });
      }
      const { type, key, props } = cluster.properties;
      return createElement(type, { key, ...props });
    });
  }
}

export default Cluster;
