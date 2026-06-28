import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Send, Sparkles, TrendingUp, Shield, DollarSign } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/advisor')({
  component: AdvisorComponent,
  head: () => ({
    title: 'AI Advisor — Nest',
    meta: [
      { name: 'description', content: 'Get personalized recommendations for your business' },
    ],
  }),
  errorComponent: () => <div>Error loading advisor</div>,
  notFoundComponent: () => <div>Advisor not found</div>,
})

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function AdvisorComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your Nest Advisor. I can help you optimize your business finances, choose the right plan, and unlock more value. What would you like to know?",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const suggestions = [
    { icon: TrendingUp, label: 'How can I improve my cash flow?' },
    { icon: Shield, label: 'What tier should I choose?' },
    { icon: DollarSign, label: 'Show me my ROI with Nest' },
    { icon: Sparkles, label: 'What insights should I focus on?' },
  ]

  const handleSend = async (message?: string) => {
    const userMessage = message || input
    if (!userMessage.trim()) return

    setMessages([...messages, { role: 'user', content: userMessage }])
    setInput('')
    setIsLoading(true)

    // Simulate AI response - will be replaced with actual AI SDK
    setTimeout(() => {
      const responses = [
        "Based on your current revenue of KES 450,000/month, I recommend the Growth tier at KES 4,500/month. This gives you advanced AI insights and Financial Passport Pro, which could help you recover an estimated KES 15,000/month in overdue payments. The cost is only 1% of your revenue.",
        "Your cash flow looks healthy overall, but I noticed a 15% dip this week. Review your large outflows to supplier payments. Consider negotiating better payment terms with your top suppliers to smooth out cash flow.",
        "With your current Financial Passport score of 612 (Silver tier), you're eligible for loans up to KES 500,000. To reach Gold tier, focus on improving your on-time payment rate from 84% to 90% and maintain consistent activity for 4 more months.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
      setIsLoading(false)
    }, 1500)
  }

  const handleSuggestion = (suggestion: string) => {
    handleSend(suggestion)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-primary" />
          AI Advisor
        </h1>
        <p className="text-muted-foreground">Get personalized recommendations for your business finances</p>
      </div>

      <Card className="border-border bg-card h-[600px] flex flex-col">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Conversation
          </CardTitle>
          <CardDescription>
            Ask me anything about your business finances, Nest features, or growth opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-background'
                    : 'bg-card border border-border'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <div className="border-t border-border p-4 space-y-4">
          {messages.length === 1 && (
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-3 px-4 text-left justify-start"
                  onClick={() => handleSuggestion(suggestion.label)}
                >
                  <suggestion.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{suggestion.label}</span>
                </Button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about your business..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              disabled={isLoading}
            />
            <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
