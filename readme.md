
# Scrapbook

Collecting images and photos like a pro.

<img src="./assets/ss01.png" width="400" />
<img src="./assets/ss02.png" width="400" />
<img src="./assets/ss03.png" width="400" />

## Demo 

[demo](https://yuis-ice.github.io/scrapbook/demo/scrapbook/index.html)

## Why 

When you have a tons of photos you took while your traveling, or art images you downloaded from Pixiv or Deviantart, the one big problem is the more you have, the harder managing and searching them.

Scrapbook provides you a minimalist cross-platform web-based interface that enables you filter/search/view your photos/images in a more elegant way. Totally free and open-source. 

## Usage 

1. Copy the Scrapbook

Clone this git and copy the `./demo/scrapbook` folder to your image directory. 

(Or you can rebuild the files by `npm run-script build ` if you want.)

2. Create config file 

Place `scrapbook.config.yml` on the root of your image directory. 

The format is like: 

```yml 
meta: 
  date_format: YYYY/MM/DD

database: 

  - date: 2021/9/12
    rate: 2
    memo: dog
    path: ./dog1.jpg

  - date: 2021/9/13
    rate: 3
    memo: dog
    path: ./dog2.jpg
```

(You can see the example at `./demo/scrapbook.config.yml`)

3. Run the server 

Run express.js web server and go to the localhost URL, now you can see the main interface on the browser. 

```
# git clone [this repo]
# npm install

./main.js --datadir [image directory] -p [port]

# e.g. 
./main.js --datadir ./demo -p 8114
./main.js --datadir /mnt/c/myimages -p 8114

```

## Development

1. run the webpack server 

```
npm run-script dev
```

or just build

```
npm run-script build 
```

2. run the express.js web server

```
npm run-script demo 
```

3. open the localhost url e.g. http://localhost:8114/scrapbook/

