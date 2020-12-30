## Puppet-ojoconmipisto v1.0

### Dependencies

To run this scrapper, complete this pre-requirements:
1. Get Node LTS [here](https://nodejs.org/es/download/).
1. To validate the installation, run:

```sh
$ node -v
# output: vX.X.X
```

and

```sh
$ npm -v
# output: X.X.X
```

### How to start puppet

0. Clone or download this repo. Open it in your terminal. See how [here](https://askubuntu.com/a/375880)

1. Install dependencies, run:

```sh
$ npm install
```

2. Execute start script:

```sh
$ npm run start
```

![console how to run example ](https://github.com/LuisPaGarcia/puppet-ojoconmipisto/raw/main/console.png)

### Available scripts

## `npm run start`: 
Start the fetch of the data from the `http://ojoconmipisto.com/category/noticias/`, then will retrieve the data from the next page, called `https://ojoconmipisto.com/category/noticias/page/2/`. As you can see the pattern to jump to the next page is the added path called `/page/x/`. For now exist around 210 pages of news.

The data scrapped will be saved in `output/data.json` and converted to csv in `output/data.csv.` on every page scraped.

## `npm run reset`:
Will erase the content of the 
- `output/data.json`.
- `output/data.csv`.
- `output/completed.json`.

**We recommend to run this script everytime you want to start to scrapping.**

