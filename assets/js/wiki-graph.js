function initializeGraph(data, currentPage) {
  const width = document.getElementById('graph-container').clientWidth;
  const height = 500;
  
  // Create SVG container
  const svg = d3.select('#graph-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
    
  // Create force simulation
  const simulation = d3.forceSimulation(data.nodes)
    .force('link', d3.forceLink(data.edges).id(d => d.id))
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(width / 2, height / 2));
    
  // Create edges
  const edges = svg.append('g')
    .selectAll('line')
    .data(data.edges)
    .enter()
    .append('line')
    .attr('stroke', d => getRelationshipColor(d.type))
    .attr('stroke-width', d => d.weight * 2);
    
  // Create nodes
  const nodes = svg.append('g')
    .selectAll('circle')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('fill', d => getClusterColor(d.cluster))
    .call(drag(simulation));
    
  // Add node labels
  const labels = svg.append('g')
    .selectAll('text')
    .data(data.nodes)
    .enter()
    .append('text')
    .text(d => d.title)
    .attr('font-size', '10px')
    .attr('dx', 8)
    .attr('dy', 3);
    
  // Add hover effects
  nodes
    .on('mouseover', highlightConnections)
    .on('mouseout', resetHighlight);
    
  // Update positions on each tick
  simulation.on('tick', () => {
    edges
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
      
    nodes
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
      
    labels
      .attr('x', d => d.x)
      .attr('y', d => d.y);
  });
  
  // Highlight current page
  if (currentPage) {
    const currentNode = nodes.filter(d => d.id === currentPage);
    currentNode
      .attr('r', 8)
      .attr('stroke', '#000')
      .attr('stroke-width', 2);
  }
}

function updateGraphView(mode) {
  switch (mode) {
    case 'focused':
      // Show only directly connected nodes
      showFocusedView();
      break;
    case 'cluster':
      // Show nodes in the same cluster
      showClusterView();
      break;
    case 'full':
      // Show all nodes
      showFullGraph();
      break;
  }
}

function showFocusedView() {
  const nodes = d3.selectAll('circle');
  const edges = d3.selectAll('line');
  const labels = d3.selectAll('text');
  
  // Get connected nodes
  const connectedNodes = new Set();
  edges.each(d => {
    if (d.source.id === currentPage) connectedNodes.add(d.target.id);
    if (d.target.id === currentPage) connectedNodes.add(d.source.id);
  });
  
  // Show only connected nodes
  nodes.style('opacity', d => 
    d.id === currentPage || connectedNodes.has(d.id) ? 1 : 0.1
  );
  
  edges.style('opacity', d =>
    d.source.id === currentPage || d.target.id === currentPage ? 1 : 0.1
  );
  
  labels.style('opacity', d =>
    d.id === currentPage || connectedNodes.has(d.id) ? 1 : 0.1
  );
}

function showClusterView() {
  const nodes = d3.selectAll('circle');
  const edges = d3.selectAll('line');
  const labels = d3.selectAll('text');
  
  const currentCluster = nodes.filter(d => d.id === currentPage).datum().cluster;
  
  nodes.style('opacity', d => d.cluster === currentCluster ? 1 : 0.1);
  edges.style('opacity', d =>
    d.source.cluster === currentCluster && d.target.cluster === currentCluster ? 1 : 0.1
  );
  labels.style('opacity', d => d.cluster === currentCluster ? 1 : 0.1);
}

function showFullGraph() {
  d3.selectAll('circle, line, text').style('opacity', 1);
}

function getClusterColor(cluster) {
  const metadata = JSON.parse(document.getElementById('wiki-metadata').textContent);
  return metadata.clusters[cluster].color;
}

function getRelationshipColor(type) {
  const metadata = JSON.parse(document.getElementById('wiki-metadata').textContent);
  return metadata.relationship_types[type].color;
}

function highlightConnections(event, d) {
  const nodes = d3.selectAll('circle');
  const edges = d3.selectAll('line');
  const labels = d3.selectAll('text');
  
  // Get connected nodes
  const connectedNodes = new Set();
  edges.each(edge => {
    if (edge.source === d) connectedNodes.add(edge.target);
    if (edge.target === d) connectedNodes.add(edge.source);
  });
  
  // Highlight connected elements
  nodes.style('opacity', node => 
    node === d || connectedNodes.has(node) ? 1 : 0.1
  );
  
  edges.style('opacity', edge =>
    edge.source === d || edge.target === d ? 1 : 0.1
  );
  
  labels.style('opacity', node =>
    node === d || connectedNodes.has(node) ? 1 : 0.1
  );
}

function resetHighlight() {
  d3.selectAll('circle, line, text').style('opacity', 1);
}

function drag(simulation) {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
} 