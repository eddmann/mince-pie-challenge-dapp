client-start:
	docker-compose run --service-ports --rm create-react-app npm start

contract-test:
	docker-compose run --service-ports --rm truffle test

contract-start:
	docker-compose run --service-ports --rm truffle truffle compile && truffle migrate --reset

ipfs-start:
	docker-compose run --service-ports -d ipfs
