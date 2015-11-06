var Destination = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    visited: React.PropTypes.bool,
    isOwner: React.PropTypes.bool,
    callbackTravelerDestinations: React.PropTypes.func,
    callbackRemoveDestination: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      visited: this.props.visited
    };
  },

  toggleCheckBox: function(visited) {
    var $element = $(ReactDOM.findDOMNode(this));
    var $statusElement = $element.find('.list-check-field-input');
    $statusElement.prop('checked', visited);
  },

  toggleLabel: function(visited) {
    var $element = $(ReactDOM.findDOMNode(this));
    $element.find('.list-check-field').toggleClass('list-check-field-checked');
  },

  onLabelClick: function(e) {
    e.preventDefault();
    if (this.props.isOwner) {
      var visited = !this.state.visited;
      this.setState({visited: visited});
      this.toggleCheckBox(visited);
      this.props.callbackTravelerDestinations(visited);
    }
  },

  onCheckBoxClick: function(e) {
    if (this.props.isOwner) {
      var visited = !this.state.visited;
      this.setState({visited: visited});
      this.toggleLabel(visited);
      this.props.callbackTravelerDestinations(visited);
    }
    e.stopPropagation();
    return false;
  },

  onRemove: function(e) {
    e.preventDefault();
    this.props.callbackRemoveDestination(this.props.name);
    PubSub.publish('destinationRemoved', this.state.visited);
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({visited: newProps.visited});
  },

  render: function() {
    var visited = this.state.visited;
    var labelClasses = 'list-check-field' + (visited ? ' list-check-field-checked' : '');
    return (
      <li className='list-item'>
        <label className={labelClasses}>
          <Input type='checkbox' class='list-check-field-input' checked={visited} onClick={this.onCheckBoxClick} />
          <span className='list-check-field-label' onClick={this.onLabelClick}>{this.props.name}</span>
        </label>
        { this.props.isOwner && <span className='close' onClick={this.onRemove} >x</span> }
      </li>
    );
  }
});
