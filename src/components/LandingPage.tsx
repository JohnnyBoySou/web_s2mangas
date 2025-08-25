import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { 
  BookOpen, 
  Smartphone, 
  Cloud, 
  Users, 
  Star, 
  Download,
  Play,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Heart,
  Bookmark,
  Share,
  MessageSquare,
  Globe,
  Zap,
  Shield,
  Crown,
  ChevronDown
} from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface LandingPageProps {
  onGetStarted: () => void
  onLogin: () => void
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const features = [
    {
      icon: BookOpen,
      title: "Biblioteca Infinita",
      description: "Acesse milhares de mangás em alta qualidade, desde clássicos até os mais recentes lançamentos."
    },
    {
      icon: Smartphone,
      title: "Leitura Otimizada",
      description: "Leitor avançado com configurações personalizáveis, modo escuro e sincronização entre dispositivos."
    },
    {
      icon: Cloud,
      title: "Sincronização em Nuvem",
      description: "Seus favoritos, progresso de leitura e coleções sempre sincronizados em todos os seus dispositivos."
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Descubra novos mangás através de reviews, comentários e recomendações da comunidade."
    },
    {
      icon: Heart,
      title: "Coleções Personalizadas",
      description: "Organize seus mangás em coleções temáticas e compartilhe suas descobertas com amigos."
    },
    {
      icon: Zap,
      title: "Atualizações Instantâneas",
      description: "Receba notificações imediatas quando novos capítulos dos seus mangás favoritos forem lançados."
    }
  ]

  const stats = [
    { number: "50K+", label: "Mangás Disponíveis" },
    { number: "1M+", label: "Usuários Ativos" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.8★", label: "Avaliação Média" }
  ]

  const testimonials = [
    {
      name: "Ana Silva",
      role: "Leitora assídua",
      content: "A melhor plataforma de mangá que já usei! Interface limpa, carregamento rápido e uma biblioteca impressionante.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Carlos Santos",
      role: "Colecionador",
      content: "As funcionalidades de organização são incríveis. Consigo acompanhar todos os meus mangás facilmente.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Marina Costa",
      role: "Otaku desde 2010",
      content: "Finalmente uma plataforma que entende os leitores de mangá. Recursos avançados e comunidade incrível!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ]

  const faqItems = [
    {
      question: "Como funciona o MangaStream?",
      answer: "O MangaStream é uma plataforma completa para leitura de mangás. Você pode navegar por nossa biblioteca, adicionar mangás aos favoritos, criar coleções personalizadas e acompanhar seu progresso de leitura em todos os dispositivos."
    },
    {
      question: "Posso ler offline?",
      answer: "Sim! Com os planos Plus e Premium, você pode baixar capítulos para leitura offline. Os mangás ficam disponíveis no seu dispositivo mesmo sem conexão com a internet."
    },
    {
      question: "Como funciona a sincronização?",
      answer: "Todos os seus dados (favoritos, progresso, coleções) são automaticamente sincronizados na nuvem. Você pode alternar entre dispositivos e continuar lendo de onde parou."
    },
    {
      question: "Há conteúdo para todos os gostos?",
      answer: "Absolutamente! Nossa biblioteca abrange todos os gêneros: ação, romance, comédia, terror, slice of life, shounen, seinen, shoujo, josei e muito mais."
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento através das configurações da sua conta. Não há taxas de cancelamento ou compromissos de longo prazo."
    }
  ]

  const plans = [
    {
      name: "Starter",
      price: "Grátis",
      description: "Perfeito para começar",
      features: [
        "Acesso a mangás populares",
        "Leitura básica",
        "Favoritos limitados",
        "Anúncios"
      ],
      cta: "Começar Grátis",
      popular: false
    },
    {
      name: "Plus",
      price: "R$ 9,90/mês",
      description: "Para leitores regulares",
      features: [
        "Biblioteca completa",
        "Leitura offline",
        "Sem anúncios",
        "Coleções ilimitadas",
        "Qualidade HD"
      ],
      cta: "Assinar Plus",
      popular: true
    },
    {
      name: "Premium",
      price: "R$ 19,90/mês",
      description: "Experiência definitiva",
      features: [
        "Tudo do Plus",
        "Acesso antecipado",
        "Conteúdo exclusivo",
        "Suporte prioritário",
        "Wallpapers premium"
      ],
      cta: "Assinar Premium",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold">MangaStream</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Planos
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
              <Button variant="ghost" onClick={onLogin}>
                Entrar
              </Button>
              <Button onClick={onGetStarted}>
                Começar Grátis
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-muted-foreground hover:text-foreground">
                Recursos
              </a>
              <a href="#pricing" className="block text-muted-foreground hover:text-foreground">
                Planos
              </a>
              <a href="#faq" className="block text-muted-foreground hover:text-foreground">
                FAQ
              </a>
              <div className="flex gap-2 pt-4">
                <Button variant="ghost" onClick={onLogin} className="flex-1">
                  Entrar
                </Button>
                <Button onClick={onGetStarted} className="flex-1">
                  Começar Grátis
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-green-500/10 text-green-400 border-green-500/20">
              <Crown className="w-3 h-3 mr-1" />
              Mais de 1 milhão de leitores confiam em nós
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-green-400 bg-clip-text text-transparent">
              Transforme Sua Experiência de Leitura
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Descubra a plataforma definitiva para leitura de mangás. Milhares de títulos, 
              sincronização em nuvem e uma comunidade apaixonada por mangás.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Começar Grátis
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Download className="w-5 h-5 mr-2" />
                Ver Demo
              </Button>
            </div>

            {/* Hero Image/Preview */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-card via-card/80 to-card p-8 rounded-2xl border border-border shadow-2xl">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Manga Cards Preview */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-4 space-y-3">
                      <div className="aspect-[3/4] bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg" />
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded" />
                        <div className="h-3 bg-muted/60 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recursos Inovadores para Leitores Exigentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desenvolvemos cada funcionalidade pensando na melhor experiência de leitura possível.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border hover:bg-card/80 transition-colors">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              O Que Dizem Nossos Leitores
            </h2>
            <p className="text-xl text-muted-foreground">
              Histórias reais de pessoas que transformaram sua experiência de leitura
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Planos para Todos os Leitores
            </h2>
            <p className="text-xl text-muted-foreground">
              Escolha o plano ideal para sua jornada no mundo dos mangás
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative bg-card border-border ${plan.popular ? 'ring-2 ring-green-500 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold mb-2">{plan.price}</div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={onGetStarted}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Tudo o que você precisa saber sobre o MangaStream
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-muted/20 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium">{item.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <Separator className="mb-4" />
                      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-12 border border-border">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para Começar Sua Jornada?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a mais de 1 milhão de leitores e descubra por que o MangaStream 
              é a plataforma preferida para leitura de mangás.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-4">
                Começar Grátis Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={onLogin} className="text-lg px-8 py-4">
                Já tem uma conta?
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-8 w-8 text-green-500" />
                <span className="text-xl font-bold">MangaStream</span>
              </div>
              <p className="text-muted-foreground mb-4">
                A plataforma definitiva para leitura de mangás, conectando leitores ao redor do mundo.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon">
                  <Globe className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageSquare className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Aplicativo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Comunidade</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Licenças</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground">
            <p>&copy; 2024 MangaStream. Todos os direitos reservados.</p>
            <p>Feito com ❤️ para a comunidade otaku</p>
          </div>
        </div>
      </footer>
    </div>
  )
}