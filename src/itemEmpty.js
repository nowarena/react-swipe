import React, { Component } from 'react';

class ItemEmpty extends Component {

  render() {

    var endOfFeedVisibilityStyle={display: 'none'};
    if (this.props.endOfFeedVisibility == true) {
      endOfFeedVisibilityStyle={display: 'block'};
    }

    return (
      <div>
        <div className="item" style={endOfFeedVisibilityStyle}><div className="itemCont"><div className="itemHeader"> &nbsp; </div><div className="itemBody"><div className="itemTextContEmpty">End of feed.<br /><br /><button className="navButton" type="button" onClick={() => this.props.gotoTop()}>Return to Top of Feed</button></div></div></div></div>
      </div>
    );
  }

}

export default ItemEmpty;