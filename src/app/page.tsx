"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FocusTimer } from "@/components/focus-timer"
import { DetoxTimer } from "@/components/detox-timer"
import { Reflection } from "@/components/reflection"
import { Notification } from "@/components/notification"
import { MoonStar, Sun, ThumbsUp } from "lucide-react"
import { StreakCity } from "@/components/streak-city"

export default function Home() {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  const handleNotification = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">DopaDrop</h1>
        
        <Tabs defaultValue="focus" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="focus">Focus Timer</TabsTrigger>
            <TabsTrigger value="detox">Detox Timer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="focus" className="space-y-8">
            <FocusTimer 
              onComplete={() => handleNotification("Focus session complete!")}
            />
            <Reflection onComplete={() => handleNotification("Reflection saved!")} />
            <StreakCity />
          </TabsContent>
          
          <TabsContent value="detox" className="space-y-8">
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

