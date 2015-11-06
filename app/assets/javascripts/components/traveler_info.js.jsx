var TravelerInfo = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    friends: React.PropTypes.array
  },

  getInitialState: function() {
    return this.counting(this.props.name);
  },

  onDestinationChanged: function(msg, data) {
    var newVisitedDestinationsCount = this.state.visitedDestinationsCount + (data ? 1 : -1);
    this.setState({ visitedDestinationsCount: newVisitedDestinationsCount });
  },

  onTravelerNameClicked: function(traveler) {
    PubSub.publish('travelerNameClicked', traveler);
  },

  onWishlistDestinationAdded: function() {
    var newtotalDestinationsCount = this.state.totalDestinationsCount + 1;
    this.setState({
      totalDestinationsCount: newtotalDestinationsCount
    });
  },

  onDestinationRemoved: function(msg, data) {
    var newVisitedDestinationsCount = this.state.visitedDestinationsCount - (data ? 1 : 0),
      newtotalDestinationsCount = this.state.totalDestinationsCount - 1;
    this.setState({
      visitedDestinationsCount: newVisitedDestinationsCount,
      totalDestinationsCount: newtotalDestinationsCount
    });
  },

  componentDidMount: function() {
    this.destinationChangedEventToken = PubSub.subscribe('destinationChanged', this.onDestinationChanged);
    this.wishlistDestinationAddedToken = PubSub.subscribe('wishlistDestinationAdded', this.onWishlistDestinationAdded);
    this.destinationRemovedToken = PubSub.subscribe('destinationRemoved', this.onDestinationRemoved);
  },

  componentWillUnmount: function() {
    PubSub.unsubscribe(this.destinationChangedEventToken);
    PubSub.unsubscribe(this.wishlistDestinationAddedToken);
    PubSub.unsubscribe(this.destinationRemovedToken);
  },

  counting: function(traveler) {
    var totalCount = 0,
      visitedCount = 0,
      friends = this.props.friends;

    for(i = 0; i < friends.length; i++) {
      if (friends[i]['name'] == traveler) {
        totalCount = friends[i]['destinations'].length;

        friends[i]['destinations'].forEach(function(destination) {
          visitedCount += destination['visited'] ? 1 : 0;
        });

        break;
      }
    }

    return {
      totalDestinationsCount: totalCount,
      visitedDestinationsCount: visitedCount
    };
  },

  render: function() {
    var name = this.props.name,
      onTravelerNameClicked = this.onTravelerNameClicked;
    return (
      <div className='traveler-info'>
        <TravelerName name={this.props.name} callbackTravelerInfo={onTravelerNameClicked} isThatYou={true} />
        <DestinationsStatistics visitedDestinationsCount={this.state.visitedDestinationsCount} totalDestinationsCount={this.state.totalDestinationsCount} />
        <div className='separator'></div>
        <div className='friends'>
          {this.props.friends.map(function(friend, i) {
            return (
              friend['name'] != name && <TravelerName name={friend['name']} key={i} callbackTravelerInfo={onTravelerNameClicked} isThatYou={false} />
            );
          })}
        </div>
      </div>
    );
  }
});
