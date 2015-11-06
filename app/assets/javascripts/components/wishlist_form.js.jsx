var WishlistForm = React.createClass({
  propTypes: {
    find_wishlist_city_path: React.PropTypes.string,
    update_destinations_path: React.PropTypes.string,
    callbackDestinations: React.PropTypes.func
  },

  componentDidMount: function() {
    $(ReactDOM.findDOMNode(this)).find('input').autocomplete({
      serviceUrl: this.props.find_wishlist_city_path,
      paramName: 'q',
      minChars: 3 ,
      noCache : true,
      dataType: 'json',
      transformResult: function (response) {
        return {
          suggestions: $.map(response.suggestions, function (dataItem) {
            return { value: dataItem.value, data: dataItem.data };
          })
        };
      },
      onSelect: function (suggestion) {
        $(this).val(suggestion.data);
      },
      onSearchStart : function(){ $(this).addClass('working') },
      onSearchComplete : function(){ $(this).removeClass('working') },
      onSearchError: function(){ $(this).removeClass('working'); }
    });
  },

  onSubmit: function(e) {
    e.preventDefault();
    var $element = $(ReactDOM.findDOMNode(this)),
      inputValue = $element.find('input').val();
    if (inputValue) {
      this.props.callbackDestinations({
        'url': $element.attr('action'),
        'dataType': 'json',
        'type': $element.attr('method'),
        'wishlistDestination': inputValue
      });
    }

    return;
  },

  render: function() {
    return (
      <form onSubmit={this.onSubmit} action={this.props.update_destinations_path} method='post' >
        <Input type='text' placeholder='Enter your wishlist destination' />
        <Button type='submit' text='Add' />
      </form>
    );
  }
});
