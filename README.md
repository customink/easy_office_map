# Easy Office Map

Believe it or not, a last minute pivot in a hack-a-thon project led to the creation of Easy Office Map. Today the map is widely used within Custom Ink to figure out where your next meeting is. We thought other organizations might benefit as well so we have open-sourced the code.

Easy Office Map is a simple solution that easy to use. The existing sample maps should give you an idea of how to implement it for your office. It basically boils down to replacing the map images with your own and adding room names and coordinates. DEV_MODE makes it very easy.

## DEV_MODE
Easy Office Map has an admin interface called `DEV_MODE` for updating locations on your maps. Open the browser's developer console and add the url parameter `DEV_MODE=true`. This activates the map grid. Click on a point on the map. The pop-up will ask for the name of the room. Once you enter that the console will output the JSON needed for the `constants.js`. Rinse and repeat.

## Prequisites
None

## Running the App
Simply open the `index.html` file.

## Built with
* HTML, CSS, and jQuery.


## Contributing
Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.
After changes have been merged into master, update the `gh-pages` accordingly.

## Demo
Visit http://technology.customink.com/easy_office_map/

You can search the following points:

### London:
  * Middle Tower
  * Byward Tower

### Paris:
  * Royal Opera

### D.C.
 * Press Corps Office
 * Product Mgmt: 3
 * Reception: 1


## License
This project is licensed under the MIT License - see the [LICENSE.md](docs/LICENSE.md) file for details

## Acknowledgements
Open source office map app created during Inkovate 2016 - [Custom Ink's](https://customink.com) internal hack-a-thon.

PurpleBoot for the awesome README [template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
