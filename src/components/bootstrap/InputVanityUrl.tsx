import * as React from 'react';
import Config from 'src/components/logic/Config';

interface IProps {
  config: Config;
}

interface IState {
  label: string;
  url: string;
}

class InputVanityUrl extends React.Component<IProps, IState> {

  private id: string;
  public constructor(props :any) {
    super(props);
    this.initState();
    this.id = Math.random().toString(36).substr(2, 5);
  }

  public render() {
    const state :IState = this.state;
    const inputId :string = 'input-'+this.id;
    return [
      <label key="0" htmlFor={inputId}>{state.label}</label>,
      <div key="1" className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id={this.id}>{state.url}</span>
        </div>
        <input type="text" className="form-control" id={inputId} aria-describedby={this.id} />
      </div>
    ];
  }

  private initState() {
    const conf :Config = this.props.config;
    this.state = {
      label: conf.get('label'),
      url: conf.get('url')
    };
  }

}

export default InputVanityUrl;