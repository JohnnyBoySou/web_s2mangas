import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, BookOpen, Check } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Checkbox } from "./ui/checkbox"
import { Progress } from "./ui/progress"

interface RegisterPageProps {
  onRegister?: (name: string, email: string, password: string) => void
  onLogin?: () => void
}

export function RegisterPage({ onRegister, onLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    terms?: string
  }>({})

  const getPasswordStrength = (password: string) => {
    let strength = 0
    let feedback: string[] = []

    if (password.length >= 8) {
      strength += 25
    } else {
      feedback.push("Pelo menos 8 caracteres")
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      strength += 25
    } else {
      feedback.push("Letras maiúsculas e minúsculas")
    }

    if (/\d/.test(password)) {
      strength += 25
    } else {
      feedback.push("Pelo menos um número")
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength += 25
    } else {
      feedback.push("Pelo menos um caractere especial")
    }

    return { strength, feedback }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const validateForm = () => {
    const newErrors: {
      name?: string
      email?: string
      password?: string
      confirmPassword?: string
      terms?: string
    } = {}

    if (!formData.name) {
      newErrors.name = "Nome é obrigatório"
    } else if (formData.name.length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres"
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (passwordStrength.strength < 75) {
      newErrors.password = "Senha muito fraca"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem"
    }

    if (!acceptTerms) {
      newErrors.terms = "Você deve aceitar os termos de serviço"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      onRegister?.(formData.name, formData.email, formData.password)
      setIsLoading(false)
    }, 1000)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 25) return "bg-destructive"
    if (strength < 50) return "bg-orange-500"
    if (strength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 25) return "Muito fraca"
    if (strength < 50) return "Fraca"
    if (strength < 75) return "Média"
    return "Forte"
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Brand */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="h-10 w-10 text-green-500" />
            <h1 className="text-3xl font-bold text-foreground">MangaStream</h1>
          </div>
          <p className="text-muted-foreground">
            Crie sua conta e comece a ler
          </p>
        </div>

        {/* Register Form */}
        <Card className="bg-card border-border shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
            <CardDescription className="text-center">
              Preencha os dados para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className={`pl-10 bg-muted/20 border-border text-foreground placeholder:text-muted-foreground ${
                      errors.name ? 'border-destructive' : ''
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className={`pl-10 bg-muted/20 border-border text-foreground placeholder:text-muted-foreground ${
                      errors.email ? 'border-destructive' : ''
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className={`pl-10 pr-10 bg-muted/20 border-border text-foreground placeholder:text-muted-foreground ${
                      errors.password ? 'border-destructive' : ''
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-muted/20"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Password Strength */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Força da senha: {getPasswordStrengthText(passwordStrength.strength)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {passwordStrength.strength}%
                      </span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getPasswordStrengthColor(passwordStrength.strength)}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        <p>Adicione:</p>
                        <ul className="list-disc list-inside">
                          {passwordStrength.feedback.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    className={`pl-10 pr-10 bg-muted/20 border-border text-foreground placeholder:text-muted-foreground ${
                      errors.confirmPassword ? 'border-destructive' : ''
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-muted/20"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <Check className="absolute right-10 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className={errors.terms ? 'border-destructive' : ''}
                  />
                  <Label htmlFor="terms" className="text-sm leading-5">
                    Eu aceito os{" "}
                    <Button variant="link" className="h-auto p-0 text-sm text-green-500 hover:text-green-400">
                      Termos de Serviço
                    </Button>{" "}
                    e a{" "}
                    <Button variant="link" className="h-auto p-0 text-sm text-green-500 hover:text-green-400">
                      Política de Privacidade
                    </Button>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-destructive">{errors.terms}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 text-black hover:bg-green-400 disabled:opacity-50"
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>

            <Separator />

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Button
                  variant="link"
                  onClick={onLogin}
                  className="h-auto p-0 text-green-500 hover:text-green-400"
                >
                  Entrar
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}