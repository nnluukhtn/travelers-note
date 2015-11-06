var TravelerDestinations = React.createClass({
  propTypes: {
    destinations: React.PropTypes.array,
    travelerName: React.PropTypes.string,
    currentTraveler: React.PropTypes.string,
    isOwner: React.PropTypes.bool,
    isShowed: React.PropTypes.bool,
    viewedTraveler: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      isOwner: this.props.travelerName == this.props.currentTraveler,
      isShowed: this.props.travelerName == this.props.viewedTraveler,
      destinations: this.props.destinations
    };
  },

  onDestinationChanged: function(destinationStatus) {
    PubSub.publish('destinationChanged', destinationStatus);
  },

  onTravelerNameClicked: function(msg, data) {
    var $element = $(ReactDOM.findDOMNode(this));
    if (data == this.props.travelerName) {
      $element.addClass('show');
      $element.removeClass('hide');
    } else {
      $element.addClass('hide');
      $element.removeClass('show');
    }
  },

  onDestinationRemoved: function(destinationName) {
    var destinations = this.state.destinations,
      i = 0;
    for (; i < destinations.length; i++) {
      if (destinations[i]['name'] == destinationName) {
        break;
      }
    }
    destinations.splice(i, 1);

    this.setState({ destinations: destinations });
  },

  onWishlistDestinationAdded: function() {
    var $element = $(ReactDOM.findDOMNode(this));
    if (this.state.isOwner) {
      $element.addClass('show').removeClass('hide');
    } else {
      $element.addClass('hide').removeClass('show');
    }
  },

  componentDidMount: function() {
    this.travelerNameClickedEventToken = PubSub.subscribe('travelerNameClicked', this.onTravelerNameClicked);
    this.wishlistDestinationAddedToken = PubSub.subscribe('wishlistDestinationAdded', this.onWishlistDestinationAdded);
  },

  componentWillUnmount: function() {
    PubSub.unsubscribe(this.travelerNameClickedEventToken);
    PubSub.unsubscribe(this.wishlistDestinationAddedToken);
  },

  render: function() {
    var isOwner = this.state.isOwner,
      viewedTraveler = this.props.viewedTraveler,
      isShowed = this.state.isShowed,
      classes = 'list-container' + (isShowed ? ' show' : ' hide'),
      onDestinationChanged = this.onDestinationChanged,
      onDestinationRemoved = this.onDestinationRemoved;
    return (
      <ul className={classes}>
        {this.state.destinations.map(function(destination, i) {
          return (
            <Destination name={destination['name']} visited={destination['visited']} key={i} isOwner={isOwner} viewedTraveler={viewedTraveler} callbackTravelerDestinations={onDestinationChanged} callbackRemoveDestination={onDestinationRemoved} />
          );
        })}
      </ul>
    );
  }
});
