var DestinationsStatistics = React.createClass({

  propTypes: {
    visitedDestinationsCount: React.PropTypes.number,
    totalDestinationsCount: React.PropTypes.number
  },

  render: function() {
    return (
      <div className='count'>
        <span className='total'>Total: {this.props.totalDestinationsCount}, </span>
        <span className='visited'>Visited: {this.props.visitedDestinationsCount}</span>
      </div>
    );
  }
});
