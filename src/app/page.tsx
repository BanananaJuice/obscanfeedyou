// import Link from "next/link";
import React from "react";
import axios from "axios"; // Import axios for API requests
import { api, HydrateClient } from "~/trpc/server";
import LineChart from "~/components/LineChart";
import { Card } from "~/components/Card";

export default async function Home() {
  void api.homelessStats.getAll.prefetch();
  const homelessFeedData = await api.homelessStats.getAll();

  const totalPeopleFed = homelessFeedData.reduce((sum, entry) => sum + entry.peopleFed, 0);

  const chartData = homelessFeedData.map((entry) => ({
    date: entry.date.toISOString(),
    count: entry.peopleFed,
  }));

  interface WorldBankResponse {
    [index: number]: {
      value?: number;
    }[];
  }
  
  const unemploymentRateData = await axios.get<WorldBankResponse>(
    "https://api.worldbank.org/v2/country/za/indicator/SL.UEM.TOTL.ZS?format=json"
  );
  
  // Extract the latest unemployment rate from the response with type safety
  const unemploymentRate =
    unemploymentRateData.data?.[1]?.[0]?.value ?? "N/A";

  return (
    <HydrateClient>
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Animated SVG Background */}
        <div className="absolute inset-0 w-full h-full bg-wave bg-cover animate-wave"></div>

        {/* Main Content */}
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center text-white">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-accent">
              ObsCanFeedYou
            </h1>
            <p className="text-lg text-justify max-w-2xl">
              ObsCanFeedYou aims to serve the homeless community in Observatory, Cape Town, by distributing meals on weekends.
            </p>

            {/* Total People Fed Card */}
            <Card className="bg-brown text-white max-w-3xl p-8">
              <h3 className="text-3xl font-bold">Total People Fed: {totalPeopleFed}</h3>
            </Card>

            {/* South African Unemployment Rate Card */}
            <Card className="bg-darkBrown text-white max-w-3xl p-8">
              <h3 className="text-3xl font-bold">South African Unemployment Rate</h3>
              <p className="text-lg mt-4">{unemploymentRate}%</p>
            </Card>

            {/* Mission Statement Card */}
            <Card className="bg-olive text-white max-w-3xl p-8">
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg">
                To provide consistent nourishment to the homeless community in Observatory, Cape Town, by creating a reliable network of support and compassion.
              </p>
            </Card>

            {/* Goals Card */}
            <Card className="bg-lightGreen text-white max-w-3xl p-8">
              <h3 className="text-3xl font-bold mb-4">Our Goals</h3>
              <ul className="list-disc ml-5 text-lg">
                <li>Increase the number of individuals we reach by 20% each year.</li>
                <li>Collaborate with local businesses to secure sustainable food sources.</li>
                <li>Build a community of volunteers to expand our reach.</li>
              </ul>
            </Card>

            {/* Values Card */}
            <Card className="bg-accent text-white max-w-3xl p-8">
              <h3 className="text-3xl font-bold mb-4">Our Values</h3>
              <ul className="list-disc ml-5 text-lg">
                <li><strong>Compassion</strong>: Every individual deserves compassion, care, and dignity.</li>
                <li><strong>Community</strong>: We believe in working together to uplift our neighborhood.</li>
                <li><strong>Sustainability</strong>: Reducing waste and making a positive impact through thoughtful resource management.</li>
              </ul>
            </Card>

            {/* Chart Section */}
            <div className="w-full max-w-3xl p-8 bg-white rounded-lg">
              <LineChart data={chartData} />
            </div>
          </div>
        </main>
      </div>
    </HydrateClient>
  );
}
