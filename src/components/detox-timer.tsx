"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, BellRing } from "lucide-react"
import { playSound } from "@/lib/sound"

interface DetoxTimerProps {
  onReminder: (message: string) => void
}

export function DetoxTimer({ onReminder }: DetoxTimerProps) {
  const [isActive, setIsActive] = useState(false)
  const [duration, setDuration] = useState(60) // 60 minutes
  const [remainingTime, setRemainingTime] = useState(duration * 60) // in seconds
  const [reminderInterval, setReminderInterval] = useState(15) // 15 minutes

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    let reminderTimer: NodeJS.Timeout | null = null

    if (isActive) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer!)
            clearInterval(reminderTimer!)
            setIsActive(false)
            playSound()
            onReminder("Congratulations! You've completed your detox session.")
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      // Set up reminders
      reminderTimer = setInterval(
        () => {
          const messages = [
            "Stay off social media!",
            "Keep going with your detox!",
            "You're doing great! Stay focused.",
            "Remember why you started this detox.",
            "Avoid distractions, you're making progress!",
          ]
          const randomMessage = messages[Math.floor(Math.random() * messages.length)]
          onReminder(randomMessage)
        },
        reminderInterval * 60 * 1000,
      ) // Convert minutes to milliseconds
    }

    return () => {
      if (timer) clearInterval(timer)
      if (reminderTimer) clearInterval(reminderTimer)
    }
  }, [isActive, onReminder, reminderInterval])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setRemainingTime(duration * 60)
  }

  const updateDuration = (value: number[]) => {
    const newDuration = value[0]
    setDuration(newDuration)
    if (!isActive) {
      setRemainingTime(newDuration * 60)
    }
  }

  const updateReminderInterval = (value: number[]) => {
    setReminderInterval(value[0])
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((duration * 60 - remainingTime) / (duration * 60)) * 100

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-8 border-blue-100 bg-white">
        <Progress
          value={progress}
          className="absolute inset-0 h-full w-full rounded-full bg-gray-200"
        >
          <div className="h-full w-full rounded-full bg-blue-400" style={{ width: `${progress}%` }} />
        </Progress>
        <div className="z-10 flex flex-col items-center">
          <span className="text-4xl font-bold text-gray-800">{formatTime(remainingTime)}</span>
          <span className="mt-2 text-sm font-medium text-gray-500">Detox Time</span>
        </div>
      </div>

      <div className="flex w-full justify-center space-x-3">
        <Button onClick={toggleTimer} size="lg" className="bg-blue-500 hover:bg-blue-600">
          {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="w-full space-y-4 pt-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Detox Duration: {duration} min</label>
          </div>
          <Slider disabled={isActive} value={[duration]} min={15} max={720} step={15} onValueChange={updateDuration} />
          <div className="flex justify-between text-xs text-gray-500">
            <span>15m</span>
            <span>1h</span>
            <span>4h</span>
            <span>12h</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Reminder Frequency: {reminderInterval} min</label>
            <BellRing className="h-4 w-4 text-blue-500" />
          </div>
          <Slider
            disabled={isActive}
            value={[reminderInterval]}
            min={5}
            max={60}
            step={5}
            onValueChange={updateReminderInterval}
          />
        </div>
      </div>
    </div>
  )
}

