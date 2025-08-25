import { useState } from "react"
import { Users, Crown, Edit, Eye, MoreHorizontal, Trash2, UserMinus } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { toast } from "sonner@2.0.3"

interface Collaborator {
  id: string
  name: string
  username: string
  avatar?: string
  role: 'owner' | 'editor' | 'viewer'
  joinedAt: string
}

interface CollaboratorsManagerProps {
  collaborators: Collaborator[]
  currentUserId: string
  onRoleChange: (collaboratorId: string, newRole: 'editor' | 'viewer') => void
  onRemoveCollaborator: (collaboratorId: string) => void
  canManage: boolean
}

export function CollaboratorsManager({
  collaborators,
  currentUserId,
  onRoleChange,
  onRemoveCollaborator,
  canManage = false
}: CollaboratorsManagerProps) {
  const [roleChangeCollaborator, setRoleChangeCollaborator] = useState<Collaborator | null>(null)
  const [removeCollaborator, setRemoveCollaborator] = useState<Collaborator | null>(null)

  const handleRoleChange = (newRole: 'editor' | 'viewer') => {
    if (!roleChangeCollaborator) return
    
    onRoleChange(roleChangeCollaborator.id, newRole)
    toast.success(`Permissão de ${roleChangeCollaborator.name} alterada para ${newRole === 'editor' ? 'Editor' : 'Visualizador'}`)
    setRoleChangeCollaborator(null)
  }

  const handleRemoveCollaborator = () => {
    if (!removeCollaborator) return
    
    onRemoveCollaborator(removeCollaborator.id)
    toast.success(`${removeCollaborator.name} foi removido da coleção`)
    setRemoveCollaborator(null)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-yellow-500" />
      case 'editor':
        return <Edit className="h-4 w-4 text-[var(--accent-primary)]" />
      case 'viewer':
        return <Eye className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'owner':
        return 'Proprietário'
      case 'editor':
        return 'Editor'
      case 'viewer':
        return 'Visualizador'
      default:
        return role
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'default'
      case 'editor':
        return 'secondary'
      case 'viewer':
        return 'outline'
      default:
        return 'outline'
    }
  }

  if (collaborators.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Nenhum colaborador ainda</h3>
        <p className="text-sm text-muted-foreground">
          {canManage ? "Adicione colaboradores para compartilhar esta coleção" : "Esta coleção não tem colaboradores"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-medium text-foreground">
          Colaboradores ({collaborators.length})
        </h3>
      </div>

      <div className="space-y-3">
        {collaborators.map((collaborator) => (
          <div key={collaborator.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {collaborator.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{collaborator.name}</p>
                  {collaborator.id === currentUserId && (
                    <Badge variant="outline" className="text-xs">Você</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">@{collaborator.username}</p>
                <p className="text-xs text-muted-foreground">
                  Adicionado em {new Date(collaborator.joinedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge 
                variant={getRoleBadgeVariant(collaborator.role)} 
                className="flex items-center gap-1"
              >
                {getRoleIcon(collaborator.role)}
                {getRoleLabel(collaborator.role)}
              </Badge>

              {/* Only show menu if current user can manage and it's not the owner */}
              {canManage && collaborator.role !== 'owner' && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover border-border">
                    <DropdownMenuItem
                      onClick={() => setRoleChangeCollaborator(collaborator)}
                      className="cursor-pointer"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Alterar permissão
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setRemoveCollaborator(collaborator)}
                      className="cursor-pointer text-destructive hover:text-destructive"
                    >
                      <UserMinus className="h-4 w-4 mr-2" />
                      Remover colaborador
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Role Change Dialog */}
      <AlertDialog open={!!roleChangeCollaborator} onOpenChange={() => setRoleChangeCollaborator(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Alterar permissão</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Altere o nível de permissão de {roleChangeCollaborator?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <Select
              defaultValue={roleChangeCollaborator?.role === 'owner' ? 'editor' : roleChangeCollaborator?.role}
              onValueChange={(value: 'editor' | 'viewer') => handleRoleChange(value)}
            >
              <SelectTrigger className="bg-muted/20 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="editor">
                  <div className="flex items-center gap-2">
                    <Edit className="h-4 w-4 text-[var(--accent-primary)]" />
                    <div className="flex flex-col items-start">
                      <span>Editor</span>
                      <span className="text-xs text-muted-foreground">Pode editar e adicionar mangás</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="viewer">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col items-start">
                      <span>Visualizador</span>
                      <span className="text-xs text-muted-foreground">Pode apenas ver a coleção</span>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-border hover:bg-muted/20">
              Cancelar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Collaborator Dialog */}
      <AlertDialog open={!!removeCollaborator} onOpenChange={() => setRemoveCollaborator(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Remover colaborador</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Tem certeza que deseja remover <strong>{removeCollaborator?.name}</strong> desta coleção? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border hover:bg-muted/20">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveCollaborator}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}