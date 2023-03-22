const body = getModeleBody();
const response = await elasticsearchClient.search({ body, index });
if (response.body.hits.total.value > 0) {
  ctx.body = response.body.hits.hits.map(({ _source }) => _source);
} else {
  ctx.body = [];
}
