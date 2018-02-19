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

class Page extends Component {

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

  setView(val) {
    console.log("val", val);
    this.view = val;
  }

  render () {

    var view = typeof this.view != 'undefined' ? this.view : 'cats';
    var viewSwitch = 'items';

    var numberOfSlides = this.props.feed.length + 1;// + 1 because ItemEmpty will be the +1
    if (view == 'items') {
      numberOfSlides = this.props.feed[0].social_media.length + 1;// + 1 because ItemEmpty will be the +1
      viewSwitch = 'cats';
    }

    console.log("view", view);

    const paneNodes = Array.apply(null, Array(numberOfSlides)).map((_, i) => {
      var endOfFeedVisibility=true;
      var socialMediaArr = [];
      if (view == 'cats' && typeof this.props.feed[i] != 'undefined'
         && typeof this.props.feed[i].social_media != 'undefined'
         && typeof this.props.feed[i].social_media[0] != 'undefined') {
        socialMediaArr = this.props.feed[i].social_media[0];// this gets the most recent social_media item for a member in position i of this category
        endOfFeedVisibility=false;
      }else if (view == 'items' && typeof this.props.feed[0] != 'undefined'
         && typeof this.props.feed[0].social_media != 'undefined'
         && typeof this.props.feed[0].social_media[i] != 'undefined') {
        socialMediaArr = this.props.feed[0].social_media[i];
        endOfFeedVisibility=false;
      }
      return (
        <div key={i}>
          <Item setView={() => this.setView} view={view} socialMediaArr={socialMediaArr}></Item>
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
      <div className="center">
        <ReactSwipe
          ref={reactSwipe => this.reactSwipe = reactSwipe}
          className="mySwipe"
          swipeOptions={swipeOptions}>
          {paneNodes}
        </ReactSwipe>

        <div className="buttonCont">
          <Lockbtn setView={() => this.setView(viewSwitch)} view={view}></Lockbtn>
          <button className="navButton prevButton" type="button" onClick={::this.prev}>Prev</button>
          <button className="navButton nextbutton" type="button" onClick={::this.next}>Next</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Page feed={shoppingJson} />,
  document.getElementById('shopping')
);

ReactDOM.render(
  <Page feed={fashionJson} />,
  document.getElementById('fashion')
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