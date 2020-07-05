# Library Search App

This application has full-text search capability using Angular (frontend), Node.js (backend) and Elasticsearch to search the classic books. This website was inspired from this [post](https://blog.patricktriest.com/text-search-docker-elasticsearch/).  

## Build Instructions

- Download books data and unzip to server directory

```bash
wget https://cdn.patricktriest.com/data/books.zip --no-check-certificate -P server/
unzip server/books.zip -d server/
```

- Run Docker Compose
  
```bash
docker-compose up -d
```

- Upload data to Elasticsearch

```bash
docker exec gs-api "node" "server/load_data.js"
```

- Access the website at [http://localhost:4200](http://localhost:4200)

## Authors

- **Harry Tran**
