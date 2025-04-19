"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface Skill {
  name: string
  level: number
}

interface SkillMatrixProps {
  skills: Skill[]
}

export function SkillMatrix({ skills }: SkillMatrixProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !skills.length) return

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = { top: 30, right: 30, bottom: 50, left: 50 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(skills.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.1)

    const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0])

    // Create color scale
    const colorScale = d3.scaleLinear<string>().domain([0, 50, 100]).range(["#ff5555", "#ffaa00", "#00cc88"])

    // Create SVG elements
    const svg = d3.select(svgRef.current)

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

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

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("fill", "currentColor")

    // Add y-axis
    g.append("g").call(d3.axisLeft(yScale)).selectAll("text").attr("fill", "currentColor")

    // Add y-axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 10)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor")
      .text("Proficiency (%)")

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => ""),
      )
      .selectAll("line")
      .attr("stroke", "rgba(255, 255, 255, 0.1)")

    // Add skill level rectangles
    g.selectAll(".skill-rect")
      .data(skills)
      .enter()
      .append("rect")
      .attr("class", "skill-rect")
      .attr("x", (d) => xScale(d.name) || 0)
      .attr("y", (d) => yScale(d.level))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.level))
      .attr("fill", (d) => colorScale(d.level))
      .attr("rx", 4)
      .attr("ry", 4)
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .html(`<strong>${d.name}</strong><br>${d.level}%`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px")

        d3.select(event.currentTarget).attr("opacity", 0.8).attr("stroke", "#fff").attr("stroke-width", 2)
      })
      .on("mousemove", (event) => {
        tooltip.style("left", event.pageX + 10 + "px").style("top", event.pageY - 10 + "px")
      })
      .on("mouseout", (event) => {
        tooltip.style("visibility", "hidden")
        d3.select(event.currentTarget).attr("opacity", 1).attr("stroke", "none")
      })

    // Add skill level labels
    g.selectAll(".skill-label")
      .data(skills)
      .enter()
      .append("text")
      .attr("class", "skill-label")
      .attr("x", (d) => (xScale(d.name) || 0) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.level) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor")
      .attr("font-size", "10px")
      .text((d) => `${d.level}%`)

    // Cleanup
    return () => {
      tooltip.remove()
    }
  }, [skills])

  return <svg ref={svgRef} width="100%" height="100%" />
}
