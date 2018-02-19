import React, { Component } from 'react';

class Lockbtn extends Component {

  render() {

    var btnText = 'Lock Stream';
    var newViewVal = 'items';
    if (this.props.view == 'items') {
      btnText = 'All Streams';
      newViewVal = 'cats';
    }

    return (
      <div>
        <div className="lockbtnCont">
          <button onClick={() => this.props.setView(newViewVal)} className="lockbtn" type="button">{btnText}</button>
        </div>
      </div>
    );
  }

}

export default Lockbtn;