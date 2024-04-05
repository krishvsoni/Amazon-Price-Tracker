'use client';
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import DisplayChart from "../../components/DisplayChart";
import MongoClient from 'mongodb';

let client;
if (typeof window === 'undefined') {
  const url = process.env.MongoDB;
  client = new MongoClient(url);
}


const dbName = 'amazon_data';

export default async function Page({ params }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('products');
        let asin = params.asin;

        const data = await collection.aggregate([
          {
            $match: {
              asin: asin.toUpperCase()
            }
          },
          {
            $group: {
              _id: "$asin",
              data: {
                $push: {
                  date: { $dayOfMonth: "$time" },
                  price: { $toInt: "$price" }
                }
              }
            }
          },
          {
            $project: {
              _id: 0,
              label: { $literal: "Product" },
              data: 1
            }
          }
        ]).toArray();

        console.log(data);
        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      client.close();
    };
  }, [params.asin]);

  return (
    <>
      <Navbar />
      Track Price for: {params.asin}
      <DisplayChart data={chartData} />
    </>
  );
}
