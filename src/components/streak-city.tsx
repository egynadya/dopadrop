"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Info, Building2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Building {
  id: number
  type: "house" | "tree" | "shop" | "office" | "park" | "tower"
  position: { x: number; y: number }
  level: number
}

export function StreakCity() {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [streak, setStreak] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)

  // Load streak data from localStorage on component mount
  useEffect(() => {
    const savedStreak = localStorage.getItem("peacefocus_streak")
    const savedBuildings = localStorage.getItem("peacefocus_buildings")

    if (savedStreak) {
      setStreak(Number.parseInt(savedStreak, 10))
    }

    if (savedBuildings) {
      try {
        setBuildings(JSON.parse(savedBuildings))
      } catch (e) {
        console.error("Error parsing saved buildings", e)
      }
    }
  }, [])

  // Simulate adding a building when a focus session is completed
  const addBuilding = () => {
    const newStreak = streak + 1
    setStreak(newStreak)

    // Visual feedback - pulse animation
    setIsPulsing(true)
    setTimeout(() => setIsPulsing(false), 1000)

    // Determine building type based on streak
    const buildingTypes: Array<"house" | "tree" | "shop" | "office" | "park" | "tower"> = [
      "house",
      "tree",
      "shop",
      "office",
      "park",
      "tower",
    ]

    const type = buildingTypes[Math.floor(Math.random() * buildingTypes.length)]

    // Calculate position - ensure buildings are placed in a grid-like pattern
    // but with some randomness
    const gridSize = 80 // Size of each grid cell
    const gridX = Math.floor(buildings.length / 3) % 5
    const gridY = buildings.length % 3

    // Add some randomness to position
    const randomOffsetX = Math.floor(Math.random() * 20) - 10
    const randomOffsetY = Math.floor(Math.random() * 20) - 10

    const newBuilding: Building = {
      id: Date.now(),
      type,
      position: {
        x: gridX * gridSize + randomOffsetX,
        y: gridY * gridSize + randomOffsetY,
      },
      level: Math.floor(newStreak / 5) + 1, // Level increases every 5 streaks
    }

    const updatedBuildings = [...buildings, newBuilding]
    setBuildings(updatedBuildings)

    // Save to localStorage
    localStorage.setItem("peacefocus_streak", newStreak.toString())
    localStorage.setItem("peacefocus_buildings", JSON.stringify(updatedBuildings))
  }

  // For demo purposes - in production this would be triggered by completing focus sessions
  const simulateSession = () => {
    addBuilding()
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex w-full flex-col items-center rounded-xl bg-purple-50 p-4">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">Your Streak City</h3>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Learn about your Streak City</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {showInfo && (
          <div className="mt-2 rounded-lg bg-white p-3 text-sm text-gray-600">
            <p>Complete focus sessions to grow your city! Each session adds a new building or tree.</p>
          </div>
        )}
      </div>

      <div
        className={`relative h-64 w-full overflow-hidden rounded-xl bg-gradient-to-b from-blue-100 to-blue-50 shadow-inner ${isPulsing ? "ring-4 ring-purple-300 transition-all duration-300" : ""}`}
      >
        {/* Sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-50"></div>

        {/* Ground */}
        <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-green-300 to-green-200"></div>

        {/* Buildings */}
        <div className="absolute inset-0">
          {buildings.map((building) => (
            <div
              key={building.id}
              className="absolute"
              style={{
                bottom: `${building.position.y + 50}px`,
                left: `${building.position.x + 120}px`,
                transform: "rotateX(60deg) rotateZ(45deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {building.type === "house" && (
                <div className="relative">
                  {/* Base */}
                  <div className="h-16 w-16 bg-red-400 shadow-lg"></div>
                  {/* Roof */}
                  <div className="absolute -top-8 h-8 w-16 bg-red-600" style={{ transform: "rotateX(45deg)" }}></div>
                </div>
              )}

              {building.type === "tree" && (
                <div className="relative">
                  {/* Trunk */}
                  <div className="h-4 w-4 bg-yellow-800"></div>
                  {/* Leaves */}
                  <div
                    className="absolute -top-12 left-[-6px] h-12 w-16 rounded-full bg-green-500"
                    style={{ transform: "rotateX(45deg)" }}
                  ></div>
                </div>
              )}

              {building.type === "shop" && (
                <div className="relative">
                  {/* Base */}
                  <div className="h-12 w-20 bg-blue-400 shadow-lg"></div>
                  {/* Awning */}
                  <div className="absolute -top-4 h-4 w-20 bg-blue-600" style={{ transform: "rotateX(45deg)" }}></div>
                </div>
              )}

              {building.type === "office" && (
                <div className="relative">
                  {/* Base */}
                  <div className="h-24 w-16 bg-gray-300 shadow-lg"></div>
                  {/* Windows */}
                  <div className="absolute left-2 top-2 grid grid-cols-2 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-3 w-3 bg-blue-200"></div>
                    ))}
                  </div>
                </div>
              )}

              {building.type === "park" && (
                <div className="relative">
                  {/* Grass */}
                  <div className="h-16 w-16 rounded-full bg-green-400 shadow-lg"></div>
                  {/* Bench */}
                  <div className="absolute left-6 top-6 h-2 w-6 bg-yellow-800"></div>
                </div>
              )}

              {building.type === "tower" && (
                <div className="relative">
                  {/* Base */}
                  <div className="h-32 w-12 bg-purple-400 shadow-lg"></div>
                  {/* Top */}
                  <div
                    className="absolute -top-6 left-0 h-6 w-12 bg-purple-600"
                    style={{ transform: "rotateX(45deg)" }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Streak counter */}
        <div className="absolute bottom-4 right-4 rounded-full bg-white bg-opacity-80 px-4 py-2 text-sm font-bold text-purple-800">
          Streak: {streak} days
        </div>
      </div>

      <div className="flex w-full justify-between">
        <div className="text-sm text-gray-600">
          <p>Complete focus sessions to grow your city!</p>
        </div>

        {/* This button is for demo purposes only */}
        <Button onClick={simulateSession} className="bg-purple-500 hover:bg-purple-600">
          <Building2 className="mr-2 h-4 w-4" />
          Add Building
        </Button>
      </div>
    </div>
  )
}

