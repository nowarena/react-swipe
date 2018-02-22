import React, { Component } from 'react';

class Item extends Component {

  render() {

    var socialMediaObj = this.props.socialMediaObj;

    var text = '';
    var username = '';
    var usernameLink = '';
    var created_at = '';
    var avatar = '';
    var outboundLink = '';
    var visibilityStyle={display: 'none'};

    if (socialMediaObj != '') {
      visibilityStyle={display: 'block'};
      text = socialMediaObj.text;
      username = socialMediaObj.username;
      usernameLink = '<a target="_blank" href="http://' + socialMediaObj.site + '/' + username + '">' + username + '</a>';
      created_at = socialMediaObj.created_at.replace('2018-','');
      avatar = '<a target=_blank href="' + socialMediaObj.link + '"><img class="avatarImg" src="' + socialMediaObj.avatar + '"/></a>';
      outboundLink = '<a class="outboundLink" target=_blank href="' + socialMediaObj.link + '">&#8599;</a>';


    }

    var slideStyle={};
    if (this.props.view == 'items') {
      slideStyle={backgroundColor:'#ddd'};
    }

    return (
      <div>
        <div className="item" style={visibilityStyle}>
          <div className="itemCont">
            <div className="itemHeader" style={slideStyle}>
              <div className="itemHeaderUsername" dangerouslySetInnerHTML={{__html:usernameLink}}/>
              <div className="itemHeaderCreatedAt" dangerouslySetInnerHTML={{__html:created_at}}/>
              <div className="clearBoth"></div>
            </div>
            <div className="clearBoth"></div>
            <div className="itemBody">
              <div className="leftColumn">
                <div className="itemAvatarCont" dangerouslySetInnerHTML={{__html:avatar}}/>
                <div className="clearBoth"></div>
                <div className="outboundLinkCont" dangerouslySetInnerHTML={{__html:outboundLink}}/>
              </div>
              <div className="itemTextCont" dangerouslySetInnerHTML={{__html:text}}/>
            </div>
         </div>
        </div>
      </div>
    );
  }

}

export default Item;