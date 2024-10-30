import * as React from "react"
import { Calendar, Heart, Users, Utensils, TrendingUp, Percent } from "lucide-react"
import axios from "axios"
import { api, HydrateClient } from "~/trpc/server"
import LineChart from "~/components/LineChart"
import Image from "next/image"
import { Analytics } from "@vercel/analytics/react"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default async function FunHomePage() {
  void api.homelessStats.getAll.prefetch()
  const homelessFeedData = await api.homelessStats.getAll()

  const totalPeopleFed = homelessFeedData.reduce((sum, entry) => sum + entry.peopleFed, 0)

  const chartData = homelessFeedData
    .filter(entry => {
      const day = new Date(entry.date).getDay()
      return day === 6 || day === 0 // 6 = Saturday, 0 = Sunday
    })
    .map(entry => ({
      date: entry.date.toISOString(),
      count: entry.peopleFed,
    }))

  type WorldBankResponse = Record<number, { value?: number }[]>

  const unemploymentRateData = await axios.get<WorldBankResponse>(
    "https://api.worldbank.org/v2/country/za/indicator/SL.UEM.TOTL.ZS?format=json"
  )
  
  // Extract the latest unemployment rate from the response with type safety
  const unemploymentRate = unemploymentRateData.data?.[1]?.[0]?.value ?? "N/A"

  return (
    <HydrateClient>
      <div className="flex flex-col min-h-screen bg-[#F0EAD2]">
        <header className="px-4 lg:px-6 h-24 flex items-center bg-[#ADC178] shadow-md">
          <div className="flex items-center justify-center">
            <div className="relative w-16 h-16 mr-3">
              <Image
                src="/ObsCan_logo.png"
                alt="ObsCanFeedYou Logo"
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
            </div>
            <span className="text-3xl font-bold text-[#6C584C]">ObsCanFeedYou</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            {["Home", "About", "Help Out", "Donate"].map((item) => (
              <a
                key={item}
                className="text-lg font-medium hover:underline underline-offset-4 text-[#6C584C] transition-colors duration-200 hover:text-[#A98467]"
                href="#"
              >
                {item}
              </a>
            ))}
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48"style={{
            backgroundImage: "url('/fruit_print.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-[#6C584C]">
                    Sharing Smiles, One Meal at a Time!
                  </h1>
                  <p className="mx-auto max-w-[700px] text-[#6C584C] text-xl md:text-2xl font-semibold">
                    Join our weekend food fiesta and help us spread joy to those in need!
                  </p>
                </div>
                <div className="space-x-4">
                  <Button className="bg-[#dec0f1] text-[#6C584C] hover:bg-[#ADC178] text-lg font-bold py-2 px-6 rounded-full transition-all duration-200 hover:scale-105">
                    Learn More
                  </Button>
                  <Button className="bg-[#A98467] text-[#F0EAD2] hover:bg-[#6C584C] text-lg font-bold py-2 px-6 rounded-full transition-all duration-200 hover:scale-105">
                    Get Involved
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F0EAD2]">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-[#6C584C]">Our Yummy Impact</h2>
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 mb-12">
                {[
                  {
                    title: "Our Growing Volunteer Network",
                    description: "A collection of good people",
                    content: "Our volunteer community is growing every week and promises awlays brings a fun time whilst helping a good cause",
                    icon: Users,
                    color: "bg-[#ADC178]",
                  },
                  {
                    title: "Weekend Food Fiesta",
                    description: "Non-stop weekend noms",
                    content: "Our food heroes make sure delicious meals are ready every Saturday and Sunday, rain or shine!",
                    icon: Calendar,
                    color: "bg-[#DDE5B6]",
                  },
                  {
                    title: "100% People-Powered",
                    description: "Community love in action",
                    content: "Our kitchen is fueled by the kindness of awesome volunteers from all walks of life!",
                    icon: Heart,
                    color: "bg-[#dec0f1]",
                  },
                ].map((card, index) => (
                  <Card key={index} className={`${card.color} border-4 border-[#6C584C] rounded-2xl transform transition-all duration-200 hover:scale-105`}>
                    <CardHeader>
                      <card.icon className="h-12 w-12 mb-2 text-[#6C584C]" />
                      <CardTitle className="text-2xl font-bold text-[#6C584C]">{card.title}</CardTitle>
                      <CardDescription className="text-[#6C584C] font-semibold">{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg text-[#6C584C]">{card.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                <Card className="lg:col-span-2 bg-[#DDE5B6] border-4 border-[#6C584C] rounded-2xl overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-[#6C584C] mb-2">Weekly Meal Magic</CardTitle>
                        <CardDescription className="text-[#6C584C] font-semibold">
                          Tracking our weekend food adventures!
                        </CardDescription>
                      </div>
                      <TrendingUp className="h-10 w-10 text-[#6C584C]" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full p-4 bg-white rounded-lg">
                      <LineChart data={chartData} />
                    </div>
                    <p className="mt-4 text-[#6C584C] text-lg">
                      This chart shows the number of happy tummies we&apos;ve filled each week. 
                      We update it every Saturday and Sunday, right after our weekend food fiesta! 
                      Watch those numbers climb as we spread more smiles across our community.
                    </p>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card className="bg-[#ADC178] border-4 border-[#6C584C] rounded-2xl overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold text-[#6C584C]">Current South African Unemployment Rate</CardTitle>
                        <Percent className="h-8 w-8 text-[#6C584C]" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-4xl font-bold text-[#6C584C]">{unemploymentRate}%</p>
                      <p className="text-[#6C584C] mt-2">We&apos;re working hard to make a difference!</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#dec0f1] border-4 border-[#6C584C] rounded-2xl overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold text-[#6C584C]">Total People Fed Since Data Gathered</CardTitle>
                        <Utensils className="h-8 w-8 text-[#6C584C]" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-4xl font-bold text-[#6C584C]">{totalPeopleFed.toLocaleString()}</p>
                      <p className="text-[#6C584C] mt-2">That&apos;s a lot of happy tummies!</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-[#ADC178]">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#6C584C]">Join Our Food Adventure!</h2>
                  <p className="mx-auto max-w-[600px] text-[#F0EAD2] text-xl md:text-2xl font-semibold">
                    Whether you&apos;re a master chef or just love to lend a hand, your help can make someone&apos;s day brighter!
                  </p>
                </div>
                <div className="space-x-4">
                  <Button className="bg-[#dec0f1] text-[#6C584C] hover:bg-[#DDE5B6] text-lg font-bold py-2 px-6 rounded-full transition-all duration-200 hover:scale-105">
                    Be a Food Hero
                  </Button>
                  <Button className="bg-[#6C584C] text-[#F0EAD2] hover:bg-[#A98467] text-lg font-bold py-2 px-6 rounded-full transition-all duration-200 hover:scale-105">
                    Sprinkle Some Love
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#6C584C] bg-[#DDE5B6]">
          <p className="text-sm text-[#6C584C]">© 2024 ObsCanFeedYou. Spreading joy, one meal at a time!</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            {["Our Promise", "Yummy Policy"].map((item) => (
              <a key={item} className="text-sm hover:underline underline-offset-4 text-[#6C584C] transition-colors duration-200 hover:text-[#A98467]" href="#">
                {item}
              </a>
            ))}
          </nav>
        </footer>
      </div>
      <Analytics/>
    </HydrateClient>
  )
}