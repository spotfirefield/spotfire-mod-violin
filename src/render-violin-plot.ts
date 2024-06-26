/*
<<<<<<< HEAD
* Copyright © 2024. Cloud Software Group, Inc.
* This file is subject to the license terms contained
* in the license file that is distributed with this file.
*/
=======
 * Copyright © 2024. Cloud Software Group, Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
>>>>>>> 7df09fe71b6c7cca30c104321bcf5cd7cc99ea5f

// @ts-ignore
import * as d3 from "d3";
import { Data, Options, RenderState, RowData } from "./definitions";
<<<<<<< HEAD
import { LOG_CATEGORIES, Log, getBoxBorderColor } from "./index";
=======
import { violinWidthPadding } from "./index";
import { LOG_CATEGORIES, Log } from "./log";
>>>>>>> 7df09fe71b6c7cca30c104321bcf5cd7cc99ea5f
import { Tooltip, DataViewRow, GeneralStylingInfo } from "spotfire-api";
import {
  highlightComparisonCircles,
  highlightMarkedComparisonCircles,
} from "./render-comparison-circles";
import { getBoxBorderColor } from "./utility-functions";

/**
 *  Render violin
 */
export function renderViolin(
  plotData: Data,
  orderedCategories: string[],
  xScale: d3.scaleBand,
  yScale: d3.scale,
<<<<<<< HEAD
  height: number,
=======
>>>>>>> 7df09fe71b6c7cca30c104321bcf5cd7cc99ea5f
  margin: any,
  g: any,
  tooltip: Tooltip,
  xAxisSpotfire: Spotfire.Axis,
  state: RenderState,
  animationSpeed: number,
  heightAvailable: number,
  config: Partial<Options>,
  generalStylingInfo: GeneralStylingInfo
) {
<<<<<<< HEAD
  const padding = { violinX: 20 };
  const isScaleLog = config.yAxisLog.value();
=======
>>>>>>> 7df09fe71b6c7cca30c104321bcf5cd7cc99ea5f
  const curveType = d3.curveLinear;

  Log.green(LOG_CATEGORIES.ViolinIndividualScales)(
    "plotData.densitiesAll",
    plotData.densitiesAll
  );
  Log.green(LOG_CATEGORIES.ViolinIndividualScales)(
    "plotData.densitiesSplitByMarking",
    plotData.densitiesSplitByMarkingAndCategory
  );

  orderedCategories.forEach((category: string, violinIndex: number) => {
    const densitiesAll = plotData.densitiesAll.filter(
      (d: any) => d.category == category
    );
<<<<<<< HEAD
    const densitiesSplitByMarking = plotData.densitiesSplitByMarkingAndCategory.filter(
      (d: any) => d.category == category
    );
=======
    const densitiesSplitByMarking =
      plotData.densitiesSplitByMarkingAndCategory.filter(
        (d: any) => d.category == category
      );
>>>>>>> 7df09fe71b6c7cca30c104321bcf5cd7cc99ea5f
    Log.green(LOG_CATEGORIES.ViolinIndividualScales)(
      "densitiesAll for",
      category,
      densitiesAll,
      "[0]",
      densitiesAll[0]
    );
    Log.green(LOG_CATEGORIES.ViolinIndividualScales)(
      "densitiesSplitByMarking for",
      category,
      densitiesSplitByMarking
    );

    // densitiesAll is an array with 1 element only at this stage
    const maxKdeValue =
      densitiesAll.length > 0
        ? d3.max(densitiesAll[0].densityPoints.map((p: any) => p.y))
        : 0;

    /**
     * violinXscale is used for the correct placing of violin area
     */
    const violinXscale = d3
      .scaleLinear()
<<<<<<< HEAD
      .range([1, xScale.bandwidth() - padding.violinX])
=======
      .range([1, xScale.bandwidth() - violinWidthPadding.violinX])
>>>>>>> 7df09fe71b6c7cca30c104321bcf5cd7cc99ea5f
      .domain([-maxKdeValue, maxKdeValue]);

    Log.red(LOG_CATEGORIES.DebugYNaN)(
      category,
      maxKdeValue,
      densitiesAll,
      densitiesAll.length
    );

  /**
   * violinXscale is used for the correct placing of violin area
   */
  const violinXscale = d3
    .scaleLinear()
    .range([1, xScale.bandwidth() - padding.violinX])
    .domain([-maxKdeValue, maxKdeValue]);

    // Segments for the violin - marked/unmarked
    g.selectAll(".violin-path-" + violinIndex)
      // This is all violins that will be displayed, including category
<<<<<<< HEAD
      .data(densitiesSplitByMarking.sort((a:any, b:any) => b.IsGap - a.IsGap))
      .enter()
      .append("g")
      .attr("transform", function (d: any) {
        Log.green(LOG_CATEGORIES.ViolinIndividualScales)("violin d", d);
        return (
          "translate(" +
          ((xScale(d.category) ? xScale(d.category) : 0) +
            padding.violinX / 2) +
          " ,0)"
        );
      })
      .style("stroke", (d: any) =>
        d.IsGap ? "darkgray" : getBoxBorderColor(d.color)
=======
      .data(densitiesSplitByMarking.sort((a: any, b: any) => b.IsGap - a.IsGap))
      .enter()
      .append("g")
      .attr("transform", function (d: any) {
        const xTranslate =
          (config.isVertical ? margin.left : margin.top) +
          (xScale(d.category) ? xScale(d.category) : 0) +
          violinWidthPadding.violinX / 2;
        Log.green(LOG_CATEGORIES.Horizontal)(
          "translate",
          "translate(" +
            (config.isVertical ? xTranslate : 0) +
            ", " +
            (config.isVertical ? 0 : xTranslate) +
            ")"
        );
        return (
          "translate(" +
          (config.isVertical ? xTranslate : 0) +
          ", " +
          (config.isVertical ? 0 : xTranslate) +
          ")"
        );
      })
      .style("stroke", (d: any) =>
        d.IsGap
          ? "darkgray"
          : getBoxBorderColor(
              d.IsGap
                ? "url(#no-data)"
                : !config.areColorAndXAxesMatching ||
                  config.useFixedViolinColor.value()
                ? config.violinColor.value()
                : d.color
            )
>>>>>>> 7df09fe71b6c7cca30c104321bcf5cd7cc99ea5f
      )
      .style("opacity", config.violinOpacity)
      .style("fill", function (d: any) {
        Log.blue(LOG_CATEGORIES.ColorViolin)("isGap", d, d.IsGap);
<<<<<<< HEAD
        return d.IsGap
          ? "url(#no-data)"
          : config.areColorAndXAxesMatching
          ? d.color
          : config.violinColor.value(); // config.violinColor.value();
      })
      .classed("not-marked", (d: any) => {
        if (!plotData.isAnyMarkedRecords) {
          return false;
        }
        return config.useFixedViolinColor.value() && !d.Marked;
      })
      .append("path")
      .classed("violin-path", true)
      .classed("violin-gap", (d: any) => d.IsGap)
      .datum((d: any) => {
        Log.green(LOG_CATEGORIES.DebugLogYAxis)("violin datum", d);
        // point is a density point; y is the density, x is the value (plot's y value) being reported
        // ... so swap them round
        const datum = d.densityPoints.map(function (point: any) {
          return {
            rows: d.rows,
            isGap: d.IsGap,
            violinX: point.y,
            violinY: point.x,
            trellis: d.trellis,
            category: d.category,
            sumStats: plotData.sumStats.get(d.category),
            count: d.count,
          };
        });
        Log.green(LOG_CATEGORIES.DebugLatestMarking)("datum", datum);
        return datum.sort(
          (a: any, b: any) =>
            a.violinY - b.violinY || yScale(a.violinY) - yScale(b.violinY)
        );
      }) // So now we are working bin per bin
      .attr(
        "d",
        d3
          .area()
          .defined((d: any, i: number) => true) //{Log.green(LOG_CATEGORIES.DebugCustomSymLog)(d, yScale(d.violinY)); return true || d.violinY > 1 || d.violinY < -1;}) //&& !isNaN(Math.log(Math.abs(d.violinY)));})
          .x0(function (d: any) {
            return violinXscale(-d.violinX) as number;
          })
          .x1(function (d: any) {
            Log.green(LOG_CATEGORIES.Rendering)(d);
            Log.green(LOG_CATEGORIES.Rendering)(d[1]);
            return violinXscale(d.violinX) as number;
          })
          .y(function (d: any) {
            //if (isNaN(yScale(d.violinY))) {
            //  return 0;
            //}
            Log.green(LOG_CATEGORIES.Rendering)(yScale(d[0]));
            return yScale(d.violinY) as number;
          })
          .curve(curveType)
      )
      .classed("markable", true)
      .on("mouseover", function (event: d3.event, d: any) {
        if (event.currentTarget.classList.contains("violin-gap")) {
          tooltip.show(
            "No data\n" +
              (xAxisSpotfire.parts[0]?.displayName
                ? xAxisSpotfire.parts[0]?.displayName + ": "
                : "") +
              d[0].category +
              "i:" +
              d.i +
              "\nY min: " +
              config.FormatNumber(d3.min(d.map((p: any) => p.violinY))) +
              "\nY max: " +
              config.FormatNumber(d3.max(d.map((p: any) => p.violinY)))
          );
        } else {
          Log.green(LOG_CATEGORIES.DebugLatestMarking)(
            "datum in mouseover",
            d[0]
          );

          tooltip.show(
            (xAxisSpotfire.parts[0]?.displayName
              ? xAxisSpotfire.parts[0]?.displayName + ": "
              : "") +
              d[0].category +
              "\ny: " +
              config.FormatNumber(yScale.invert(event.y - margin.top)) +
              "\nDensity: " +
              config.FormatNumber(violinXscale.invert(event.x)) +
              "\nY min: " +
              config.FormatNumber(d3.min(d.map((p: any) => p.violinY))) +
              "\nY max: " +
              config.FormatNumber(d3.max(d.map((p: any) => p.violinY))) +
              "\nCount: " +
              d[0].count
          );
        }
        Log.green(LOG_CATEGORIES.Rendering)(event.currentTarget);
        d3.select(event.currentTarget).classed("area-highlighted", true);
        if (config.comparisonCirclesEnabled.value()) {
          highlightComparisonCircles(
            g,
            xScale,
            heightAvailable,
            d[0].category,
            plotData.comparisonCirclesData,
            generalStylingInfo.backgroundColor
          );
        }
      })
      .on("mousemove", function (event: d3.event, d: any) {
        if (event.currentTarget.classList.contains("violin-gap")) {
          tooltip.show(
            "No data\n" +
              (xAxisSpotfire.parts[0]?.displayName
                ? xAxisSpotfire.parts[0]?.displayName + ": "
                : "") +
              d[0].category +
              "\nY min: " +
              config.FormatNumber(d3.min(d.map((p: any) => p.violinY))) +
              "\nY max: " +
              config.FormatNumber(d3.max(d.map((p: any) => p.violinY)))
          );
        } else {
          tooltip.show(
            (xAxisSpotfire.parts[0]?.displayName
              ? xAxisSpotfire.parts[0]?.displayName + ": "
              : "") +
              d[0].category +
              "\ny: " +
              config.FormatNumber(yScale.invert(event.y - margin.top)) +              
              "\nDensity: " +
              d3.format(".2e")(violinXscale.invert(event.x)) +
              "\nY min: " +
              config.FormatNumber(d3.min(d.map((p: any) => p.violinY))) +
              "\nY max: " +
              config.FormatNumber(d3.max(d.map((p: any) => p.violinY))) +              
              "\nCount: " +
              d[0].count
          );
        }
        Log.green(LOG_CATEGORIES.Rendering)(event.currentTarget);
        d3.select(event.currentTarget).classed("area-highlighted", true);
        if (config.comparisonCirclesEnabled.value()) {
          highlightComparisonCircles(
            g,
            xScale,
            heightAvailable,
            d[0].category,
            plotData.comparisonCirclesData,
            generalStylingInfo.backgroundColor
          );
        }
      })
      .on("mouseout", (event: d3.event) => {
        tooltip.hide();
        d3.select(event.currentTarget).classed("area-highlighted", false);
        highlightMarkedComparisonCircles(
          g,
          xScale,
          heightAvailable,
          config,
          plotData,
          generalStylingInfo.backgroundColor

        );
      })
      .on("click", (event: MouseEvent, d: any) => {
        Log.green(LOG_CATEGORIES.DebugLatestMarking)("clicked violin", d[0].rows);
        if (d[0].isGap || d[1].isGap) return; // Don't attempt to do anything if the user clicks a gap!
        const dataPoints = plotData.rowData.filter((r: any) => {
          if (d[0].category == "(None)") return true;
          return r.row.categorical("X").formattedValue() === d[0].category;
        });
        state.disableAnimation = true;

        plotData.mark(
          d[0].rows.map((r:RowData) => r.row) as DataViewRow[],
          event.ctrlKey ? "ToggleOrAdd" : "Replace"
        );
=======
        Log.blue(LOG_CATEGORIES.ColorViolin)(
          "matching?",
          config.areColorAndXAxesMatching
        );

        return d.IsGap
          ? "url(#no-data)"
          : !config.areColorAndXAxesMatching ||
            config.useFixedViolinColor.value()
          ? config.violinColor.value()
          : d.color;
      })
      .classed("not-marked", (d: any) => {
        if (!plotData.isAnyMarkedRecords) {
          return false;
        }
        return (
          (!config.areColorAndXAxesMatching ||
            config.useFixedViolinColor.value()) &&
          !d.Marked
        );
      })
      .append("path")
      .classed("violin-path", true)
      .classed("violin-gap", (d: any) => d.IsGap)
      .datum((d: any) => {
        Log.green(LOG_CATEGORIES.DebugLogYAxis)("violin datum", d);
        // point is a density point; y is the density, x is the value (plot's y value) being reported
        // ... so swap them round
        const datum = d.densityPoints.map(function (point: any) {
          return {
            rows: d.rows,
            isGap: d.IsGap,
            violinX: point.y,
            violinY: point.x,
            trellis: d.trellis,
            category: d.category,
            sumStats: plotData.sumStats.get(d.category),
            count: d.count,
          };
        });
        Log.green(LOG_CATEGORIES.DebugLatestMarking)("datum", datum);
        return datum.sort(
          (a: any, b: any) =>
            a.violinY - b.violinY || yScale(a.violinY) - yScale(b.violinY)
        );
      }) // So now we are working bin per bin
      .attr("d", getViolinArea(violinXscale))
      .classed("markable", true)
      .on("mouseover", function (event: d3.event, d: any) {
        if (event.currentTarget.classList.contains("violin-gap")) {
          tooltip.show(
            "No data\n" +
              (xAxisSpotfire.parts[0]?.displayName
                ? xAxisSpotfire.parts[0]?.displayName + ": "
                : "") +
              d[0].category +
              "i:" +
              d.i +
              "\nY min: " +
              config.FormatNumber(d3.min(d.map((p: any) => p.violinY))) +
              "\nY max: " +
              config.FormatNumber(d3.max(d.map((p: any) => p.violinY)))
          );
        } else {
          Log.green(LOG_CATEGORIES.DebugLatestMarking)(
            "datum in mouseover",
            d[0]
          );

          tooltip.show(
            (xAxisSpotfire.parts[0]?.displayName
              ? xAxisSpotfire.parts[0]?.displayName + ": "
              : "") +
              d[0].category +
              "\ny: " +
              config.FormatNumber(
                yScale.invert(
                  event.y -
                    margin.top +                    
                    (window.scrollY || document.documentElement.scrollTop)
                )
              ) +
              "\nDensity: " +
              config.FormatNumber(violinXscale.invert(event.x)) +
              "\nY min: " +
              config.FormatNumber(d3.min(d.map((p: any) => p.violinY))) +
              "\nY max: " +
              config.FormatNumber(d3.max(d.map((p: any) => p.violinY))) +
              "\nCount: " +
              d[0].count
          );
        }
        Log.green(LOG_CATEGORIES.Rendering)(event.currentTarget);
        d3.select(event.currentTarget).classed("area-highlighted", true);
        if (config.comparisonCirclesEnabled.value()) {
          highlightComparisonCircles(
            config,
            margin,
            g,
            xScale,
            heightAvailable,
            d[0].category,
            plotData.comparisonCirclesData,
            generalStylingInfo.backgroundColor
          );
        }
      })
      .on("mousemove", function (event: d3.event, d: any) {
        if (event.currentTarget.classList.contains("violin-gap")) {
          tooltip.show(
            "No data\n" +
              (xAxisSpotfire.parts[0]?.displayName
                ? xAxisSpotfire.parts[0]?.displayName + ": "
                : "") +
              d[0].category +
              "\nY min: " +
              config.FormatNumber(d3.min(d.map((p: any) => p.violinY))) +
              "\nY max: " +
              config.FormatNumber(d3.max(d.map((p: any) => p.violinY)))
          );
        } else {          
          tooltip.show(
            (xAxisSpotfire.parts[0]?.displayName
              ? xAxisSpotfire.parts[0]?.displayName + ": "
              : "") +
              d[0].category +
              "\nY min: " +
              config.FormatNumber(d3.min(d.map((p: any) => p.violinY))) +
              "\nY max: " +
              config.FormatNumber(d3.max(d.map((p: any) => p.violinY))) +
              "\nCount: " +
              d[0].count
          );
        }
        Log.green(LOG_CATEGORIES.Rendering)(event.currentTarget);
        d3.select(event.currentTarget).classed("area-highlighted", true);
        if (config.comparisonCirclesEnabled.value()) {
          highlightComparisonCircles(
            config,
            margin,
            g,
            xScale,
            heightAvailable,
            d[0].category,
            plotData.comparisonCirclesData,
            generalStylingInfo.backgroundColor
          );
        }
      })
      .on("mouseout", (event: d3.event) => {
        tooltip.hide();
        d3.select(event.currentTarget).classed("area-highlighted", false);
        highlightMarkedComparisonCircles(
          g,
          margin,
          xScale,
          heightAvailable,
          config,
          plotData,
          generalStylingInfo.backgroundColor
        );
      })
      .on("click", (event: MouseEvent, d: any) => {
        Log.green(LOG_CATEGORIES.DebugLatestMarking)(
          "clicked violin",
          d[0].rows
        );
        if (d[0].isGap || d[1].isGap) return; // Don't attempt to do anything if the user clicks a gap!
        const dataPoints = plotData.rowData.filter((r: any) => {
          if (d[0].category == "(None)") return true;
          return r.row.categorical("X").formattedValue() === d[0].category;
        });
        state.disableAnimation = true;

        plotData.mark(
          d[0].rows.map((r: RowData) => r.row) as DataViewRow[],
          event.ctrlKey ? "ToggleOrAdd" : "Replace"
        );
>>>>>>> 7df09fe71b6c7cca30c104321bcf5cd7cc99ea5f
      });

    Log.green(LOG_CATEGORIES.Rendering)(plotData.densitiesAll);
    // Now add a second set of paths for the violins - these will be invisible, but are used to make
    // the marking code a lot easier!
    g.selectAll(".violin-path-markable-" + violinIndex)
      .data(densitiesAll)
      .enter() // So now we are working group per group
      .append("g")
      .attr("transform", function (d: any) {
<<<<<<< HEAD
        Log.green(LOG_CATEGORIES.Rendering)(
          "test data",
          d,
          d.category,
          xScale(d.category)
        );
        return (
          "translate(" +
          ((xScale(d.category) ? xScale(d.category) : 0) +
            padding.violinX / 2) +
          " ,0)"
=======
        const xTranslate =
          (config.isVertical ? margin.left : margin.top) +
          (xScale(d.category) ? xScale(d.category) : 0) +
          violinWidthPadding.violinX / 2;
        Log.green(LOG_CATEGORIES.Horizontal)(
          "translate",
          "translate(" +
            (config.isVertical ? xTranslate : 0) +
            ", " +
            (config.isVertical ? 0 : xTranslate) +
            ")"
        );
        return (
          "translate(" +
          (config.isVertical ? xTranslate : 0) +
          ", " +
          (config.isVertical ? 0 : xTranslate) +
          ")"
>>>>>>> 7df09fe71b6c7cca30c104321bcf5cd7cc99ea5f
        );
      }) // Translation on the right to be at the group position
      .style("fill", "none")
      .append("path")
      .classed("violin-path-markable", true)
      .datum((d: any) => {
        const datum = d.densityPoints.map(function (point: any) {
          return {
            violinX: point.y,
            violinY: point.x,
            trellis: d.trellis,
            category: d.category,
            sumStats: plotData.sumStats.get(d.category),
          };
        });
        Log.green(LOG_CATEGORIES.Rendering)("datum", datum);
        return datum;
      }) // So now we are working bin per bin
      .classed("markable", true)
<<<<<<< HEAD
      .attr(
        "d",
        d3
          .area()
          .x0(function (d: any) {
            if (isNaN(violinXscale(-d.violinX))) {
              Log.green(LOG_CATEGORIES.DebugYNaN)(
                d.category,
                d.violinX,
                violinXscale(-d.violinX),
                maxKdeValue
              );
            }
            return violinXscale(-d.violinX) as number;
          })
          .x1(function (d: any) {
            return violinXscale(d.violinX) as number;
          })
          .y(function (d: any) {
            if (isNaN(yScale(d.violinY))) {
              return 0;
            }
            Log.green(LOG_CATEGORIES.Rendering)(yScale(d[0]));
            return yScale(d.violinY) as number;
          })
          .curve(curveType)
      );
  });
=======
      .attr("d", getViolinArea(violinXscale));
  });

  function getViolinArea(violinXscale: d3.scale): any {
    if (config.isVertical) {
      return d3
        .area()
        .defined((d: any, i: number) => true) //{Log.green(LOG_CATEGORIES.DebugCustomSymLog)(d, yScale(d.violinY)); return true || d.violinY > 1 || d.violinY < -1;}) //&& !isNaN(Math.log(Math.abs(d.violinY)));})
        .x0(function (d: any) {
          return violinXscale(-d.violinX) as number;
        })
        .x1(function (d: any) {
          Log.green(LOG_CATEGORIES.Rendering)(d);
          Log.green(LOG_CATEGORIES.Rendering)(d[1]);
          return violinXscale(d.violinX) as number;
        })
        .y(function (d: any) {
          //if (isNaN(yScale(d.violinY))) {
          //  return 0;
          //}
          Log.green(LOG_CATEGORIES.Rendering)(yScale(d[0]));
          return yScale(d.violinY) as number;
        })
        .curve(curveType);
    }

    // Horizontal
    return d3
      .area()
      .defined((d: any, i: number) => true) //{Log.green(LOG_CATEGORIES.DebugCustomSymLog)(d, yScale(d.violinY)); return true || d.violinY > 1 || d.violinY < -1;}) //&& !isNaN(Math.log(Math.abs(d.violinY)));})
      .y0(function (d: any) {
        return violinXscale(-d.violinX) as number;
      })
      .y1(function (d: any) {
        Log.green(LOG_CATEGORIES.Rendering)(d);
        Log.green(LOG_CATEGORIES.Rendering)(d[1]);
        return violinXscale(d.violinX) as number;
      })
      .x(function (d: any) {
        //if (isNaN(yScale(d.violinY))) {
        //  return 0;
        //}
        Log.green(LOG_CATEGORIES.Rendering)(yScale(d[0]));
        return yScale(d.violinY) as number;
      })
      .curve(curveType);
  }
>>>>>>> 7df09fe71b6c7cca30c104321bcf5cd7cc99ea5f
}
