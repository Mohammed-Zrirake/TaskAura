
import React from "react";
import { Button } from "../ui/Button";
import { Search, FolderKanban, Plus } from "lucide-react";

interface EmptyStateProps {
  searchTerm: string;
  onClearSearch: () => void;
  onCreateProject: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  onClearSearch,
  onCreateProject,
}) => {
  return (
    <div className="text-center py-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-300/50 dark:border-slate-700/50">
      {searchTerm ? (
        <>
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 blur-xl rounded-full"></div>
            <div className="relative p-6 bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl">
              <Search className="h-16 w-16 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
            No projects match your search for "{searchTerm}". Try a different
            search term or create a new project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="secondary"
              onClick={onClearSearch}
              className="border border-slate-300 dark:border-slate-700"
            >
              Clear Search
            </Button>
            <Button
              onClick={onCreateProject}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
            >
              Create New Project
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 blur-xl rounded-full"></div>
            <div className="relative p-6 bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl">
              <FolderKanban className="h-16 w-16 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Start Your First Project
          </h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
            Organize your work, track progress, and collaborate with your team.
            Create your first project to get started!
          </p>
          <Button
            onClick={onCreateProject}
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-600/30"
          >
            <Plus size={20} />
            <span className="font-medium">Create Project</span>
          </Button>
        </>
      )}
    </div>
  );
};
