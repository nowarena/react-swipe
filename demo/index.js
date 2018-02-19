import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import ReactSwipe from '../src/reactSwipe';
import ItemEmpty from '../src/itemEmpty';
import Item from '../src/item';
import Lockbtn from '../src/lockbtn';

var newspeopleJson = require('../json/newspeople.json');
var shoppingJson = require('../json/shopping.json');
var fashionJson = require('../json/fashion.json');
var otherJson = require('../json/other.json');
var diningJson = require('../json/dining.json');
//var servicesJson = require('../json/services.json');
var coffeecasualeatsJson = require('../json/coffeecasualeats.json');
var spafitnessJson = require('../json/spafitness.json');
var techJson = require('../json/tech.json');

const query = querystring.parse(window.location.search.slice(1));

// change Swipe.js options by query params
const startSlide = parseInt(query.startSlide, 10) || 0;

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {view: 'cats', itemsId:0};
    this.setView = this.setView.bind(this);
  }


  gotoTop () {
    do {
      this.prev();
    } while (this.reactSwipe.getPos() > 0);
  }

  next () {
    this.reactSwipe.next();
  }

  prev () {
    this.reactSwipe.prev();
  }

  setView(currentView, itemsId) {
    console.log('setView currentView', currentView);
    console.log("setView itemsId", itemsId);
    var viewVal = (currentView == 'items') ? 'cats' : 'items';
    console.log("setView viewVal", viewVal);
    this.setState({
      view: viewVal,
      itemsId: itemsId
    });

  }

  render () {

    var numberOfSlides = Object.keys(this.props.feed).length + 1;
    if (this.state.view == 'items') {
      numberOfSlides = this.props.feed[this.state.itemsId].social_media.length + 1;// + 1 because ItemEmpty will be the +1
    }

    console.log('render view', this.state.view);
    console.log('render feed', this.props.feed);
    console.log('render numberOfSlides', numberOfSlides);

    // create an array to map items_id to position in this.props.feed array
    var itemsIdArr = new Array;
    var index = 0;
    for(var itemsId in this.props.feed) {
      itemsIdArr[index] = itemsId;
      index++;
    }
    console.log("render itemsIdArr", itemsIdArr);

    const paneNodes = Array.apply(null, Array(numberOfSlides)).map((_, i) => {

      console.log("paneNodes i", i);
      console.log("paneNodesitemsId", itemsIdArr[i]);
      var endOfFeedVisibility=true;
      var socialMediaArr = [];
      if (this.state.view == 'cats') {
        itemsId = itemsIdArr[i];
      } else {
        itemsId = this.state.itemsId;
      }

      if (this.state.view == 'cats'
         && typeof this.props.feed[itemsId] != 'undefined'
         && typeof this.props.feed[itemsId].social_media != 'undefined'
         && typeof this.props.feed[itemsId].social_media[0] != 'undefined') {
          socialMediaArr = this.props.feed[itemsId].social_media[0];// this gets the most recent social_media item for a member in position i of this category
          endOfFeedVisibility=false;
      } else if (this.state.view == 'items'
         && typeof this.props.feed[itemsId] != 'undefined'
         && typeof this.props.feed[itemsId].social_media != 'undefined'
         && typeof this.props.feed[itemsId].social_media[i] != 'undefined') {
        console.log("this.state.view", this.state.view);
          socialMediaArr = this.props.feed[itemsId].social_media[i];
          endOfFeedVisibility=false;
      }

      return (
        <div key={i}>
          <Lockbtn setView={this.setView} itemsId={itemsId} view={this.state.view}></Lockbtn>
          <Item socialMediaArr={socialMediaArr}></Item>
          <ItemEmpty gotoTop={() => this.gotoTop()} endOfFeedVisibility={endOfFeedVisibility}></ItemEmpty>
        </div>
      );

    });

    const swipeOptions = {
      startSlide: startSlide < paneNodes.length && startSlide >= 0 ? startSlide : 0,
      auto: parseInt(query.auto, 10) || 0,
      speed: parseInt(query.speed, 10) || 300,
      disableScroll: query.disableScroll === 'true',
      continuous: query.continuous === 'true',
      callback () {
        console.log('slide changed');
      },
      transitionEnd () {
        console.log('ended transition');
      }
    };

    return (
      <div key={itemsId} className="center">
        <ReactSwipe
          ref={reactSwipe => this.reactSwipe = reactSwipe}
          className="mySwipe"
          swipeOptions={swipeOptions}>
          {paneNodes}
        </ReactSwipe>

        <div className="navBtnCont">
          <button className="navBtn prevBtn" type="button" onClick={::this.prev}>&laquo;</button>
          <button className="navBtn nextbtn" type="button" onClick={::this.next}>&raquo;</button>
        </div>

      </div>
    );
  }
}

ReactDOM.render(
  <Page feed={fashionJson} />,
  document.getElementById('fashion')
);

ReactDOM.render(
  <Page feed={shoppingJson} />,
  document.getElementById('shopping')
);

ReactDOM.render(
  <Page feed={newspeopleJson} />,
  document.getElementById('newspeople')
);

ReactDOM.render(
  <Page feed={techJson} />,
  document.getElementById('tech')
);

ReactDOM.render(
  <Page feed={diningJson} />,
  document.getElementById('dining')
);

ReactDOM.render(
  <Page feed={coffeecasualeatsJson} />,
  document.getElementById('coffeecasualeats')
);

ReactDOM.render(
  <Page feed={spafitnessJson} />,
  document.getElementById('spafitness')
);

// ReactDOM.render(
//   <Page feed={servicesJson} />,
//   document.getElementById('services')
// );
ReactDOM.render(
  <Page feed={otherJson} />,
  document.getElementById('other')
);