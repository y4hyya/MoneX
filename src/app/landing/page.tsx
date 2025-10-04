"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, Zap, Shield, Code, Globe, Smartphone, CreditCard, Users, Gamepad2, Ticket, Github, BookOpen, MessageCircle, Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { GradientBackground } from "@/components/ui/gradient-background"
import { GlassCard } from "@/components/ui/glass-card"
import { SoundWaveAnimation } from "@/components/ui/sound-wave-animation"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <GradientBackground />
      
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">MoneX</span>
                <span className="text-xs text-muted-foreground -mt-1">Payment Protocol</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                href="#features" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="#use-cases" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                Use Cases
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/docs" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                Documentation
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button variant="outline" className="glass-button hover:bg-white/20 transition-all duration-200" asChild>
                <Link href="/docs">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Docs
                </Link>
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200" asChild>
                <Link href="/app">
                  <Zap className="w-4 h-4 mr-2" />
                  Try Demo
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg glass-button hover:bg-white/20 transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-white/20 mt-4 pt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="#features" 
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link 
                  href="#use-cases" 
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Use Cases
                </Link>
                <Link 
                  href="/docs" 
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Documentation
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                  <Button variant="outline" className="glass-button w-full" asChild>
                    <Link href="/docs">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Docs
                    </Link>
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 w-full" asChild>
                    <Link href="/app">
                      <Zap className="w-4 h-4 mr-2" />
                      Try Demo
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <SoundWaveAnimation className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10 max-w-4xl">
            <div className="rounded-full bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 mb-6">
              Introducing MoneX
            </div>
            <div className="hero-glow mb-6">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl gradient-text">
                Crypto Payments That Fit in a URL
              </h1>
            </div>
            <p className="max-w-3xl leading-normal text-muted-foreground sm:text-xl sm:leading-8 glass-effect p-6 rounded-lg mb-8">
              MoneX empowers developers and merchants to accept instant, secure, and ultra-low-cost payments on Monad via a universal deep link standard—accessible through URLs, QR codes, or NFC.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200" asChild>
                <Link href="/app">
                  View Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="glass-button hover:bg-white/20 transition-all duration-200" asChild>
                <Link href="/docs">Read the Docs</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl gradient-text mb-6">
                Why Are Crypto Payments Still So Complicated?
              </h2>
              <p className="max-w-3xl mx-auto leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Current solutions create unnecessary friction for both merchants and customers.
              </p>
            </div>
            <div className="grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 backdrop-blur-sm">
                  <CreditCard className="h-6 w-6 text-red-500" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Complex Wallet Addresses</h3>
                  <p className="text-sm text-muted-foreground">
                    End copy-paste errors from long, unreadable addresses that nobody can remember or type correctly.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 backdrop-blur-sm">
                  <Zap className="h-6 w-6 text-orange-500" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">High Transaction Fees</h3>
                  <p className="text-sm text-muted-foreground">
                    Gas fees that make micropayments and small transactions impractical for everyday use.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 backdrop-blur-sm">
                  <Smartphone className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Poor User Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    The hassle of switching between multiple apps just to make a simple payment.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 backdrop-blur-sm">
                  <Code className="h-6 w-6 text-purple-500" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Difficult Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    The technical complexity for merchants to add crypto payment options to their websites and apps.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl gradient-text mb-6">
                MoneX: Making Payments Universal and Accessible
              </h2>
              <p className="max-w-3xl mx-auto leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                MoneX is a payment protocol built on a simple URL standard. This transforms any interaction, whether online or in the physical world, into an instant Monad transaction.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <GlassCard className="p-8" highlight>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <span className="font-semibold">URL / QR Code / NFC</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <span className="font-semibold">Wallet Confirmation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <span className="font-semibold">Instant Payment</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-6xl font-mono text-primary/20">monex://</div>
                    <p className="text-sm text-muted-foreground mt-2">Universal Payment Standard</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl gradient-text mb-6">
                Accept Payments in 3 Simple Steps
              </h2>
              <p className="max-w-3xl mx-auto leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                From creation to payment confirmation in seconds, not minutes.
              </p>
            </div>
            <div className="grid justify-center gap-6 sm:grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
              <GlassCard className="p-6 text-center hover:bg-white/15 transition-all duration-200">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 backdrop-blur-sm mx-auto mb-4">
                  <Code className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="font-bold text-xl mb-2">1. Create</h3>
                <p className="text-sm text-muted-foreground">
                  Generate your MoneX link in seconds using our dashboard or API. Specify the amount, currency, and a description.
                </p>
              </GlassCard>
              <GlassCard className="p-6 text-center hover:bg-white/15 transition-all duration-200" highlight>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 backdrop-blur-sm mx-auto mb-4">
                  <Globe className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-bold text-xl mb-2">2. Share</h3>
                <p className="text-sm text-muted-foreground">
                  Share the generated link directly, embed it as a button on your website, or print it as a QR code for your physical store.
                </p>
              </GlassCard>
              <GlassCard className="p-6 text-center hover:bg-white/15 transition-all duration-200">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 backdrop-blur-sm mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="font-bold text-xl mb-2">3. Get Paid</h3>
                <p className="text-sm text-muted-foreground">
                  When a user clicks the link or scans the QR code, their wallet opens automatically. With a single confirmation, the payment is securely and instantly sent to your account.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl gradient-text mb-6">
                Powerful Tools for Developers and Businesses
              </h2>
              <p className="max-w-3xl mx-auto leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Built with developers and merchants in mind, featuring enterprise-grade security and scalability.
              </p>
            </div>
            <div className="grid justify-center gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Universal Deep Link Standard</h3>
                  <p className="text-sm text-muted-foreground">
                    Native integration with all wallets and apps through the `monex://` schema.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Programmable Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Smart contract support for subscriptions, batch payments, or conditional transfers.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Real-Time Rate Conversion</h3>
                  <p className="text-sm text-muted-foreground">
                    Request payments in fiat and receive the equivalent amount in MONAD based on real-time exchange rates.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Developer-Friendly API & Webhooks</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure webhooks instantly notify your systems about payment confirmations.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Powered by Monad</h3>
                  <p className="text-sm text-muted-foreground">
                    Scale with Monad's 10,000+ TPS and near-zero gas fees.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Secure & Non-Custodial</h3>
                  <p className="text-sm text-muted-foreground">
                    Payments go directly to your wallet. You are always in control of your funds.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl gradient-text mb-6">
                Built for Every Scenario
              </h2>
              <p className="max-w-3xl mx-auto leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                From online stores to physical locations, MoneX adapts to your business needs.
              </p>
            </div>
            <div className="grid justify-center gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 backdrop-blur-sm">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">E-commerce & Retail</h3>
                  <p className="text-sm text-muted-foreground">
                    Instant crypto payments at checkout with a simple QR code for online and physical stores.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 backdrop-blur-sm">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Creator Tipping & Donations</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive support with a single link on your social media profile or live stream.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 backdrop-blur-sm">
                  <Gamepad2 className="h-6 w-6 text-purple-500" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">DApp & Gaming Integrations</h3>
                  <p className="text-sm text-muted-foreground">
                    Trigger in-app purchases or in-game asset transfers with a single URL.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 backdrop-blur-sm">
                  <Ticket className="h-6 w-6 text-orange-500" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Ticketing & Events</h3>
                  <p className="text-sm text-muted-foreground">
                    Purchase and validate event tickets using secure QR codes.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <GlassCard className="p-8" highlight>
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight gradient-text mb-4">
                    Join the Payment Revolution on Monad
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Discover the potential of MoneX and future-proof your project today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200" asChild>
                      <Link href="/docs">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read the Docs
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="glass-button hover:bg-white/20 transition-all duration-200" asChild>
                      <Link href="/app">
                        <Zap className="w-4 h-4 mr-2" />
                        View Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-white/20 py-8 md:py-12 backdrop-blur-md bg-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">MoneX</span>
                <span className="text-xs text-muted-foreground -mt-1">Payment Protocol</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Documentation
              </Link>
              <Link href="https://github.com" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                GitHub
              </Link>
              <Link href="https://monad.xyz" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Monad.xyz
              </Link>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-right">
              A non-custodial payment protocol powered by Monad.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}