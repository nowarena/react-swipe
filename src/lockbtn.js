import React, { Component } from 'react';

class Lockbtn extends Component {

  render() {

    var btnText = 'Lock Swipe';
    if (this.props.view == 'items') {
      btnText = 'Swipe All';
    }

    var visibilityStyle = {display:'block'};
    if (typeof this.props.itemsId == 'undefined') {
      visibilityStyle = {display: 'none'};
    }
console.log("Lockbtn itemsId", this.props.itemsId);
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