"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FocusTimer } from "@/components/focus-timer"
import { DetoxTimer } from "@/components/detox-timer"
import { Reflection } from "@/components/reflection"
import { Notification } from "@/components/notification"
import { MoonStar, Sun } from "lucide-react"
import { StreakCity } from "@/components/streak-city"

export default function Home() {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [activeTab, setActiveTab] = useState("focus")
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const handleNotification = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const startTimer = () => {
    setIsActive(true)
  }

  const stopTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(25 * 60)
  }

  useState(() => {
    let interval: NodeJS.Timeout

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
    }

    return () => clearInterval(interval)
  }, [isActive, time])

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8 bg-white/90 p-8 rounded-lg shadow-xl backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-center text-gray-800">DopaDrop</h1>
        
        <Tabs defaultValue="focus" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="focus" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Focus Timer
            </TabsTrigger>
            <TabsTrigger value="detox" className="flex items-center gap-2">
              <MoonStar className="h-4 w-4" />
              Detox Timer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="focus" className="space-y-8">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-gray-700 mb-4">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              
              <div className="space-x-4">
                {!isActive ? (
                  <button
                    onClick={startTimer}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={stopTimer}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Stop
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
            <FocusTimer 
              onComplete={() => handleNotification("Focus session complete!")}
            />
            <Reflection onComplete={() => handleNotification("Reflection saved!")} />
            <StreakCity />
          </TabsContent>
          
          <TabsContent value="detox" className="space-y-8">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-gray-700 mb-4">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              
              <div className="space-x-4">
                {!isActive ? (
                  <button
                    onClick={startTimer}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={stopTimer}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Stop
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
            <DetoxTimer
              onReminder={handleNotification}
            />
            <Reflection onComplete={() => handleNotification("Reflection saved!")} />
            <StreakCity />
          </TabsContent>
        </Tabs>

        {showNotification && (
          <Notification 
            message={notificationMessage}
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
    </main>
  )
}

