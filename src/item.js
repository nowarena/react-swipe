import React, { Component } from 'react';

class Item extends Component {

  render() {

    var socialMediaArr = this.props.socialMediaArr;

    var text = '';
    var username = '';
    var usernameLink = '';
    var created_at = '';
    var avatar = '';
    var visibilityStyle={display: 'none'};

    if (socialMediaArr != '') {
      visibilityStyle={display: 'block'};
      text = socialMediaArr.text;
      username = socialMediaArr.username;
      usernameLink = '<a target="_blank" href="http://' + socialMediaArr.site + '/' + username + '">' + username + '</a>';
      created_at = socialMediaArr.created_at;
      avatar = '<a target=_blank href="' + socialMediaArr.link + '"><img className="avatarImg" src="' + socialMediaArr.avatar + '"/></a>';
    }

    var slideStyle={};
    if (this.props.view == 'items') {
      slideStyle={backgroundColor:'#cccccc'};
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
            <div className="itemAvatarCont" dangerouslySetInnerHTML={{__html:avatar}}/>
            <div className="itemTextCont" dangerouslySetInnerHTML={{__html:text}}/>
           </div>
         </div>
        </div>
      </div>
    );
  }

}

export default Item;