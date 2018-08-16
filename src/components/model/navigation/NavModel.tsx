import Config from 'src/components/logic/Config';
import app from 'src/components/logic/Global';

class NavModel {

  public static getInstance() :NavModel {
    return NavModel.instance;
  }

  private static instance :NavModel = new NavModel();

  // TODO, define your link in this array as an anonymous function
  //       Links in here will be arranged to the left of the navigation
  //       bar.
  public links :Array<()=>void> = [
    () => {
      const conf = new Config();
      conf.set('href', 'javascript:');
      conf.set('id', 'new');
      conf.set('icon', 'fas fa-plus');

      conf.set('callback', () => {
        const tabConf :Config = new Config();
        tabConf.set('name', 'First Tab');
        // tabConf.set('content', <MyComponent />);
        app.newTab(tabConf);
      });
      return conf;
    }
  ];

  // TODO, define your link in this array as an anonymous function
  //       Links in here will be arranged to the right of the navigation
  //       bar.
  public linksRight :Array<()=>void> = [
    () => {
      const confs :Config[] = [];

      const dropdown = new Config();
      dropdown.set('icon', 'fas fa-wrench');
      dropdown.set('href', 'javascript:');
      confs.push(dropdown);

      const link1 = new Config();
      link1.set('value', 'Set Root Path');
      link1.set('icon', 'fas fa-sitemap');
      link1.set('href', 'javascript:');
      link1.set('callback', () => {
        const tabConf :Config = new Config();
        tabConf.set('name', 'Set Root Path');
        app.newTab(tabConf);
      });
      confs.push(link1);

      // TODO Uncomment the following code display a separator
      // const sep1 = new Config();
      // sep1.set('role', 'separator');
      // confs.push(sep1);

      const link2 = new Config();
      link2.set('icon', 'fas fa-times-circle');
      link2.set('value', 'Close All Tabs');
      link2.set('href', 'javascript:');
      confs.push(link2);

      return confs;
    }
  ];

  constructor() {
    if (NavModel.instance) {
      throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
    }
    NavModel.instance = this;
  }

};

export default NavModel.getInstance();