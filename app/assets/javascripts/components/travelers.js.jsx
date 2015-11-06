var Travelers = React.createClass({
	propTypes: {
    travelers: React.PropTypes.array,
    currentTraveler: React.PropTypes.string,
    find_wishlist_city_path: React.PropTypes.string,
    update_destinations_path: React.PropTypes.string
  },

  render: function() {
    return (
      <div className='travelers'>
        <TravelerInfo name={this.props.currentTraveler} friends={this.props.travelers} />
        <Destinations travelers={this.props.travelers} currentTraveler={this.props.currentTraveler} find_wishlist_city_path={this.props.find_wishlist_city_path} update_destinations_path={this.props.update_destinations_path} />
      </div>
    );
  }
});
