import * as React from 'react';
import app from 'src/components/logic/Global';

interface ICBProps {
  closeId: string;
  callback: (id: string) => void;
}

interface ICBState {
  icon: string;
}

class CloseButton extends React.Component<ICBProps, ICBState> {

  public constructor(props: any) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      icon: 'fas fa-times'
    };
  }

  public render() {
    const icon: string = this.state.icon;
    return (
        <a className="closeTab" onClick={this.close}>
          {app.iconRender(icon)}
        </a>
    );
  }

  private close: ()=>void = () => {
    const tabId: string = this.props.closeId;
    this.props.callback(tabId);
  };
}

export default CloseButton;