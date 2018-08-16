import * as React from 'react';
import Config from 'src/components/logic/Config';
import app from 'src/components/logic/Global';
import 'src/css/Nav.css';

interface INavLinkProps {
  config: any; // Array or Config object
}

interface INavLinkState {
  classes   : string;
  callback  : () => void;
  href?     : string;
  icon?     : JSX.Element;
  id?       : string;
  links?    : Config[];
  value?    : string;
};

export default class NavLink extends React.Component<INavLinkProps, INavLinkState> {

  private nextKey :number;

  public constructor(props: any) {
    super(props);
    const conf : Config = this.props.config;
    this.state = {
      callback : () => {return},
      classes  : 'nav-item '
    };
    this.nextKey = 0;
    if (!Array.isArray(this.props.config)) {
      this.initializeSingleLink(conf);
    }
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }

  /**
   * Render method
   *
   * @return {void}
   */
  public render() {
    if (Array.isArray(this.props.config)) {
      return this.dropdownRender();
    }
    return this.singleLinkRender();
  }

  /**
   * Initializes the data for a single link render.
   *
   * @param {Config} conf Configuration object
   *
   * @return {void}
   */
  private initializeSingleLink : ((conf :Config)=>void) = (conf :Config) => {
    conf.relax();
    this.state = {
      callback : conf.get('callback') || this.state.callback,
      classes : this.state.classes + (conf.get('classes') || ''),
      href : conf.get('href') || '#',
      icon : app.iconRender(conf.get('icon')) || '',
      id : conf.get('id') || '',
      value : conf.get('value') || ''
    };
  }

  /**
   * Will renders as a single link on the navigation bar.
   *
   * @return {void}
   */
  private singleLinkRender() {
    return (
      <li className={this.state.classes} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
        <a href={this.state.href} id={this.state.id} className="nav-link">
          {this.state.icon}
          {this.state.value}
        </a>
      </li>
    );
  }

  /**
   * Part of a navigation bar link click effect mechanism.
   *
   * @return {void}
   */
  private mouseDown(): void {
    const classes = app.addClass(this.state.classes, 'active');
    this.setState({ classes });
  }

  /**
   * Part of the navigation bar link click effect mechanism.
   *
   * @return {void}
   */
  private mouseUp(): void {
    const classes = app.removeClass(this.state.classes, ['active']);
    this.setState({ classes });
    this.state.callback();
  }

  /**
   * 
   */
  private dropdownRender() {
    const conf = this.props.config[0];
    const icon: string = conf.rGet('icon') || '';
    const value: string = conf.rGet('value') || '';
    const linksJsx = this.processLinks();
    return (
      <li className="nav-item dropdown">
        <a href={conf.get('href')}
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false">
          {app.iconRender(icon)} {value} <span className="caret" />
        </a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          {linksJsx}
        </div>
      </li>
    );
  }

  private processLinks() {
    const linksJsx :JSX.Element[] = [];
    const links: Config[] = this.props.config.slice(1);
    for (const conf of links) {
      const jsx = this.getLinkJsx(conf);
      linksJsx.push(jsx);
    }
    return linksJsx;
  }

  private getLinkJsx(conf: Config) {
    conf.relax();
    const role: string = conf.get('role');
    const key :number = this.nextKey;
    this.nextKey++;

    if (role) {
      return <div key={key} className="dropdown-divider" />
    }

    const icon: string = conf.get('icon') || '';
    const value: string = conf.get('value') || '';
    const callback: ()=>void = conf.get('callback');
    conf.beStrict();

    return (
      <a key={key} href={conf.get('href')} className="dropdown-item" onClick={callback}>
        {app.iconRender(icon)} {value}
      </a>
    );
  }

}
