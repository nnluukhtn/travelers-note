var Button = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    text: React.PropTypes.string,
    class: React.PropTypes.string,
    type: React.PropTypes.string
  },

  render: function() {
    return (
      <button id={this.props.id} className={this.props.class} type={this.props.type}>{this.props.text}</button>
    );
  }
});
