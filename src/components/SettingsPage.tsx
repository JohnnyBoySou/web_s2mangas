import { useState } from "react"
import { Settings, Palette, Type, Bell, Shield, Globe, RotateCcw, ChevronRight, Monitor, Sun, Moon } from "lucide-react"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Slider } from "./ui/slider"
import { ScrollArea } from "./ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useSettings, type ThemeMode, type FontSize, type AccentColor } from "../contexts/SettingsContext"

export function SettingsPage() {
  const {
    themeMode,
    setThemeMode,
    fontSize,
    setFontSize,
    accentColor,
    setAccentColor,
    autoMarkAsRead,
    setAutoMarkAsRead,
    pushNotifications,
    setPushNotifications,
    emailNotifications,
    setEmailNotifications,
    publicProfile,
    setPublicProfile,
    showReadingActivity,
    setShowReadingActivity,
    language,
    setLanguage,
    resetSettings
  } = useSettings()

  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const accentColorOptions = [
    { value: 'green', label: 'Verde', color: '#22c55e' },
    { value: 'blue', label: 'Azul', color: '#3b82f6' },
    { value: 'purple', label: 'Roxo', color: '#8b5cf6' },
    { value: 'red', label: 'Vermelho', color: '#ef4444' },
    { value: 'orange', label: 'Laranja', color: '#f97316' },
    { value: 'pink', label: 'Rosa', color: '#ec4899' }
  ]

  const fontSizeLabels = {
    'small': 'Pequena (12px)',
    'medium': 'Média (14px)',
    'large': 'Grande (16px)',
    'extra-large': 'Extra Grande (18px)'
  }

  const languageOptions = [
    { value: 'pt-BR', label: 'Português (Brasil)' },
    { value: 'en-US', label: 'English (US)' },
    { value: 'es-ES', label: 'Español' },
    { value: 'ja-JP', label: '日本語' }
  ]

  const handleReset = () => {
    if (showResetConfirm) {
      resetSettings()
      setShowResetConfirm(false)
    } else {
      setShowResetConfirm(true)
      setTimeout(() => setShowResetConfirm(false), 3000)
    }
  }

  return (
    <div className="flex h-full flex-col text-foreground">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Settings className="h-8 w-8 text-foreground" />
            <div>
              <h1 className="text-3xl font-bold">Configurações</h1>
              <p className="text-muted-foreground">Personalize sua experiência no MangaStream</p>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6">
        <div className="py-6 space-y-8">
          {/* Appearance Settings */}
          <Card className="bg-muted/20 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência
              </CardTitle>
              <CardDescription>
                Personalize o visual do aplicativo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Mode */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Tema</Label>
                <RadioGroup
                  value={themeMode}
                  onValueChange={(value: ThemeMode) => setThemeMode(value)}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                      <Moon className="h-4 w-4" />
                      Escuro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                      <Sun className="h-4 w-4" />
                      Claro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <RadioGroupItem value="auto" id="auto" />
                    <Label htmlFor="auto" className="flex items-center gap-2 cursor-pointer">
                      <Monitor className="h-4 w-4" />
                      Auto
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Accent Color */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Cor de destaque</Label>
                <div className="grid grid-cols-3 gap-3">
                  {accentColorOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAccentColor(option.value as AccentColor)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        accentColor === option.value
                          ? 'border-green-500 bg-muted/30'
                          : 'border-border hover:bg-muted/20'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: option.color }}
                      />
                      <span className="text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Font Size */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Tamanho da fonte</Label>
                <Select value={fontSize} onValueChange={(value: FontSize) => setFontSize(value)}>
                  <SelectTrigger className="bg-muted/20 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {Object.entries(fontSizeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reading Settings */}
          <Card className="bg-muted/20 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Leitura
              </CardTitle>
              <CardDescription>
                Configure suas preferências de leitura
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Marcar como lido automaticamente</Label>
                  <p className="text-sm text-muted-foreground">
                    Marcar capítulos como lidos ao abrir o leitor
                  </p>
                </div>
                <Switch
                  checked={autoMarkAsRead}
                  onCheckedChange={setAutoMarkAsRead}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-muted/20 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Gerencie como você recebe notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Notificações push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações de novos capítulos e atualizações
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Notificações por email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber resumos semanais e notificações importantes
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-muted/20 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacidade
              </CardTitle>
              <CardDescription>
                Controle quem pode ver suas informações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Perfil público</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que outros usuários vejam seu perfil
                  </p>
                </div>
                <Switch
                  checked={publicProfile}
                  onCheckedChange={setPublicProfile}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Mostrar atividade de leitura</Label>
                  <p className="text-sm text-muted-foreground">
                    Exibir mangás lidos recentemente no seu perfil
                  </p>
                </div>
                <Switch
                  checked={showReadingActivity}
                  onCheckedChange={setShowReadingActivity}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="bg-muted/20 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Idioma
              </CardTitle>
              <CardDescription>
                Escolha o idioma do aplicativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label className="text-base font-medium">Idioma da interface</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-muted/20 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {languageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reset Settings */}
          <Card className="bg-muted/20 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Redefinir
              </CardTitle>
              <CardDescription>
                Restaurar todas as configurações para os valores padrão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant={showResetConfirm ? "destructive" : "outline"}
                onClick={handleReset}
                className="border-border hover:bg-muted/20"
              >
                {showResetConfirm ? "Confirmar redefinição" : "Redefinir configurações"}
              </Button>
              {showResetConfirm && (
                <p className="text-sm text-muted-foreground mt-2">
                  Clique novamente para confirmar a redefinição
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}