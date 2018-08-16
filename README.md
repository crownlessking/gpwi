# General Purpose Web Interface

This is a multi-tab web interface which was created using Yarn, ReactJS, and Typescript.

It can be used to quickly create an interface for any purpose. You need to be knowledgeable with React.js and typescript. But they're aren't difficult to learn if you're a seasoned front-end developer.

All you need to do to create your own personal interface is to add some links to the navigation bar and give these links callbacks to be triggered when clicked to display your React.components.

## Adding a Link

in `src/components/model/navigation/NavModel.tsx`
There is a singleton class with two main public fields.

```ts
public links: Array<()=>void>;
```

and

```ts
public linksRight: Array<()=>void>;
```

`links` array contains links which are arranged on the left. This is the default arrangement.

`linksRight` array will gather your links to the right of the navigation bar. You'd usually put settings links in there.

To create your first link, add an anonymous function to the links array:

```ts
public links: Array<()=>void> = [

   () => {
   }

];
```

Create a Config variable

```ts
public links: Array<()=>void> = [

   () => {
      const conf: Config = new Config();
   }

];
```

Use the Config variable to define your link.

```ts
public links: Array<()=>void> = [

   () => {
      const conf: Config = new Config();

      conf.set('href', '#');
      conf.set('id', 'new');
      conf.set('icon', 'fas fa-plus');
   }

];
```

We have defined the `href`, `id`, and `icon` for the link.
Yes, links can also be icons. The glyphicon set that comes with bootstrap by default is supported. font-awesome 5 is also supported.


## Define a Callback for the Link

To have the link do something, we add a callback.

```ts
public links: Array<()=>void> = [

   () => {
      const conf: Config = new Config();
      
      conf.set('href', '#');
      conf.set('id', 'new');
      conf.set('icon', 'fas fa-plus');

      // Adds a callback so the link can do something.
      conf.set('callback', () => {
         const tabConf :Config = new Config();
         tabConf.set('name', 'New Tab');
         tabConf.set('content', <MyComponent />);
         app.newTab(tabConf);
      })
   }

];
```

the callback function will run when the link is clicked.


## Displaying Content

In this callback, the link will create a new tab.

Tabs require at least a `name`.

```ts
const tabConf: Config = new Config();
tabConf.set('name', 'New Tab');

app.newTab(tabConf);
```

To add content to the new tab, create a ReactJS component and pass it and save it in the content key.

```ts
tabConf.set('content', <MyComponent />);
```

Obviously, you need to import your component or feel free to restructure the files and directories. Whatever floats your boat ;).

When you are done return the configuration object.

```ts
public links: Array<()=>void> = [

   () => {
      const conf: Config = new Config();
      
      conf.set('href', '#');
      conf.set('id', 'new');
      conf.set('icon', 'fas fa-plus');

      conf.set('callback', () => {
         const tabConf :Config = new Config();
         tabConf.set('name', 'New Tab');
         tabConf.set('content', <MyComponent />);
         app.newTab(tabConf);
      })

      // return the configuration object
      return conf;
   }

];
```

If you need to create a new link, insert a new anonymous function in the `links` array and define the link using a configuration variable like before.

## Creating a Dropdown

To display a dropdown, as always, insert an anonymous function in the `links` array but instead of returning a single `Config` variable, we return an array of `Config`.

```ts
public links: Array<()=>void> = [
    () => {
      const confs :Config[] = [];

      const dropdown = new Config();
      dropdown.set('icon', 'fas fa-wrench');
      dropdown.set('href', 'javascript:');
      confs.push(dropdown);

      // DROPDOWN LINK #1
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

      // Defines a separator
      const sep1 = new Config();
      sep1.set('role', 'separator');
      confs.push(sep1);

      // DROPDOWN LINK #2
      const link2 = new Config();
      link2.set('icon', 'fas fa-times-circle');
      link2.set('value', 'Close All Tabs');
      link2.set('href', 'javascript:');
      confs.push(link2);

      return confs;
    }
  ];
  ```