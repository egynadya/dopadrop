"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FocusTimer } from "@/components/focus-timer"
import { DetoxTimer } from "@/components/detox-timer"
import { Reflection } from "@/components/reflection"
import { Notification } from "@/components/notification"
import { MoonStar, Sun, ThumbsUp } from "lucide-react"

export default function Home() {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [activeTab, setActiveTab] = useState("focus")

  const handleNotification = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000)
  }

  const handleFocusComplete = () => {
    handleNotification("Great job! You've completed your focus session.")
    // Automatically switch to reflection tab when focus session completes
    setActiveTab("reflect")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-sans font-black text-blue-600 flex items-center">
            <span className="mr-1">Dopa</span>
            <span className="bg-blue-600 text-white px-2 rounded-md">Drop</span>
          </h1>
          <p className="mt-2 text-sm font-medium text-gray-600 tracking-wide uppercase">Dopamine detox made cool</p>
        </div>

        <Tabs defaultValue="focus" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-purple-100">
            <TabsTrigger
              value="focus"
              className="rounded-lg data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <Sun className="mr-2 h-4 w-4" />
              Focus
            </TabsTrigger>
            <TabsTrigger
              value="detox"
              className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <MoonStar className="mr-2 h-4 w-4" />
              Detox
            </TabsTrigger>
            <TabsTrigger
              value="reflect"
              className="rounded-lg data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Reflect
            </TabsTrigger>
          </TabsList>

          <TabsContent value="focus" className="mt-6">
            <FocusTimer onComplete={handleFocusComplete} />
          </TabsContent>

          <TabsContent value="detox" className="mt-6">
            <DetoxTimer onReminder={(message) => handleNotification(message)} />
          </TabsContent>

          <TabsContent value="reflect" className="mt-6">
            <Reflection onComplete={() => handleNotification("Thanks for reflecting on your focus session!")} />
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Stay focused and mindful throughout your day!</p>
        </div>
      </div>

      {showNotification && <Notification message={notificationMessage} onClose={() => setShowNotification(false)} />}
    </main>
  )
}

