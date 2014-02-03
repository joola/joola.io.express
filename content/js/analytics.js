//jQuery to collapse the navbar on scroll
$(window).scroll(function () {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
  } else {
    $(".navbar-fixed-top").removeClass("top-nav-collapse");
  }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
  $('.page-scroll a').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});


joolaio.init({host: 'http://10.0.0.3:8080', APIToken: '1234'}, function (err) {
  if (err)
    throw err;

  console.info('joola.io SDK ready, version: ' + joolaio.VERSION + ', token: ' + joolaio.TOKEN);

  setupSparkline('visitors', 'Visitor Count', {
      timeframe: 'last_hour',
      interval: 'minute',
      dimensions: ['timestamp'],
      metrics: [
        {
          id: 'uniquevisitors',
          name: 'Visitor Count',
          dependsOn: 'ip',
          aggregation: 'ucount'
        }
      ]
    }
  );

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
        {id: 'avgduration', name: 'Avg. Response Time', dependsOn: 'duration', aggregation: 'avg', suffix: 'ms',
          type: 'float', decimals: 2}
      ]
    }
  );

  setupSparkline('maxloadtime', 'Max Response Time', {
      timeframe: 'last_hour',
      interval: 'minute',
      dimensions: ['timestamp'],
      metrics: [
        {id: 'maxduration', name: 'Max Response Time', dependsOn: 'duration', aggregation: 'max', suffix: 'ms',
          type: 'float', decimals: 2}
      ]
    }
  );

  setupSparkline('errors', 'Error %', {
      timeframe: 'last_hour',
      interval: 'minute',
      dimensions: ['timestamp'],
      metrics: [
        {
          key: 'errorpercentage',
          name: 'errorpercentage',
          formula: {
            dependsOn: [
              {
                key: 'errors',
                name: 'Error Count',
                dependsOn: 'requests',
                aggregation: 'sum',
                filter: [
                  ['statusCode', 'gte', 400]
                ]
              },
              'requests'
            ],
            run: 'function(errors, total){ return errors / total; }'
          },
          aggregation: 'avg',
          type: 'float',
          decimals: 4,
          suffix: '%'
        }
      ]
    }
  );

  setupGeo('requests', {
    timeframe: 'last_hour',
    interval: 'minute',
    dimensions: ['ip'],
    metrics: ['requests']
  });

  setupTable('refer', 'Referrers', {
      timeframe: 'last_hour',
      dimensions: [
        {key: 'referer', name: 'Referrer'}
      ],
      metrics: [
        {
          id: 'uniquevisitors',
          name: 'Visitor Count',
          dependsOn: 'ip',
          aggregation: 'ucount'
        },
        {key: 'requests', name: 'Requests'}
      ]
    }
  );

  setupTable('url', 'URLs', {
      timeframe: 'last_hour',
      dimensions: [
        {key: 'url', name: 'URL'}
      ],
      metrics: [
        {key: 'requests', name: 'Requests'},
        {key: 'avgduration', name: 'Avg. Response Time', dependsOn: 'duration', aggregation: 'avg', suffix: 'ms',
          type: 'float', decimals: 2}
      ]
    }
  );

  setupTable('lasterrors', 'Errors', {
      timeframe: 'last_hour',
      dimensions: [
        {key: 'url', name: 'URL'}
      ],
      metrics: [
        {
          key: 'errors',
          name: 'Error Count',
          dependsOn: 'requests',
          aggregation: 'sum',
          filter: [
            ['statusCode', 'gte', 400]
          ]
        }
      ]
    }
  );

  setupPie('browser', 'Browsers', {
      timeframe: 'last_hour',
      dimensions: ['ua.browser.name'],
      metrics: [
        {
          id: 'uniquevisitors',
          name: 'Visitor Count',
          dependsOn: 'ip',
          aggregation: 'ucount'
        }
      ]
    }
  );

  setupPie('browser', 'Browsers', {
      timeframe: 'last_hour',
      dimensions: ['ua.browser.name'],
      metrics: [
        {
          id: 'uniquevisitors',
          name: 'Visitor Count',
          dependsOn: 'ip',
          aggregation: 'ucount'
        }
      ]
    }
  );


  setupPie('os', 'Operating System', {
      timeframe: 'last_hour',
      dimensions: ['ua.os.name'],
      metrics: [
        {
          id: 'uniquevisitors',
          name: 'Visitor Count',
          dependsOn: 'ip',
          aggregation: 'ucount'
        }
      ]
    }
  );


  setupPie('device', 'Device', {
      timeframe: 'last_hour',
      dimensions: ['ua.device.name'],
      metrics: [
        {
          id: 'uniquevisitors',
          name: 'Visitor Count',
          dependsOn: 'ip',
          aggregation: 'ucount'
        }
      ]
    }
  );
});

function setupSparkline(divname, caption, query) {
  query.realtime = true;
  $('#chart-' + divname).Sparkline({chart: {chart: {backgroundColor: 'transparent'}}, query: query});
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