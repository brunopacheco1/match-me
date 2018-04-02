# match-me
Matching people.

## Installing Node modules
npm install

## Testing
npm test

### Running the API
npm start

## Running Elastic Search
docker run -p 9200:9200 -p 9300:9300 --rm --name elasticsearch -d -e "discovery.type=single-node" -e "cluster.name=docker-cluster" docker.elastic.co/elasticsearch/elasticsearch:6.2.3

## Build docker
docker build -t brunopacheco1/match-me .

## Run Stack
docker-compose -f stack.yml up