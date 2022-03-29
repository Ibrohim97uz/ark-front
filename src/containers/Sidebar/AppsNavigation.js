import React from "react";
import {Link} from "react-router-dom";
import {Tooltip} from 'antd';
import {intlMessages} from "../../util/IntlMessages";
import {connect} from "react-redux";



const AppsNavigation = (props) =>
  <ul className="gx-app-nav">
    <li className="gx-msg">
      <Tooltip placement="topLeft"
               title={intlMessages({en: 'Suggestion and Question', ru: 'Предложение и вопрос', uz: 'Taklif va savol'})}>
        <Link to={'/main/suggestion-and-question'}>
             <span className="gx-pointer gx-status-pos gx-d-block">
            <i className="icon icon-email"/>
               {props.suggestionAndQuestion && props.suggestionAndQuestion.filter(item => item.isStatus === false).length !== 0 &&
               <span className={'gx-status gx-status-rtl gx-small gx-orange'}/>}
             </span>
        </Link>
      </Tooltip>
    </li>
    <li className="gx-msg">
      <Tooltip placement="topLeft" title={intlMessages({en: 'Resume', ru: 'Резюме', uz: 'Rezyume'})}>
        <Link to={'/hr/resume'}>
            <span className="gx-pointer gx-status-pos gx-d-block">
            <i className="icon-auth-screen"/>
        <span className={'gx-status gx-status-rtl gx-small gx-orange'}/>
        </span>
        </Link>
      </Tooltip>
    </li>
    <li className="gx-msg">
      <Tooltip placement="topLeft" title={intlMessages({en: 'News', ru: 'Новости', uz: 'Yangiliklar'})}>
        <Link to={'/settings/news'}>
                  <span className="gx-pointer gx-status-pos gx-d-block">
            <i className="icon icon-copy"/>

        <span className={'gx-status gx-status-rtl gx-small gx-orange'}/>

        </span>
        </Link>
      </Tooltip>
    </li>


  </ul>;

const mapStateToProps = ({settings}) => {
  const {suggestionAndQuestion, resume} = settings;
  return {suggestionAndQuestion, resume}
};
export default connect(mapStateToProps, null)(AppsNavigation);
