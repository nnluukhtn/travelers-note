var Auth = React.createClass({
  propTypes: {
    travelers: React.PropTypes.array,
    authUrl: React.PropTypes.string,
    csrf_token: React.PropTypes.string
  },

  componentDidMount: function() {
    $(ReactDOM.findDOMNode(this)).find('#traveler-name').autocomplete({
      lookup: this.props.travelers
    });
  },

  render: function() {
    return (
      <div className='auth'>
        <Paragraph text='Who are you?' />
        <form action={this.props.authUrl} method='post'>
          <Input name='traveler_name' id='traveler-name' placeholder='Enter you name' type='text' />
          <Button id='start' type='submit' text='Start' />
          <Input name='authenticity_token' type='hidden' value={this.props.csrf_token} />
        </form>
      </div>
    );
  }
});
