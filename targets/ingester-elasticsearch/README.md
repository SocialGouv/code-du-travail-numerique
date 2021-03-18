# Ingester Elasticsearch

> Makes Elastic search inject cdtn datas

## How to get `ELASTICSEARCH_DATA_TOKEN`

1. Go to Kibana
1. Go to Dev Tools
1. Post an `/_security/api_key`

```
POST /_security/api_key
{
  "name": "update_dev",
  "role_descriptors": {
    "role-update": {
      "cluster": ["all"],
      "index": [
        {
          "names": ["cdtn-dev*"],
          "privileges": ["create", "create_index", "delete", "delete_index", "manage"]
        }
      ]
    }
  }
}

GET /_security/api_key
{
  "id" : "y-KUmHUBIwTqwin_SDF",
  "name" : "update_prod",
  "api_key" : "abcdefghijkml"
}
```

See more on https://www.elastic.co/guide/en/elasticsearch/reference/7.10/security-api-create-api-key.html

1. Encode the `<id>:<api_key>` to base64 to get the token

```sh
$ echo -n "y-KUmHUBIwTqwin_SDF:abcdefghijkml" | base64
abcdefghijkmlXd3ZVZ4WUFMNlo6cTNoRTBFSjVRQW1UdHFfT2JZcmVzdw==
```

1. Test it with a curl

```sh
curl -H "Authorization: ApiKey ${ELASTICSEARCH_DATA_TOKEN}"  ${ELASTICSEARCH_URL}
```

1. Create the `cdtn_*` index pattern (Go to Stack Management > Index patterns)
