import React from "react";
import { Chart } from "react-charts";

const DisplayChart = (data) => { 
        
    const primaryAxis = React.useMemo(
        () => ({
          getValue: datum => datum.date,
        }),
        []
      )
    
      const secondaryAxes = React.useMemo(
        () => [
          {
            getValue: datum => datum.stars,
          },
        ],
        []
      )
    return (
        <div> 
            Track Price for: {title} 
            <div className="size-64">
                <Chart options={{ 
                    data,
                    primaryAxis,
                    secondaryAxes
                }} />
            </div>
        </div> 
    ); 
};

export default DisplayChart;
