"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ProfileForm } from "@/components/user/ProfileForm";
import { DeleteAccountDialog } from "@/components/user/DeleteAccountDialog";
import {
  useUserProfile,
  useUpdateProfile,
  useDeleteAccount,
} from "@/hooks/useUser";
import { UpdateUserDto } from "@/services/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Trash2, Calendar, Shield } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ROLE_LABELS = {
  USER: "Usuário",
  ADMIN: "Administrador",
  SUPER_ADMIN: "Super Administrador",
};

const ROLE_COLORS = {
  USER: "default" as const,
  ADMIN: "secondary" as const,
  SUPER_ADMIN: "destructive" as const,
};

export default function ProfilePage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch user profile
  const { data: user, isLoading } = useUserProfile();

  // Mutations
  const updateMutation = useUpdateProfile();
  const deleteMutation = useDeleteAccount();

  const handleUpdateProfile = (data: UpdateUserDto) => {
    updateMutation.mutate(data);
  };

  const handleDeleteAccount = () => {
    deleteMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <PageHeader title="Meu Perfil" description="Gerencie suas informações pessoais" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-96" />
          </div>
          <div>
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <PageHeader title="Meu Perfil" description="Gerencie suas informações pessoais" />
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Erro ao carregar perfil</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Meu Perfil"
        description="Gerencie suas informações pessoais e configurações de conta"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                Atualize seus dados pessoais. As alterações serão salvas imediatamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm
                user={user}
                onSubmit={handleUpdateProfile}
                isLoading={updateMutation.isPending}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Informações da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Função</p>
                <Badge variant={ROLE_COLORS[user.role]}>
                  {ROLE_LABELS[user.role]}
                </Badge>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-1">ID da Conta</p>
                <p className="text-xs font-mono">{user.id}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Conta criada em
                </p>
                <p className="text-sm">
                  {format(new Date(user.createdAt), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              {user.editedAt && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Última atualização
                    </p>
                    <p className="text-sm">
                      {format(new Date(user.editedAt), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Zona de Perigo
              </CardTitle>
              <CardDescription>
                Ações irreversíveis que afetam sua conta permanentemente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Conta
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Esta ação não pode ser desfeita
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Account Dialog */}
      <DeleteAccountDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteAccount}
        userEmail={user.email}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
