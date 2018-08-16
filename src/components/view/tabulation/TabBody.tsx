import * as React from 'react';
import Config from 'src/components/logic/Config';

interface ITabBodyProps {
  config: Config;
}

interface ITabBodyState {
  classes: string;
  content: any;
  labelledBy : string;
  tabContentId: string;
}

class TabBody extends React.Component<ITabBodyProps, ITabBodyState> {

  public constructor(props:any) {
    super(props);
    const conf = this.props.config;
    this.state = {
      classes : conf.rGet('content_class') || '',
      content : conf.rGet('content'),
      labelledBy : conf.get('tab_id'),
      tabContentId : conf.get('tab_content_id')
    }

  }

  public render() {
    const state:ITabBodyState = this.state;
    return (
      <div className={'tab-pane '+state.classes}
          id={state.tabContentId}
          role="tabpanel"
          aria-labelledby={state.labelledBy}>
        {state.content}
      </div>
    );

  }

}

export default TabBody;