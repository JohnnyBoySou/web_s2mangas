import { useState } from "react"
import { Check, Crown, Star, Zap, ArrowRight, X } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useUser, type PlanType } from "../contexts/UserContext"

interface PlansPageProps {
  onBack?: () => void
}

export function PlansPage({ onBack }: PlansPageProps) {
  const { plan: currentPlan, setPlan } = useUser()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  const plans = [
    {
      id: 'starter' as PlanType,
      name: 'Starter',
      description: 'Perfeito para começar sua jornada no mundo dos mangás',
      monthlyPrice: 15,
      yearlyPrice: 150,
      icon: <Star className="h-6 w-6" />,
      color: 'from-gray-600 to-gray-800',
      borderColor: 'border-gray-600',
      popular: false,
      features: [
        'Até 5 coleções',
        'Leitor básico',
        'Biblioteca pessoal',
        'Suporte por email',
        'Acesso a mangás gratuitos'
      ]
    },
    {
      id: 'plus' as PlanType,
      name: 'Plus',
      description: 'Ideal para leitores que querem mais recursos',
      monthlyPrice: 50,
      yearlyPrice: 500,
      icon: <Zap className="h-6 w-6" />,
      color: 'from-purple-600 to-purple-800',
      borderColor: 'border-purple-600',
      popular: true,
      features: [
        'Até 25 coleções',
        'Leitor avançado com configurações',
        'Download para leitura offline',
        'Acesso a mangás premium',
        'Múltiplas integrações de plataforma',
        'Suporte prioritário por email'
      ]
    },
    {
      id: 'premium' as PlanType,
      name: 'Premium',
      description: 'A experiência completa para verdadeiros otakus',
      monthlyPrice: 150,
      yearlyPrice: 1500,
      icon: <Crown className="h-6 w-6" />,
      color: 'from-yellow-600 to-orange-600',
      borderColor: 'border-yellow-600',
      popular: false,
      features: [
        'Coleções ilimitadas',
        'Todos os recursos de leitura',
        'Armazenamento seguro ilimitado',
        'Acesso prioritário a novos lançamentos',
        'Todas as integrações disponíveis',
        'Suporte 24/7 por chat',
        'Recursos exclusivos beta'
      ]
    }
  ]

  const handleSelectPlan = async (planId: PlanType) => {
    if (planId === currentPlan) return

    setIsProcessing(planId)
    
    // Simulate payment processing
    setTimeout(() => {
      setPlan(planId)
      setIsProcessing(null)
      onBack?.() // Go back after successful plan change
    }, 2000)
  }

  const getPrice = (plan: typeof plans[0]) => {
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
    const period = billingCycle === 'monthly' ? '/mês' : '/ano'
    const discount = billingCycle === 'yearly' ? Math.round((1 - (plan.yearlyPrice / (plan.monthlyPrice * 12))) * 100) : 0
    
    return { price, period, discount }
  }

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="relative px-6 py-12 text-center">
          <div className="mx-auto max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Planos Premium
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Encontre Seu Plano Perfeito
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Selecione o plano com transparência de preços e sem taxas inesperadas
            </p>
            
            {/* Billing Toggle */}
            <Tabs 
              value={billingCycle} 
              onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
              className="inline-flex"
            >
              <TabsList className="bg-muted/20 border-border rounded-full">
                <TabsTrigger 
                  value="monthly" 
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full"
                >
                  Mensal
                </TabsTrigger>
                <TabsTrigger 
                  value="yearly" 
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-full"
                >
                  Anual
                  <Badge variant="secondary" className="ml-2 bg-green-500/20 text-green-300 text-xs">
                    -17%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6">
        <div className="pb-12">
          {/* Plans Grid */}
          <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
            {plans.map((planOption) => {
              const { price, period, discount } = getPrice(planOption)
              const isCurrentPlan = currentPlan === planOption.id
              const isProcessingThis = isProcessing === planOption.id
              
              return (
                <Card
                  key={planOption.id}
                  className={`relative transition-all duration-300 hover:shadow-2xl ${
                    planOption.popular 
                      ? 'border-purple-500 shadow-purple-500/20 shadow-xl scale-105' 
                      : 'border-border hover:border-muted-foreground/50'
                  } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
                >
                  {planOption.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-purple-500 text-white px-4 py-1">
                        Mais Popular
                      </Badge>
                    </div>
                  )}
                  
                  {isCurrentPlan && (
                    <div className="absolute -top-3 right-4">
                      <Badge className="bg-green-500 text-black px-3 py-1">
                        Plano Atual
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${planOption.color} flex items-center justify-center text-white`}>
                      {planOption.icon}
                    </div>
                    
                    <CardTitle className="text-2xl">{planOption.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {planOption.description}
                    </CardDescription>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">R${price}</span>
                        <span className="text-muted-foreground">{period}</span>
                      </div>
                      {discount > 0 && (
                        <p className="text-sm text-green-400 mt-1">
                          Economize {discount}% com o plano anual
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <Button
                      onClick={() => handleSelectPlan(planOption.id)}
                      disabled={isCurrentPlan || isProcessingThis}
                      className={`w-full ${
                        planOption.popular
                          ? 'bg-purple-500 hover:bg-purple-400 text-white'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      } ${isCurrentPlan ? 'bg-green-500 text-black' : ''}`}
                    >
                      {isProcessingThis ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Processando...
                        </>
                      ) : isCurrentPlan ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Plano Atual
                        </>
                      ) : (
                        <>
                          Escolher {planOption.name}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <div className="space-y-3">
                      {planOption.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Comparison Table */}
          <div className="mt-16 max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Compare os Planos</h2>
              <p className="text-muted-foreground">
                Escolha o plano que melhor se adequa com nossa fácil ferramenta de comparação
              </p>
            </div>

            <Card className="bg-muted/10 border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-6 font-medium">Recursos</th>
                        <th className="text-center p-6 font-medium">Starter</th>
                        <th className="text-center p-6 font-medium">Plus</th>
                        <th className="text-center p-6 font-medium">Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="p-6 font-medium">Coleções</td>
                        <td className="text-center p-6 text-muted-foreground">5</td>
                        <td className="text-center p-6 text-muted-foreground">25</td>
                        <td className="text-center p-6 text-muted-foreground">Ilimitadas</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-6 font-medium">Recursos Avançados</td>
                        <td className="text-center p-6">
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                        <td className="text-center p-6">
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        </td>
                        <td className="text-center p-6">
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-6 font-medium">Leitura Offline</td>
                        <td className="text-center p-6">
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                        <td className="text-center p-6">
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        </td>
                        <td className="text-center p-6">
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-6 font-medium">Acesso API</td>
                        <td className="text-center p-6">
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        </td>
                        <td className="text-center p-6">
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        </td>
                        <td className="text-center p-6">
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-6 font-medium">Suporte</td>
                        <td className="text-center p-6 text-muted-foreground">Email</td>
                        <td className="text-center p-6 text-muted-foreground">Email Prioritário</td>
                        <td className="text-center p-6 text-muted-foreground">Chat 24/7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}