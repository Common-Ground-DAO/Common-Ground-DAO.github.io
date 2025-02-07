// Network visualization using D3.js
class NetworkVisualization {
    constructor(selector) {
        this.container = d3.select(selector);
        this.width = this.container.node().getBoundingClientRect().width;
        this.height = this.container.node().getBoundingClientRect().height;
        this.simulation = null;
        this.svg = null;
        this.nodes = [];
        this.links = [];
        
        // Initialize the visualization
        this.init();
        this.generateData();
        this.render();
    }

    init() {
        this.svg = this.container.append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", [0, 0, this.width, this.height]);

        // Define larger forces for more spread
        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => d.id).distance(100)) // Increased distance
            .force("charge", d3.forceManyBody().strength(-400)) // Stronger repulsion
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
            .force("collision", d3.forceCollide().radius(60)); // Increased collision radius

        // Add gradient definitions
        const defs = this.svg.append("defs");
        
        // Node gradient
        const nodeGradient = defs.append("linearGradient")
            .attr("id", "nodeGradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%");
            
        nodeGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "var(--brand-color)");
            
        nodeGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "rgb(98, 145, 178)");

        // Link gradient
        const linkGradient = defs.append("linearGradient")
            .attr("id", "linkGradient")
            .attr("gradientUnits", "userSpaceOnUse");
        
        linkGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "rgba(98, 145, 178, 0.3)");
            
        linkGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "rgba(98, 145, 178, 0.1)");
    }

    generateData() {
        // Core concepts with larger nodes
        const coreNodes = [
            { id: "Identity", size: 40 },
            { id: "Governance", size: 40 },
            { id: "Value Exchange", size: 40 },
            { id: "Community", size: 40 }
        ];

        // Features with smaller nodes
        const featureNodes = [
            { id: "Roles", size: 25 },
            { id: "Chat", size: 25 },
            { id: "Tokens", size: 25 },
            { id: "Forums", size: 25 },
            { id: "Treasury", size: 25 },
            { id: "Voting", size: 25 }
        ];

        this.nodes = [...coreNodes, ...featureNodes];

        // Create more connections between nodes
        this.links = [
            { source: "Identity", target: "Roles" },
            { source: "Identity", target: "Chat" },
            { source: "Identity", target: "Community" },
            { source: "Governance", target: "Voting" },
            { source: "Governance", target: "Treasury" },
            { source: "Governance", target: "Community" },
            { source: "Value Exchange", target: "Tokens" },
            { source: "Value Exchange", target: "Treasury" },
            { source: "Community", target: "Forums" },
            { source: "Community", target: "Chat" },
            { source: "Governance", target: "Value Exchange" },
            { source: "Identity", target: "Value Exchange" },
            { source: "Identity", target: "Governance" }            
        ];
    }

    render() {
        // Create links with gradient
        const links = this.svg.append("g")
            .selectAll("line")
            .data(this.links)
            .join("line")
            .style("stroke", "url(#linkGradient)")
            .style("stroke-width", 2);

        // Create nodes with varying sizes
        const nodes = this.svg.append("g")
            .selectAll("circle")
            .data(this.nodes)
            .join("circle")
            .attr("r", d => d.size)
            .style("fill", "url(#nodeGradient)")
            .style("opacity", 0.8)
            .call(this.drag(this.simulation));

        // Add labels with improved positioning and styling
        const labels = this.svg.append("g")
            .selectAll("text")
            .data(this.nodes)
            .join("text")
            .text(d => d.id)
            .attr("class", d => d.size > 30 ? "core-label" : "feature-label")
            .attr("font-size", d => d.size > 30 ? "16px" : "14px")
            .attr("font-weight", d => d.size > 30 ? "600" : "500")
            .attr("text-anchor", "middle")
            .attr("dy", d => d.size > 30 ? "45px" : "35px")  // Position below nodes
            .style("fill", "var(--text-color)")
            .style("pointer-events", "none")
            .style("text-shadow", "2px 2px 4px rgba(255,255,255,0.8), -2px -2px 4px rgba(255,255,255,0.8), 2px -2px 4px rgba(255,255,255,0.8), -2px 2px 4px rgba(255,255,255,0.8)")  // Add white glow for better readability
            .style("user-select", "none");

        // Update simulation
        this.simulation
            .nodes(this.nodes)
            .on("tick", () => {
                links
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                nodes
                    .attr("cx", d => d.x = Math.max(d.size, Math.min(this.width - d.size, d.x)))
                    .attr("cy", d => d.y = Math.max(d.size, Math.min(this.height - d.size, d.y)));

                labels
                    .attr("x", d => d.x)
                    .attr("y", d => d.y);
            });

        this.simulation.force("link").links(this.links);

        // Add zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([0.5, 2])
            .on("zoom", (event) => {
                this.svg.selectAll("g").attr("transform", event.transform);
            });

        this.svg.call(zoom);
    }

    drag(simulation) {
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
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
}

// Initialize visualization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NetworkVisualization('.network-visualization');
}); 