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
    var viewVal = (currentView == 'items') ? 'cats' : 'items';
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

    // CREATE A LOOKUP ARRAY TO MAP INDEX POSITION 0-9 TO ITEMS_ID (1333,333,ETC) ACCORDING TO DATE
    // OF MOST RECENT SOCIAL MEDIA
    //
    // create an array to map items_id and their most recent social media date to position in this.props.feed array
    var index = 0;
    var itemsDateUtArr = new Array;
    for(var itemsId in this.props.feed) {
      itemsDateUtArr[index] = this.props.feed[itemsId].social_media[0].created_at_ut;
      index++;
    }
    // order the items by most recent social media date
    itemsDateUtArr.sort();
    itemsDateUtArr.reverse();
    var itemsIdSetArr = [];
    var itemsIdLookupArr = new Array;
    index = 0;
    for(var key in itemsDateUtArr) {
      for(var itemsIdKey in this.props.feed) {
          if (this.props.feed[itemsIdKey].social_media[0].created_at_ut == itemsDateUtArr[key] && typeof itemsIdSetArr[itemsIdKey] == 'undefined') {
            itemsIdLookupArr[index] = itemsIdKey;
            index++;
            itemsIdSetArr[itemsIdKey] = 1;
          }
      }

    }
    // END CREATE LOOKUP TABLE ARRAY

    const paneNodes = Array.apply(null, Array(numberOfSlides)).map((_, i) => {

      var endOfFeedVisibility=true;
      var socialMediaArr = [];
      if (this.state.view == 'cats') {
        // use the lookup array to map index position to itemsId
        itemsId = itemsIdLookupArr[i];
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
          socialMediaArr = this.props.feed[itemsId].social_media[i];
          endOfFeedVisibility=false;
      }

      return (
        <div key={i}>
          <Lockbtn setView={this.setView} itemsId={itemsId} view={this.state.view}></Lockbtn>
          <Item view={this.state.view} socialMediaArr={socialMediaArr}></Item>
          <ItemEmpty view={this.state.view} gotoTop={() => this.gotoTop()} endOfFeedVisibility={endOfFeedVisibility}></ItemEmpty>
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


ReactDOM.render(
  <Page feed={otherJson} />,
  document.getElementById('other')
);
// ReactDOM.render(
//   <Page feed={servicesJson} />,
//   document.getElementById('services')
// );