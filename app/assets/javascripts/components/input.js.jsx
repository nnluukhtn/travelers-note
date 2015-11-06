var Input = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    class: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    checked: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  render: function() {
    return (
      <input className={this.props.class} id={this.props.id} placeholder={this.props.placeholder} type={this.props.type} value={this.props.value} name={this.props.name} checked={this.props.checked} onChange={function(){}} onClick={this.props.onClick} />
    );
  }
});
