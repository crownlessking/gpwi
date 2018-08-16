import * as React from 'react';
import Config from 'src/components/logic/Config';
import app from 'src/components/logic/Global';
import CloseButton from './CloseButton';

/**
 * 
 * [Attribute list]
 * name : string;
 * href : string;
 * class : string;
 * icon : string;
 * callback(name : string) : object;
 */
interface ITabHeadProps {
  config : Config;
}

interface ITabHeadState {
  ariaControls : string;
  ariaSelected : boolean;
  classes : string;
  href : string;
  icon : any;
  id : string;
  name : string;
}

class TabHead extends React.Component<ITabHeadProps, ITabHeadState> {

  public constructor(props:any) {
    super(props);
    const conf: Config = this.props.config;
    const tabName: string = conf.get('name');
    const tabId: string = conf.get('tab_id');
    const tabAriaControls: string = conf.get('tab_content_id');
    conf.relax();
    const iconText: string = conf.get('icon');

    this.state = {
      ariaControls : tabAriaControls,
      ariaSelected : true,
      classes : conf.get('class') || '',
      href : '#'+tabAriaControls,
      icon : iconText ? app.iconRender(iconText) : '',
      id : tabId,
      name : tabName
    }

  }

  public render( ) {
    const state: ITabHeadState = this.state;
    const id: string = this.props.config.get('tab_id');
    const callback: ()=>void = this.props.config.get('delete_tab');
    return (
      <li role="presentation" className="nav-item">
        <a className={'nav-link '+state.classes}
          id={state.id}
          data-toggle="tab"
          href={state.href}
          role="tab"
          aria-controls={state.ariaControls}
          aria-selected={state.ariaSelected}>
          {state.icon}
          {state.name}
          &nbsp;&nbsp;
        </a>
        <CloseButton closeId={id} callback={callback} />
      </li>
    );
  }

}

export default TabHead;