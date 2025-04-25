"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Book, Send } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ApiResponse {
  summary: string
  cool_facts: string[]
  stars: number
  latest_version: string
  website_url: string
  license: string
}

export function ApiDemo() {
  const { status } = useSession()
  const router = useRouter()
  const defaultPayload = JSON.stringify({ githubUrl: "https://github.com/assafelovic/gpt-researcher" }, null, 2)
  const [payload, setPayload] = useState(defaultPayload)
  const [response, setResponse] = useState<ApiResponse>({
    summary: "LangChain is a framework designed for building applications powered by Large Language Models (LLMs). It simplifies AI application development by allowing developers to chain together components and integrate with third-party services. The framework supports real-time data augmentation and model interoperability, making it adaptable as technology evolves. LangChain can be used standalone or in conjunction with other tools like LangSmith and LangGraph for enhanced capabilities.",
    cool_facts: [
      "Supports real-time data augmentation by connecting LLMs to various data sources.",
      "Facilitates model interoperability, allowing developers to easily swap models as needed.",
      "Integrates with tools like LangSmith for agent evaluation and observability, and LangGraph for complex task orchestration.",
      "Trusted by companies such as LinkedIn, Uber, Klarna, and GitLab for production workflows."
    ],
    stars: 106344,
    latest_version: "langchain-core==0.3.56",
    website_url: "https://python.langchain.com",
    license: "MIT License"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendRequest = async () => {
    // Check authentication status
    if (status === "unauthenticated") {
      // Redirect to login if not authenticated
      signIn("google")
      return
    }

    if (status === "authenticated") {
      // Redirect to playground if authenticated
      router.push("/playground")
      return
    }

    // Only proceed with API call if loading/checking auth
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
        summary: "LangChain is a framework designed for building applications powered by Large Language Models (LLMs). It simplifies AI application development by allowing developers to chain together components and integrate with third-party services. The framework supports real-time data augmentation and model interoperability, making it adaptable as technology evolves. LangChain can be used standalone or in conjunction with other tools like LangSmith and LangGraph for enhanced capabilities.",
        cool_facts: [
          "Supports real-time data augmentation by connecting LLMs to various data sources.",
          "Facilitates model interoperability, allowing developers to easily swap models as needed.",
          "Integrates with tools like LangSmith for agent evaluation and observability, and LangGraph for complex task orchestration.",
          "Trusted by companies such as LinkedIn, Uber, Klarna, and GitLab for production workflows."
        ],
        stars: 106344,
        latest_version: "langchain-core==0.3.56",
        website_url: "https://python.langchain.com",
        license: "MIT License"
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
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
              ) : (
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-medium">Stars</div>
                          <p className="text-sm">{response.stars.toLocaleString()}</p>
                        </div>
                        <div>
                          <div className="font-medium">Latest Version</div>
                          <p className="text-sm">{response.latest_version}</p>
                        </div>
                        <div>
                          <div className="font-medium">Website</div>
                          <a href={response.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                            {response.website_url}
                          </a>
                        </div>
                        <div>
                          <div className="font-medium">License</div>
                          <p className="text-sm">{response.license}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="raw" className="mt-0">
                    <pre className="font-mono text-xs whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
                  </TabsContent>
                </Tabs>
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
