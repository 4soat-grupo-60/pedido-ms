#!/usr/bin/env bash

# Exemplo de envio de mensagens na fila SQS

aws sqs send-message \
    --endpoint-url=http://sqs.us-east-1.localhost.localstack.cloud:4566 \
    --queue-url=http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/totem-pedido-queue-comp \
    --message-body '{
        "id": "2f83a0ac-9541-4905-b035-40a1ac6d42fd",
        "payload": {
            "id": 3,
            "items": [
                {
                    "id": 3,
                    "price": 1111.9,
                    "product_category": "Sobremesa",
                    "product_description": "Sabor Chocolate",
                    "product_id": "664f66edc6c4a7d1285c078b",
                    "product_name": "Petit Gateau xxxxxxx",
                    "product_price": 1111.9,
                    "quantity": 1,
                    "total": 1111.9
                }
            ],
            "payment_date": null,
            "payment_id": null,
            "status": "Criado",
            "total": 1111.9,
            "created_at": "2024-06-18T04:01:28.375Z",
            "updated_at": "2024-06-18T04:01:28.375Z"
        },
        "saga": "order_created",
        "time": "2024-06-18T04:01:28.793Z"
    }'
