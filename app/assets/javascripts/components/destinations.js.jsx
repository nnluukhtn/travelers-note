var Destinations = React.createClass({
  propTypes: {
    travelers: React.PropTypes.array,
    currentTraveler: React.PropTypes.string,
    find_wishlist_city_path: React.PropTypes.string,
    update_destinations_path: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      viewedTraveler: this.props.currentTraveler,
      travelers: this.props.travelers
    };
  },

  onWishlistDestinationAdded: function(data) {
    var travelers = this.state.travelers, i = 0;
    for (; i < travelers.length; i++) {
      if (travelers[i]['name'] == this.props.currentTraveler) {
        travelers[i]['destinations'].push({
          'name': data['wishlistDestination'],
          'visited': false
        })
        break;
      }
    }

    this.setState({travelers: travelers});
    PubSub.publish('wishlistDestinationAdded');

    // Temporary turn off ajax feature since can not update list destination via server side. Let do in client side
    // $.ajax({
    //   url: data['url'],
    //   dataType: data['dataType'],
    //   type: data['type'],
    //   data: {'traveler': travelers[i]},
    //   success: function(data) {
    //     this.setState({travelers: travelers});
    //     PubSub.publish('wishlistDestinationAdded');
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error([status, err.toString()]);
    //   }.bind(this)
    // });
  },

  render: function() {
    var currentTraveler = this.props.currentTraveler;
    var viewedTraveler = this.state.viewedTraveler;
    return (
      <div className='destinations'>
        <WishlistForm find_wishlist_city_path={this.props.find_wishlist_city_path} update_destinations_path={this.props.update_destinations_path} callbackDestinations={this.onWishlistDestinationAdded} />
        {this.state.travelers.map(function(traveler, i) {
          return (
            <TravelerDestinations destinations={traveler['destinations']} travelerName={traveler['name']} currentTraveler={currentTraveler} viewedTraveler={viewedTraveler} key={i} />
          );
        })}
      </div>
    );
  }
});
