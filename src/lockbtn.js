import React, { Component } from 'react';

class Lockbtn extends Component {

  render() {

    var btnText = '&#128274;';
    var btnBgColor = {};
    if (this.props.view == 'items') { //viewing all items of a biz, not most recent item from each biz in category
      var btnBgColor = {backgroundColor:'rgb(190, 190, 190)'};
    }

    // Don't display lock swipe if 'goto top of feed' aka undefined itemsId
    var visibilityStyle = {display:'block'};
    if (typeof this.props.itemsId == 'undefined' || this.props.endOfFeedVisibility) {
      visibilityStyle = {display: 'none'};
    }


    return (
      <div key={this.props.view}>
        <div style={visibilityStyle} className="lockBtnCont">
          <button
            onClick={() => this.props.setView(this.props.view, this.props.itemsId)}
            className="lockBtn"
            style={btnBgColor}
            type="button" dangerouslySetInnerHTML={{__html:btnText}}></button>
        </div>
      </div>
    );
  }

}

export default Lockbtn;