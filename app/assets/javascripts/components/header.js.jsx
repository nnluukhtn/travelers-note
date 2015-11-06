var Header = React.createClass({
  propTypes: {
    travelerName: React.PropTypes.string,
    logout_path: React.PropTypes.string
  },

  render: function() {
    return (
      <div className='header'>
        <a href='/' className='logo-link'>
          <h1 className='header-logo'>Travelers Note</h1>
        </a>
        <span className='user-info'>
          <span>Hey <b>{this.props.travelerName}</b>, </span>
          <a href={this.props.logout_path} className='logout'><span>Logout</span></a>
        </span>
      </div>
    );
  }
});
