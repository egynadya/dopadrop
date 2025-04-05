"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Coffee, Volume2, VolumeX } from "lucide-react"
import { playSound } from "@/lib/sound"

interface FocusTimerProps {
  onComplete: () => void
}

export function FocusTimer({ onComplete }: FocusTimerProps) {
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60) // 5 minutes in seconds
  const [focusDuration, setFocusDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [remainingTime, setRemainingTime] = useState(time)
  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval!)
            playSound()

            if (isBreak) {
              setIsBreak(false)
              setRemainingTime(time)
              setIsActive(false)
              onComplete()
            } else {
              setIsBreak(true)
              setRemainingTime(breakTime)
            }

            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isBreak, time, breakTime, onComplete])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsBreak(false)
    setRemainingTime(time)
  }

  const updateFocusDuration = (value: number[]) => {
    const newDuration = value[0]
    setFocusDuration(newDuration)
    setTime(newDuration * 60)
    if (!isActive && !isBreak) {
      setRemainingTime(newDuration * 60)
    }
  }

  const updateBreakDuration = (value: number[]) => {
    const newDuration = value[0]
    setBreakDuration(newDuration)
    setBreakTime(newDuration * 60)
    if (!isActive && isBreak) {
      setRemainingTime(newDuration * 60)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = isBreak ? ((breakTime - remainingTime) / breakTime) * 100 : ((time - remainingTime) / time) * 100

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-8 border-purple-100 bg-white">
        <Progress
          value={progress}
          className="absolute inset-0 h-full w-full rounded-full bg-gray-200"
        >
          <div 
            className={`h-full w-full rounded-full ${isBreak ? "bg-blue-400" : "bg-purple-400"}`} 
            style={{ width: `${progress}%` }} 
          />
        </Progress>
        <div className="z-10 flex flex-col items-center">
          <span className="text-4xl font-bold text-gray-800">{formatTime(remainingTime)}</span>
          <span className="mt-2 text-sm font-medium text-gray-500">{isBreak ? "Break Time" : "Focus Time"}</span>
        </div>
      </div>

      <div className="flex w-full justify-center space-x-3">
        <Button
          onClick={toggleTimer}
          size="lg"
          className={isBreak ? "bg-blue-500 hover:bg-blue-600" : "bg-purple-500 hover:bg-purple-600"}
        >
          {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button
          onClick={() => setSoundEnabled(!soundEnabled)}
          variant="outline"
          size="icon"
          className="rounded-full"
          title={soundEnabled ? "Mute sound" : "Enable sound"}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>

      <div className="w-full space-y-4 pt-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Focus Duration: {focusDuration} min</label>
            {isBreak && <Coffee className="h-4 w-4 text-blue-500" />}
          </div>
          <Slider
            disabled={isActive}
            value={[focusDuration]}
            min={5}
            max={60}
            step={5}
            onValueChange={updateFocusDuration}
            className={isBreak ? "opacity-50" : ""}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Break Duration: {breakDuration} min</label>
            {!isBreak && <Coffee className="h-4 w-4 text-purple-500" />}
          </div>
          <Slider
            disabled={isActive}
            value={[breakDuration]}
            min={1}
            max={15}
            step={1}
            onValueChange={updateBreakDuration}
            className={!isBreak ? "opacity-50" : ""}
          />
        </div>
      </div>
    </div>
  )
}

