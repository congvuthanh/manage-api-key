"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Book, Send } from "lucide-react"
import { useState } from "react"

interface ApiResponse {
  summary: string
  cool_facts: string[]
}

export function ApiDemo() {
  const defaultPayload = JSON.stringify({ githubUrl: "https://github.com/assafelovic/gpt-researcher" }, null, 2)
  const [payload, setPayload] = useState(defaultPayload)
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendRequest = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // In a real app, this would be an actual API call
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let parsedPayload
      try {
        parsedPayload = JSON.parse(payload)
      } catch {
        throw new Error("Invalid JSON payload")
      }

      if (!parsedPayload.githubUrl) {
        throw new Error("githubUrl is required")
      }

      // Simulate response
      setResponse({
        summary: "GPT Researcher is an autonomous agent designed for comprehensive online research on various tasks. It aims to produce detailed, factual, and unbiased research reports by leveraging AI technology. The project addresses issues of misinformation, speed, determinism, and reliability in research tasks.",
        cool_facts: [
          "The project leverages both 'gpt-4o-mini' and 'gpt-4o' (128K context) to complete research tasks, optimizing costs by using each only when necessary.",
          "The average research task using GPT Researcher takes around 2 minutes to complete and costs approximately $0.005."
        ]
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setResponse(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setPayload(defaultPayload)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>API Demo</CardTitle>
            <CardDescription>Try our GitHub Analyzer API</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Book className="h-4 w-4" />
              Documentation
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Request Payload</h3>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Reset
              </Button>
            </div>
            <div className="relative">
              <Textarea
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                className="font-mono text-sm h-32 resize-none bg-muted"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="outline">JSON</Badge>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Response</h3>
            </div>
            <div className="relative min-h-32 bg-muted rounded-md p-4 overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-24">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="text-destructive font-mono text-sm whitespace-pre-wrap">Error: {error}</div>
              ) : response ? (
                <Tabs defaultValue="pretty">
                  <div className="flex justify-between items-center mb-2">
                    <TabsList>
                      <TabsTrigger value="pretty">Pretty</TabsTrigger>
                      <TabsTrigger value="raw">Raw</TabsTrigger>
                    </TabsList>
                    <Badge variant="default">200 OK</Badge>
                  </div>
                  <TabsContent value="pretty" className="mt-0">
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium">Summary</div>
                        <p className="text-sm">{response.summary}</p>
                      </div>
                      <div>
                        <div className="font-medium">Cool Facts</div>
                        <ul className="list-disc list-inside text-sm">
                          {response.cool_facts.map((fact, i) => (
                            <li key={i}>{fact}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="raw" className="mt-0">
                    <pre className="font-mono text-xs whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-muted-foreground text-sm italic">Send a request to see the response</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSendRequest} disabled={isLoading} className="gap-2">
          <Send className="h-4 w-4" />
          {isLoading ? "Sending..." : "Send Request"}
        </Button>
      </CardFooter>
    </Card>
  )
}
