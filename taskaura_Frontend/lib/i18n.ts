import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "app.name": "TaskAura",

      // Navigation
      "nav.dashboard": "Dashboard",
      "nav.login": "Login",
      "nav.register": "Register",
      "nav.logout": "Logout",
      "nav.welcome": "Welcome, {{name}}",

      // Auth
      "auth.email": "Email Address",
      "auth.emailPlaceholder": "you@example.com",
      "auth.password": "Password",
      "auth.passwordPlaceholder": "••••••••",
      "auth.username": "Username",
      "auth.usernamePlaceholder": "Enter your username",
      "auth.signin": "Sign In",
      "auth.signup": "Sign Up",
      "auth.haveAccount": "Already have an account?",
      "auth.noAccount": "Don't have an account?",
      "auth.invalidCredentials": "Invalid email or password",
      "auth.registerSuccess": "Account created successfully!",
      "auth.registerError": "Registration failed. Please try again.",

      // Project
      "project.create": "Create Project",
      "project.edit": "Edit Project",
      "project.title": "Title",
      "project.titlePlaceholder": "Enter project title",
      "project.description": "Description",
      "project.descriptionPlaceholder": "Describe your project...",
      "project.progress": "Progress",
      "project.tasks": "{{completed}} / {{total}} Tasks",
      "project.noProjects": "No projects found. Create one to get started!",
      "project.deleteConfirm": "Delete Project?",
      "project.deleteWarning": "Are you sure you want to delete this project?",
      "project.deletePermanent":
        "All tasks inside this project will be permanently deleted. This action cannot be undone.",
      "project.notFound": "Project not found",
      "project.updated": "Project updated successfully",
      "project.created": "Project created successfully",

      // Task
      "task.add": "Add Task",
      "task.addFirstTask": "Add your first task",
      "task.edit": "Edit Task",
      "task.title": "Task Title",
      "task.titlePlaceholder": "Enter task title",
      "task.description": "Description",
      "task.descriptionPlaceholder": "Describe your task...",
      "task.dueDate": "Due Date",
      "task.completed": "Completed",
      "task.pending": "Pending",
      "task.status": "Status",
      "task.tasks": "Tasks",
      "task.noTasks": "No tasks yet",
      "task.noTasksFound": "No tasks found in this project.",
      "task.created": "Task created successfully",
      "task.updated": "Task updated successfully",
      "task.deleted": "Task deleted successfully",
      "task.markComplete": "Mark as complete",
      "task.markIncomplete": "Mark as incomplete",

      // Common
      "common.cancel": "Cancel",
      "common.back": "Back to Dashboard",
      "common.save": "Save",
      "common.update": "Update",
      "common.create": "Create",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.loading": "Loading...",
      "common.error": "Something went wrong",
      "common.errorLoading": "Error loading data",
      "common.success": "Success!",
      "common.warning": "Warning",
      "common.confirm": "Confirm",
      "common.yes": "Yes",
      "common.no": "No",
      "common.search": "Search...",
      "common.filter": "Filter",
      "common.sort": "Sort",

      // Theme
      "theme.light": "Light Mode",
      "theme.dark": "Dark Mode",
      "theme.system": "System",

      // Validation Messages
      "validation.required": "This field is required",
      "validation.email": "Please enter a valid email address",
      "validation.passwordLength": "Password must be at least 8 characters",
      "validation.usernameLength":
        "Username must be between 3 and 20 characters",
      "validation.titleLength": "Title must be between 3 and 100 characters",
      "validation.descriptionLength":
        "Description must be less than 500 characters",
      "validation.dateFuture": "Due date must be in the future",

      // Error Messages
      "error.network": "Network error. Please check your connection.",
      "error.unauthorized": "Please log in to continue.",
      "error.forbidden": "You don't have permission to perform this action.",
      "error.notFound": "The requested resource was not found.",
      "error.server": "Server error. Please try again later.",
      "error.timeout": "Request timeout. Please try again.",

      // Empty States
      "empty.tasks": "No tasks available",
      "empty.projects": "No projects available",
      "empty.results": "No results found",

      // Dashboard
      "dashboard.welcome": "Welcome back",
      "dashboard.overview": "Overview",
      "dashboard.recentProjects": "Recent Projects",
      "dashboard.recentTasks": "Recent Tasks",
      "dashboard.statistics": "Statistics",

      // Date/Time
      "date.today": "Today",
      "date.tomorrow": "Tomorrow",
      "date.yesterday": "Yesterday",
      "date.thisWeek": "This week",
      "date.nextWeek": "Next week",
      "date.overdue": "Overdue",
      "date.dueSoon": "Due soon",

      // Actions
      "actions.view": "View",
      "actions.edit": "Edit",
      "actions.delete": "Delete",
      "actions.duplicate": "Duplicate",
      "actions.archive": "Archive",
      "actions.restore": "Restore",
      "actions.markComplete": "Mark as complete",
      "actions.markIncomplete": "Mark as incomplete",

      // Status
      "status.active": "Active",
      "status.inactive": "Inactive",
      "status.completed": "Completed",
      "status.pending": "Pending",
      "status.overdue": "Overdue",
      "status.cancelled": "Cancelled",

      // Modals
      "modal.confirmDelete": "Confirm Delete",
      "modal.areYouSure": "Are you sure?",
      "modal.irreversible": "This action cannot be undone.",
      "modal.continue": "Continue",

      // Buttons
      "button.submit": "Submit",
      "button.reset": "Reset",
      "button.close": "Close",
      "button.next": "Next",
      "button.previous": "Previous",
      "button.done": "Done",
      "button.skip": "Skip",

      // Placeholders
      "placeholder.search": "Search...",
      "placeholder.filter": "Filter by...",
      "placeholder.select": "Select...",
      "placeholder.type": "Type here...",

      // Tooltips
      "tooltip.refresh": "Refresh",
      "tooltip.settings": "Settings",
      "tooltip.help": "Help",
      "tooltip.notifications": "Notifications",
      "tooltip.profile": "Profile",
      
    },
  },
  fr: {
    translation: {
      "app.name": "TaskAura",

      // Navigation
      "nav.dashboard": "Tableau de bord",
      "nav.login": "Connexion",
      "nav.register": "S'inscrire",
      "nav.logout": "Déconnexion",
      "nav.welcome": "Bienvenue, {{name}}",

      // Auth
      "auth.email": "Adresse e-mail",
      "auth.emailPlaceholder": "vous@exemple.com",
      "auth.password": "Mot de passe",
      "auth.passwordPlaceholder": "••••••••",
      "auth.username": "Nom d'utilisateur",
      "auth.usernamePlaceholder": "Entrez votre nom d'utilisateur",
      "auth.signin": "Se connecter",
      "auth.signup": "S'inscrire",
      "auth.haveAccount": "Vous avez déjà un compte ?",
      "auth.noAccount": "Pas encore de compte ?",
      "auth.invalidCredentials": "Email ou mot de passe invalide",
      "auth.registerSuccess": "Compte créé avec succès !",
      "auth.registerError": "Échec de l'inscription. Veuillez réessayer.",

      // Project
      "project.create": "Créer un projet",
      "project.edit": "Modifier le projet",
      "project.title": "Titre",
      "project.titlePlaceholder": "Entrez le titre du projet",
      "project.description": "Description",
      "project.descriptionPlaceholder": "Décrivez votre projet...",
      "project.progress": "Progression",
      "project.tasks": "{{completed}} / {{total}} Tâches",
      "project.noProjects": "Aucun projet trouvé. Créez-en un pour commencer !",
      "project.deleteConfirm": "Supprimer le projet ?",
      "project.deleteWarning": "Êtes-vous sûr de vouloir supprimer ce projet ?",
      "project.deletePermanent":
        "Toutes les tâches de ce projet seront définitivement supprimées. Cette action est irréversible.",
      "project.notFound": "Projet non trouvé",
      "project.updated": "Projet mis à jour avec succès",
      "project.created": "Projet créé avec succès",

      // Task
      "task.add": "Ajouter une tâche",
      "task.addFirstTask": "Ajoutez votre première tâche",
      "task.edit": "Modifier la tâche",
      "task.title": "Titre de la tâche",
      "task.titlePlaceholder": "Entrez le titre de la tâche",
      "task.description": "Description",
      "task.descriptionPlaceholder": "Décrivez votre tâche...",
      "task.dueDate": "Date d'échéance",
      "task.completed": "Terminé",
      "task.pending": "En attente",
      "task.status": "Statut",
      "task.tasks": "Tâches",
      "task.noTasks": "Aucune tâche pour le moment",
      "task.noTasksFound": "Aucune tâche trouvée dans ce projet.",
      "task.created": "Tâche créée avec succès",
      "task.updated": "Tâche mise à jour avec succès",
      "task.deleted": "Tâche supprimée avec succès",
      "task.markComplete": "Marquer comme terminée",
      "task.markIncomplete": "Marquer comme non terminée",

      // Common
      "common.cancel": "Annuler",
      "common.back": "Retour au tableau de bord",
      "common.save": "Enregistrer",
      "common.update": "Mettre à jour",
      "common.create": "Créer",
      "common.delete": "Supprimer",
      "common.edit": "Modifier",
      "common.loading": "Chargement...",
      "common.error": "Une erreur s'est produite",
      "common.errorLoading": "Erreur lors du chargement des données",
      "common.success": "Succès !",
      "common.warning": "Attention",
      "common.confirm": "Confirmer",
      "common.yes": "Oui",
      "common.no": "Non",
      "common.search": "Rechercher...",
      "common.filter": "Filtrer",
      "common.sort": "Trier",

      // Theme
      "theme.light": "Mode Clair",
      "theme.dark": "Mode Sombre",
      "theme.system": "Système",

      // Validation Messages
      "validation.required": "Ce champ est obligatoire",
      "validation.email": "Veuillez entrer une adresse e-mail valide",
      "validation.passwordLength":
        "Le mot de passe doit contenir au moins 8 caractères",
      "validation.usernameLength":
        "Le nom d'utilisateur doit contenir entre 3 et 20 caractères",
      "validation.titleLength":
        "Le titre doit contenir entre 3 et 100 caractères",
      "validation.descriptionLength":
        "La description ne doit pas dépasser 500 caractères",
      "validation.dateFuture": "La date d'échéance doit être dans le futur",

      // Error Messages
      "error.network": "Erreur réseau. Veuillez vérifier votre connexion.",
      "error.unauthorized": "Veuillez vous connecter pour continuer.",
      "error.forbidden":
        "Vous n'avez pas la permission d'effectuer cette action.",
      "error.notFound": "La ressource demandée n'a pas été trouvée.",
      "error.server": "Erreur serveur. Veuillez réessayer plus tard.",
      "error.timeout": "Délai d'attente dépassé. Veuillez réessayer.",

      // Empty States
      "empty.tasks": "Aucune tâche disponible",
      "empty.projects": "Aucun projet disponible",
      "empty.results": "Aucun résultat trouvé",

      // Dashboard
      "dashboard.welcome": "Bon retour",
      "dashboard.overview": "Aperçu",
      "dashboard.recentProjects": "Projets récents",
      "dashboard.recentTasks": "Tâches récentes",
      "dashboard.statistics": "Statistiques",

      // Date/Time
      "date.today": "Aujourd'hui",
      "date.tomorrow": "Demain",
      "date.yesterday": "Hier",
      "date.thisWeek": "Cette semaine",
      "date.nextWeek": "Semaine prochaine",
      "date.overdue": "En retard",
      "date.dueSoon": "À échéance bientôt",

      // Actions
      "actions.view": "Voir",
      "actions.edit": "Modifier",
      "actions.delete": "Supprimer",
      "actions.duplicate": "Dupliquer",
      "actions.archive": "Archiver",
      "actions.restore": "Restaurer",
      "actions.markComplete": "Marquer comme terminé",
      "actions.markIncomplete": "Marquer comme non terminé",

      // Status
      "status.active": "Actif",
      "status.inactive": "Inactif",
      "status.completed": "Terminé",
      "status.pending": "En attente",
      "status.overdue": "En retard",
      "status.cancelled": "Annulé",

      // Modals
      "modal.confirmDelete": "Confirmer la suppression",
      "modal.areYouSure": "Êtes-vous sûr ?",
      "modal.irreversible": "Cette action est irréversible.",
      "modal.continue": "Continuer",

      // Buttons
      "button.submit": "Soumettre",
      "button.reset": "Réinitialiser",
      "button.close": "Fermer",
      "button.next": "Suivant",
      "button.previous": "Précédent",
      "button.done": "Terminé",
      "button.skip": "Passer",

      // Placeholders
      "placeholder.search": "Rechercher...",
      "placeholder.filter": "Filtrer par...",
      "placeholder.select": "Sélectionner...",
      "placeholder.type": "Écrivez ici...",

      // Tooltips
      "tooltip.refresh": "Actualiser",
      "tooltip.settings": "Paramètres",
      "tooltip.help": "Aide",
      "tooltip.notifications": "Notifications",
      "tooltip.profile": "Profil",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
