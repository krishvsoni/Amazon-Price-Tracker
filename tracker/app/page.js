import React from "react";
import Navbar from "../components/Navbar";
import { MongoClient } from "mongodb";
import Link from "next/link";

const url = process.env.MongoDB;
const client = new MongoClient(url);
const dbName = 'amazon_data';

export default async function Home() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('products');
    const findResult = await collection.find().toArray();
    
    console.log(findResult);
    
    return (
      <>
        <Navbar/>
        <div className="container mx-auto">
          <h1 className="text-center font-bold text-2xl py-16"> Products Fetched</h1>
          <ul className="list-disc">
            {findResult.map(item => (
              <li key={item._id} className="mb-4">
                <Link href={`/${item.asin}`} target="_blank" rel="noopener noreferrer" legacyBehavior>
                  <a className="text-blue-500">{item.asin}</a>
                </Link>
                <div>{item.title}</div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
    
            }
            