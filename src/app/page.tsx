"use client"

import { ArrowRight, BarChart3, GitCompare, Github, GitPullRequest, Layout, Menu, Star, X } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

import { ApiDemo } from "@/components/ApiDemo"
import { AuthButton } from "@/components/AuthButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col px-4 md:px-8">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2" tabIndex={0} aria-label="Home">
              <Github className="h-6 w-6" />
              <span className="inline-block font-bold">Univer Github Analyzer</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="#features"
                className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                tabIndex={0}
                aria-label="View features"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                tabIndex={0}
                aria-label="Learn how it works"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                tabIndex={0}
                aria-label="View pricing plans"
              >
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {status === "authenticated" && (
              <Button variant="outline" size="sm" className="mr-2 hidden sm:flex">
                <Link
                  href="/dashboards"
                  className="flex items-center space-x-2"
                  tabIndex={0}
                  aria-label="Go to dashboards"
                >
                  <Layout className="h-4 w-4 mr-1" />
                  <span>Dashboards</span>
                </Link>
              </Button>
            )}
            <nav className="flex items-center space-x-2">
              <AuthButton />
              <button
                className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="#features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
                tabIndex={0}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
                tabIndex={0}
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
                tabIndex={0}
              >
                Pricing
              </Link>
              {status === "authenticated" && (
                <Link
                  href="/dashboards"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                  tabIndex={0}
                >
                  <div className="flex items-center">
                    <Layout className="h-4 w-4 mr-2" />
                    <span>Dashboards</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        {status === "authenticated" && (
          <div className="container mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <p className="text-emerald-700 dark:text-emerald-300 flex items-center gap-2 text-sm sm:text-base">
              <svg className="h-5 w-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Signed in as <span className="font-semibold truncate max-w-[200px] sm:max-w-none">{session?.user?.email}</span>
            </p>
          </div>
        )}
        <section className="space-y-6 pb-8 pt-10 md:pb-12 md:pt-16 lg:py-32">
          <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-6 text-center">
            <Badge className="px-3.5 py-1.5 text-sm font-medium bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
              Understand GitHub repositories like never before
            </Badge>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mx-auto w-full bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              Univer Github Analyzer
            </h1>
            <p className="max-w-[42rem] mx-auto leading-normal text-center text-muted-foreground sm:text-xl sm:leading-8">
              Get powerful insights, summaries, and analytics for any GitHub repository. Track stars, discover cool
              facts, monitor important PRs, and stay updated on version releases.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="shadow-lg shadow-indigo-500/20">
                <Link href="/signup" className="flex items-center" tabIndex={0} aria-label="Get started with Univer Github Analyzer">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="shadow-sm">
                <Link href="#features" className="flex items-center" tabIndex={0} aria-label="Learn more about features">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="container space-y-6 py-8 md:py-12 lg:py-24" id="features">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-center mx-auto w-full">Powerful GitHub Analytics</h2>
            <p className="max-w-[95%] md:max-w-[85%] mx-auto leading-normal text-center text-muted-foreground sm:text-lg sm:leading-7">
              Univer Github Analyzer provides comprehensive insights into any open source repository, helping you
              understand project health, popularity, and development activity.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-6 grid-cols-1 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card className="group border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Repository Summaries</CardTitle>
                <BarChart3 className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform duration-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">AI-Powered</div>
                <p className="text-xs text-muted-foreground">
                  Get concise, AI-generated summaries of any repository&apos;s purpose and key features
                </p>
              </CardContent>
            </Card>
            <Card className="group border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Star Analytics</CardTitle>
                <Star className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform duration-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Growth Trends</div>
                <p className="text-xs text-muted-foreground">
                  Track star history, growth patterns, and compare popularity with similar projects
                </p>
              </CardContent>
            </Card>
            <Card className="group border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">PR Insights</CardTitle>
                <GitPullRequest className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform duration-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Key Changes</div>
                <p className="text-xs text-muted-foreground">
                  Stay updated on important pull requests and understand their impact
                </p>
              </CardContent>
            </Card>
            <Card className="group border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Version Tracking</CardTitle>
                <GitCompare className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform duration-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Release Notes</div>
                <p className="text-xs text-muted-foreground">
                  Get summarized release notes and version comparisons to understand what changed
                </p>
              </CardContent>
            </Card>
            <Card className="group border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cool Facts</CardTitle>
                <Github className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform duration-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Discover</div>
                <p className="text-xs text-muted-foreground">
                  Uncover interesting facts and statistics about repositories you care about
                </p>
              </CardContent>
            </Card>
            <Card className="group border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Custom Alerts</CardTitle>
                <BarChart3 className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform duration-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Stay Updated</div>
                <p className="text-xs text-muted-foreground">
                  Set up custom alerts for repositories you want to monitor closely
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="container space-y-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-8 md:py-12 lg:py-24 relative" id="how-it-works">
          <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 bg-[center_top_-1px] opacity-10"></div>
          <div className="relative">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-center mx-auto w-full">How It Works</h2>
              <p className="max-w-[95%] md:max-w-[85%] mx-auto leading-normal text-center text-muted-foreground sm:text-lg sm:leading-7">
                Get started in minutes and gain valuable insights into any GitHub repository
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-6 grid-cols-1 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8">
              <div className="relative overflow-hidden rounded-lg border bg-background p-2 group hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md h-full">
                <div className="flex flex-col h-full rounded-md p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">1. Connect Your GitHub</h3>
                    <p className="text-sm text-muted-foreground">
                      Sign up and connect your GitHub account to get started
                    </p>
                  </div>
                  <div className="mt-auto rounded-full w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Github className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2 group hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md h-full">
                <div className="flex flex-col h-full rounded-md p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">2. Add Repositories</h3>
                    <p className="text-sm text-muted-foreground">
                      Add any public GitHub repositories you want to analyze
                    </p>
                  </div>
                  <div className="mt-auto rounded-full w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <GitPullRequest className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2 group hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:shadow-md h-full">
                <div className="flex flex-col h-full rounded-md p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">3. Get Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive detailed analytics and insights about your repositories
                    </p>
                  </div>
                  <div className="mt-auto rounded-full w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto text-center mt-10">
              <Button size="lg" className="shadow-lg shadow-indigo-500/20">
                <Link href="/signup" className="flex items-center" tabIndex={0} aria-label="Try our platform now">
                  Try It Now
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* API Demo Section */}
        <section className="container space-y-6 bg-slate-50 py-8 dark:bg-slate-900 md:py-12 lg:py-24" id="api-demo">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Try Our API</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Experience the power of our GitHub Analyzer API with this interactive demo
            </p>
          </div>
          <div className="mx-auto md:max-w-[64rem]">
            <ApiDemo />
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24" id="pricing">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-center mx-auto w-full">Simple, Transparent Pricing</h2>
            <p className="max-w-[85%] mx-auto leading-normal text-center text-muted-foreground sm:text-lg sm:leading-7">
              Choose the plan that&apos;s right for you, including a free tier to get started
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            {/* Free Tier */}
            <Card className="flex flex-col group border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="grid flex-1 place-items-start gap-4">
                <div className="text-3xl font-bold">$0</div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Basic repository insights
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Limited to 1000 requests per day
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Weekly updates
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => window.location.href = '/signup'}
                  aria-label="Get started with free plan"
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
            {/* Pro Tier */}
            <Card className="flex flex-col border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700 group hover:-translate-y-1 transition-all duration-200 hover:shadow-xl shadow-md relative overflow-hidden">
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle>Pro</CardTitle>
                </div>
                <Badge variant="outline" className="w-fit mb-2">
                  Coming Soon
                </Badge>
                <CardDescription>For developers who need more</CardDescription>
              </CardHeader>
              <CardContent className="grid flex-1 place-items-start gap-4">
                <div className="text-3xl font-bold">
                  $19<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Up to 20 repositories
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Advanced analytics
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Daily updates
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Custom alerts
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      API access
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled
                  variant="outline"
                  aria-label="Pro tier coming soon"
                >
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
            {/* Enterprise Tier */}
            <Card className="flex flex-col group border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <Badge variant="outline" className="w-fit mb-2">
                  Coming Soon
                </Badge>
                <CardDescription>For teams and organizations</CardDescription>
              </CardHeader>
              <CardContent className="grid flex-1 place-items-start gap-4">
                <div className="text-3xl font-bold">
                  $49<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Unlimited repositories
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Team collaboration
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Real-time updates
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Advanced reporting
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Priority support
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Custom integrations
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant="outline"
                  disabled
                  aria-label="Enterprise tier coming soon"
                >
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-center mx-auto w-full">Ready to get started?</h2>
            <p className="max-w-[85%] mx-auto leading-normal text-center text-muted-foreground sm:text-lg sm:leading-7">
              Sign up today and start analyzing your favorite GitHub repositories
            </p>
            <Button size="lg" className="mt-2 shadow-lg shadow-indigo-500/20">
              <Link href="/signup" className="flex items-center" tabIndex={0} aria-label="Get started for free">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800 py-10 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">Univer Github Analyzer</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Powerful insights for GitHub repositories. Monitor stars, PRs, and releases.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" tabIndex={0}>Features</Link></li>
                <li><Link href="#pricing" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" tabIndex={0}>Pricing</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" tabIndex={0}>Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" tabIndex={0}>About Us</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" tabIndex={0}>Blog</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" tabIndex={0}>Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" tabIndex={0}>Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" tabIndex={0}>Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" tabIndex={0}>Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Univer Github Analyzer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
