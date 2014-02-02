joolaio.init({host: 'http://localhost:8080', APIToken:'1234'}, function (err) {
  if (err)
    throw err;

  console.info('joola.io SDK ready, version: ' + joolaio.VERSION + ', token: ' + joolaio.TOKEN);

  setupSparkline('requests', 'Request Count', {
      timeframe: 'last_hour',
      interval: 'minute',
      dimensions: ['timestamp'],
      metrics: ['requests']
    }
  );

  setupSparkline('loadtime', 'Avg. Response Time', {
      timeframe: 'last_hour',
      interval: 'minute',
      dimensions: ['timestamp'],
      metrics: [
        {id: 'avgduration', name: 'avgduration', dependsOn: 'duration', aggregation: 'avg', suffix: 'ms',
          type: 'float', decimals: 2}
      ]
    }
  );

  setupGeo('requests', {
    timeframe: 'last_hour',
    interval: 'minute',
    dimensions: ['ip'],
    metrics: ['requests']
  });

  setupPie('codes', 'Status Codes', {
      timeframe: 'last_hour',
      dimensions: ['statusCode'],
      metrics: ['requests']
    }
  );

  setupTable('refer', 'Referrers', {
      timeframe: 'last_hour',
      dimensions: [
        {id: 'referer', name: 'Referrer'}
      ],
      metrics: [
        {id: 'requests', name: 'Requests'}
      ]
    }
  );

  setupTable('url', 'URLs', {
      timeframe: 'last_hour',
      dimensions: [
        {id: 'url', name: 'URL'}
      ],
      metrics: [
        {id: 'requests', name: 'Requests'},
        {id: 'avgduration', name: 'avgduration', dependsOn: 'duration', aggregation: 'avg', suffix: 'ms',
          type: 'float', decimals: 2}
      ]
    }
  );
});

function setupSparkline(divname, caption, query) {
  query.realtime = true;
  $('#chart-' + divname).Sparkline({query: query});
  $('#metric-' + divname).Metric({caption: caption, query: query});
}

function setupGeo(divname, query) {
  query.realtime = true;
  $('#geo-' + divname).Geo({query: query});
}

function setupPie(divname, caption, query) {
  query.realtime = true;
  $('#pie-' + divname).Pie({query: query});
}

function setupTable(divname, caption, query) {
  query.realtime = true;
  $('#table-' + divname).MiniTable({query: query});
}