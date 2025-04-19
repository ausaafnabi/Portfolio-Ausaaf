"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface Skill {
  name: string
  level: number
}

interface BubbleChartProps {
  skills: Skill[]
}

export function BubbleChart({ skills }: BubbleChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !skills.length) return

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Prepare data
    const data = skills.map((skill) => ({
      name: skill.name,
      value: skill.level,
      radius: skill.level / 3 + 15, // Scale radius based on level
    }))

    // Create color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(d3.schemeTableau10)

    // Create simulation
    const simulation = d3
      .forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d: any) => d.radius + 2),
      )

    // Create SVG elements
    const svg = d3.select(svgRef.current)

    // Create tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("z-index", "100")

    // Create nodes
    const nodes = svg
      .selectAll(".node")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(
        d3
          .drag<SVGGElement, any>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on("drag", (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          }),
      )

    // Add circles to nodes
    nodes
      .append("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any) => colorScale(d.name))
      .attr("fill-opacity", 0.7)
      .attr(
        "stroke",
        (d: any) =>
          d3
            .color(colorScale(d.name) as string)
            ?.darker()
            .toString() || "",
      )
      .attr("stroke-width", 2)
      .on("mouseover", (event, d: any) => {
        tooltip
          .style("visibility", "visible")
          .html(`<strong>${d.name}</strong><br>${d.value}%`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px")

        d3.select(event.currentTarget).attr("fill-opacity", 1).attr("stroke-width", 3)
      })
      .on("mousemove", (event) => {
        tooltip.style("left", event.pageX + 10 + "px").style("top", event.pageY - 10 + "px")
      })
      .on("mouseout", (event) => {
        tooltip.style("visibility", "hidden")
        d3.select(event.currentTarget).attr("fill-opacity", 0.7).attr("stroke-width", 2)
      })

    // Add text to nodes
    nodes
      .append("text")
      .text((d: any) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("font-size", (d: any) => Math.min(d.radius * 0.8, 12))
      .attr("fill", "white")
      .attr("pointer-events", "none")

    // Update node positions on simulation tick
    simulation.on("tick", () => {
      nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    })

    // Cleanup
    return () => {
      tooltip.remove()
      simulation.stop()
    }
  }, [skills])

  return <svg ref={svgRef} width="100%" height="100%" />
}
