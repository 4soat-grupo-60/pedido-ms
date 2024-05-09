#echo "start node server"
#echo "node /var/www/dist/src/index.js"
#node /var/www/dist/index.js
npm install

echo "wait postgres db server"
dockerize -wait tcp://pedidos-ms-postgres:5432 -timeout 20s

echo "start node server"
node index.js