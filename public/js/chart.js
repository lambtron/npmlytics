(function() {

  /**
   * Do thing.
   */

  get(parse);

  /**
   * Get downloads.
   */

  function get(fn) {
    $.get(window.location.pathname + '.json', fn);
  }

  /**
   * Parse data.
   */

  function parse(data) {
    var chart = [];
    _.each(data, function(pkg) {
      var dlds = _.map(pkg.downloads, function(dl) { return dl.downloads });
      dlds.unshift(pkg.package);
      chart.push(dlds);
    });
    draw(chart);
  }

  /**
   * Draw graph.
   */

  function draw(data) {
    var groups = [];
    _.each(data, function(d) { groups.push(d[0]) });
    var graph = c3.generate({
      bindto: '#graph',
      data: {
        columns: data,
        type: 'area',
        groups: [groups]
      }
    });
  }

})();