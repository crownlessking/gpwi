import * as React from 'react';
import Config from 'src/components/logic/Config';
import navModel from 'src/components/model/navigation/NavModel';
import Tabulation from 'src/components/view/tabulation/Tabulation';
import 'src/css/App.css';
import Nav from './components/view/navigation/Nav';

class App extends React.Component {

  public constructor(props:any) {
    super(props);
  }

  public render() {
    const links :Config = this.navModel();
    const tabs :Config = this.tabModel();
    return (
      <div className="App">
        <Nav appName="G.P.W.I" config={links} />
        <Tabulation config={tabs} />
      </div>
    );

  }

  public navModel(): Config {
    const conf : Config = new Config();
    conf.set('links', navModel.links);
    conf.set('linksRight', navModel.linksRight);

    return conf;
  }

  public tabModel(): Config {
    const conf: Config = new Config();

    return conf;
  }

}

export default App;
