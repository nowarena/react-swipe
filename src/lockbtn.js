import React, { Component } from 'react';

class Lockbtn extends Component {

  render() {

    var btnText = 'Lock Swipe';
    if (this.props.view == 'items') {
      btnText = 'Back to All';
    }

    // Don't display lock swipe if 'info' is being viewed or 'goto top of feed' aka undefined itemsId
    var visibilityStyle = {display:'block'};
    if (typeof this.props.itemsId == 'undefined' || this.props.endOfFeedVisibility) {
      visibilityStyle = {display: 'none'};
    }

    return (
      <div key={this.props.view}>
        <div style={visibilityStyle} className="lockBtnCont">
          <button onClick={() => this.props.setView(this.props.view, this.props.itemsId)} className="lockBtn" type="button">{btnText}</button>
        </div>
      </div>
    );
  }

}

export default Lockbtn;