var TravelerName = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    callbackTravelerInfo: React.PropTypes.func,
    isThatYou: React.PropTypes.bool
  },

  getInitialState: function() {
    return {isClick: this.props.isThatYou};
  },

  onClick: function(e) {
    e.preventDefault();
    this.props.callbackTravelerInfo(this.props.name);
    $('.traveler-name').removeClass('clicked');
    var $element = $(ReactDOM.findDOMNode(this));
    $element.addClass('clicked');
  },

  onWishlistDestinationAdded: function() {
    if (this.props.isThatYou) {
      var $element = $(ReactDOM.findDOMNode(this));
      $('.traveler-name').removeClass('clicked');
      var $element = $(ReactDOM.findDOMNode(this));
      $element.addClass('clicked');
    }
  },

  componentDidMount: function() {
    this.wishlistDestinationAddedToken = PubSub.subscribe('wishlistDestinationAdded', this.onWishlistDestinationAdded);
  },

  componentWillUnmount: function() {
    PubSub.unsubscribe(this.wishlistDestinationAddedToken);
  },

  render: function() {
    var classes = 'traveler-name' + (this.state.isClick ? ' clicked' : '');
    return (
      <h1 className={classes} onClick={this.onClick}>{this.props.name + (this.props.isThatYou ? ' (You)' : '')}</h1>
    );
  }
});
