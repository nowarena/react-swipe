import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import ReactSwipe from '../src/reactSwipe';


var newsAndPeopleJson = require('../json/news_and_people.json');
var shoppingJson = require('../json/shopping.json');
var fashionJson = require('../json/fashion.json');
var otherJson = require('../json/other.json');
var diningJson = require('../json/dining.json');
var servicesJson = require('../json/services.json');
var casualeatsJson = require('../json/casual_eats.json');
var barJson = require('../json/bar.json');
var coffeeandteaJson = require('../json/coffee_and_tea.json');
var spaandfitnessJson = require('../json/spa_and_fitness.json');
var techJson = require('../json/tech.json');

const query = querystring.parse(window.location.search.slice(1));

// generate slide panes
const numberOfSlides = parseInt(query.slidesNum, 10) || 20;

// change Swipe.js options by query params
const startSlide = parseInt(query.startSlide, 10) || 0;

class Page extends Component {

  createMarkupItem(i) {

    console.log('this.props.feed', this.props.feed);

    var content = '<div class="itemTextCont">End of feed reached.</div>';
    if (typeof this.props.feed[0].social_media != 'undefined' && typeof this.props.feed[0].social_media[i] != 'undefined') {

      var socialMediaArr = this.props.feed[0].social_media;
      console.log('socialMediaArr', socialMediaArr);
      var title = socialMediaArr[i].username;
      var text = socialMediaArr[i].text;
      var username = socialMediaArr[i].username;
      var usernameLink = '<a target="_blank" href="http://' + socialMediaArr[i].site + '/' + username + '">' + username + '</a>';
      var created_at = socialMediaArr[i].created_at;
      var avatar = '<a target=_blank href="' + socialMediaArr[i].link + '"><img class="avatarImg" src="' + socialMediaArr[i].avatar + '"/></a>';

      var category ='People and News';

      content = '<div class="itemCont">';
      content+= '<div class="itemHeader">';
      content+= '<div class="itemHeaderUsername">' + usernameLink + '</div>';
      content+= '<div class="itemHeaderCreatedAt">' + created_at + '</div>';
      content+= '<div style="clear:both;"></div>';
      content+= '</div>';
      content+= '<div style="clear:both;"></div>';
      content+= '<div class="itemBody">';
      content+= '<div class="itemAvatarCont">' + avatar + '</div>';
      content+= '<div class="itemTextCont">' + text + '</div>';
      content+= '</div>';
      content+= '</div>';

    }

    return {__html: content};

  }

  createMarkupCat(i) {

    console.log('i', i);
    console.log('this.props.feed[i]', this.props.feed[i]);

    var content = 'End of feed.';
    if (typeof this.props.feed[i] != 'undefined'
      && typeof this.props.feed[i].social_media != 'undefined'
      && typeof this.props.feed[i].social_media[0] != 'undefined') {

      var socialMediaArr = this.props.feed[i].social_media[0];
      console.log('socialMediaArr', socialMediaArr);
      var title = socialMediaArr.username;
      var text = socialMediaArr.text;
      var username = socialMediaArr.username;
      var usernameLink = '<a target="_blank" href="http://' + socialMediaArr.site + '/' + username + '">' + username + '</a>';
      var created_at = socialMediaArr.created_at;
      var avatar = '<a target=_blank href="' + socialMediaArr.link + '"><img class="avatarImg" src="' + socialMediaArr.avatar + '"/></a>';

      var category ='People and News';

      content = '<div class="itemCont">';
      content+= '<div class="itemHeader">';
      content+= '<div class="itemHeaderUsername">' + usernameLink + '</div>';
      content+= '<div class="itemHeaderCreatedAt">' + created_at + '</div>';
      content+= '<div style="clear:both;"></div>';
      content+= '</div>';
      content+= '<div style="clear:both;"></div>';
      content+= '<div class="itemBody">';
      content+= '<div class="itemAvatarCont">' + avatar + '</div>';
      content+= '<div class="itemTextCont">' + text + '</div>';
      content+= '</div>';
      content+= '</div>';

    }

    return {__html: content};

  }



  next () {
    console.log('next called');
    this.reactSwipe.next();
  }

  prev () {
    this.reactSwipe.prev();
  }

  render () {

    const paneNodes = Array.apply(null, Array(numberOfSlides)).map((_, i) => {
      return (
        <div key={i}>
          <div className="item" dangerouslySetInnerHTML={this.createMarkupCat(i)} />
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

    console.log('paneNodes', paneNodes);

    return (
      <div className="center">
        <ReactSwipe
          ref={reactSwipe => this.reactSwipe = reactSwipe}
          className="mySwipe"
          swipeOptions={swipeOptions}>
          {paneNodes}
        </ReactSwipe>

        <div>
          <button type="button" onClick={::this.prev}>Prev</button>
          <button type="button" onClick={::this.next}>Next</button>
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
  <Page feed={newsAndPeopleJson} />,
  document.getElementById('newsandpeople')
);
