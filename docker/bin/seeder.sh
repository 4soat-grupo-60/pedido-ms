#!/bin/bash
docker-compose exec pedidos-ms-postgres psql -U pedidos-ms -d pedidos-ms -f seeder.sql
