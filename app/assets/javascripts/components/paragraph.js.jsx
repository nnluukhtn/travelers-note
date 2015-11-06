var Paragraph = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    text: React.PropTypes.string,
    class: React.PropTypes.string
  },

  render: function() {
    return (
      <p id={this.props.id} className={this.props.class}>{this.props.text}</p>
    );
  }
});
