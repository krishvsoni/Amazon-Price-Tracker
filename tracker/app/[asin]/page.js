import React from "react";
import { Chart } from "react-charts";
import Navbar from "../../components/Navbar";
import DisplayChart from "../../components/DisplayChart";
export default function Page({params}){
    const data = [
        {
          label: 'React Charts',
          data: [
            {
              date: 33,
              stars: 123,
            },
            {
              date: 45,
              stars: 456,
            },
            {
              data:44,
              stars:2023
            },
            {
              date: 23,
              stars: 356
            }
          ]
        }
      ];
      

    
        return (
          <>
            <Navbar/>
            Track Price for: {params.asin}
            <DisplayChart data={data}/>
    
          </>
        );
    }