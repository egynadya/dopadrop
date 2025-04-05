"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Lightbulb, ThumbsUp, AlertCircle, Brain } from "lucide-react"

interface ReflectionProps {
  onComplete: () => void
}

export function Reflection({ onComplete }: ReflectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const handleSubmit = () => {
    setIsSubmitted(true)
    onComplete()
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setSelectedOption(null)
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)

    // Set the appropriate feedback message based on selection
    if (option === "focused") {
      setFeedbackMessage("Awesome! You were on point today. Keep that momentum going!")
    } else if (option === "distracted") {
      setFeedbackMessage("It happens! Don't worry. Try to identify your distractions and stay mindful next time!")
    } else if (option === "practice") {
      setFeedbackMessage("Good awareness! Focus takes time. Try again tomorrow—you'll get better with each session!")
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {isSubmitted ? (
        <div className="flex flex-col items-center space-y-6 py-8">
          <div className="rounded-full bg-purple-100 p-4">
            {selectedOption === "focused" && <ThumbsUp className="h-12 w-12 text-purple-500" />}
            {selectedOption === "distracted" && <AlertCircle className="h-12 w-12 text-purple-500" />}
            {selectedOption === "practice" && <Brain className="h-12 w-12 text-purple-500" />}
          </div>
          <h3 className="text-xl font-medium text-gray-800">
            {selectedOption === "focused" ? "Great job!" : "Keep going!"}
          </h3>
          <p className="text-center text-gray-600">{feedbackMessage}</p>
          <Button onClick={handleReset} className="mt-4 bg-purple-500 hover:bg-purple-600">
            New Reflection
          </Button>
        </div>
      ) : (
        <>
          <div className="flex w-full flex-col items-center rounded-xl bg-purple-50 p-4">
            <Lightbulb className="mb-2 h-8 w-8 text-purple-500" />
            <h3 className="text-center text-lg font-medium text-gray-800">Focus Session Ends</h3>
            <p className="mt-2 text-center text-sm text-gray-600">Take a moment to reflect on your focus session.</p>
          </div>

          <div className="w-full space-y-6">
            <div className="space-y-3">
              <label className="text-center block text-base font-medium text-gray-700">How did you feel today?</label>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant={selectedOption === "focused" ? "default" : "outline"}
                  className={selectedOption === "focused" ? "bg-purple-500 hover:bg-purple-600" : ""}
                  onClick={() => handleOptionSelect("focused")}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />I stayed focused
                </Button>
                <Button
                  variant={selectedOption === "distracted" ? "default" : "outline"}
                  className={selectedOption === "distracted" ? "bg-purple-500 hover:bg-purple-600" : ""}
                  onClick={() => handleOptionSelect("distracted")}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />I got distracted
                </Button>
                <Button
                  variant={selectedOption === "practice" ? "default" : "outline"}
                  className={selectedOption === "practice" ? "bg-purple-500 hover:bg-purple-600" : ""}
                  onClick={() => handleOptionSelect("practice")}
                >
                  <Brain className="mr-2 h-4 w-4" />I need practice
                </Button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-purple-500 hover:bg-purple-600"
              disabled={!selectedOption}
            >
              Complete Reflection
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

